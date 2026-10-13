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

  const file = `certificado-pilates-${kind}.png`;

  async function share() {
    if (!img) return;
    try {
      const blob = await (await fetch(img)).blob();
      const f = new File([blob], file, { type: 'image/png' });
      if (navigator.canShare?.({ files: [f] })) await navigator.share({ files: [f], title: 'Meu certificado 💜' });
      else { download(file, img); setMsg('Seu navegador não permite compartilhar direto; baixamos a imagem para você.'); }
    } catch {}
  }

  return (
    <Page>
      <TopBar back="/evolucao/bau/" title={kind === 'final' ? 'Certificado final' : 'Certificado da semana 1'} />
      {!unlocked ? (
        <div className="card mt-6 flex flex-col items-center p-8 text-center">
          <Lock className="text-grape-500" size={32} />
          <p className="mt-3 font-bold">Libera ao concluir o dia {dayNeeded}</p>
          <Link href="/treinos/" className="btn-primary mt-4 w-full">Ver minha jornada</Link>
        </div>
      ) : (
        <>
          <div className="overflow-hidden rounded-3xl shadow-card ring-1 ring-lilac-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {img ? <img src={img} alt="Seu certificado personalizado" className="w-full" /> : <div className="grid aspect-[1.414] place-items-center bg-white text-sm font-bold text-grape-500">Gerando seu certificado…</div>}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <button className="btn-primary" disabled={!img} onClick={() => img && download(file, img)}><Download size={18} /> Baixar</button>
            <button className="btn-ghost" disabled={!img} onClick={share}><Share2 size={18} /> Compartilhar</button>
          </div>
          {msg && <p className="mt-2 text-center text-xs text-ink-soft">{msg}</p>}
        </>
      )}
    </Page>
  );
}
