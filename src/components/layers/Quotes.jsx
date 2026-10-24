import { useEffect, useRef } from 'react';

export default function Quotes({ content }) {
  const list = useRef();

  // Carrossel automático
  useEffect(() => {
    const t = setInterval(() => {
      const el = list.current;
      const end = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
      el.scrollTo({ left: end ? 0 : el.scrollLeft + el.clientWidth * 0.85, behavior: 'smooth' });
    }, 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="quotes" ref={list}>
      {content.quotes.map(q => (
        <div className="quote" key={q.id}>
          <img src={q.image?.src} alt="" />
          <div>
            <div className="stars">{'★'.repeat(q.rate || 5)}</div>
            <b>{q.name}</b>
            <small>{q.activity}</small>
          </div>
          <p>{q.text}</p>
        </div>
      ))}
    </div>
  );
}
