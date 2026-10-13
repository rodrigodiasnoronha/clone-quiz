'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Flame, Gift, Lock, Play, Sparkles, Star, Trophy, Bell, ChevronRight } from 'lucide-react';
import { Page, ProgressBar, Ring, SectionTitle } from '@/components/ui';
import { Luna, type LunaMood } from '@/components/Luna';
import { useStore } from '@/lib/store';
import { DAY, PHASES } from '@/content/program';
import { PHRASES, GREETING } from '@/content/extras';
import { completedDays, daysBehind, dayStatus, earnedMedals, levelFor, MEDALS, nextDay, pointsBreakdown, streak, unlockedUntil } from '@/lib/progress';
import { buildSteps, estimateMinutes } from '@/lib/workout';
import { dayIndex, daysBetween, toKey } from '@/lib/dates';
import { MissionCard } from '@/components/MissionCard';

const OBSTACLE_TIP = {
  tempo: { t: 'Dia corrido?', d: 'Mude para treinos de 10 minutos no Perfil. Feito é melhor que perfeito.', href: '/perfil/' },
  motivacao: { t: 'Sem vontade hoje?', d: 'Combine só o aquecimento. Na maioria das vezes, a vontade aparece no meio.', href: null },
  esquecimento: { t: 'Para não esquecer', d: 'Ative um lembrete diário no horário que preferir.', href: '/perfil/' },
  cansaco: { t: 'Cansada?', d: 'Os dias de mobilidade e recuperação são leves. Respirar fundo já conta!', href: '/jogos/respiracao/' },
  dores: { t: 'Algo incomodando?', d: 'Use sempre a "versão mais fácil" e ajuste suas limitações no Perfil.', href: '/biblioteca/adaptar/' },
} as const;

