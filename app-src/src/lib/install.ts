'use client';

import { useEffect, useState } from 'react';

/**
 * Instalação do PWA.
 * O Chrome/Android dispara "beforeinstallprompt" logo no carregamento; um
 * script no <head> (layout.tsx) guarda esse evento em window.__pnpInstall
 * para ele não se perder antes do React montar.
 */
export type InstallEvent = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }> };

declare global {
  interface Window { __pnpInstall?: InstallEvent | null; __pnpInstalled?: boolean }
}

export const INSTALL_KEY = 'pnp21-install-choice';

export const isStandalone = () =>
  typeof window !== 'undefined' &&
  (window.matchMedia('(display-mode: standalone)').matches || (navigator as Navigator & { standalone?: boolean }).standalone === true);

export const isIOS = () => typeof navigator !== 'undefined' && /iphone|ipad|ipod/i.test(navigator.userAgent) && !/crios|fxios/i.test(navigator.userAgent);

export function useInstall() {
  const [prompt, setPrompt] = useState<InstallEvent | null>(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    setPrompt(window.__pnpInstall ?? null);
    setInstalled(isStandalone() || !!window.__pnpInstalled);
    const onPrompt = (e: Event) => { e.preventDefault(); window.__pnpInstall = e as InstallEvent; setPrompt(e as InstallEvent); };
    const onInstalled = () => { window.__pnpInstalled = true; window.__pnpInstall = null; setPrompt(null); setInstalled(true); };
    window.addEventListener('beforeinstallprompt', onPrompt);
    window.addEventListener('appinstalled', onInstalled);
    return () => { window.removeEventListener('beforeinstallprompt', onPrompt); window.removeEventListener('appinstalled', onInstalled); };
  }, []);

  /** Abre o instalador nativo; devolve true se a pessoa aceitou */
  async function install() {
    if (!prompt) return false;
    await prompt.prompt();
    const { outcome } = await prompt.userChoice;
    window.__pnpInstall = null;
    setPrompt(null);
    if (outcome === 'accepted') setInstalled(true);
    return outcome === 'accepted';
  }

  return { canPrompt: !!prompt, installed, install };
}

/** Script inline do <head>: guarda o evento de instalação o quanto antes */
export const EARLY_INSTALL_SCRIPT = `window.addEventListener('beforeinstallprompt',function(e){e.preventDefault();window.__pnpInstall=e;});window.addEventListener('appinstalled',function(){window.__pnpInstalled=true;window.__pnpInstall=null;});`;
