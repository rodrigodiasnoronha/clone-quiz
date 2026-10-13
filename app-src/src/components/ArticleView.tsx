'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import type { Article } from '@/content/library';
import { useStore } from '@/lib/store';
import { POINTS } from '@/lib/progress';

export function ArticleView({ article, onRead }: { article: Article; onRead?: () => void }) {
  const read = useStore(s => !!s.activities[`read:${article.slug}`]);
  const addActivity = useStore(s => s.addActivity);
  return (
    <article>
      <div className="rounded-4xl bg-gradient-to-br from-rose-100 to-lilac-200 p-6 text-center">
        <p className="text-5xl">{article.emoji}</p>
        <h1 className="mt-2 text-2xl font-bold leading-tight">{article.title}</h1>
        <p className="mt-1 text-xs font-bold text-grape-600">{article.minutes} min de leitura</p>
      </div>
      <p className="mt-5 text-[15px] leading-relaxed text-ink">{article.intro}</p>
      {article.sections.map((sec, i) => (
        <motion.section key={sec.h} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .03 }} className="mt-5">
          <h2 className="text-lg font-bold text-grape-700">{sec.h}</h2>
          {sec.p.map(p => <p key={p} className="mt-2 text-[15px] leading-relaxed text-ink-soft">{p}</p>)}
        </motion.section>
      ))}
      <button
        disabled={read && !onRead}
        onClick={() => { addActivity(`read:${article.slug}`); onRead?.(); }}
        className={`mt-8 w-full ${read ? 'btn-soft' : 'btn-primary shine'}`}
      >
        {read ? <><Check size={18} /> Leitura concluída</> : `Li até o fim · +${POINTS.read} pts`}
      </button>
    </article>
  );
}
