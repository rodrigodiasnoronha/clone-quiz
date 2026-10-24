import { useState } from 'react';

// Antes/depois com divisor arrastável
export default function Compare({ content }) {
  const [x, setX] = useState(50);
  return (
    <div className="compare" style={{ '--x': `${x}%` }}>
      <img src={content.first_image.src} alt="Before" />
      <img src={content.secondary_image.src} alt="After" className="after" />
      <div className="handle" />
      <input type="range" min="0" max="100" value={x} aria-label="Compare before and after" onChange={e => setX(e.target.value)} />
    </div>
  );
}