export default function Home() {
  const s = useStore();
  const p = s.profile!;
  const today = toKey();
  const done = completedDays(s);
  const next = nextDay(s);
  const day = DAY(next ?? 21);
  const status = next ? dayStatus(s, next) : 'concluido';
  const phase = PHASES[day.phase - 1];
  const pts = pointsBreakdown(s).total;
  const lvl = levelFor(pts);
  const st = streak(s);
  const behind = daysBehind(s);
  const doneToday = Object.values(s.days).some(d => d.completedAt === today);
  const away = s.previousVisit ? daysBetween(s.previousVisit, today) : 0;
  const minutes = estimateMinutes(buildSteps(day, p));
  const medals = earnedMedals(s);
  const nextMedal = MEDALS.filter(m => m.kind === 'marco').find(m => !medals.includes(m));
  const nextMedalDay = nextMedal ? Number(nextMedal.id.slice(1)) : null;
  const hour = new Date().getHours();
  const finished = !next;
  // missões: do dia liberado mais recente (se o treino de hoje já foi feito, continuam as do dia concluído)
  const mday = DAY(Math.min(next ?? 21, unlockedUntil(s)));

  // Mensagem da Luna conforme o momento da usuária
  let mood: LunaMood = 'feliz';
  let msg = day.luna;
  if (finished) { mood = 'orgulhosa'; msg = 'Você completou os 21 dias! Que tal manter o ritmo com a rotina de manutenção?'; }
  else if (away >= 3) { mood = 'saudade'; msg = `Que bom te ver de novo, ${p.name}! Sem culpa: seu desafio esperou por você. Vamos retomar com calma?`; }
  else if (doneToday && status === 'bloqueado') { mood = 'calma'; msg = 'Treino de hoje feito! Amanhã a Luna libera um novo dia. Que tal uma missão ou o diário?'; }
  else if (behind > 0) { mood = 'piscando'; msg = `Você tem ${behind} ${behind > 1 ? 'dias' : 'dia'} para recuperar, sem penalidade nenhuma. Um de cada vez!`; }

  const phrase = PHRASES[dayIndex(today, PHRASES.length)];
  const tip = OBSTACLE_TIP[p.obstacle];

  return (
    <Page>
      {/* Cabeçalho */}
      <header className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-ink-soft">{GREETING(hour)},</p>
          <h1 className="text-2xl font-bold">{p.name}! 💜</h1>
        </div>
        <Link href="/evolucao/bau/" className="flex items-center gap-1.5 rounded-full bg-white px-3 py-2 shadow-soft ring-1 ring-lilac-100">
          <span className="text-lg">{lvl.emoji}</span>
          <span className="text-sm font-extrabold text-grape-700">{pts}</span>
          <span className="text-xs font-bold text-ink-soft">pts</span>
        </Link>
      </header>

      {/* Herói: Luna + dia */}
      <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="relative mt-4 overflow-hidden rounded-4xl bg-brand p-5 text-white shadow-glow">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
        <div className="absolute -bottom-16 right-10 h-40 w-40 rounded-full bg-white/10" />
        <div className="relative flex items-center gap-3">
          <Luna mood={mood} size={84} />
          <div className="flex-1">
            <p className="text-xs font-bold uppercase tracking-wider text-white/80">{finished ? 'Desafio concluído' : `Fase ${day.phase} · ${phase.name}`}</p>
            <p className="font-display text-2xl font-bold leading-tight">{finished ? '21 de 21 dias! 🏆' : `Você está no dia ${day.n} de 21!`}</p>
          </div>
        </div>
        <p className="relative mt-3 rounded-2xl bg-white/15 p-3 text-sm font-semibold leading-snug">{msg}</p>
        <div className="relative mt-4">
          <div className="mb-1 flex justify-between text-xs font-bold text-white/90"><span>{done.length} de 21 dias</span><span>{Math.round((done.length / 21) * 100)}%</span></div>
          <div className="flex gap-[3px]">
            {Array.from({ length: 21 }, (_, i) => (
              <motion.div key={i} initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: i * .02 }}
                className={`h-2.5 flex-1 rounded-full ${done.includes(i + 1) ? 'bg-white' : i + 1 === next ? 'animate-pulse bg-white/60' : 'bg-white/25'}`} />
            ))}
          </div>
        </div>
      </motion.section>

      {/* Números */}
      <div className="mt-3 grid grid-cols-3 gap-2">
        <div className="card flex flex-col items-center py-3">
          <Flame className={st ? 'text-rose-500' : 'text-ink-faint'} size={22} fill={st ? '#FF9ECB' : 'none'} />
          <span className="font-display text-xl font-bold">{st}</span>
          <span className="text-[11px] font-semibold text-ink-soft">{st === 1 ? 'dia seguido' : 'dias seguidos'}</span>
        </div>
        <div className="card flex flex-col items-center py-3">
          <Star className="text-lilac-500" size={22} fill="#DDD0FF" />
          <span className="font-display text-xl font-bold">{pts}</span>
          <span className="text-[11px] font-semibold text-ink-soft">pontos</span>
        </div>
        <Link href="/evolucao/bau/" className="card flex flex-col items-center py-3">
          <Trophy className="text-grape-500" size={22} />
          <span className="font-display text-xl font-bold">{medals.length}</span>
          <span className="text-[11px] font-semibold text-ink-soft">medalhas</span>
        </Link>
      </div>

      {/* Missão principal */}
      <SectionTitle>Missão principal de hoje</SectionTitle>
      {finished ? (
        <div className="card p-5">
          <p className="font-display text-xl font-bold">Rotina de manutenção</p>
          <p className="mt-1 text-sm text-ink-soft">Três treinos (A, B e C) para repetir 3 vezes por semana e manter tudo o que você conquistou.</p>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {['a', 'b', 'c'].map(x => <Link key={x} href={`/sessao/manutencao-${x}/`} className="btn-soft text-lg">{x.toUpperCase()}</Link>)}
          </div>
          <Link href="/conclusao/" className="btn-ghost mt-3 w-full">Rever minha jornada</Link>
        </div>
      ) : (
        <div className="card overflow-hidden">
          <div className="flex items-start gap-4 p-5">
            <Ring value={status === 'andamento' ? (s.days[day.n]?.step ?? 0) / Math.max(1, buildSteps(day, p).length) : 0} size={64}>
              <span className="font-display text-lg font-bold text-grape-700">{day.n}</span>
            </Ring>
            <div className="flex-1">
              <p className="label">{day.type === 'treino' ? 'Treino' : day.type === 'mobilidade' ? 'Mobilidade' : day.type === 'recuperacao' ? 'Recuperação ativa' : 'Celebração'} · ~{minutes} min</p>
              <h3 className="text-xl font-bold leading-tight">{day.name}</h3>
              <p className="mt-1 text-sm text-ink-soft">{day.goal}</p>
            </div>
          </div>
          <div className="px-5 pb-5">
            {status === 'bloqueado' ? (
              <div className="flex items-center gap-3 rounded-2xl bg-lilac-50 p-4 text-sm font-semibold text-grape-700">
                <Lock size={20} /> {doneToday ? 'Você já treinou hoje! Este dia libera amanhã.' : 'Este dia libera amanhã.'}
              </div>
            ) : (
              <Link href={`/treinar/${day.n}/`} className="btn-primary shine w-full text-lg tracking-wide">
                <Play size={20} fill="white" /> {status === 'andamento' ? 'CONTINUAR MEU TREINO' : 'COMEÇAR MEU TREINO'}
              </Link>
            )}
            <Link href={`/treinos/dia/${day.n}/`} className="mt-2 flex items-center justify-center gap-1 text-sm font-bold text-grape-500">Ver detalhes do treino <ChevronRight size={16} /></Link>
          </div>
        </div>
      )}

      {/* Missões extras */}
      {!finished && (
        <>
          <SectionTitle action={{ href: '/missoes/', label: 'Ver todas' }}>Missões do dia {mday.n}</SectionTitle>
          <div className="space-y-2">
            <MissionCard mission={mday.extra} badge="Extra" />
            <MissionCard mission={mday.surprise} badge="Surpresa" surprise />
          </div>
        </>
      )}

      {/* Próxima recompensa */}
      {nextMedal && nextMedalDay && (
        <>
          <SectionTitle>Próxima recompensa</SectionTitle>
          <Link href="/evolucao/bau/" className="card flex items-center gap-4 p-4">
            <motion.div animate={{ rotate: [0, -8, 8, 0] }} transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 2 }} className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-rose-200 to-lilac-300 text-3xl">
              <Gift className="text-grape-700" />
            </motion.div>
            <div className="flex-1">
              <p className="font-bold">{nextMedal.name} {nextMedal.emoji}</p>
              <p className="text-xs text-ink-soft">{nextMedal.desc}</p>
              <ProgressBar className="mt-2 h-2" value={done.length / nextMedalDay} />
            </div>
            <span className="text-xs font-bold text-grape-500">{Math.max(0, nextMedalDay - done.length)} {nextMedalDay - done.length === 1 ? 'dia' : 'dias'}</span>
          </Link>
        </>
      )}

      {/* Nível */}
      <SectionTitle>Seu nível</SectionTitle>
      <Link href="/evolucao/bau/" className={`block overflow-hidden rounded-3xl bg-gradient-to-br ${lvl.gradient} p-4 shadow-card`}>
        <div className="flex items-center gap-3">
          <span className="text-4xl">{lvl.emoji}</span>
          <div className="flex-1">
            <p className="text-xs font-bold uppercase tracking-wider text-grape-900/70">Nível {lvl.n}</p>
            <p className="font-display text-xl font-bold text-grape-900">{lvl.name}</p>
          </div>
        </div>
        <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-white/50">
          <motion.div className="h-full rounded-full bg-white" initial={{ width: 0 }} animate={{ width: `${lvl.pct * 100}%` }} transition={{ duration: 1 }} />
        </div>
        <p className="mt-1.5 text-xs font-bold text-grape-900/80">{lvl.next ? `Faltam ${lvl.toNext} pontos para ${lvl.next.name}` : 'Você alcançou o nível máximo! 💎'}</p>
      </Link>

      {/* Dica personalizada */}
      <div className="card mt-3 flex gap-3 p-4">
        <Sparkles className="mt-0.5 shrink-0 text-rose-400" size={20} />
        <div className="flex-1 text-sm">
          <p className="font-bold">{tip.t}</p>
          <p className="text-ink-soft">{tip.d}</p>
          {tip.href && <Link href={tip.href} className="mt-1 inline-block font-bold text-grape-500">Abrir</Link>}
        </div>
      </div>
      {!s.settings.reminders && p.obstacle !== 'esquecimento' && (
        <Link href="/perfil/" className="mt-2 flex items-center gap-2 rounded-2xl bg-white/70 p-3 text-xs font-semibold text-ink-soft ring-1 ring-lilac-100">
          <Bell size={16} className="text-grape-500" /> Quer um lembrete diário? Ative no Perfil (opcional).
        </Link>
      )}

      {/* Frase do dia */}
      <motion.blockquote initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .3 }} className="mt-6 rounded-3xl bg-gradient-to-br from-lilac-100 to-rose-100 p-5 text-center">
        <p className="font-display text-lg font-semibold leading-snug text-grape-800">“{phrase}”</p>
      </motion.blockquote>

      {/* Prévia do que vem */}
      {!finished && day.n < 21 && (
        <>
          <SectionTitle action={{ href: '/treinos/', label: 'Ver jornada' }}>Vem por aí</SectionTitle>
          <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-2">
            {[1, 2, 3].map(k => day.n + k).filter(n => n <= 21).map(n => {
              const dd = DAY(n);
              return (
                <Link key={n} href={`/treinos/dia/${n}/`} className="card w-44 shrink-0 p-4">
                  <div className="flex items-center justify-between">
                    <span className="chip bg-lilac-100 text-grape-700">Dia {n}</span>
                    <Lock size={14} className="text-ink-faint" />
                  </div>
                  <p className="mt-2 font-bold leading-tight">{dd.name}</p>
                  <p className="mt-1 line-clamp-2 text-xs text-ink-soft">{dd.goal}</p>
                </Link>
              );
            })}
          </div>
        </>
      )}
    </Page>
  );
}
