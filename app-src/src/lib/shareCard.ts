'use client';

export type ShareTemplate = 'rosa' | 'noite' | 'claro';

export interface ShareData {
  kicker: string; // ex.: "CONQUISTA DESBLOQUEADA"
  title: string; // ex.: "Dia 7 de 21"
  subtitle: string;
  emoji: string;
  stats: [string, string][]; // [valor, rótulo]
  name: string;
}

const THEMES: Record<ShareTemplate, { bg: [string, string, string]; text: string; soft: string; accent: string; panel: string }> = {
  rosa: { bg: ['#FF6FAE', '#F03E8A', '#B01A5F'], text: '#FFFFFF', soft: 'rgba(255,255,255,.85)', accent: '#FFE1EE', panel: 'rgba(255,255,255,.16)' },
  noite: { bg: ['#6E2457', '#3D1333', '#1C0818'], text: '#FFFFFF', soft: 'rgba(255,255,255,.8)', accent: '#FF93C1', panel: 'rgba(255,255,255,.1)' },
  claro: { bg: ['#FFF0F6', '#FFE1EE', '#FFC2DD'], text: '#2B1626', soft: '#6E5A68', accent: '#D82775', panel: 'rgba(255,255,255,.7)' },
};

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function wrap(g: CanvasRenderingContext2D, text: string, maxWidth: number) {
  const words = text.split(' ');
  const lines: string[] = [];
  let line = '';
  for (const w of words) {
    const t = line ? `${line} ${w}` : w;
    if (g.measureText(t).width > maxWidth && line) { lines.push(line); line = w; } else line = t;
  }
  if (line) lines.push(line);
  return lines;
}

/** Card vertical (1080×1920) para Stories */
export async function renderShareCard(d: ShareData, template: ShareTemplate): Promise<string> {
  const W = 1080, H = 1920, t = THEMES[template];
  const c = document.createElement('canvas');
  c.width = W; c.height = H;
  const g = c.getContext('2d')!;
  try { await document.fonts?.ready; } catch {}

  const bg = g.createLinearGradient(0, 0, W * 0.4, H);
  bg.addColorStop(0, t.bg[0]); bg.addColorStop(0.55, t.bg[1]); bg.addColorStop(1, t.bg[2]);
  g.fillStyle = bg; g.fillRect(0, 0, W, H);
  for (const [x, y, r] of [[900, 260, 260], [120, 1500, 300], [980, 1700, 180]] as const) {
    g.fillStyle = template === 'claro' ? 'rgba(240,62,138,.08)' : 'rgba(255,255,255,.07)';
    g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.fill();
  }

  // Lili, encostada no canto inferior direito, com a base esmaecida
  try {
    const img = await loadImage('/app/lili/lili-garrafa.webp');
    const h = 1180, w = (img.width / img.height) * h;
    const x = W - w + 40, y = H - h - 120;
    g.save();
    g.beginPath(); g.roundRect?.(x, y, w, h, 60); g.clip();
    g.drawImage(img, x, y, w, h);
    const fade = g.createLinearGradient(0, y + h * 0.7, 0, y + h);
    fade.addColorStop(0, 'rgba(0,0,0,0)'); fade.addColorStop(1, t.bg[2]);
    g.fillStyle = fade; g.fillRect(x, y, w, h);
    g.restore();
  } catch {}

  g.textAlign = 'left';
  g.fillStyle = t.accent;
  g.font = '800 40px "Plus Jakarta Sans", sans-serif';
  g.fillText('PILATES NA PAREDE · DESAFIO 21 DIAS', 80, 150);

  g.fillStyle = t.text;
  g.font = '700 150px Fredoka, sans-serif';
  g.fillText(d.emoji, 80, 360);

  g.fillStyle = t.accent;
  g.font = '800 44px "Plus Jakarta Sans", sans-serif';
  g.fillText(d.kicker, 80, 450);

  g.fillStyle = t.text;
  g.font = '700 120px Fredoka, sans-serif';
  const lines = wrap(g, d.title, 560).slice(0, 3);
  lines.forEach((l, i) => g.fillText(l, 80, 580 + i * 125));
  let y = 580 + lines.length * 125;

  g.fillStyle = t.soft;
  g.font = '600 42px "Plus Jakarta Sans", sans-serif';
  wrap(g, d.subtitle, 470).slice(0, 3).forEach((l, i) => g.fillText(l, 80, y + 10 + i * 56));
  y += 230;

  d.stats.slice(0, 3).forEach(([v, label], i) => {
    const by = y + i * 150;
    g.fillStyle = t.panel;
    g.beginPath(); g.roundRect?.(80, by, 400, 124, 36); g.fill();
    g.fillStyle = t.text; g.font = '700 64px Fredoka, sans-serif'; g.fillText(v, 120, by + 82);
    const vw = g.measureText(v).width;
    g.fillStyle = t.soft; g.font = '700 30px "Plus Jakarta Sans", sans-serif'; g.fillText(label, 120 + vw + 22, by + 76, 330 - vw - 22);
  });

  g.fillStyle = t.text;
  g.font = '700 46px Fredoka, sans-serif';
  g.fillText(`— ${d.name} 💖`, 80, H - 140);
  return c.toDataURL('image/png');
}
