import { el, rich, bracket, fill } from '../utils.js';
import { REDIRECT_URL } from '../config.js';

export const text = ({ content }) => rich(content.text);

export const image = ({ content }) => el('img', { src: content.image.src, alt: '', loading: 'lazy', style: 'margin: 0 auto' });

export const clear = ({ content }) => el('div', { style: `height: ${bracket(content.clear) || '1rem'}` });

export const alert = ({ content, design }) => rich(content.text, `alert ${design.style || 'info'}`);

export function button({ content, design }, ctx) {
  const cls = ['btn', design.style === 'success' && 'success', design.pulse && 'pulse', design.fixed && 'fixed'];
  const btn = el('button', {
    class: cls.filter(Boolean).join(' '),
    html: fill(content.label),
    onclick: () => content.type === 'redirect' ? (location.href = REDIRECT_URL) : ctx.next(content.destination),
  });
  if (content.type !== 'redirect') return btn;
  // Botão de compra: reforça confiança logo abaixo
  return el('div', {}, btn, el('div', { class: 'trust' }, '🔒 Compra 100% segura · 🛡️ Garantia de 90 dias · ⚡ Acesso imediato'));
}
