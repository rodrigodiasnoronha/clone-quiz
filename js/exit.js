import { el, rich, countdown, media } from './utils.js';
import { track, trackAndGo } from './track.js';
import { OFFER, BACK_REDIRECT_URL } from './config.js';

const INCLUDED = [
  ['BONUS 1: Iron Posture Protocol', 'A sequence to align your spine and end the back pain that comes from sitting all day.'],
  ['BONUS 2: Anti-Sagging Protocol', 'Workouts focused on firming your arms, belly and legs alongside the challenge.'],
  ['BONUS 3: Smart Plate Guide', 'Build meals with what you already eat — no forbidden foods, no food scale and no calorie counting.'],
  ['BONUS 4: 51 Protein Recipes', 'Quick, tasty recipes — including the 3-ingredient pancake that is totally worth it.'],
  ['BONUS 5: Express Workout Protocol', '10-minute workouts for busy days so you never lose momentum.'],
  ['SECRET BONUS: Surprise Gift', "Revealed on your first login. It's not a workout, not a recipe — it's something completely different."],
];

const FAQ = [
  ["Will it work for me if I've never worked out?", 'Yes. The exercises are gentle, safe and progressive, designed for any fitness level.'],
  ['Do I need a gym?', 'No. All you need is a wall and a little space at home.'],
  ['How long are the daily workouts?', 'Just a few minutes a day is enough to feel the difference.'],
  ['How does the guarantee work?', "Unconditional 90-day guarantee: if you don't love it, we refund 100% of your money."],
];

const goOffer = () => trackAndGo(OFFER.url, 'InitiateCheckout', { value: 17, currency: 'USD', content_name: 'Back redirect 37%' });
const cta = () => el('button', { class: 'btn pulse offer-cta', onclick: goOffer }, `I WANT MY CHALLENGE WITH ${OFFER.discount} OFF →`);

function timer() {
  return el('div', { class: 'offer-top' }, el('b', {}, `${OFFER.discount} OFF`), el('span', {}, '⏰ ', countdown('offer-deadline', OFFER.minutes)));
}

function offerPage() {
  return el('div', { class: 'offer' },
    timer(),
    el('div', { class: 'offer-body' },
      el('div', { class: 'offer-emoji' }, '🎉'),
      rich('<h1 class="ql-align-center">Congratulations!</h1><h2 class="ql-align-center" style="color: var(--theme)">You just won:</h2>'),
      el('div', { class: 'gift-card' },
        el('div', { class: 'tag' }, '🎁 YOUR GIFT'),
        el('div', { class: 'big' }, `${OFFER.discount} off`),
        el('small', {}, 'full access to ', el('b', {}, 'Wall Pilates 21 Days')),
        el('small', { class: 'ok' }, '✅ Discount already applied at checkout. Just tap the button below!'),
      ),
      rich(`<h2 class="ql-align-center">Everything you get in Wall Pilates 21 Days with ${OFFER.discount} off:</h2>`),
      media('assets/app-mockup.mp4', { class: 'mock' }),
      el('div', { class: 'incl-title' }, "✅ What's included:"),
      el('div', { class: 'incl main' }, el('b', {}, 'Complete Challenge Platform'),
        el('p', {}, 'Lifetime access to Wall Pilates 21 Days — the Wall Pilates plan that firms your body and speeds up weight loss with just a few minutes a day. All at home, no equipment.')),
      ...INCLUDED.map(([t, d]) => el('div', { class: 'incl' }, el('b', {}, '✅ ' + t, el('em', {}, 'FREE')), el('p', {}, d))),
      el('div', { class: 'price offer-price' },
        el('div', { class: 'feat' }, `${OFFER.discount} DISCOUNT APPLIED`),
        el('div', { class: 'body' }, el('div', { class: 'box', style: 'width:100%;background:none' },
          'From ', el('s', {}, OFFER.oldPrice), el('b', {}, OFFER.price), 'one-time payment')),
      ),
      cta(),
      el('div', { class: 'guarantee' }, el('b', {}, '🛡️ Unconditional 90-Day Guarantee'),
        el('p', {}, "If you don't feel your body firmer than ever — or think it wasn't worth every penny — just message us and we'll refund 100%, no questions asked.")),
      el('h3', { class: 'faq-title' }, '❓ Frequently asked questions:'),
      ...FAQ.map(([q, a]) => el('details', { class: 'faq' }, el('summary', {}, q), el('p', {}, a))),
      cta(),
      el('small', { class: 'legal' }, 'Wall Pilates 21 Days · Wall Pilates'),
    ),
  );
}

function giftPage(onOpen) {
  const open = () => onOpen();
  return el('div', { class: 'gift' },
    rich('<h1 class="ql-align-center">Wait!</h1><h1 class="ql-align-center"><mark>Before you go... claim your gift 🎁</mark></h1>'),
    el('div', { class: 'gift-box', onclick: open },
      el('div', { class: 'gift-icon' }, '🎁'),
      el('button', { class: 'btn pulse' }, '👇 TAP TO OPEN')),
    el('p', { class: 'gift-hint' }, '↑ Tap the gift above to open it'),
  );
}

// Script de back redirect: a partir daqui, "voltar" leva para o link
function setBackRedirect(url) {
  const urlBackRedirect = url.trim();
  history.pushState({}, '', location.href);
  history.pushState({}, '', location.href);
  history.pushState({}, '', location.href);
  addEventListener('popstate', () => setTimeout(() => (location.href = urlBackRedirect), 1));
}

// Back redirect: ao apertar "voltar" no navegador mostra o presente e depois a oferta.
// Só nessa tela o script de back redirect é ativado.
export function setupExitIntent() {
  history.pushState({ exit: true }, '');
  let shown = false;
  addEventListener('popstate', () => {
    if (shown) return;
    shown = true;
    const layer = el('div', { class: 'exit-layer' });
    const show = node => { layer.replaceChildren(node); layer.scrollTo(0, 0); };
    show(giftPage(() => show(offerPage())));
    track('ViewContent', { content_name: 'Back redirect 37%' });
    document.body.append(layer);
    document.body.classList.add('no-scroll');
    setBackRedirect(BACK_REDIRECT_URL);
  });
}
