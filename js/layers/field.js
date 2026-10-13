import { el } from '../utils.js';
import { state } from '../state.js';

export function field({ content: c }, ctx) {
  const input = el('input', {
    class: 'field',
    placeholder: c.placeholder,
    value: state.vars[c.name] ?? '',
    inputmode: c.mask === 'decimal' ? 'numeric' : null,
    oninput: () => {
      if (c.mask === 'decimal') input.value = input.value.replace(/\D/g, '');
      state.vars[c.name] = input.value.trim();
      input.classList.remove('err');
    },
  });
  if (c.required) ctx.validate(() => !!input.value.trim() || (input.classList.add('err'), input.focus(), false));
  return input;
}
