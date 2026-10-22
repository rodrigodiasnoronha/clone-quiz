import { el } from '../utils.js';

// Resultados das alunas: foto com selo "-X lbs"; "compact" mostra as três lado a lado
export function results({ content: c }) {
  return el('div', { class: `results ${c.compact ? 'compact' : ''}` }, ...c.items.map(r => el('div', { class: 'result' },
    el('div', { class: 'result-pic' },
      el('img', { src: r.image, alt: `${r.name}'s result`, loading: 'lazy', decoding: 'async' }),
      el('span', { class: 'result-kg' }, `-${r.lbs} lbs`)),
    c.compact
      ? el('small', {}, el('b', {}, r.name), ` · ${r.days} days`)
      : el('p', {}, el('b', {}, r.name), ` lost ${r.lbs} lbs in ${r.days} days — `, el('strong', {}, 'before even finishing the 21-day challenge.')),
  )));
}
