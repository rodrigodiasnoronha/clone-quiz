import { el, rich, bracket, fill, media } from '../utils.js';
import { REDIRECT_URL, LEAD_WEBHOOK } from '../config.js';
import { track, trackAndGo, sendLead } from '../track.js';
import { state } from '../state.js';

export const text = ({ content }) => rich(content.text);

export const image = ({ content }) => media(content.image.src, { style: 'margin: 0 auto' });

export const clear = ({ content }) => el('div', { style: `height: ${bracket(content.clear) || '1rem'}` });

export const alert = ({ content, design }) => rich(content.text, `alert ${design.style || 'info'}`);

// Leva nome e e-mail do quiz para o checkout já vir preenchido
function checkoutUrl(url) {
  const u = new URL(url, location.href);
  const { nome, email } = state.vars;
  if (email && !u.searchParams.has('email')) u.searchParams.set('email', email);
  if (nome && !u.searchParams.has('name')) u.searchParams.set('name', nome);
  return u.href;
}

export function button({ content, design }, ctx) {
  const cls = ['btn', design.style === 'success' && 'success', design.pulse && 'pulse', design.fixed && 'fixed'];
  const btn = el('button', {
    class: cls.filter(Boolean).join(' '),
    html: fill(content.label),
    onclick: () => {
      if (content.type === 'redirect') return trackAndGo(checkoutUrl(content.destination || REDIRECT_URL), 'InitiateCheckout', { value: 27.9, currency: 'BRL', content_name: 'Pilates na Parede 21 Dias' });
      if (ctx.next(content.destination) && content.lead) {
        track('Lead', { content_name: 'Pilates na Parede 21 Dias' });
        sendLead(LEAD_WEBHOOK, { ...state.vars, data: new Date().toISOString() });
      }
    },
  });
  if (content.type !== 'redirect') return btn;
  // Botão de compra: reforça confiança logo abaixo
  return el('div', {}, btn, el('div', { class: 'trust' }, '🔒 Compra 100% segura · 🛡️ Garantia de 90 dias · ⚡ Acesso imediato'));
}
