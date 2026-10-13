'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, ChevronRight, Droplets, FileBadge, Gamepad2, LineChart, Moon, Settings, Share2 } from 'lucide-react';
import { HeroHeader, Page, SectionTitle } from '@/components/ui';
import { Lili } from '@/components/Lili';
import { useStore } from '@/lib/store';
import { toKey } from '@/lib/dates';
import { levelFor, pointsBreakdown } from '@/lib/progress';

const FEATURED = [
  { href: '/evolucao/', title: 'Minha Jornada', desc: 'Diário, gráficos e jardim', photo: 'energia', icon: LineChart },
  { href: '/hidratacao/', title: 'Hidratação', desc: 'Sua meta de copos do dia', photo: 'agua', icon: Droplets },
  { href: '/relaxar/', title: 'Modo Relaxamento', desc: 'Respire, alongue e durma bem', photo: 'sono', icon: Moon },
  { href: '/missoes/', title: 'Missões e jogos', desc: 'Roleta, quiz, cartas e mais', photo: 'grupo', icon: Gamepad2 },
];

const LIST = [
  { href: '/biblioteca/', title: 'Biblioteca VIP', desc: 'Conteúdos para praticar melhor', icon: BookOpen },
  { href: '/compartilhar/', title: 'Compartilhar conquista', desc: 'Imagem pronta para os Stories', icon: Share2 },
  { href: '/certificado/semana1/', title: 'Certificado da semana 1', desc: 'Libera no dia 7', icon: FileBadge },
  { href: '/certificado/final/', title: 'Certificado final', desc: 'Libera no dia 21', icon: FileBadge },
  { href: '/perfil/', title: 'Perfil e configurações', desc: 'Preferências, lembretes, instalar app, backup', icon: Settings },
];

export default function Mais() {
  const s = useStore();
  const lvl = levelFor(pointsBreakdown(s).total);
  const cups = s.water?.[toKey()] ?? 0;
  const goal = s.waterGoal ?? 8;
  return (
    <Page>
      <HeroHeader>
        <div className="mt-4 flex items-center gap-3">
          <Lili mood="feliz" size={64} />
          <div>
            <h1 className="text-2xl font-bold">Mais</h1>
            <p className="text-sm text-white/80">{s.profile?.name} · {lvl.emoji} {lvl.name}</p>
          </div>
        </div>
      </HeroHeader>

      <div className="mt-4 grid grid-cols-2 gap-2">
        {FEATURED.map((f, i) => (
          <motion.div key={f.href} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * .05 }}>
            <Link href={f.href} className="card relative flex h-44 flex-col overflow-hidden p-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/app/fotos/${f.photo}.webp`} alt="" className="absolute -bottom-3 -right-5 h-28 w-28 object-contain" />
              <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-rose-50 text-rose-500"><f.icon size={18} /></span>
              <span className="relative mt-2 max-w-[85%] font-bold leading-tight">{f.title}</span>
              <span className="relative max-w-[62%] text-[11px] font-semibold text-ink-soft">{f.href === '/hidratacao/' ? `${cups} de ${goal} copos hoje` : f.desc}</span>
            </Link>
          </motion.div>
        ))}
      </div>

      <SectionTitle>Outros</SectionTitle>
      <div className="card divide-y divide-rose-50">
        {LIST.map(l => (
          <Link key={l.href} href={l.href} className="flex items-center gap-3 px-4 py-3.5">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-rose-50 text-rose-500"><l.icon size={18} /></span>
            <span className="min-w-0 flex-1"><span className="block font-bold">{l.title}</span><span className="block truncate text-xs text-ink-soft">{l.desc}</span></span>
            <ChevronRight size={18} className="text-ink-faint" />
          </Link>
        ))}
      </div>
    </Page>
  );
}
