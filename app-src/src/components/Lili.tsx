'use client';

import { motion } from 'framer-motion';

export type LiliMood = 'feliz' | 'animada' | 'calma' | 'piscando' | 'orgulhosa' | 'saudade' | 'dormindo';

/**
 * Lili, a companheira de treino. As imagens vêm da arte de referência do
 * produto (public/lili). Rostos em close para tamanhos pequenos; poses de
 * meio corpo, recortadas em círculo, para tamanhos maiores.
 */
const FACE: Record<LiliMood, string> = {
  feliz: '/app/lili/lili-rosto-2.webp',
  animada: '/app/lili/lili-paz.webp',
  calma: '/app/lili/lili-rosto-2.webp',
  piscando: '/app/lili/lili-garrafa.webp',
  orgulhosa: '/app/lili/lili-paz.webp',
  saudade: '/app/lili/lili-rosto-3.webp',
  dormindo: '/app/lili/lili-rosto-1.webp',
};

export const LILI_POSE = {
  garrafa: '/app/lili/lili-garrafa.webp',
  paz: '/app/lili/lili-paz.webp',
  alonga: '/app/lili/lili-alonga.webp',
};

export function Lili({ mood = 'feliz', size = 96, float = true, className = '' }: { mood?: LiliMood; size?: number; float?: boolean; className?: string }) {
  const src = FACE[mood];
  const body = src.includes('rosto') ? 'object-center' : 'object-[50%_12%]';
  return (
    <motion.div
      className={`relative shrink-0 ${className}`}
      style={{ width: size, height: size }}
      animate={float ? { y: [0, -5, 0], rotate: mood === 'animada' ? [0, -3, 3, 0] : 0 } : undefined}
      transition={{ duration: mood === 'animada' ? 1.8 : 3.4, repeat: Infinity, ease: 'easeInOut' }}
      role="img"
      aria-label={`Lili, sua companheira de treino (${mood})`}
    >
      <div className="h-full w-full rounded-full bg-gradient-to-br from-rose-300 via-rose-500 to-grape-600 p-[3px] shadow-glow">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" draggable={false} className={`h-full w-full rounded-full bg-rose-100 object-cover ${body}`} />
      </div>
      {mood === 'orgulhosa' && <span className="absolute -right-1 -top-1 text-[0.9em]" style={{ fontSize: size * 0.28 }} aria-hidden>⭐</span>}
      {mood === 'animada' && <span className="absolute -left-1 top-0" style={{ fontSize: size * 0.24 }} aria-hidden>✨</span>}
      {mood === 'dormindo' && <span className="absolute -right-1 top-0 font-display font-bold text-rose-500" style={{ fontSize: size * 0.24 }} aria-hidden>z</span>}
    </motion.div>
  );
}

// esmaece todas as bordas para a ilustração se fundir ao fundo escuro
const FADE = 'radial-gradient(ellipse 78% 60% at 60% 46%, #000 52%, transparent 100%)';

/** Ilustração de meio corpo da Lili, para os cabeçalhos escuros */
export function LiliPose({ pose = 'garrafa', className = '' }: { pose?: keyof typeof LILI_POSE; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={LILI_POSE[pose]}
      alt="Lili, sua companheira de treino"
      draggable={false}
      className={`pointer-events-none select-none object-cover ${className}`}
      style={{ maskImage: FADE, WebkitMaskImage: FADE }}
    />
  );
}

/** Balão de fala da Lili */
export function LiliSays({ mood, text, size = 64 }: { mood?: LiliMood; text: string; size?: number }) {
  return (
    <div className="flex items-end gap-3">
      <Lili mood={mood} size={size} />
      <motion.div
        initial={{ opacity: 0, y: 8, scale: .96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: .15 }}
        className="relative flex-1 rounded-3xl rounded-bl-md bg-white px-4 py-3 text-sm font-semibold leading-snug text-ink shadow-soft ring-1 ring-rose-100"
      >
        {text}
      </motion.div>
    </div>
  );
}
