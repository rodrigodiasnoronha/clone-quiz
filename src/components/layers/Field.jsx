import { useRef, useState } from 'react';
import { useQuiz, useValidate } from '../../context.js';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function Field({ content: c }) {
  const { answers, setAnswer } = useQuiz();
  const [bad, setBad] = useState(false);
  const input = useRef();
  const email = c.mask === 'email';

  useValidate(() => {
    const v = input.current.value.trim();
    const ok = !(c.required && !v) && !(email && v && !EMAIL.test(v));
    setBad(!ok);
    if (!ok) input.current.focus();
    return ok;
  });

  const change = e => {
    if (c.mask === 'decimal') e.target.value = e.target.value.replace(/\D/g, '');
    setAnswer(c.name, e.target.value.trim());
    setBad(false);
  };

  return (
    <div>
      <input
        ref={input}
        className={`field ${bad ? 'err' : ''}`}
        placeholder={c.placeholder}
        defaultValue={answers[c.name] ?? ''}
        type={email ? 'email' : 'text'}
        autoComplete={email ? 'email' : c.name === 'nome' ? 'given-name' : undefined}
        inputMode={c.mask === 'decimal' ? 'numeric' : email ? 'email' : undefined}
        onChange={change}
      />
      {c.error && <div className="hint field-hint">{bad && c.error}</div>}
    </div>
  );
}
