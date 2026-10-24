import { useEffect, useRef, useState } from 'react';
import { OFFER } from '../config.js';
import { trackAndGo } from '../lib/track.js';
import Rich from './Rich.jsx';
import Media from './Media.jsx';
import Countdown from './Countdown.jsx';

// Textos da oferta: edite aqui
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

const Cta = () => <button className="btn pulse offer-cta" onClick={goOffer}>I WANT MY CHALLENGE WITH {OFFER.discount} OFF →</button>;

function Gift({ onOpen }) {
  return (
    <div className="gift">
      <Rich html={'<h1 class="ql-align-center">Wait!</h1><h1 class="ql-align-center"><mark>Before you go... claim your gift 🎁</mark></h1>'} />
      <div className="gift-box" onClick={onOpen}>
        <div className="gift-icon">🎁</div>
        <button className="btn pulse">👇 TAP TO OPEN</button>
      </div>
      <p className="gift-hint">↑ Tap the gift above to open it</p>
    </div>
  );
}

function Offer() {
  return (
    <div className="offer">
      <div className="offer-top"><b>{OFFER.discount} OFF</b><span>⏰ <Countdown id="offer-deadline" minutes={OFFER.minutes} /></span></div>
      <div className="offer-body">
        <div className="offer-emoji">🎉</div>
        <Rich html={'<h1 class="ql-align-center">Congratulations!</h1><h2 class="ql-align-center" style="color: var(--theme)">You just won:</h2>'} />
        <div className="gift-card">
          <div className="tag">🎁 YOUR GIFT</div>
          <div className="big">{OFFER.discount} off</div>
          <small>full access to <b>Wall Pilates 21 Days</b></small>
          <small className="ok">✅ Discount already applied at checkout. Just tap the button below!</small>
        </div>
        <Rich html={`<h2 class="ql-align-center">Everything you get in Wall Pilates 21 Days with ${OFFER.discount} off:</h2>`} />
        <Media src="assets/app-mockup.mp4" className="mock" />
        <div className="incl-title">✅ What's included:</div>
        <div className="incl main">
          <b>Complete Challenge Platform</b>
          <p>Lifetime access to Wall Pilates 21 Days — the Wall Pilates plan that firms your body and speeds up weight loss with just a few minutes a day. All at home, no equipment.</p>
        </div>
        {INCLUDED.map(([title, text]) => (
          <div className="incl" key={title}><b>✅ {title}<em>FREE</em></b><p>{text}</p></div>
        ))}
        <div className="price offer-price">
          <div className="feat">{OFFER.discount} DISCOUNT APPLIED</div>
          <div className="body">
            <div className="box" style={{ width: '100%', background: 'none' }}>
              From <s>{OFFER.oldPrice}</s><b>{OFFER.price}</b>one-time payment
            </div>
          </div>
        </div>
        <Cta />
        <div className="guarantee">
          <b>🛡️ Unconditional 90-Day Guarantee</b>
          <p>If you don't feel your body firmer than ever — or think it wasn't worth every penny — just message us and we'll refund 100%, no questions asked.</p>
        </div>
        <h3 className="faq-title">❓ Frequently asked questions:</h3>
        {FAQ.map(([q, a]) => <details className="faq" key={q}><summary>{q}</summary><p>{a}</p></details>)}
        <Cta />
        <small className="legal">Wall Pilates 21 Days · Wall Pilates</small>
      </div>
    </div>
  );
}

// Tela cheia: presente -> oferta
export default function ExitOffer() {
  const [opened, setOpened] = useState(false);
  const layer = useRef();

  useEffect(() => {
    document.body.classList.add('no-scroll');
    return () => document.body.classList.remove('no-scroll');
  }, []);
  useEffect(() => { layer.current.scrollTo(0, 0); }, [opened]);

  return <div className="exit-layer" ref={layer}>{opened ? <Offer /> : <Gift onOpen={() => setOpened(true)} />}</div>;
}
