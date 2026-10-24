import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useQuiz, useValidate } from '../../context.js';

const TICK = 18; // px por unidade, igual ao .tick no CSS

// Cada unidade: [nome, min, max, fator a partir do valor imperial (in / lb)]
const UNITS = {
  height: [['in', 47, 87, 1], ['cm', 120, 220, 2.54]],
  weight: [['lb', 66, 440, 1], ['kg', 30, 200, 1 / 2.2046]],
};

// A resposta fica sempre em in/lb; a régua só mostra na unidade escolhida.
function Ruler({ content, kind }) {
  const { answers, setAnswer } = useQuiz();
  const name = content.name;
  const initial = name === 'objetivo' && answers.peso ? answers.peso - 10 : content.value;
  const value = answers[name] ?? initial;
  const valueRef = useRef(value);
  valueRef.current = value;

  const [unit, setUnit] = useState(UNITS[kind][0]);
  const [, min, max, f] = unit;
  const [shown, setShown] = useState(() => Math.round(value * f));
  const [err, setErr] = useState(false);
  const track = useRef();
  const drag = useRef(null);

  useEffect(() => { if (answers[name] === undefined) setAnswer(name, initial); }, []);

  // Posiciona a régua ao trocar de unidade (e na primeira vez)
  useLayoutEffect(() => {
    const n = Math.round(valueRef.current * f);
    setShown(n);
    track.current.scrollLeft = (n - min) * TICK + TICK / 2;
  }, [unit]);

  const onScroll = e => {
    const n = Math.min(max, Math.max(min, min + Math.round((e.target.scrollLeft - TICK / 2) / TICK)));
    setShown(n);
    setAnswer(name, Math.round(n / f));
  };

  // Arrastar com o mouse (no touch o scroll nativo já funciona)
  const down = e => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    drag.current = { x: e.clientX, left: track.current.scrollLeft };
    track.current.classList.add('dragging');
    track.current.setPointerCapture(e.pointerId);
  };
  const move = e => { if (drag.current) track.current.scrollLeft = drag.current.left - (e.clientX - drag.current.x); };
  const up = () => {
    drag.current = null;
    track.current.classList.remove('dragging');
  };

  // A meta de peso tem que ser menor que o peso atual
  useValidate(() => {
    const ok = name !== 'objetivo' || !answers.peso || valueRef.current < answers.peso;
    setErr(!ok);
    return ok;
  });

  const ticks = [];
  for (let n = min; n <= max; n++) {
    ticks.push(<div key={n} className={`tick ${n % 10 === 0 ? 'big' : n % 5 === 0 ? 'mid' : ''}`}>{n % 10 === 0 && <span>{n}</span>}</div>);
  }

  return (
    <div>
      <div className="units">
        {UNITS[kind].map(u => <button key={u[0]} className={u === unit ? 'on' : ''} onClick={() => setUnit(u)}>{u[0]}</button>)}
      </div>
      <div className="val">{shown}<small>{unit[0]}</small></div>
      <div className="ruler">
        <div className="track" ref={track} onScroll={onScroll} onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up}>{ticks}</div>
        <div className="needle" />
      </div>
      <div className={`hint ${err ? 'err' : ''}`}>{err ? `Your goal must be lower than your current weight (${answers.peso} lbs)` : 'Drag to adjust'}</div>
    </div>
  );
}

export const Height = props => <Ruler {...props} kind="height" />;
export const Weight = props => <Ruler {...props} kind="weight" />;
