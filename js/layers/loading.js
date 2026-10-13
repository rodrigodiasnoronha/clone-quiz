import { el, rich } from '../utils.js';

// Barra de "analisando..." que avança sozinha para a próxima etapa
export function loading({ content: c }, ctx) {
  const pct = el('div', { class: 'pct' }, '0%');
  const fill = el('div', { style: 'width: 0%' });
  const ms = (c.seconds || 5) * 1000;
  const start = performance.now();

  (function tick() {
    if (!ctx.alive()) return;
    const p = Math.min(100, Math.round(((performance.now() - start) / ms) * 100));
    pct.textContent = `${p}%`;
    fill.style.width = `${p}%`;
    if (p < 100) requestAnimationFrame(tick);
    else ctx.go(c.destination || 'next');
  })();

  return el('div', { class: 'loading' }, pct, el('div', { class: 'bar' }, fill), rich(c.description));
}
