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

// Contagem regressiva cujo prazo fica salvo no navegador (não reinicia ao recarregar)
export function countdown(key, minutes) {
  const node = el('b', {});
  let end;
  try { end = Number(localStorage.getItem(key)); } catch {}
  if (!end || end < Date.now()) {
    end = Date.now() + minutes * 60e3;
    try { localStorage.setItem(key, end); } catch {}
  }
  const tick = () => {
    const left = Math.max(0, Math.round((end - Date.now()) / 1000));
    node.textContent = `${String(Math.floor(left / 60)).padStart(2, '0')}:${String(left % 60).padStart(2, '0')}`;
    return left > 0 && node.isConnected;
  };
  tick();
  const id = setInterval(() => tick() || clearInterval(id), 1000);
  return node;
}

// Imagem ou vídeo curto em loop (o antigo GIF virou MP4, bem mais leve)
export function media(src, attrs = {}) {
  if (src.endsWith('.mp4')) return el('video', { src, autoplay: '', muted: '', loop: '', playsinline: '', preload: 'auto', ...attrs });
  return el('img', { src, alt: '', decoding: 'async', ...attrs });
}

// Baixa antes as imagens das próximas telas para elas abrirem na hora
const preloaded = new Set();
export function preload(srcs) {
  for (const src of srcs) {
    if (!src || preloaded.has(src) || src.endsWith('.mp4')) continue;
    preloaded.add(src);
    const img = new Image();
    img.decoding = 'async';
    img.src = src;
  }
}

// Extrai o valor de classes Tailwind arbitrárias, ex. "h-[2rem]" -> "2rem"
export const bracket = cls => cls?.match(/\[(.+)\]/)?.[1];
