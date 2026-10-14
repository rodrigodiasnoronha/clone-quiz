import { el, rich, countdown, media } from './utils.js';
import { track, trackAndGo } from './track.js';
import { OFFER } from './config.js';

const INCLUDED = [
  ['BÔNUS 1: Protocolo Postura de Ferro', 'Sequência pra alinhar a coluna e acabar com a dor nas costas de quem passa o dia sentada.'],
  ['BÔNUS 2: Protocolo Anti-Flacidez', 'Treinos focados em firmar braços, barriga e pernas junto com o desafio.'],
  ['BÔNUS 3: Guia do Prato Inteligente', 'Monte refeições com o que você já come — sem cardápio proibido, sem balança e sem contar calorias.'],
  ['BÔNUS 4: 51 Receitas Proteicas', 'Receitas rápidas e gostosas — incluindo a panqueca de 3 ingredientes que vale muito a pena.'],
  ['BÔNUS 5: Protocolo Treino Express', 'Treinos de 10 minutos pra quem tem dias corridos sem perder o ritmo.'],
  ['BÔNUS SECRETO: Presente Surpresa', 'Revelado no seu primeiro login. Não é treino, não é receita — é algo completamente diferente.'],
];

const FAQ = [
  ['Funciona pra mim se eu nunca treinei?', 'Sim. Os exercícios são suaves, seguros e progressivos, pensados para qualquer nível físico.'],
  ['Preciso de academia?', 'Não. Você só precisa de uma parede e de um pequeno espaço em casa.'],
  ['Quanto tempo de treino por dia?', 'Poucos minutos por dia já são suficientes para sentir a diferença.'],
  ['Como é a garantia?', 'Garantia incondicional de 90 dias: se não gostar, devolvemos 100% do valor.'],
];

const goOffer = () => trackAndGo(OFFER.url, 'InitiateCheckout', { value: 17.0, currency: 'BRL', content_name: 'Back redirect 39%' });
const cta = () => el('button', { class: 'btn pulse offer-cta', onclick: goOffer }, `QUERO MEU DESAFIO COM ${OFFER.discount} OFF →`);

function timer() {
  return el('div', { class: 'offer-top' }, el('b', {}, `${OFFER.discount} DE DESCONTO`), el('span', {}, '⏰ ', countdown('offer-deadline', OFFER.minutes)));
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
        el('small', {}, 'no acesso completo ao ', el('b', {}, 'Pilates na Parede 21 Dias')),
        el('small', { class: 'ok' }, '✅ Desconto já aplicado no checkout. É só clicar no botão abaixo!'),
      ),
      rich(`<h2 class="ql-align-center">Tudo que você vai levar no Pilates na Parede 21 Dias com ${OFFER.discount} de desconto:</h2>`),
      media('assets/app-mockup.mp4', { class: 'mock' }),
      el('div', { class: 'incl-title' }, '✅ O que está incluso:'),
      el('div', { class: 'incl main' }, el('b', {}, 'Plataforma Completa do Desafio'),
        el('p', {}, 'Acesso vitalício ao Pilates na Parede 21 Dias — o plano de Pilates na Parede que firma o corpo e acelera a perda de peso treinando poucos minutos por dia. Tudo em casa, sem equipamentos.')),
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
      el('small', { class: 'legal' }, 'Pilates na Parede 21 Dias · Pilates na Parede'),
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
    track('ViewContent', { content_name: 'Back redirect 39%' });
    document.body.append(layer);
    document.body.classList.add('no-scroll');
    history.pushState({ exit: true }, ''); // próximo "voltar" sai de verdade
  });
}
