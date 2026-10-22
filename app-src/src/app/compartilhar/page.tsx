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
  { id: 'rosa', name: 'Pink', cls: 'bg-brand' },
  { id: 'noite', name: 'Night', cls: 'bg-night' },
  { id: 'claro', name: 'Light', cls: 'bg-gradient-to-br from-rose-50 to-rose-200' },
];

export default function Compartilhar() {
  const s = useStore();
  const done = completedDays(s);
  const pts = pointsBreakdown(s).total;
  const st = streak(s);
  const lvl = levelFor(pts);
  const name = s.profile?.name ?? 'Me';
  const stats: [string, string][] = [[String(done.length), 'workouts done'], [String(pts), 'points'], [String(st), 'day streak']];

  // Conquistas reais que podem ser compartilhadas
  const options = useMemo<(ShareData & { id: string })[]>(() => {
    const list: (ShareData & { id: string })[] = [];
    if (done.length === 21) list.push({ id: 'final', kicker: 'CHALLENGE COMPLETE', title: '21 days. I did it!', subtitle: 'I finished the Wall Pilates Challenge.', emoji: '🏆', stats, name });
    const last = Math.max(0, ...done);
    if (last && last < 21) list.push({ id: 'dia', kicker: 'TODAY’S WIN', title: `Day ${last} of 21 complete`, subtitle: 'Another workout done, one day at a time.', emoji: '💪', stats, name });
    if (st >= 2) list.push({ id: 'streak', kicker: 'CONSISTENCY', title: `${st}-day streak`, subtitle: 'Showing up for myself every single day.', emoji: '🔥', stats, name });
    if (lvl.n >= 2) list.push({ id: 'nivel', kicker: 'NEW LEVEL', title: lvl.name, subtitle: `I reached level ${lvl.n} of 6 in the challenge.`, emoji: lvl.emoji, stats, name });
    earnedMedals(s).forEach(m => list.push({ id: m.id, kicker: 'MEDAL EARNED', title: m.name, subtitle: m.desc + '.', emoji: m.emoji, stats, name }));
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
    renderShareCard(selected, template).then(url => alive && setImg(url)).catch(() => alive && setToast('Couldn’t create the image.'));
    return () => { alive = false; };
  }, [selected, template]);

  const file = 'my-wall-pilates-achievement.png';
  async function share() {
    if (!img) return;
    try {
      const blob = await (await fetch(img)).blob();
      const f = new File([blob], file, { type: 'image/png' });
      if (navigator.canShare?.({ files: [f] })) { await navigator.share({ files: [f], title: 'My achievement 💖' }); return; }
      download(file, img);
      setToast('Image downloaded. Open Instagram and post it to your Stories.');
    } catch (e) {
      if ((e as DOMException)?.name !== 'AbortError') setToast('Couldn’t share. Try downloading the image.');
    }
    setTimeout(() => setToast(''), 3500);
  }

  return (
    <Page>
      <TopBar back="/conquistas/" title="Share an Achievement" />
      {!selected ? (
        <div className="card mt-6 p-6 text-center">
          <p className="text-4xl">🌱</p>
          <p className="mt-2 font-bold">Your first achievement is one workout away</p>
          <p className="mt-1 text-sm text-ink-soft">Complete today’s workout to have something beautiful to share.</p>
          <Link href="/desafios/" className="btn-primary mt-4 w-full">Go to the challenge</Link>
        </div>
      ) : (
        <>
          <p className="mb-2 text-sm font-semibold text-ink-soft">Look what you achieved! 💖</p>
          <div className="mx-auto w-full max-w-[18rem] overflow-hidden rounded-3xl bg-rose-50 shadow-card ring-1 ring-rose-100" style={{ aspectRatio: '9 / 16' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {img ? <img src={img} alt={`Preview: ${selected.title}`} className="h-full w-full" /> : <div className="grid h-full place-items-center text-sm font-bold text-rose-500">Creating image…</div>}
          </div>

          <SectionTitle>Choose an achievement</SectionTitle>
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
            {options.map((o, i) => (
              <button key={o.id} onClick={() => setChoice(i)} aria-pressed={choice === i} className={`flex shrink-0 items-center gap-2 rounded-2xl px-3 py-2 text-left text-sm font-bold ${choice === i ? 'bg-brand text-white shadow-glow' : 'bg-white ring-1 ring-rose-100'}`}>
                <span className="text-xl">{o.emoji}</span><span className="max-w-[9rem] truncate">{o.title}</span>
              </button>
            ))}
          </div>

          <SectionTitle>Choose a template</SectionTitle>
          <div className="grid grid-cols-3 gap-2">
            {TEMPLATES.map(t => (
              <button key={t.id} onClick={() => setTemplate(t.id)} aria-pressed={template === t.id} className={`rounded-2xl p-1 ${template === t.id ? 'ring-[3px] ring-rose-500' : 'ring-1 ring-rose-100'}`}>
                <div className={`h-14 rounded-xl ${t.cls}`} />
                <p className="py-1 text-xs font-bold">{t.name}</p>
              </button>
            ))}
          </div>

          <button className="btn-primary shine mt-5 w-full" disabled={!img} onClick={share}><Share2 size={18} /> Share to Stories</button>
          <button className="btn-ghost mt-2 w-full" disabled={!img} onClick={() => img && download(file, img)}><Download size={18} /> Download image</button>
        </>
      )}
      <Toast show={!!toast}>{toast}</Toast>
    </Page>
  );
}
