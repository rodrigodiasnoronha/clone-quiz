import { state } from './state.js';
import { layers } from './layers/index.js';
import { setupExitIntent } from './exit.js';

const app = document.getElementById('app');
const back = document.getElementById('back');
const progress = document.getElementById('progress');
const stepsLeft = document.getElementById('steps-left');

const { design, steps } = await (await fetch('data/quiz.json')).json();
const indexById = Object.fromEntries(steps.map((s, i) => [s.id, i]));
let current = 0;
let token = 0;

const root = document.documentElement.style;
root.setProperty('--theme', design.themeColor);
root.setProperty('--title', design.titleColor);
root.setProperty('--content', design.contentColor);
root.setProperty('--bg', design.backgroundColor);
root.setProperty('--el', '68px');

function go(dest = 'next') {
  const next = dest === 'next' ? current + 1 : indexById[dest];
  if (next == null || next >= steps.length) return;
  state.history.push(current);
  render(next);
}

back.onclick = () => state.history.length && render(state.history.pop());

// Largura do layer: "cols" é em 12 colunas, "basis" em %
function width(design = {}) {
  if (design.cols) return `${(design.cols / 12) * 100}%`;
  if (design.basis && design.basis < 100) return `${design.basis}%`;
}

function render(i) {
  current = i;
  const myToken = ++token;
  const validators = [];
  const ctx = {
    go,
    alive: () => myToken === token,
    validate: fn => validators.push(fn),
    next: dest => validators.every(fn => fn()) && go(dest),
  };

  app.replaceChildren();
  for (const layer of steps[i].layers) {
    const node = layers[layer.type]?.(layer, ctx);
    if (!node) continue;
    node.classList.add('layer');
    node.style.width = width(layer.design) || '';
    app.append(node);
  }

  // Gatilho de compromisso: mostra quanto falta pro plano
  const left = steps.length - 1 - i;
  stepsLeft.textContent = !left ? '✅ Seu plano está pronto!' : left <= 10 ? `🔥 Faltam só ${left} etapas para o seu plano` : '⏱️ Leva só 3 minutos · Plano 100% personalizado';
  back.hidden = i === 0;
  progress.style.width = `${((i + 1) / steps.length) * 100}%`;
  window.scrollTo(0, 0);
}

render(0);
setupExitIntent();
