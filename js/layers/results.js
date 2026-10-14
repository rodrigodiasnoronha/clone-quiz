import { el } from '../utils.js';

// Resultados das alunas: foto com selo "-X kg"; "compact" mostra as três lado a lado
export function results({ content: c }) {
  return el('div', { class: `results ${c.compact ? 'compact' : ''}` }, ...c.items.map(r => el('div', { class: 'result' },
    el('div', { class: 'result-pic' },
      el('img', { src: r.image, alt: `Resultado da ${r.name}`, loading: 'lazy', decoding: 'async' }),
      el('span', { class: 'result-kg' }, `-${r.kg} kg`)),
    c.compact
      ? el('small', {}, el('b', {}, r.name), ` · ${r.days} dias`)
      : el('p', {}, el('b', {}, r.name), ` perdeu ${r.kg} kg em ${r.days} dias — `, el('strong', {}, 'antes mesmo de terminar o desafio de 21 dias.')),
  )));
}
