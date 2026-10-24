// Substitui {{variavel}} pelas respostas salvas; &nbsp; do Quill impediria a quebra de linha
export const fill = (html, vars) => (html || '').replace(/&nbsp;/g, ' ').replace(/\{\{(\w+)\}\}/g, (_, k) => vars[k] ?? '');

export const plain = html => {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent.trim();
};

// Extrai o valor de classes Tailwind arbitrárias, ex. "h-[2rem]" -> "2rem"
export const bracket = cls => cls?.match(/\[(.+)\]/)?.[1];

// Todas as imagens referenciadas por uma etapa
export const stepImages = step => [...JSON.stringify(step).matchAll(/assets\/[^"]+\.(?:webp|png|jpe?g)/g)].map(m => m[0]);

// Baixa antes as imagens das próximas telas para elas abrirem na hora
const preloaded = new Set();
export function preload(srcs) {
  for (const src of srcs) {
    if (preloaded.has(src)) continue;
    preloaded.add(src);
    const img = new Image();
    img.decoding = 'async';
    img.src = src;
  }
}
