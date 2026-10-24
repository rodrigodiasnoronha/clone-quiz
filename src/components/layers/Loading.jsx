import { useEffect, useState } from 'react';
import { useQuiz } from '../../context.js';
import Rich from '../Rich.jsx';

// Barra de "analisando..." que avança sozinha para a próxima etapa
export default function Loading({ content: c }) {
  const { go } = useQuiz();
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const ms = (c.seconds || 5) * 1000;
    const start = performance.now();
    let id;
    const tick = () => {
      const p = Math.min(100, Math.round(((performance.now() - start) / ms) * 100));
      setPct(p);
      if (p < 100) id = requestAnimationFrame(tick);
      else go(c.destination || 'next');
    };
    tick();
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className="loading">
      <div className="pct">{pct}%</div>
      <div className="bar"><div style={{ width: `${pct}%` }} /></div>
      <Rich html={c.description} />
    </div>
  );
}
