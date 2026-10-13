import { el } from '../utils.js';

// Antes/depois com divisor arrastável
export function compare({ content }) {
  const box = el('div', { class: 'compare' },
    el('img', { src: content.first_image.src, alt: 'Antes' }),
    el('img', { src: content.secondary_image.src, alt: 'Depois', class: 'after' }),
    el('div', { class: 'handle' }),
    el('input', { type: 'range', min: 0, max: 100, value: 50, 'aria-label': 'Comparar antes e depois', oninput: e => box.style.setProperty('--x', `${e.target.value}%`) }),
  );
  return box;
}
