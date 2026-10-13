import { el, rich } from '../utils.js';

// Contagem regressiva de urgência (10 min) acima do card de preço
function countdown() {
  const t = el('b', {});
  let left = 10 * 60;
  const tick = () => {
    t.textContent = `${String(Math.floor(left / 60)).padStart(2, '0')}:${String(left % 60).padStart(2, '0')}`;
    if (left > 0) left--;
  };
  tick();
  const id = setInterval(() => (t.isConnected ? tick() : clearInterval(id)), 1000);
  return el('div', { class: 'countdown' }, '⏰ Seu desconto expira em ', t);
}

export const price = ({ content: c }) => el('div', {},
  countdown(),
  el('div', { class: 'price' },
    c.featured && el('div', { class: 'feat' }, c.featured),
    el('div', { class: 'body' },
      rich(c.title),
      el('div', { class: 'box' }, c.before, el('b', {}, c.value), c.after),
    ),
  ),
);
