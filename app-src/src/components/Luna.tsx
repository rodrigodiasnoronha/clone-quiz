'use client';

import { motion } from 'framer-motion';
import { useId } from 'react';

export type LunaMood = 'feliz' | 'animada' | 'calma' | 'piscando' | 'orgulhosa' | 'saudade' | 'dormindo';

/** Luna: mascote original, uma pequena lua roxa com faixa de Pilates */
export function Luna({ mood = 'feliz', size = 96, float = true, className = '' }: { mood?: LunaMood; size?: number; float?: boolean; className?: string }) {
  const id = useId().replace(/:/g, '');
  const eyes = {
    feliz: <><path d="M38 52 q5 -6 10 0" /><path d="M64 52 q5 -6 10 0" /></>,
    animada: <><circle cx="43" cy="50" r="4.5" fill="#2A1F3D" stroke="none" /><circle cx="69" cy="50" r="4.5" fill="#2A1F3D" stroke="none" /><circle cx="44.5" cy="48.5" r="1.5" fill="#fff" stroke="none" /><circle cx="70.5" cy="48.5" r="1.5" fill="#fff" stroke="none" /></>,
    calma: <><path d="M38 51 q5 4 10 0" /><path d="M64 51 q5 4 10 0" /></>,
    piscando: <><circle cx="43" cy="50" r="4" fill="#2A1F3D" stroke="none" /><path d="M64 51 q5 -5 10 0" /></>,
    orgulhosa: <><path d="M38 52 q5 -6 10 0" /><path d="M64 52 q5 -6 10 0" /></>,
    saudade: <><circle cx="43" cy="51" r="4" fill="#2A1F3D" stroke="none" /><circle cx="69" cy="51" r="4" fill="#2A1F3D" stroke="none" /><path d="M37 43 l8 2" /><path d="M75 43 l-8 2" /></>,
    dormindo: <><path d="M38 52 h10" /><path d="M64 52 h10" /></>,
  }[mood];
  const mouth = {
    feliz: <path d="M48 64 q8 7 16 0" />,
    animada: <path d="M47 62 q9 12 18 0 z" fill="#EC4C93" />,
    calma: <path d="M50 64 q6 4 12 0" />,
    piscando: <path d="M48 63 q8 7 16 0" />,
    orgulhosa: <path d="M46 62 q10 10 20 0" />,
    saudade: <path d="M50 66 q6 -3 12 0" />,
    dormindo: <ellipse cx="56" cy="65" rx="3" ry="2.5" fill="#2A1F3D" stroke="none" />,
  }[mood];

  return (
    <motion.div
      className={className}
      style={{ width: size, height: size }}
      animate={float ? { y: [0, -6, 0], rotate: mood === 'animada' ? [0, -4, 4, 0] : 0 } : undefined}
      transition={{ duration: mood === 'animada' ? 1.6 : 3.2, repeat: Infinity, ease: 'easeInOut' }}
      aria-label={`Luna, sua companheira (${mood})`}
      role="img"
    >
      <svg viewBox="0 0 112 112" width={size} height={size}>
        <defs>
          <radialGradient id={`b${id}`} cx="35%" cy="30%" r="75%">
            <stop offset="0" stopColor="#E9DEFF" />
            <stop offset=".55" stopColor="#B79CFF" />
            <stop offset="1" stopColor="#7C4DDB" />
          </radialGradient>
          <linearGradient id={`h${id}`} x1="0" x2="1">
            <stop offset="0" stopColor="#FF9ECB" />
            <stop offset="1" stopColor="#EC4C93" />
          </linearGradient>
        </defs>
        <ellipse cx="56" cy="104" rx="26" ry="4" fill="#7C4DDB" opacity=".15" />
        <circle cx="56" cy="56" r="44" fill={`url(#b${id})`} />
        {/* crateras suaves da lua */}
        <circle cx="80" cy="34" r="6" fill="#fff" opacity=".18" />
        <circle cx="30" cy="74" r="4" fill="#fff" opacity=".16" />
        <circle cx="86" cy="70" r="3" fill="#fff" opacity=".2" />
        {/* faixa de cabelo */}
        <path d="M16 40 q40 -26 80 0" fill="none" stroke={`url(#h${id})`} strokeWidth="7" strokeLinecap="round" />
        <circle cx="92" cy="38" r="5" fill="#EC4C93" />
        <circle cx="99" cy="33" r="4" fill="#FF9ECB" />
        {/* bochechas */}
        <ellipse cx="34" cy="62" rx="6" ry="4" fill="#FF9ECB" opacity=".7" />
        <ellipse cx="78" cy="62" rx="6" ry="4" fill="#FF9ECB" opacity=".7" />
        <g fill="none" stroke="#2A1F3D" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
          {eyes}
          {mouth}
        </g>
        {mood === 'orgulhosa' && <path d="M56 6 l3 6 6 1 -4.5 4 1 6 -5.5 -3 -5.5 3 1 -6 -4.5 -4 6 -1z" fill="#FFD166" />}
        {mood === 'animada' && <g fill="#FFD166"><path d="M8 26 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2z" /><path d="M100 82 l1.5 4 4 1.5 -4 1.5 -1.5 4 -1.5 -4 -4 -1.5 4 -1.5z" /></g>}
        {mood === 'dormindo' && <text x="88" y="24" fontSize="14" fontWeight="700" fill="#7C4DDB">z</text>}
        {mood === 'saudade' && <path d="M90 50 q4 6 0 9 q-4 -3 0 -9z" fill="#7FC8FF" />}
      </svg>
    </motion.div>
  );
}

/** Balão de fala da Luna */
export function LunaSays({ mood, text, size = 72 }: { mood?: LunaMood; text: string; size?: number }) {
  return (
    <div className="flex items-end gap-3">
      <Luna mood={mood} size={size} />
      <motion.div
        initial={{ opacity: 0, y: 8, scale: .96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: .15 }}
        className="relative flex-1 rounded-3xl rounded-bl-md bg-white px-4 py-3 text-sm font-semibold leading-snug text-ink shadow-soft ring-1 ring-lilac-100"
      >
        {text}
      </motion.div>
    </div>
  );
}
