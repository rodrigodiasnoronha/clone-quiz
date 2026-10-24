'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Home, CalendarHeart, Dumbbell, Trophy, MoreHorizontal } from 'lucide-react';

const TABS = [
  { href: '/', label: 'Home', icon: Home, match: (p: string) => p === '/' },
  { href: '/desafios/', label: 'Challenge', icon: CalendarHeart, match: (p: string) => /^\/(desafios|treinos|missoes)/.test(p) },
  { href: '/treinar/', label: 'Train', icon: Dumbbell, match: (p: string) => p === '/treinar/' || /^\/(praticar|sessao)/.test(p) },
  { href: '/conquistas/', label: 'Achievements', icon: Trophy, match: (p: string) => /^\/(conquistas|certificado|compartilhar)/.test(p) },
  { href: '/mais/', label: 'More', icon: MoreHorizontal, match: (p: string) => /^\/(mais|evolucao|perfil|hidratacao|relaxar|jogos|biblioteca)/.test(p) },
];

export function BottomNav() {
  const path = usePathname();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 mx-auto max-w-md px-3" style={{ paddingBottom: 'calc(10px + var(--safe-bottom))' }} aria-label="Main navigation">
      <div className="flex items-stretch justify-between rounded-3xl bg-white/95 p-1.5 shadow-card ring-1 ring-rose-100 backdrop-blur">
        {TABS.map(t => {
          const on = t.match(path);
          const Icon = t.icon;
          return (
            <Link key={t.href} href={t.href} aria-current={on ? 'page' : undefined} className="relative flex flex-1 flex-col items-center gap-0.5 rounded-2xl py-2 text-[11px] font-bold">
              {on && <motion.span layoutId="tab" className="absolute inset-0 rounded-2xl bg-rose-50" transition={{ type: 'spring', damping: 30, stiffness: 400 }} />}
              <Icon size={22} className={`relative ${on ? 'text-rose-500' : 'text-ink-faint'}`} strokeWidth={on ? 2.5 : 2} />
              <span className={`relative ${on ? 'text-rose-600' : 'text-ink-faint'}`}>{t.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
