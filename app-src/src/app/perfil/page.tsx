'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import { Bell, Download, Lock, RefreshCcw, Smartphone, Upload, Volume2, Vibrate, FlaskConical, ChevronRight } from 'lucide-react';
import { Page, SectionTitle, Sheet, Toast } from '@/components/ui';
import { Avatar } from '@/components/Avatar';
import { useStore, type State } from '@/lib/store';
import { levelFor, pointsBreakdown } from '@/lib/progress';
import { GOAL_LABEL } from '@/lib/workout';
import { notificationsSupported, requestPermission, scheduleReminder, showNotification } from '@/lib/notifications';
import { download } from '@/lib/device';
import { formatDate } from '@/lib/dates';
import { useInstall } from '@/lib/install';
import type { Goal, Level, Limitation, Obstacle, Period, Profile } from '@/lib/types';

const OPTIONS = {
  goal: Object.entries(GOAL_LABEL) as [Goal, string][],
  level: [['iniciante', 'Iniciante'], ['intermediaria', 'Intermediária'], ['avancada', 'Avançada']] as [Level, string][],
  minutes: [[10, '10 min'], [15, '15 min'], [20, '20 min'], [30, '30 min']] as [Profile['minutes'], string][],
  period: [['manha', 'Manhã'], ['tarde', 'Tarde'], ['noite', 'Noite']] as [Period, string][],
  obstacle: [['tempo', 'Falta de tempo'], ['motivacao', 'Motivação'], ['esquecimento', 'Esquecimento'], ['cansaco', 'Cansaço'], ['dores', 'Dores']] as [Obstacle, string][],
};
const LIMITS: [Limitation, string][] = [['joelhos', 'Joelhos'], ['lombar', 'Lombar'], ['punhos', 'Punhos'], ['ombros', 'Ombros'], ['pescoco', 'Pescoço']];
const THEMES = [
  { id: 'padrao', name: 'Rosa Suave', level: 1, bg: 'from-rose-50 to-lilac-100' },
  { id: 'lilas', name: 'Lilás', level: 3, bg: 'from-lilac-100 to-lilac-300' },
  { id: 'noite', name: 'Noite Roxa', level: 5, bg: 'from-grape-700 to-grape-900' },
] as const;

