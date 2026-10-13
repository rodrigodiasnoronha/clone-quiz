import { el, rich, plain, bracket, fill } from '../utils.js';
import { state } from '../state.js';

function media(image, vertical, aspect) {
  if (image?.type === 'emoji') return el('span', { class: 'emoji' }, image.src);
  if (!image?.src) return null;
  return el('img', { src: image.src, alt: '', class: vertical ? 'pic' : 'thumb', style: vertical && aspect ? `aspect-ratio: ${aspect}` : null });
}

export function options({ content: c, design: d = {} }, ctx) {
  const cols = parseInt((c.cols || d.grid || '').replace(/\D/g, '')) || 1;
  const vertical = (c.orientation || d.orientation) === 'vertical';
  const reverse = (c.order || d.order) === 'reverse';
  const selected = new Set();

  const grid = el('div', { class: `opts ${vertical ? 'vertical' : ''} ${d.background === 'contrast' ? 'contrast' : ''}` });
  grid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

  for (const o of c.options) {
    const label = el('div', { class: 'lbl', html: fill(o.label) });
    const pic = media(o.image, vertical, bracket(d.aspectImage));
    const parts = vertical
      ? [pic, label]
      : [d.icon === 'select' && el('span', { class: 'mark' }), pic, label, d.icon === 'right' && el('span', { class: 'chev' }, '›')];

    const btn = el('button', {
      class: `opt ${c.multiple ? 'multi' : ''} ${reverse ? 'reverse' : ''}`,
      onclick: () => {
        if (c.multiple) {
          selected.has(o) ? selected.delete(o) : selected.add(o);
          btn.classList.toggle('on', selected.has(o));
        } else {
          btn.classList.add('on');
          selected.add(o);
        }
        state.vars[c.name] = [...selected].map(s => plain(s.label)).join(', ');
        if (!c.multiple) setTimeout(() => ctx.go(o.destination), 250);
      },
    }, ...parts.filter(Boolean));
    grid.append(btn);
  }

  if (c.multiple && c.required) ctx.validate(() => selected.size > 0);
  return el('div', {}, c.introduction && rich(c.introduction), grid);
}
