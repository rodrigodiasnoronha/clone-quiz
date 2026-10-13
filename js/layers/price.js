import { el, rich } from '../utils.js';

export const price = ({ content: c }) => el('div', { class: 'price' },
  c.featured && el('div', { class: 'feat' }, c.featured),
  el('div', { class: 'body' },
    rich(c.title),
    el('div', { class: 'box' }, c.before, el('b', {}, c.value), c.after),
  ),
);