export default function Perfil() {
  const s = useStore();
  const p = s.profile!;
  const lvl = levelFor(pointsBreakdown(s).total);
  const [toast, setToast] = useState('');
  const [confirmReset, setConfirmReset] = useState(false);
  const { canPrompt, installed, install } = useInstall();
  const fileRef = useRef<HTMLInputElement>(null);

  const say = (t: string) => { setToast(t); setTimeout(() => setToast(''), 2600); };

  async function toggleReminders() {
    if (s.settings.reminders) { s.setSettings({ reminders: false }); say('Lembretes desativados.'); return; }
    const r = await requestPermission();
    if (r === 'granted') { s.setSettings({ reminders: true }); scheduleReminder(); say('Lembretes ativados 💜'); }
    else if (r === 'unsupported') say('Este navegador não oferece notificações.');
    else say('Permissão negada. Você pode liberar nas configurações do navegador.');
  }

  function exportData() {
    const { profile, days, missions, journal, activities, quiz, roulette, cards, sessions, seenMedals, settings } = useStore.getState();
    const data = { app: 'pnp21', version: 1, exportedAt: new Date().toISOString(), state: { profile, days, missions, journal, activities, quiz, roulette, cards, sessions, seenMedals, settings } };
    download(`backup-pilates-21-dias.json`, 'data:application/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data)));
    say('Backup baixado (as fotos não entram no backup).');
  }

  async function importData(f?: File) {
    if (!f) return;
    try {
      const data = JSON.parse(await f.text());
      if (data?.app !== 'pnp21' || !data.state?.profile) throw new Error();
      s.importData(data.state as Partial<State>);
      say('Backup restaurado!');
    } catch { say('Arquivo de backup inválido.'); }
  }

  return (
    <Page>
      <div className="flex flex-col items-center text-center">
        <Avatar level={lvl.n} />
        <h1 className="mt-2 text-2xl font-bold">{p.name}</h1>
        <p className="text-sm font-semibold text-grape-600">{lvl.emoji} {lvl.name}</p>
        <p className="text-xs text-ink-soft">No desafio desde {formatDate(p.startDate, { day: '2-digit', month: 'long' })}</p>
      </div>

      <SectionTitle>Meu desafio</SectionTitle>
      <div className="card space-y-4 p-4">
        <label className="block">
          <span className="label">Nome</span>
          <input value={p.name} maxLength={24} onChange={e => s.updateProfile({ name: e.target.value })} onBlur={e => !e.target.value.trim() && s.updateProfile({ name: 'Você' })}
            className="mt-1 h-12 w-full rounded-2xl border-2 border-lilac-100 px-4 font-semibold outline-none focus:border-grape-500" />
        </label>
        <Choice label="Objetivo" value={p.goal} options={OPTIONS.goal} onChange={v => s.updateProfile({ goal: v })} />
        <Choice label="Nível" value={p.level} options={OPTIONS.level} onChange={v => s.updateProfile({ level: v })} />
        <Choice label="Tempo por dia" value={p.minutes} options={OPTIONS.minutes} onChange={v => s.updateProfile({ minutes: v })} />
        <Choice label="Período preferido" value={p.period} options={OPTIONS.period} onChange={v => s.updateProfile({ period: v })} />
        <Choice label="Maior desafio" value={p.obstacle} options={OPTIONS.obstacle} onChange={v => s.updateProfile({ obstacle: v })} />
        <div>
          <p className="label mb-1.5">Limitações (os treinos se adaptam)</p>
          <div className="flex flex-wrap gap-1.5">
            {LIMITS.map(([v, l]) => {
              const on = p.limitations.includes(v);
              return <button key={v} onClick={() => s.updateProfile({ limitations: on ? p.limitations.filter(x => x !== v) : [...p.limitations, v] })} className={`rounded-full px-3 py-1.5 text-sm font-bold ${on ? 'bg-brand text-white' : 'bg-lilac-50 text-grape-700'}`}>{l}</button>;
            })}
          </div>
        </div>
      </div>

      <SectionTitle>Lembretes e preferências</SectionTitle>
      <div className="card divide-y divide-lilac-100">
        <Toggle icon={<Bell size={18} />} label="Lembrete diário" desc={notificationsSupported() ? 'Uma notificação gentil no horário escolhido' : 'Indisponível neste navegador'} on={s.settings.reminders} onClick={toggleReminders} />
        {s.settings.reminders && (
          <div className="flex items-center gap-3 px-4 py-3">
            <span className="flex-1 text-sm font-semibold">Horário</span>
            <input type="time" value={s.settings.reminderTime} onChange={e => { s.setSettings({ reminderTime: e.target.value }); setTimeout(scheduleReminder, 0); }} className="rounded-xl bg-lilac-50 px-3 py-2 font-bold text-grape-700" />
            <button onClick={() => showNotification('Seu momento de cuidar de você chegou! 💜', 'Este é um lembrete de teste.').then(ok => say(ok ? 'Lembrete de teste enviado.' : 'Não foi possível mostrar a notificação.'))} className="text-xs font-bold text-grape-500">Testar</button>
          </div>
        )}
        {s.settings.reminders && <p className="px-4 py-2 text-[11px] text-ink-faint">Sem servidor, o lembrete aparece quando o app está aberto ou instalado e ativo no horário. Alguns celulares limitam isso para economizar bateria.</p>}
        <Toggle icon={<Volume2 size={18} />} label="Sons do treino" desc="Bipes no fim de cada etapa" on={s.settings.sound} onClick={() => s.setSettings({ sound: !s.settings.sound })} />
        <Toggle icon={<Vibrate size={18} />} label="Vibração" desc="Quando o celular permitir" on={s.settings.vibration} onClick={() => s.setSettings({ vibration: !s.settings.vibration })} />
      </div>

      <SectionTitle>Temas desbloqueáveis</SectionTitle>
      <div className="grid grid-cols-3 gap-2">
        {THEMES.map(t => {
          const ok = lvl.n >= t.level;
          const on = (s.settings.theme ?? 'padrao') === t.id;
          return (
            <button key={t.id} disabled={!ok} onClick={() => s.setSettings({ theme: t.id })} className={`relative overflow-hidden rounded-2xl p-1 ${on ? 'ring-4 ring-grape-500' : 'ring-1 ring-lilac-200'}`}>
              <div className={`h-16 rounded-xl bg-gradient-to-br ${t.bg}`} />
              <p className="py-1 text-[11px] font-bold">{t.name}</p>
              {!ok && <div className="absolute inset-0 grid place-items-center bg-white/70 text-[10px] font-bold text-ink-soft"><Lock size={14} />Nível {t.level}</div>}
            </button>
          );
        })}
      </div>

      <SectionTitle>App no celular</SectionTitle>
      <div className="card p-4">
        <div className="flex items-start gap-3">
          <Smartphone className="mt-0.5 text-grape-500" />
          <div className="flex-1 text-sm">
            <p className="font-bold">{installed ? 'App instalado ✓' : 'Instale na tela inicial'}</p>
            <p className="text-ink-soft">{installed ? 'Você está usando a versão instalada.' : 'Abre como um aplicativo, em tela cheia, e funciona sem internet depois do primeiro acesso.'}</p>
            {!installed && (canPrompt ? (
              <button className="btn-primary mt-3 w-full" onClick={() => install().then(ok => ok && say('App instalado! Abra pelo ícone na tela inicial.'))}>Instalar app</button>
            ) : (
              <p className="mt-2 rounded-xl bg-lilac-50 p-2 text-xs text-grape-800"><b>Android (Chrome):</b> menu ⋮ → “Instalar app” ou “Adicionar à tela inicial”. <b>iPhone (Safari):</b> botão Compartilhar → “Adicionar à Tela de Início”.</p>
            ))}
          </div>
        </div>
      </div>

      <SectionTitle>Seus dados</SectionTitle>
      <div className="card divide-y divide-lilac-100">
        <p className="p-4 text-xs text-ink-soft">Tudo fica salvo apenas neste aparelho (localStorage). Faça um backup antes de trocar de celular ou limpar o navegador.</p>
        <button onClick={exportData} className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-bold"><Download size={18} className="text-grape-500" /> Exportar backup</button>
        <button onClick={() => fileRef.current?.click()} className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-bold"><Upload size={18} className="text-grape-500" /> Restaurar backup</button>
        <input ref={fileRef} type="file" accept="application/json,.json" className="hidden" onChange={e => importData(e.target.files?.[0])} />
        <Toggle icon={<FlaskConical size={18} />} label="Modo demonstração" desc="Libera todos os dias de uma vez (para testar o app)" on={s.settings.demo} onClick={() => s.setSettings({ demo: !s.settings.demo })} />
        <button onClick={() => setConfirmReset(true)} className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-bold text-rose-600"><RefreshCcw size={18} /> Recomeçar o desafio do zero</button>
      </div>

      <SectionTitle>Ajuda</SectionTitle>
      <div className="card divide-y divide-lilac-100">
        {[['faq', 'Perguntas frequentes'], ['cuidados', 'Cuidados durante a prática'], ['adaptar', 'Como adaptar os movimentos']].map(([slug, t]) => (
          <Link key={slug} href={`/biblioteca/${slug}/`} className="flex items-center justify-between px-4 py-3 text-sm font-bold">{t}<ChevronRight size={16} className="text-ink-faint" /></Link>
        ))}
      </div>
      <p className="mt-4 text-center text-[11px] leading-relaxed text-ink-faint">Conteúdo de bem-estar. Não substitui avaliação médica ou acompanhamento profissional. Pare qualquer exercício se sentir dor aguda, tontura ou falta de ar.</p>

      <Sheet open={confirmReset} onClose={() => setConfirmReset(false)} title="Recomeçar do zero?">
        <p className="text-sm text-ink-soft">Isso apaga todo o seu progresso, pontos, medalhas, diário e fotos deste aparelho. Não dá para desfazer (a não ser que você tenha um backup).</p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button className="btn-ghost" onClick={() => setConfirmReset(false)}>Cancelar</button>
          <button className="btn bg-rose-500 text-white" onClick={() => {
            try { Object.keys(localStorage).filter(k => k.startsWith('pnp21-photo-')).forEach(k => localStorage.removeItem(k)); } catch {}
            s.reset();
          }}>Apagar tudo</button>
        </div>
      </Sheet>
      <Toast show={!!toast}>{toast}</Toast>
    </Page>
  );
}

function Choice<T extends string | number>({ label, value, options, onChange }: { label: string; value: T; options: [T, string][]; onChange: (v: T) => void }) {
  return (
    <div>
      <p className="label mb-1.5">{label}</p>
      <div className="flex flex-wrap gap-1.5">
        {options.map(([v, l]) => (
          <button key={String(v)} onClick={() => onChange(v)} className={`rounded-full px-3 py-1.5 text-sm font-bold transition ${value === v ? 'bg-brand text-white shadow-glow' : 'bg-lilac-50 text-grape-700'}`}>{l}</button>
        ))}
      </div>
    </div>
  );
}

function Toggle({ icon, label, desc, on, onClick }: { icon: React.ReactNode; label: string; desc: string; on: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} role="switch" aria-checked={on} className="flex w-full items-center gap-3 px-4 py-3 text-left">
      <span className="text-grape-500">{icon}</span>
      <span className="flex-1"><span className="block text-sm font-bold">{label}</span><span className="block text-[11px] text-ink-soft">{desc}</span></span>
      <span className={`relative h-7 w-12 rounded-full transition ${on ? 'bg-brand' : 'bg-lilac-200'}`}>
        <span className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all ${on ? 'left-6' : 'left-1'}`} />
      </span>
    </button>
  );
}
