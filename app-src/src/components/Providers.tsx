'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState, type ReactNode } from 'react';
import { useStore } from '@/lib/store';
import { earnedMedals } from '@/lib/progress';
import { scheduleReminder } from '@/lib/notifications';
import { BottomNav } from './BottomNav';
import { Celebration } from './Celebration';
import { Lili } from './Lili';
import { InstallGate } from './InstallGate';
import { INSTALL_KEY, isStandalone } from '@/lib/install';

// telas em tela cheia: onboarding, players de treino e celebração final
const FULLSCREEN = /^\/(boas-vindas|treinar\/\d+|sessao|praticar|conclusao)/;

export function Providers({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  // primeira abertura no navegador: oferece instalar o PWA antes de tudo
  const [askInstall, setAskInstall] = useState(false);
  useEffect(() => {
    let answered = true;
    try { answered = !!localStorage.getItem(INSTALL_KEY); } catch {}
    setAskInstall(!answered && !isStandalone());
  }, []);
  const path = usePathname();
  const router = useRouter();
  const profile = useStore(s => s.profile);
  const theme = useStore(s => s.settings.theme);

  // O estado vem do localStorage: só renderiza depois de ler os dados
  useEffect(() => {
    const done = () => setReady(true);
    if (useStore.persist.hasHydrated()) done();
    const unsub = useStore.persist.onFinishHydration(done);
    return unsub;
  }, []);

  useEffect(() => {
    if (!ready) return;
    if (!profile && !path.startsWith('/boas-vindas')) router.replace('/boas-vindas/');
  }, [ready, profile, path, router]);

  useEffect(() => {
    if (!ready || !profile) return;
    useStore.getState().touchVisit();
    scheduleReminder();
  }, [ready, profile]);

  // Tema de fundo desbloqueado por nível
  useEffect(() => { document.body.dataset.theme = theme ?? 'padrao'; }, [theme]);

  // PWA: service worker para funcionar offline e permitir instalação
  useEffect(() => {
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker.register('/app/sw.js', { scope: '/app/' }).catch(() => {});
    }
  }, []);

  if (!ready || (!profile && !path.startsWith('/boas-vindas'))) {
    return (
      <div className="grid min-h-dvh place-items-center">
        <div className="flex flex-col items-center gap-3">
          <Lili mood="feliz" size={96} />
          <p className="text-sm font-bold text-grape-500">Preparando seu desafio…</p>
        </div>
      </div>
    );
  }

  if (askInstall) return <InstallGate onDone={() => setAskInstall(false)} />;

  const showNav = !FULLSCREEN.test(path);
  return (
    <>
      {children}
      {showNav && <BottomNav />}
      {showNav && <MedalWatcher />}
    </>
  );
}

/** Mostra a celebração de medalhas novas (uma vez cada) */
function MedalWatcher() {
  const state = useStore();
  const fresh = earnedMedals(state).filter(m => !state.seenMedals.includes(m.id));
  const medal = fresh[0];
  if (!medal) return null;
  return (
    <Celebration
      open
      emoji={medal.emoji}
      mood="orgulhosa"
      title={`Medalha: ${medal.name}!`}
      text={`${medal.desc}. Ela já está no seu Baú de Conquistas.`}
      onClose={() => state.markMedalsSeen([medal.id])}
      cta={fresh.length > 1 ? 'Próxima conquista' : 'Uhuul!'}
    />
  );
}
