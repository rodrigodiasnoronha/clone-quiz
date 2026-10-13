'use client';

import { motion } from 'framer-motion';
import { Camera, Timer, Trash2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Scale } from './ui';
import { photos, useStore } from '@/lib/store';
import { compressImage } from '@/lib/device';
import { toKey } from '@/lib/dates';
import { nextDay } from '@/lib/progress';
import type { JournalEntry } from '@/lib/types';

export const MOOD = { e: ['😣', '😕', '😐', '🙂', '😄'], l: ['Difícil', 'Baixo', 'Ok', 'Bem', 'Ótimo'] };
export const ENERGY = { e: ['🪫', '😮‍💨', '🙂', '⚡', '🚀'], l: ['Sem', 'Baixa', 'Média', 'Boa', 'Alta'] };
export const SLEEP = { e: ['😫', '🥱', '😐', '😌', '😴'], l: ['Péssimo', 'Ruim', 'Ok', 'Bom', 'Ótimo'] };
export const DIFF = { e: ['🪶', '😌', '🙂', '😤', '🔥'], l: ['Muito leve', 'Leve', 'Média', 'Puxada', 'Intensa'] };
export const FLEX = ['Joelhos', 'Canelas', 'Tornozelos', 'Chão'];

/** Dia do desafio a que um registro pertence */
export function currentChallengeDay() {
  const s = useStore.getState();
  const today = toKey();
  const doneToday = Object.entries(s.days).find(([, d]) => d.completedAt === today);
  return doneToday ? Number(doneToday[0]) : Math.max(1, (nextDay(s) ?? 22) - 1);
}

