// Barra de progresso + botão voltar + gatilho de compromisso (quanto falta pro plano)
export default function Header({ current, total, onBack }) {
  const left = total - 1 - current;
  const msg = !left ? '✅ Your plan is ready!'
    : left === 1 ? '🔥 Just 1 step left until your plan'
    : left <= 10 ? `🔥 Just ${left} steps left until your plan`
    : '⏱️ Your plan is built from your answers';

  return (
    <header>
      <button id="back" aria-label="Back" hidden={current === 0} onClick={onBack}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
      </button>
      <div className="head-mid">
        <div className="bar"><div id="progress" style={{ width: `${((current + 1) / total) * 100}%` }} /></div>
        <div id="steps-left">{msg}</div>
      </div>
    </header>
  );
}
