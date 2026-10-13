'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Flame, Gift, Lock, Play, Sparkles, Bell, ChevronRight } from 'lucide-react';
import { HeroHeader, Logo, Page, ProgressBar, Ring, SectionTitle } from '@/components/ui';
import { Lili, LiliPose, type LiliMood } from '@/components/Lili';
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

  // Mensagem da Lili conforme o momento da usuária
  let mood: LiliMood = 'feliz';
  let msg = day.lili;
  if (finished) { mood = 'orgulhosa'; msg = 'Você completou os 21 dias! Que tal manter o ritmo com a rotina de manutenção?'; }
  else if (away >= 3) { mood = 'saudade'; msg = `Que bom te ver de novo, ${p.name}! Sem culpa: seu desafio esperou por você. Vamos retomar com calma?`; }
  else if (doneToday && status === 'bloqueado') { mood = 'calma'; msg = 'Treino de hoje feito! Amanhã a Lili libera um novo dia. Que tal uma missão ou o diário?'; }
  else if (behind > 0) { mood = 'piscando'; msg = `Você tem ${behind} ${behind > 1 ? 'dias' : 'dia'} para recuperar, sem penalidade nenhuma. Um de cada vez!`; }

  const phrase = PHRASES[dayIndex(today, PHRASES.length)];
  const tip = OBSTACLE_TIP[p.obstacle];

  return (
    <Page>
      {/* Cabeçalho escuro com a Lili */}
      <HeroHeader art={<LiliPose pose="garrafa" className="h-[24rem] w-[10.5rem]" />}>
        <div className="flex items-center justify-between pr-1">
          <Logo compact />
          <Link href="/conquistas/" aria-label={`Nível ${lvl.n}: ${lvl.name}`} className="relative z-10 flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-xs font-bold ring-1 ring-white/15">
            {lvl.emoji} Nível {lvl.n}
          </Link>
        </div>
        <div className="mt-5 max-w-[62%]">
          <p className="text-sm font-semibold text-white/75">{GREETING(hour)}, {p.name}! 💜</p>
          <h1 className="mt-1 text-[1.65rem] font-bold leading-[1.1]">{finished ? 'Você concluiu os 21 dias! 🏆' : <>Você está no dia <span className="text-rose-300">{day.n}</span> de 21</>}</h1>
          <p className="mt-1 text-xs font-bold uppercase tracking-wider text-rose-200/80">{finished ? 'Desafio concluído' : `Fase ${day.phase} · ${phase.name}`}</p>
        </div>
        <div className="mt-4 flex max-w-[62%] flex-col gap-2">
          <Link href="/desafios/" className="flex items-center gap-3 rounded-2xl bg-white/10 px-3 py-2 ring-1 ring-white/15 backdrop-blur">
            <Flame className={st ? 'text-rose-400' : 'text-white/50'} size={26} fill={st ? '#FF5FA2' : 'none'} />
            <span><span className="block font-display text-xl font-bold leading-none">{st}</span><span className="text-[11px] font-semibold text-white/75">{st === 1 ? 'dia seguido' : 'dias seguidos'}</span></span>
          </Link>
          <Link href="/conquistas/" className="flex items-center gap-3 rounded-2xl bg-white/10 px-3 py-2 ring-1 ring-white/15 backdrop-blur">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-yellow-300 to-amber-500 text-sm shadow">💜</span>
            <span><span className="block font-display text-xl font-bold leading-none">{pts}</span><span className="text-[11px] font-semibold text-white/75">Pontos de Evolução</span></span>
          </Link>
        </div>
        <div className="relative mt-4 rounded-2xl bg-plum-900/75 p-3 ring-1 ring-white/15 backdrop-blur-sm">
          <div className="flex justify-between text-sm font-bold"><span>Seu progresso</span><span className="text-rose-200">{Math.round((done.length / 21) * 100)}% concluído</span></div>
          <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-white/15">
            <motion.div className="h-full rounded-full bg-brand" initial={{ width: 0 }} animate={{ width: `${(done.length / 21) * 100}%` }} transition={{ duration: .9 }} />
          </div>
          <p className="mt-2 flex items-start gap-2 text-[13px] font-semibold leading-snug text-white/90"><Lili mood={mood} size={30} float={false} /> <span className="pt-1">{msg}</span></p>
        </div>
      </HeroHeader>

      {/* Missão principal */}
      <SectionTitle>Treino de hoje</SectionTitle>
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
          <div className="relative h-32 overflow-hidden bg-gradient-to-br from-rose-100 to-lilac-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/app/fotos/parede.webp" alt="" className="h-full w-full object-cover object-[50%_30%]" />
            <span className="absolute left-3 top-3 chip bg-white/90 text-grape-700">Dia atual · {day.n} de 21</span>
          </div>
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
          <Link href="/conquistas/" className="card flex items-center gap-4 p-4">
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
      <Link href="/conquistas/" className={`block overflow-hidden rounded-3xl bg-gradient-to-br ${lvl.gradient} p-4 shadow-card`}>
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
          <SectionTitle action={{ href: '/desafios/', label: 'Ver jornada' }}>Vem por aí</SectionTitle>
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
