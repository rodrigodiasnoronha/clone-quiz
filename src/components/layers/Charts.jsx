import { useMemo } from 'react';
import { useQuiz } from '../../context.js';
import { fill } from '../../lib/text.js';

const W = 500, H = 300, L = 20, R = 480, T = 40, B = 250;

function pill(x, y, text, bg, color, stroke = 'none') {
  const w = text.length * 9 + 20;
  return `<rect x="${x - w / 2}" y="${y - 30}" width="${w}" height="26" rx="${bg === '#fff' ? 6 : 13}" style="fill: ${bg}" stroke="${stroke}"/>
    <text x="${x}" y="${y - 12}" text-anchor="middle" font-size="14" font-weight="700" fill="${color}">${text}</text>`;
}

// Gráfico de área com gradiente vermelho -> amarelo -> verde (perda de peso), como string SVG
function areaChart(id, values, { labels = [], tips = [], title = '' }) {
  const max = Math.max(...values) || 1;
  const pts = values.map((v, i) => [L + (i / (values.length - 1)) * (R - L), T + (1 - v / max) * (B - T)]);
  const line = pts.map(p => p.join(',')).join(' ');
  const grid = [0, 1, 2, 3].map(i => T + (i * (B - T)) / 4);

  return `<svg viewBox="0 0 ${W} ${H}">
    <defs><linearGradient id="${id}">
      <stop offset="0" stop-color="#dc2626"/><stop offset=".5" stop-color="#fbbf24"/><stop offset="1" stop-color="#22c55e"/>
    </linearGradient></defs>
    ${grid.map(y => `<line x1="${L}" x2="${R}" y1="${y}" y2="${y}" stroke="#d4d4d8" stroke-dasharray="3 3"/>`).join('')}
    ${pts.map(([x]) => `<line x1="${x}" x2="${x}" y1="${T}" y2="${B}" stroke="#d4d4d8" stroke-dasharray="3 3"/>`).join('')}
    <polygon points="${L},${B} ${line} ${R},${B}" fill="url(#${id})" opacity=".6"/>
    <polyline points="${line}" fill="none" stroke="url(#${id})" stroke-width="3"/>
    ${pts.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5" fill="#fff" stroke="#a1a1aa" stroke-width="2"/>`).join('')}
    ${labels.map((t, i) => `<text x="${pts[i][0]}" y="${B + 25}" text-anchor="${i === 0 ? 'start' : i === labels.length - 1 ? 'end' : 'middle'}" font-size="12" fill="#71717a">${t}</text>`).join('')}
    ${title ? `<text x="${L}" y="${T - 12}" font-size="14" font-weight="700" fill="#020617">${title}</text>` : ''}
    ${tips.map(({ i, text, bg, color, stroke }) => pill(pts[i][0], pts[i][1], text, bg, color, stroke)).join('')}
  </svg>`;
}

const Svg = ({ html }) => <div className="chart" dangerouslySetInnerHTML={{ __html: html }} />;
const useGradientId = () => useMemo(() => `g${Math.random().toString(36).slice(2, 7)}`, []);

// "charts": Hoje -> meta, com {{peso}} e {{objetivo}}
export function Charts({ content }) {
  const { answers } = useQuiz();
  const id = useGradientId();
  const datas = content.datasets[0].datas;
  const last = datas.length - 1;
  return <Svg html={areaChart(id, datas.map((d, i) => Number(d.value) || (i ? 0 : 100)), {
    labels: content.xAxis,
    tips: [
      { i: 0, text: fill(datas[0].tooltip, answers), bg: '#dc2626', color: '#fff' },
      { i: last, text: fill(datas[last].tooltip, answers), bg: '#fff', color: '#020617', stroke: '#d4d4d8' },
    ],
  })} />;
}

// "chart": evolução semanal
export function Chart({ content }) {
  const { answers } = useQuiz();
  const id = useGradientId();
  const datas = content.datas;
  return <Svg html={areaChart(id, datas.map(d => Number(d.value)), {
    title: content.title,
    labels: datas.map(d => d.legend),
    tips: datas.map((d, i) => d.featured && d.tooltip && { i, text: fill(d.tooltip, answers), bg: 'var(--theme)', color: '#fff' }).filter(Boolean),
  })} />;
}
