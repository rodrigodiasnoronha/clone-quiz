import { useQuiz } from '../../context.js';
import { REDIRECT_URL, LEAD_WEBHOOK } from '../../config.js';
import { track, trackAndGo, sendLead } from '../../lib/track.js';
import { fill } from '../../lib/text.js';

export default function Button({ content, design }) {
  const { answers, next } = useQuiz();
  const isBuy = content.type === 'redirect';

  const click = () => {
    if (isBuy) return trackAndGo(content.destination || REDIRECT_URL, 'InitiateCheckout', { value: 27, currency: 'USD', content_name: 'Wall Pilates 21 Days' });
    if (next(content.destination) && content.lead) {
      track('Lead', { content_name: 'Wall Pilates 21 Days' });
      sendLead(LEAD_WEBHOOK, { ...answers, data: new Date().toISOString() });
    }
  };

  const btn = (
    <button
      className={['btn', design.style === 'success' && 'success', design.pulse && 'pulse'].filter(Boolean).join(' ')}
      onClick={click}
      dangerouslySetInnerHTML={{ __html: fill(content.label, answers) }}
    />
  );
  if (!isBuy) return btn;
  // Botão de compra: reforça confiança logo abaixo
  return <div>{btn}<div className="trust">🔒 100% secure checkout · 🛡️ 90-day guarantee · ⚡ Instant access</div></div>;
}
