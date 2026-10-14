import { el } from '../utils.js';
import { state } from '../state.js';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function field({ content: c }, ctx) {
  const email = c.mask === 'email';
  const hint = c.error && el('div', { class: 'hint field-hint' });
  const input = el('input', {
    class: 'field',
    placeholder: c.placeholder,
    value: state.vars[c.name] ?? '',
    type: email ? 'email' : 'text',
    autocomplete: email ? 'email' : c.name === 'nome' ? 'given-name' : null,
    inputmode: c.mask === 'decimal' ? 'numeric' : email ? 'email' : null,
    oninput: () => {
      if (c.mask === 'decimal') input.value = input.value.replace(/\D/g, '');
      state.vars[c.name] = input.value.trim();
      input.classList.remove('err');
      if (hint) hint.textContent = '';
    },
  });
  const fail = msg => (input.classList.add('err'), hint && (hint.textContent = msg), input.focus(), false);
  ctx.validate(() => {
    const v = input.value.trim();
    if (c.required && !v) return fail(c.error);
    if (email && v && !EMAIL.test(v)) return fail(c.error);
    return true;
  });
  return hint ? el('div', {}, input, hint) : input;
}
