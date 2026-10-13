'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Home, Dumbbell, Target, LineChart, User } from 'lucide-react';

const TABS = [
  { href: '/', label: 'Início', icon: Home, match: (p: string) => p === '/' },
  { href: '/treinos/', label: 'Treinos', icon: Dumbbell, match: (p: string) => p.startsWith('/treinos') || p.startsWith('/biblioteca') || p.startsWith('/sessao') },
  { href: '/missoes/', label: 'Missões', icon: Target, match: (p: string) => p.startsWith('/missoes') || p.startsWith('/jogos') },
  { href: '/evolucao/', label: 'Evolução', icon: LineChart, match: (p: string) => p.startsWith('/evolucao') || p.startsWith('/certificado') },
  { href: '/perfil/', label: 'Perfil', icon: User, match: (p: string) => p.startsWith('/perfil') },
];

export function BottomNav() {
  const path = usePathname();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 mx-auto max-w-md px-3" style={{ paddingBottom: 'calc(10px + var(--safe-bottom))' }} aria-label="Navegação principal">
      <div className="flex items-stretch justify-between rounded-3xl bg-white/95 p-1.5 shadow-card ring-1 ring-lilac-100 backdrop-blur">
        {TABS.map(t => {
          const on = t.match(path);
          const Icon = t.icon;
          return (
            <Link key={t.href} href={t.href} aria-current={on ? 'page' : undefined} className="relative flex flex-1 flex-col items-center gap-0.5 rounded-2xl py-2 text-[11px] font-bold">
              {on && <motion.span layoutId="tab" className="absolute inset-0 rounded-2xl bg-gradient-to-br from-rose-100 to-lilac-100" transition={{ type: 'spring', damping: 30, stiffness: 400 }} />}
              <Icon size={22} className={`relative ${on ? 'text-grape-600' : 'text-ink-faint'}`} strokeWidth={on ? 2.5 : 2} />
              <span className={`relative ${on ? 'text-grape-700' : 'text-ink-faint'}`}>{t.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
