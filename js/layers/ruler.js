import { el } from '../utils.js';
import { state } from '../state.js';

const TICK = 18; // px por unidade, igual ao .tick no CSS

// Cada unidade: [nome, min, max, fator a partir do valor métrico]
const UNITS = {
  height: [['cm', 120, 220, 1], ['pol', 47, 87, 1 / 2.54]],
  weight: [['kg', 30, 200, 1], ['lb', 66, 440, 2.2046]],
};

function ruler({ content }, kind) {
  const name = content.name;
  state.vars[name] ??= content.value;
  let unit = UNITS[kind][0];

  const value = el('div', { class: 'val' });
  const track = el('div', { class: 'track' });
  const toggle = el('div', { class: 'units' });

  const show = n => value.replaceChildren(String(n), el('small', {}, unit[0]));

  function build() {
    const [, min, max, f] = unit;
    track.replaceChildren();
    for (let n = min; n <= max; n++) {
      track.append(el('div', { class: `tick ${n % 10 === 0 ? 'big' : n % 5 === 0 ? 'mid' : ''}` }, n % 10 === 0 ? el('span', {}, String(n)) : null));
    }
    const shown = Math.round(state.vars[name] * f);
    show(shown);
    requestAnimationFrame(() => (track.scrollLeft = (shown - min) * TICK + TICK / 2));
    toggle.querySelectorAll('button').forEach(b => b.classList.toggle('on', b.textContent === unit[0]));
  }

  track.addEventListener('scroll', () => {
    const [, min, max, f] = unit;
    const shown = Math.min(max, Math.max(min, min + Math.round((track.scrollLeft - TICK / 2) / TICK)));
    state.vars[name] = Math.round(shown / f);
    show(shown);
  });

  // Arrastar com o mouse (no touch o scroll nativo já funciona)
  let drag = null;
  track.addEventListener('pointerdown', e => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    drag = { x: e.clientX, left: track.scrollLeft };
    track.classList.add('dragging');
    track.setPointerCapture(e.pointerId);
  });
  track.addEventListener('pointermove', e => {
    if (drag) track.scrollLeft = drag.left - (e.clientX - drag.x);
  });
  const endDrag = () => {
    if (!drag) return;
    drag = null;
    track.classList.remove('dragging');
  };
  track.addEventListener('pointerup', endDrag);
  track.addEventListener('pointercancel', endDrag);

  for (const u of UNITS[kind]) toggle.append(el('button', { onclick: () => { unit = u; build(); } }, u[0]));
  build();

  return el('div', {}, toggle, value,
    el('div', { class: 'ruler' }, track, el('div', { class: 'needle' })),
    el('div', { class: 'hint' }, 'Arraste para ajustar'));
}

export const height = layer => ruler(layer, 'height');
export const weight = layer => ruler(layer, 'weight');
