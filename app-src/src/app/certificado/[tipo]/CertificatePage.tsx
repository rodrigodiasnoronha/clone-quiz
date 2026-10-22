'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Download, Lock, Share2 } from 'lucide-react';
import { Page, TopBar } from '@/components/ui';
import { useStore } from '@/lib/store';
import { renderCertificate } from '@/lib/certificate';
import { completedDays, earnedMedals, levelFor, pointsBreakdown } from '@/lib/progress';
import { formatDate } from '@/lib/dates';
import { download } from '@/lib/device';

export function CertificatePage({ kind }: { kind: 'semana1' | 'final' }) {
  const s = useStore();
  const dayNeeded = kind === 'final' ? 21 : 7;
  const unlocked = !!s.days[dayNeeded]?.completedAt;
  const [img, setImg] = useState<string>();
  const [msg, setMsg] = useState('');

  useEffect(() => {
    if (!unlocked) return;
    const lvl = levelFor(pointsBreakdown(s).total);
    renderCertificate({
      kind,
      name: s.profile!.name,
      date: formatDate(s.days[dayNeeded].completedAt!, { day: '2-digit', month: 'long', year: 'numeric' }),
      workouts: completedDays(s).filter(n => kind === 'final' || n <= 7).length,
      missions: Object.keys(s.missions).length,
      medals: earnedMedals(s).length,
      level: lvl.name,
      diamond: lvl.n >= 6,
    }).then(setImg);
  }, [unlocked]); // eslint-disable-line react-hooks/exhaustive-deps

  const file = `wall-pilates-certificate-${kind}.png`;

  async function share() {
    if (!img) return;
    try {
      const blob = await (await fetch(img)).blob();
      const f = new File([blob], file, { type: 'image/png' });
      if (navigator.canShare?.({ files: [f] })) await navigator.share({ files: [f], title: 'My certificate 💜' });
      else { download(file, img); setMsg('Your browser doesn’t support direct sharing, so we downloaded the image for you.'); }
    } catch {}
  }

  return (
    <Page>
      <TopBar back="/conquistas/" title={kind === 'final' ? 'Final certificate' : 'Week 1 certificate'} />
      {!unlocked ? (
        <div className="card mt-6 flex flex-col items-center p-8 text-center">
          <Lock className="text-grape-500" size={32} />
          <p className="mt-3 font-bold">Unlocks when you complete day {dayNeeded}</p>
          <Link href="/desafios/" className="btn-primary mt-4 w-full">See my journey</Link>
        </div>
      ) : (
        <>
          <div className="overflow-hidden rounded-3xl shadow-card ring-1 ring-lilac-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {img ? <img src={img} alt="Your personalized certificate" className="w-full" /> : <div className="grid aspect-[1.414] place-items-center bg-white text-sm font-bold text-grape-500">Creating your certificate…</div>}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <button className="btn-primary" disabled={!img} onClick={() => img && download(file, img)}><Download size={18} /> Download</button>
            <button className="btn-ghost" disabled={!img} onClick={share}><Share2 size={18} /> Share</button>
          </div>
          {msg && <p className="mt-2 text-center text-xs text-ink-soft">{msg}</p>}
        </>
      )}
    </Page>
  );
}
