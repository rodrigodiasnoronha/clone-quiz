'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { Download, Share2 } from 'lucide-react';
import { Page, SectionTitle, TopBar, Toast } from '@/components/ui';
import { useStore } from '@/lib/store';
import { completedDays, earnedMedals, levelFor, pointsBreakdown, streak } from '@/lib/progress';
import { renderShareCard, type ShareData, type ShareTemplate } from '@/lib/shareCard';
import { download } from '@/lib/device';

const TEMPLATES: { id: ShareTemplate; name: string; cls: string }[] = [
  { id: 'rosa', name: 'Rosa', cls: 'bg-brand' },
  { id: 'noite', name: 'Noite', cls: 'bg-night' },
  { id: 'claro', name: 'Claro', cls: 'bg-gradient-to-br from-rose-50 to-rose-200' },
];

export default function Compartilhar() {
  const s = useStore();
  const done = completedDays(s);
  const pts = pointsBreakdown(s).total;
  const st = streak(s);
  const lvl = levelFor(pts);
  const name = s.profile?.name ?? 'Eu';
  const stats: [string, string][] = [[String(done.length), 'treinos feitos'], [String(pts), 'pontos'], [String(st), st === 1 ? 'dia seguido' : 'dias seguidos']];

  // Conquistas reais que podem ser compartilhadas
  const options = useMemo<(ShareData & { id: string })[]>(() => {
    const list: (ShareData & { id: string })[] = [];
    if (done.length === 21) list.push({ id: 'final', kicker: 'DESAFIO CONCLUÍDO', title: '21 dias. Eu consegui!', subtitle: 'Terminei o Desafio de Pilates na Parede.', emoji: '🏆', stats, name });
    const last = Math.max(0, ...done);
    if (last && last < 21) list.push({ id: 'dia', kicker: 'CONQUISTA DO DIA', title: `Dia ${last} de 21 concluído`, subtitle: 'Mais um treino feito, um dia de cada vez.', emoji: '💪', stats, name });
    if (st >= 2) list.push({ id: 'streak', kicker: 'CONSTÂNCIA', title: `${st} dias seguidos`, subtitle: 'Aparecendo para mim mesma todos os dias.', emoji: '🔥', stats, name });
    if (lvl.n >= 2) list.push({ id: 'nivel', kicker: 'NOVO NÍVEL', title: lvl.name, subtitle: `Cheguei ao nível ${lvl.n} de 6 no desafio.`, emoji: lvl.emoji, stats, name });
    earnedMedals(s).forEach(m => list.push({ id: m.id, kicker: 'MEDALHA CONQUISTADA', title: m.name, subtitle: m.desc + '.', emoji: m.emoji, stats, name }));
    return list;
  }, [s]); // eslint-disable-line react-hooks/exhaustive-deps

  const [choice, setChoice] = useState(0);
  const [template, setTemplate] = useState<ShareTemplate>('rosa');
  const [img, setImg] = useState<string>();
  const [toast, setToast] = useState('');
  const selected = options[Math.min(choice, options.length - 1)];

  useEffect(() => {
    if (!selected) return;
    let alive = true;
    setImg(undefined);
    renderShareCard(selected, template).then(url => alive && setImg(url)).catch(() => alive && setToast('Não foi possível gerar a imagem.'));
    return () => { alive = false; };
  }, [selected, template]);

  const file = 'minha-conquista-pilates.png';
  async function share() {
    if (!img) return;
    try {
      const blob = await (await fetch(img)).blob();
      const f = new File([blob], file, { type: 'image/png' });
      if (navigator.canShare?.({ files: [f] })) { await navigator.share({ files: [f], title: 'Minha conquista 💖' }); return; }
      download(file, img);
      setToast('Imagem baixada. Abra o Instagram e publique nos Stories.');
    } catch (e) {
      if ((e as DOMException)?.name !== 'AbortError') setToast('Não foi possível compartilhar. Tente baixar a imagem.');
    }
    setTimeout(() => setToast(''), 3500);
  }

  return (
    <Page>
      <TopBar back="/conquistas/" title="Compartilhar Conquista" />
      {!selected ? (
        <div className="card mt-6 p-6 text-center">
          <p className="text-4xl">🌱</p>
          <p className="mt-2 font-bold">Sua primeira conquista está a um treino de distância</p>
          <p className="mt-1 text-sm text-ink-soft">Conclua o treino do dia para ter algo lindo para compartilhar.</p>
          <Link href="/desafios/" className="btn-primary mt-4 w-full">Ir para o desafio</Link>
        </div>
      ) : (
        <>
          <p className="mb-2 text-sm font-semibold text-ink-soft">Olha o que você conquistou! 💖</p>
          <div className="mx-auto w-full max-w-[18rem] overflow-hidden rounded-3xl bg-rose-50 shadow-card ring-1 ring-rose-100" style={{ aspectRatio: '9 / 16' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {img ? <img src={img} alt={`Prévia: ${selected.title}`} className="h-full w-full" /> : <div className="grid h-full place-items-center text-sm font-bold text-rose-500">Gerando imagem…</div>}
          </div>

          <SectionTitle>Escolher conquista</SectionTitle>
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
            {options.map((o, i) => (
              <button key={o.id} onClick={() => setChoice(i)} aria-pressed={choice === i} className={`flex shrink-0 items-center gap-2 rounded-2xl px-3 py-2 text-left text-sm font-bold ${choice === i ? 'bg-brand text-white shadow-glow' : 'bg-white ring-1 ring-rose-100'}`}>
                <span className="text-xl">{o.emoji}</span><span className="max-w-[9rem] truncate">{o.title}</span>
              </button>
            ))}
          </div>

          <SectionTitle>Escolher modelo</SectionTitle>
          <div className="grid grid-cols-3 gap-2">
            {TEMPLATES.map(t => (
              <button key={t.id} onClick={() => setTemplate(t.id)} aria-pressed={template === t.id} className={`rounded-2xl p-1 ${template === t.id ? 'ring-[3px] ring-rose-500' : 'ring-1 ring-rose-100'}`}>
                <div className={`h-14 rounded-xl ${t.cls}`} />
                <p className="py-1 text-xs font-bold">{t.name}</p>
              </button>
            ))}
          </div>

          <button className="btn-primary shine mt-5 w-full" disabled={!img} onClick={share}><Share2 size={18} /> Compartilhar nos Stories</button>
          <button className="btn-ghost mt-2 w-full" disabled={!img} onClick={() => img && download(file, img)}><Download size={18} /> Baixar imagem</button>
        </>
      )}
      <Toast show={!!toast}>{toast}</Toast>
    </Page>
  );
}
