import { useState } from 'react';
import { useQuiz, useValidate } from '../../context.js';
import { plain, bracket } from '../../lib/text.js';
import Rich from '../Rich.jsx';

function Pic({ image, vertical, aspect }) {
  if (image?.type === 'emoji') return <span className="emoji">{image.src}</span>;
  if (!image?.src) return null;
  return <img src={image.src} alt="" className={vertical ? 'pic' : 'thumb'} style={vertical && aspect ? { aspectRatio: aspect } : undefined} />;
}

export default function Options({ content: c, design: d }) {
  const { setAnswer, go } = useQuiz();
  const [selected, setSelected] = useState([]);
  const cols = parseInt((c.cols || d.grid || '').replace(/\D/g, '')) || 1;
  const vertical = (c.orientation || d.orientation) === 'vertical';
  const reverse = (c.order || d.order) === 'reverse';

  useValidate(() => !(c.multiple && c.required) || selected.length > 0);

  const pick = o => {
    const now = !c.multiple ? [o] : selected.includes(o) ? selected.filter(s => s !== o) : [...selected, o];
    setSelected(now);
    setAnswer(c.name, now.map(s => plain(s.label)).join(', '));
    if (!c.multiple) setTimeout(() => go(o.destination), 250); // deixa ver a opção marcada
  };

  return (
    <div>
      {c.introduction && <Rich html={c.introduction} />}
      <div className={`opts ${vertical ? 'vertical' : ''} ${d.background === 'contrast' ? 'contrast' : ''}`} style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
        {c.options.map(o => (
          <button key={o.id} className={`opt ${c.multiple ? 'multi' : ''} ${reverse ? 'reverse' : ''} ${selected.includes(o) ? 'on' : ''}`} onClick={() => pick(o)}>
            {!vertical && d.icon === 'select' && <span className="mark" />}
            <Pic image={o.image} vertical={vertical} aspect={bracket(d.aspectImage)} />
            <div className="lbl" dangerouslySetInnerHTML={{ __html: o.label }} />
            {!vertical && d.icon === 'right' && <span className="chev">›</span>}
          </button>
        ))}
      </div>
    </div>
  );
}
