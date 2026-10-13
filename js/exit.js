import { el, rich } from './utils.js';
import { OFFER } from './config.js';

const INCLUDED = [
  ['BÓNUS 1: Protocolo Postura de Ferro', 'Sequência pra alinhar a coluna e acabar com a dor nas costas de quem passa o dia sentada.'],
  ['BÓNUS 2: Protocolo Anti-Flacidez', 'Treinos focados em firmar braços, barriga e pernas junto com o desafio.'],
  ['BÓNUS 3: Dieta 100% Personalizada', 'Plano alimentar montado pro seu objetivo, com refeições simples do dia a dia — pra emagrecer sem passar fome.'],
  ['BÓNUS 4: 51 Receitas Proteicas', 'Receitas rápidas e gostosas — incluindo a panqueca de 3 ingredientes que vale muito a pena.'],
  ['BÓNUS 5: Protocolo Treino Express', 'Treinos de 10 minutos pra quem tem dias corridos sem perder o ritmo.'],
  ['BÓNUS SECRETO: Presente Surpresa', 'Revelado no seu primeiro login. Não é treino, não é receita — é algo completamente diferente.'],
];

const FAQ = [
  ['Funciona pra mim se eu nunca treinei?', 'Sim. Os exercícios são suaves, seguros e progressivos, pensados para qualquer nível físico.'],
  ['Preciso de academia?', 'Não. Você só precisa de uma parede e de um pequeno espaço em casa.'],
  ['Quanto tempo de treino por dia?', 'Poucos minutos por dia já são suficientes para sentir a diferença.'],
  ['Como é a garantia?', 'Garantia incondicional de 90 dias: se não gostar, devolvemos 100% do valor.'],
];

const goOffer = () => (location.href = OFFER.url);
const cta = () => el('button', { class: 'btn pulse offer-cta', onclick: goOffer }, `QUERO MEU DESAFIO COM ${OFFER.discount} OFF →`);

function timer() {
  const label = el('span', {});
  let left = OFFER.minutes * 60;
  const tick = () => {
    const m = String(Math.floor(left / 60)).padStart(2, '0');
    label.textContent = `${m}:${String(left % 60).padStart(2, '0')}`;
    if (left > 0) left--;
  };
  tick();
  setInterval(tick, 1000);
  return el('div', { class: 'offer-top' }, el('b', {}, `${OFFER.discount} DE DESCONTO`), el('span', {}, '⏰ ', label));
}

function offerPage() {
  return el('div', { class: 'offer' },
    timer(),
    el('div', { class: 'offer-body' },
      el('div', { class: 'offer-emoji' }, '🎉'),
      rich('<h1 class="ql-align-center">Parabéns!</h1><h2 class="ql-align-center" style="color: var(--theme)">Você acabou de ganhar:</h2>'),
      el('div', { class: 'gift-card' },
        el('div', { class: 'tag' }, '🎁 SEU PRESENTE'),
        el('div', { class: 'big' }, `${OFFER.discount} de desconto`),
        el('small', {}, 'no acesso completo ao ', el('b', {}, 'Desafio 21 Dias')),
        el('div', { class: 'coupon' }, el('span', {}, 'CUPOM'), el('b', {}, OFFER.coupon), el('span', {}, '✔ aplicado')),
        el('small', { class: 'ok' }, '✅ Cupom já aplicado no botão abaixo'),
      ),
      rich(`<h2 class="ql-align-center">Tudo que você vai levar no Desafio 21 Dias com ${OFFER.discount} de desconto:</h2>`),
      el('img', { src: 'assets/yalhd-xrstl-67ee0e15-56f9-413f-8baa-685c61bf79ba.gif', alt: '', class: 'mock' }),
      el('div', { class: 'incl-title' }, '✅ O que está incluso:'),
      el('div', { class: 'incl main' }, el('b', {}, 'Plataforma Completa do Desafio'),
        el('p', {}, 'Acesso vitalício ao Desafio 21 Dias — o plano de Pilates na Parede que firma o corpo e acelera a perda de peso treinando poucos minutos por dia. Tudo em casa, sem equipamentos.')),
      ...INCLUDED.map(([t, d]) => el('div', { class: 'incl' }, el('b', {}, '✅ ' + t, el('em', {}, 'GRÁTIS')), el('p', {}, d))),
      el('div', { class: 'price offer-price' },
        el('div', { class: 'feat' }, `${OFFER.discount} DE DESCONTO APLICADO`),
        el('div', { class: 'body' }, el('div', { class: 'box', style: 'width:100%;background:none' },
          'De ', el('s', {}, OFFER.oldPrice), el('b', {}, OFFER.price), 'pagamento único')),
      ),
      cta(),
      el('div', { class: 'guarantee' }, el('b', {}, '🛡️ Garantia Incondicional de 90 dias'),
        el('p', {}, 'Se não sentir o corpo mais firme como nunca sentiu — ou achar que não valeu cada centavo — manda mensagem que devolvemos 100%, sem perguntar nada.')),
      el('h3', { class: 'faq-title' }, '❓ Perguntas frequentes:'),
      ...FAQ.map(([q, a]) => el('details', { class: 'faq' }, el('summary', {}, q), el('p', {}, a))),
      cta(),
      el('small', { class: 'legal' }, 'Desafio 21 Dias · Pilates na Parede'),
    ),
  );
}

function giftPage(onOpen) {
  const open = () => onOpen();
  return el('div', { class: 'gift' },
    rich('<h1 class="ql-align-center">Espera!</h1><h1 class="ql-align-center"><mark>Antes de sair... resgate o seu presente 🎁</mark></h1>'),
    el('div', { class: 'gift-box', onclick: open },
      el('div', { class: 'gift-icon' }, '🎁'),
      el('button', { class: 'btn pulse' }, '👇 TOCA PRA ABRIR')),
    el('p', { class: 'gift-hint' }, '↑ Clique no presente acima pra abrir'),
  );
}

// Back redirect: ao apertar "voltar" no navegador mostra o presente e depois a oferta.
export function setupExitIntent() {
  history.pushState({ exit: true }, '');
  let shown = false;
  addEventListener('popstate', () => {
    if (shown) return;
    shown = true;
    const layer = el('div', { class: 'exit-layer' });
    const show = node => { layer.replaceChildren(node); layer.scrollTo(0, 0); };
    show(giftPage(() => show(offerPage())));
    document.body.append(layer);
    document.body.classList.add('no-scroll');
    history.pushState({ exit: true }, ''); // próximo "voltar" sai de verdade
  });
}