export function JournalForm({ onSaved, compact = false }: { onSaved?: () => void; compact?: boolean }) {
  const today = toKey();
  const existing = useStore(s => s.journal.find(j => j.date === today));
  const save = useStore(s => s.saveJournal);
  const addActivity = useStore(s => s.addActivity);
  const [e, setE] = useState<JournalEntry>(existing ?? { date: today, day: currentChallengeDay() });
  const [error, setError] = useState('');
  const [timing, setTiming] = useState<number | null>(null);
  const file = useRef<HTMLInputElement>(null);
  const set = (p: Partial<JournalEntry>) => setE(x => ({ ...x, ...p }));

  // cronômetro do teste de resistência (agachamento isométrico na parede)
  useEffect(() => {
    if (timing == null) return;
    const id = setInterval(() => setTiming(t => (t ?? 0) + 1), 1000);
    return () => clearInterval(id);
  }, [timing != null]); // eslint-disable-line react-hooks/exhaustive-deps

  async function onPhoto(f?: File) {
    if (!f) return;
    setError('');
    try {
      const data = await compressImage(f);
      photos.remove(e.photo);
      set({ photo: photos.save(data) });
    } catch (err) {
      setError(err instanceof DOMException ? 'Sem espaço para mais fotos neste aparelho. Apague uma foto antiga.' : 'Não foi possível usar essa foto.');
    }
  }

  const valid = e.mood && e.energy && e.sleep;
  const photo = photos.get(e.photo);

  return (
    <div className="space-y-5">
      <Field label="Como está seu humor?"><Scale value={e.mood} onChange={v => set({ mood: v })} emojis={MOOD.e} labels={MOOD.l} /></Field>
      <Field label="Seu nível de energia"><Scale value={e.energy} onChange={v => set({ energy: v })} emojis={ENERGY.e} labels={ENERGY.l} /></Field>
      <Field label="Como foi seu sono?"><Scale value={e.sleep} onChange={v => set({ sleep: v })} emojis={SLEEP.e} labels={SLEEP.l} /></Field>
      {!compact && <Field label="Dificuldade do treino de hoje (opcional)"><Scale value={e.difficulty} onChange={v => set({ difficulty: v })} emojis={DIFF.e} labels={DIFF.l} /></Field>}

      <Field label="Uma conquista de hoje (opcional)">
        <input value={e.win ?? ''} maxLength={140} onChange={x => set({ win: x.target.value })} placeholder="Ex.: fiz a prancha sem parar!" className="h-12 w-full rounded-2xl border-2 border-lilac-100 bg-white px-4 font-semibold outline-none focus:border-grape-500" />
      </Field>

      {!compact && (
        <>
          <Field label="Observações (opcional)">
            <textarea value={e.notes ?? ''} maxLength={500} onChange={x => set({ notes: x.target.value })} rows={3} placeholder="Como o corpo respondeu? Algo que quer lembrar?" className="w-full rounded-2xl border-2 border-lilac-100 bg-white p-4 font-medium outline-none focus:border-grape-500" />
          </Field>

          <div className="card p-4">
            <p className="font-bold">Testes de evolução (opcionais)</p>
            <p className="text-xs text-ink-soft">Repita no início e no fim do desafio para comparar.</p>
            <p className="label mt-4">Flexibilidade: no rolamento de coluna, até onde as mãos alcançam?</p>
            <div className="mt-2 grid grid-cols-4 gap-1.5">
              {FLEX.map((f, i) => (
                <button key={f} onClick={() => set({ flex: i + 1 })} className={`rounded-xl py-2 text-xs font-bold ${e.flex === i + 1 ? 'bg-brand text-white' : 'bg-lilac-50 text-grape-700'}`}>{f}</button>
              ))}
            </div>
            <p className="label mt-4">Resistência: quanto tempo você sustenta o agachamento na parede?</p>
            <div className="mt-2 flex items-center gap-2">
              {timing == null ? (
                <>
                  <button onClick={() => setTiming(0)} className="btn-soft h-11 min-h-0 flex-1 text-sm"><Timer size={16} /> Cronometrar</button>
                  <input type="number" inputMode="numeric" min={0} max={600} value={e.hold ?? ''} onChange={x => set({ hold: x.target.value ? Math.min(600, Math.max(0, Number(x.target.value))) : undefined })} placeholder="seg." className="h-11 w-24 rounded-xl border-2 border-lilac-100 text-center font-bold outline-none focus:border-grape-500" />
                </>
              ) : (
                <button onClick={() => { set({ hold: timing }); setTiming(null); }} className="btn-primary h-11 min-h-0 flex-1 text-sm">⏹ Parar em {timing}s</button>
              )}
            </div>
            <p className="mt-1 text-[11px] text-ink-faint">Pare ao primeiro sinal de dor no joelho. Se tiver limitação nos joelhos, pule este teste.</p>
          </div>

          <Field label="Foto de acompanhamento (opcional)">
            <input ref={file} type="file" accept="image/*" className="hidden" onChange={x => onPhoto(x.target.files?.[0])} />
            {photo ? (
              <div className="relative overflow-hidden rounded-3xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photo} alt="Sua foto de acompanhamento" className="max-h-72 w-full object-cover" />
                <button onClick={() => { photos.remove(e.photo); set({ photo: undefined }); }} className="absolute right-2 top-2 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-rose-500" aria-label="Remover foto"><Trash2 size={16} /></button>
              </div>
            ) : (
              <button onClick={() => file.current?.click()} className="flex w-full items-center justify-center gap-2 rounded-3xl border-2 border-dashed border-lilac-300 bg-white/60 py-6 font-bold text-grape-600"><Camera size={20} /> Adicionar foto</button>
            )}
            <p className="mt-1 text-[11px] text-ink-faint">A foto fica salva só neste aparelho e não é enviada para lugar nenhum.</p>
            {error && <p className="mt-1 text-sm font-semibold text-rose-600">{error}</p>}
          </Field>
        </>
      )}

      <motion.button whileTap={{ scale: .97 }} disabled={!valid} className="btn-primary shine w-full" onClick={() => {
        try {
          save(e);
          addActivity(`journal:${e.date}`);
          onSaved?.();
        } catch { setError('Não foi possível salvar. O armazenamento do aparelho pode estar cheio.'); }
      }}>
        {existing ? 'Atualizar registro' : 'Salvar registro'}
      </motion.button>
      {!valid && <p className="-mt-3 text-center text-xs text-ink-faint">Escolha humor, energia e sono para salvar.</p>}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><p className="mb-2 text-sm font-bold text-ink">{label}</p>{children}</div>;
}
