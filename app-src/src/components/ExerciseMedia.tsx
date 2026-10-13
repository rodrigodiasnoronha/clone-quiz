'use client';

import { motion } from 'framer-motion';
import { RotateCcw, Video } from 'lucide-react';
import { useRef, useState } from 'react';
import type { Exercise } from '@/lib/types';
import { CATEGORY_LABEL } from '@/content/exercises';

const CAT_EMOJI: Record<Exercise['category'], string> = {
  respiracao: '🌬️', mobilidade: '🔄', forca: '💪', core: '🎯', equilibrio: '⚖️', alongamento: '🧘‍♀️',
};

/**
 * Mídia do exercício. Se existir um vídeo real em /public/media/<id>.mp4
 * (campo "video" no exercício), ele é exibido. Caso contrário, mostra um
 * espaço reservado identificado — sem ilustrações de corpo humano, para não
 * exibir anatomia incorreta — com a posição inicial descrita em texto.
 */
export function ExerciseMedia({ ex, compact = false }: { ex: Exercise; compact?: boolean }) {
  const [k, setK] = useState(0);
  const video = useRef<HTMLVideoElement>(null);

  const replay = () => {
    if (video.current) { video.current.currentTime = 0; video.current.play().catch(() => {}); }
    setK(x => x + 1);
  };

  return (
    <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br from-lilac-100 via-rose-50 to-lilac-200 ${compact ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}>
      {ex.video ? (
        <video ref={video} src={ex.video} className="h-full w-full object-cover" autoPlay muted loop playsInline preload="metadata" />
      ) : (
        <div key={k} className="absolute inset-0 flex flex-col items-center justify-center p-5 text-center">
          {/* a parede */}
          <div className="absolute inset-y-0 left-0 w-5 bg-gradient-to-r from-lilac-300/70 to-lilac-200/30" />
          <motion.div
            className="grid h-20 w-20 place-items-center rounded-full bg-white/80 text-4xl shadow-soft"
            animate={{ scale: [1, 1.08, 1], y: [0, -4, 0] }} transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            {CAT_EMOJI[ex.category]}
          </motion.div>
          {!compact && <p className="mt-3 max-w-[18rem] text-sm font-semibold leading-snug text-grape-800">{ex.position}</p>}
          <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-white/70 px-2.5 py-1 text-[10px] font-bold text-grape-600">
            <Video size={12} /> Vídeo demonstrativo em breve
          </span>
        </div>
      )}
      <span className="absolute left-3 top-3 chip bg-white/85 text-grape-700">{CATEGORY_LABEL[ex.category]}</span>
      <button onClick={replay} aria-label="Repetir demonstração" className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/85 text-grape-700 shadow-soft active:scale-95">
        <RotateCcw size={16} />
      </button>
    </div>
  );
}
