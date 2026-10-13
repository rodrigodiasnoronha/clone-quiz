import { el } from '../utils.js';

export function quotes({ content }, ctx) {
  const list = el('div', { class: 'quotes' }, ...content.quotes.map(q => el('div', { class: 'quote' },
    el('img', { src: q.image?.src, alt: '' }),
    el('div', {}, el('div', { class: 'stars' }, '★'.repeat(q.rate || 5)), el('b', {}, q.name), el('small', {}, q.activity)),
    el('p', {}, q.text),
  )));

  // Carrossel automático
  const timer = setInterval(() => {
    if (!ctx.alive()) return clearInterval(timer);
    const end = list.scrollLeft + list.clientWidth >= list.scrollWidth - 4;
    list.scrollTo({ left: end ? 0 : list.scrollLeft + list.clientWidth * 0.85, behavior: 'smooth' });
  }, 3000);

  return list;
}
