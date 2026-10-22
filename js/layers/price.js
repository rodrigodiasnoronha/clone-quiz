import { el, rich, countdown } from '../utils.js';

export const price = ({ content: c }) => el('div', {},
  el('div', { class: 'countdown' }, '⏰ Your discount expires in ', countdown('quiz-deadline', 10)),
  el('div', { class: 'price' },
    c.featured && el('div', { class: 'feat' }, c.featured),
    el('div', { class: 'body' },
      rich(c.title),
      el('div', { class: 'box' }, c.before, el('b', {}, c.value), c.after),
    ),
  ),
);
