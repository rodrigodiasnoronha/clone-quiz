'use client';

import { Luna } from './Luna';

/** Avatar da usuária: Luna com moldura (nível 2+) e coroa (nível 4+) */
export function Avatar({ level, size = 88 }: { level: number; size?: number }) {
  return (
    <div className="relative" style={{ width: size + 16, height: size + 16 }}>
      <div className={`absolute inset-0 rounded-full ${level >= 2 ? 'bg-gradient-to-br from-rose-300 via-lilac-400 to-grape-600 p-1 shadow-glow' : 'bg-white'}`}>
        <div className="grid h-full w-full place-items-center rounded-full bg-white">
          <Luna size={size} mood={level >= 6 ? 'orgulhosa' : 'feliz'} float={false} />
        </div>
      </div>
      {level >= 4 && <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-3xl drop-shadow" aria-label="Coroa da Rainha da Constância">👑</span>}
      {level >= 6 && <span className="absolute -bottom-1 -right-1 text-2xl" aria-label="Selo diamante">💎</span>}
    </div>
  );
}
