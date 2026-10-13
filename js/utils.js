import { state } from './state.js';

export function el(tag, attrs = {}, ...children) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'html') node.innerHTML = v;
    else if (k.startsWith('on')) node.addEventListener(k.slice(2), v);
    else if (v != null && v !== false) node.setAttribute(k, v);
  }
  node.append(...children.filter(c => c != null));
  return node;
}

// Substitui {{variavel}} pelas respostas salvas; &nbsp; do Quill impediria a quebra de linha
export const fill = html => (html || '').replace(/&nbsp;/g, ' ').replace(/\{\{(\w+)\}\}/g, (_, k) => state.vars[k] ?? '');

export const rich = (html, cls = '') => el('div', { class: `rich ${cls}`, html: fill(html) });

export const plain = html => el('div', { html }).textContent.trim();

// Extrai o valor de classes Tailwind arbitrárias, ex. "h-[2rem]" -> "2rem"
export const bracket = cls => cls?.match(/\[(.+)\]/)?.[1];
