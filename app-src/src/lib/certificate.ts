'use client';

export interface CertificateData {
  kind: 'semana1' | 'final';
  name: string;
  date: string; // já formatada
  workouts: number;
  missions: number;
  medals: number;
  level: string;
  diamond?: boolean;
}

/** Desenha o certificado em um canvas e devolve um PNG (data URL) */
export async function renderCertificate(d: CertificateData): Promise<string> {
  const W = 1600, H = 1131;
  const c = document.createElement('canvas');
  c.width = W; c.height = H;
  const g = c.getContext('2d')!;
  try { await document.fonts?.ready; } catch {}

  // fundo
  const bg = g.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, '#FFF1F7'); bg.addColorStop(0.6, '#F7F3FF'); bg.addColorStop(1, '#EFE8FF');
  g.fillStyle = bg; g.fillRect(0, 0, W, H);

  // moldura
  const fr = g.createLinearGradient(0, 0, W, 0);
  fr.addColorStop(0, '#F873AE'); fr.addColorStop(0.55, '#A98BFA'); fr.addColorStop(1, '#7C4DDB');
  g.strokeStyle = fr; g.lineWidth = 18; round(g, 40, 40, W - 80, H - 80, 48); g.stroke();
  g.strokeStyle = 'rgba(124,77,219,.25)'; g.lineWidth = 3; round(g, 72, 72, W - 144, H - 144, 36); g.stroke();

  // bolhas decorativas
  for (const [x, y, r, a] of [[180, 190, 90, .18], [1440, 220, 120, .14], [1420, 960, 80, .16], [200, 940, 110, .12]] as const) {
    g.fillStyle = `rgba(169,139,250,${a})`; g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.fill();
  }

  g.textAlign = 'center';
  g.fillStyle = '#7C4DDB';
  g.font = '700 30px "Plus Jakarta Sans", sans-serif';
  g.fillText('PILATES NA PAREDE · DESAFIO 21 DIAS', W / 2, 190);

  g.fillStyle = '#2A1F3D';
  g.font = '700 84px Fredoka, "Plus Jakarta Sans", sans-serif';
  g.fillText(d.kind === 'final' ? 'Certificado de Conclusão' : 'Certificado da Primeira Semana', W / 2, 300);

  g.fillStyle = '#6B6180';
  g.font = '500 34px "Plus Jakarta Sans", sans-serif';
  g.fillText('Certificamos com muito orgulho que', W / 2, 390);

  const nameGrad = g.createLinearGradient(W / 2 - 400, 0, W / 2 + 400, 0);
  nameGrad.addColorStop(0, '#EC4C93'); nameGrad.addColorStop(1, '#7C4DDB');
  g.fillStyle = nameGrad;
  g.font = '700 110px Fredoka, "Plus Jakarta Sans", sans-serif';
  g.fillText(d.name, W / 2, 520, W - 300);

  g.fillStyle = '#2A1F3D';
  g.font = '500 36px "Plus Jakarta Sans", sans-serif';
  const line = d.kind === 'final'
    ? 'concluiu os 21 dias do Desafio Pilates na Parede, com dedicação e constância.'
    : 'concluiu a primeira semana do Desafio Pilates na Parede: o Despertar do Corpo.';
  g.fillText(line, W / 2, 610, W - 260);

  // estatísticas
  const stats = [[String(d.workouts), 'treinos'], [String(d.missions), 'missões'], [String(d.medals), 'medalhas'], [d.level, 'nível']];
  const bw = 290, gap = 30, x0 = W / 2 - (stats.length * bw + (stats.length - 1) * gap) / 2;
  stats.forEach(([v, l], i) => {
    const x = x0 + i * (bw + gap);
    g.fillStyle = 'rgba(255,255,255,.85)'; round(g, x, 680, bw, 150, 28); g.fill();
    g.fillStyle = '#7C4DDB'; g.font = `700 ${v.length > 8 ? 34 : 60}px Fredoka, sans-serif`; g.fillText(v, x + bw / 2, 765, bw - 30);
    g.fillStyle = '#6B6180'; g.font = '600 26px "Plus Jakarta Sans", sans-serif'; g.fillText(l, x + bw / 2, 805);
  });

  g.fillStyle = '#6B6180';
  g.font = '500 30px "Plus Jakarta Sans", sans-serif';
  g.fillText(`Emitido em ${d.date}`, W / 2, 920);
  g.fillStyle = '#A98BFA';
  g.font = '700 34px Fredoka, sans-serif';
  g.fillText('Com carinho, Luna 💜', W / 2, 985);

  if (d.diamond) {
    g.save();
    g.translate(W - 230, H - 230);
    const dg = g.createLinearGradient(-70, -70, 70, 70);
    dg.addColorStop(0, '#C6B1FF'); dg.addColorStop(1, '#7C4DDB');
    g.fillStyle = dg; g.beginPath(); g.arc(0, 0, 80, 0, Math.PI * 2); g.fill();
    g.fillStyle = '#fff'; g.font = '700 70px sans-serif'; g.textAlign = 'center'; g.fillText('💎', 0, 24);
    g.font = '700 18px "Plus Jakarta Sans", sans-serif'; g.fillText('MELHOR VERSÃO', 0, 60);
    g.restore();
  }

  return c.toDataURL('image/png');
}

function round(g: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  g.beginPath();
  g.moveTo(x + r, y);
  g.arcTo(x + w, y, x + w, y + h, r);
  g.arcTo(x + w, y + h, x, y + h, r);
  g.arcTo(x, y + h, x, y, r);
  g.arcTo(x, y, x + w, y, r);
  g.closePath();
}
