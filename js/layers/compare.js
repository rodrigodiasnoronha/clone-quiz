import { el } from '../utils.js';

// Antes/depois com divisor arrastável
export function compare({ content }) {
  const box = el('div', { class: 'compare' },
    el('img', { src: content.first_image.src, alt: 'Before' }),
    el('img', { src: content.secondary_image.src, alt: 'After', class: 'after' }),
    el('div', { class: 'handle' }),
    el('input', { type: 'range', min: 0, max: 100, value: 50, 'aria-label': 'Compare before and after', oninput: e => box.style.setProperty('--x', `${e.target.value}%`) }),
  );
  return box;
}
