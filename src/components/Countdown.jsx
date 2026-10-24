import { useEffect, useState } from 'react';

// Contagem regressiva cujo prazo fica salvo no navegador (não reinicia ao recarregar)
function deadline(key, minutes) {
  let end;
  try { end = Number(localStorage.getItem(key)); } catch {}
  if (!end || end < Date.now()) {
    end = Date.now() + minutes * 60e3;
    try { localStorage.setItem(key, end); } catch {}
  }
  return end;
}

export default function Countdown({ id, minutes }) {
  const [end] = useState(() => deadline(id, minutes));
  const left = () => Math.max(0, Math.round((end - Date.now()) / 1000));
  const [secs, setSecs] = useState(left);

  useEffect(() => {
    const t = setInterval(() => setSecs(left()), 1000);
    return () => clearInterval(t);
  }, []);

  return <b>{String(Math.floor(secs / 60)).padStart(2, '0')}:{String(secs % 60).padStart(2, '0')}</b>;
}
