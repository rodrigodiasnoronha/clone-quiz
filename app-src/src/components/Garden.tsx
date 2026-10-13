'use client';

import { motion } from 'framer-motion';

const NAMES = ['Sementinha', 'Broto', 'Mudinha', 'Botão', 'Primeira flor', 'Jardim florido', 'Jardim encantado'];

/** Jardim da Evolução: a planta cresce conforme as atividades concluídas */
export function Garden({ stage, acts, next }: { stage: number; acts: number; next?: number }) {
  const grow = (s: number) => ({ initial: { scale: 0, opacity: 0 }, animate: { scale: stage >= s ? 1 : 0, opacity: stage >= s ? 1 : 0 }, transition: { type: 'spring' as const, damping: 12, delay: s * .08 } });
  return (
    <div className="relative overflow-hidden rounded-4xl bg-gradient-to-b from-lilac-100 via-rose-50 to-white p-4">
      <svg viewBox="0 0 200 170" className="mx-auto w-full max-w-[16rem]" role="img" aria-label={`Seu jardim: ${NAMES[stage]}`}>
        {/* sol */}
        <motion.circle cx="170" cy="28" r="14" fill="#FFD166" animate={{ scale: [1, 1.08, 1] }} transition={{ repeat: Infinity, duration: 3 }} />
        {/* caule */}
        <motion.path d="M100 140 C100 115 98 95 100 70" stroke="#5BBF8A" strokeWidth="5" fill="none" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: [0, .25, .5, .75, 1, 1, 1][stage] }} transition={{ duration: 1 }} />
        {/* folhas */}
        <motion.path {...grow(2)} style={{ originX: '100px', originY: '120px' }} d="M100 122 C80 116 74 102 78 96 C92 98 100 108 100 122Z" fill="#7ED6A4" />
        <motion.path {...grow(2)} style={{ originX: '100px', originY: '108px' }} d="M100 108 C120 102 126 88 122 82 C108 84 100 94 100 108Z" fill="#5BBF8A" />
        {/* broto */}
        <motion.ellipse {...grow(1)} cx="100" cy="132" rx="6" ry="9" fill="#7ED6A4" />
        {/* botão */}
        <motion.ellipse {...grow(3)} cx="100" cy="66" rx="9" ry="12" fill="#FF9ECB" />
        {/* flor principal */}
        <motion.g {...grow(4)} style={{ originX: '100px', originY: '64px' }}>
          {[0, 60, 120, 180, 240, 300].map(a => <ellipse key={a} cx="100" cy="48" rx="9" ry="16" fill="#F873AE" transform={`rotate(${a} 100 64)`} />)}
          <circle cx="100" cy="64" r="9" fill="#FFD166" />
        </motion.g>
        {/* flores laterais */}
        <motion.g {...grow(5)} style={{ originX: '60px', originY: '118px' }}>
          <path d="M60 140 C60 130 60 124 60 118" stroke="#5BBF8A" strokeWidth="3" />
          {[0, 72, 144, 216, 288].map(a => <ellipse key={a} cx="60" cy="110" rx="5" ry="9" fill="#A98BFA" transform={`rotate(${a} 60 118)`} />)}
          <circle cx="60" cy="118" r="5" fill="#FFD166" />
        </motion.g>
        <motion.g {...grow(5)} style={{ originX: '142px', originY: '114px' }}>
          <path d="M142 140 C142 130 142 120 142 114" stroke="#5BBF8A" strokeWidth="3" />
          {[0, 72, 144, 216, 288].map(a => <ellipse key={a} cx="142" cy="106" rx="5" ry="9" fill="#C6B1FF" transform={`rotate(${a} 142 114)`} />)}
          <circle cx="142" cy="114" r="5" fill="#FFD166" />
        </motion.g>
        {/* brilhos */}
        {stage >= 6 && [[40, 60], [160, 70], [70, 30], [130, 40]].map(([x, y], i) => (
          <motion.path key={i} d={`M${x} ${y} l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2z`} fill="#FFD166" animate={{ opacity: [0, 1, 0], scale: [.6, 1.1, .6] }} transition={{ repeat: Infinity, duration: 2, delay: i * .4 }} />
        ))}
        {/* vaso */}
        <path d="M66 140 h68 l-8 26 h-52z" fill="#C6B1FF" />
        <rect x="62" y="134" width="76" height="10" rx="5" fill="#A98BFA" />
        {stage === 0 && <ellipse cx="100" cy="137" rx="4" ry="3" fill="#8B6B4A" />}
      </svg>
      <div className="mt-1 text-center">
        <p className="font-display text-lg font-bold text-grape-800">{NAMES[stage]}</p>
        <p className="text-xs font-semibold text-ink-soft">{next ? `Mais ${next - acts} atividades para o próximo estágio` : 'Seu jardim está completo! 🌸'}</p>
      </div>
    </div>
  );
}
