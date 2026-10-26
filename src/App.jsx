import { useCallback, useEffect, useRef, useState } from 'react';
import quiz from './quiz.json';
import { QuizContext } from './context.js';
import { BACK_REDIRECT_URL, OFFER } from './config.js';
import { stepImages, preload } from './lib/text.js';
import { track, goToCheckout } from './lib/track.js';
import Header from './components/Header.jsx';
import ExitOffer from './components/ExitOffer.jsx';
import layers from './components/layers';

const { design, steps } = quiz;
const indexById = Object.fromEntries(steps.map((s, i) => [s.id, i]));

// Cores do quiz.json viram variáveis CSS (--theme, --title...)
const root = document.documentElement.style;
root.setProperty('--theme', design.themeColor);
root.setProperty('--title', design.titleColor);
root.setProperty('--content', design.contentColor);
root.setProperty('--bg', design.backgroundColor);

// Largura do layer: "cols" é em 12 colunas, "basis" em %
function width(d = {}) {
  if (d.cols) return `${(d.cols / 12) * 100}%`;
  if (d.basis && d.basis < 100) return `${d.basis}%`;
}

export default function App() {
  const [current, setCurrent] = useState(0);
  const [past, setPast] = useState([]);
  const [answers, setAnswers] = useState({});
  const [exiting, setExiting] = useState(false);
  const validators = useRef(new Set());

  const validate = useCallback(fn => {
    validators.current.add(fn);
    return () => validators.current.delete(fn);
  }, []);

  const setAnswer = useCallback((key, value) => setAnswers(a => ({ ...a, [key]: value })), []);

  // dest: id de uma etapa do quiz.json, ou 'next'
  const go = (dest = 'next') => {
    const next = dest === 'next' ? current + 1 : indexById[dest];
    if (next == null || next >= steps.length) return;
    setPast(h => [...h, current]);
    setCurrent(next);
  };

  const next = dest => [...validators.current].every(fn => fn()) && (go(dest), true);

  const back = () => {
    if (!past.length) return;
    setCurrent(past.at(-1));
    setPast(h => h.slice(0, -1));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    preload(steps.slice(current + 1, current + 4).flatMap(stepImages));
  }, [current]);

  // Back redirect: ao apertar "voltar" no navegador mostra o presente e depois a oferta.
  useEffect(() => {
    window.history.pushState({ exit: true }, '');
    const onBack = () => {
      removeEventListener('popstate', onBack);
      setExiting(true);
      track('ViewContent', { content_name: `Back redirect ${OFFER.discount}` });
      // a partir daqui, "voltar" leva para o link
      const url = BACK_REDIRECT_URL.trim();
      for (let i = 0; i < 3; i++) window.history.pushState({}, '', location.href);
      addEventListener('popstate', () => setTimeout(() => goToCheckout(url), 1));
    };
    addEventListener('popstate', onBack);
    return () => removeEventListener('popstate', onBack);
  }, []);

  const step = steps[current];
  const ctx = { answers, setAnswer, go, next, validate };

  return (
    <QuizContext.Provider value={ctx}>
      <Header current={current} total={steps.length} onBack={back} />
      <main id="app" key={current}>
        {step.layers.filter(l => layers[l.type]).map((l, i) => {
          const Layer = layers[l.type];
          return (
            <div key={l.id} className={`layer ${l.type === 'button' || l.design?.fixed ? 'sticky' : ''}`} style={{ width: width(l.design), '--i': i }}>
              <Layer content={l.content} design={l.design || {}} />
            </div>
          );
        })}
      </main>
      {exiting && <ExitOffer />}
    </QuizContext.Provider>
  );
}
