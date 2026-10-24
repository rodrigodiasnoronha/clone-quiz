'use client';

import { motion } from 'framer-motion';
import { Download, Share, SquarePlus, Wifi, Maximize, Smartphone, MoreVertical } from 'lucide-react';
import { useState } from 'react';
import { Lili } from './Lili';
import { INSTALL_KEY, isIOS, useInstall } from '@/lib/install';

/** Tela da primeira abertura: instalar o app ou continuar no navegador */
export function InstallGate({ onDone }: { onDone: () => void }) {
  const { canPrompt, installed, install } = useInstall();
  const [busy, setBusy] = useState(false);
  const ios = isIOS();

  const finish = (choice: 'browser' | 'installed') => {
    try { localStorage.setItem(INSTALL_KEY, choice); } catch {}
    onDone();
  };

  const benefits = [
    { icon: Smartphone, t: 'Icon on your home screen', d: 'Your challenge one tap away, like any app.' },
    { icon: Maximize, t: 'Full screen', d: 'No browser bar during your workout.' },
    { icon: Wifi, t: 'Works offline', d: 'After your first visit, work out anywhere.' },
  ];

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-5 pb-8 pt-10">
      <div className="flex flex-1 flex-col items-center text-center">
        <motion.div initial={{ scale: .6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', damping: 14 }}>
          <Lili mood={installed ? 'orgulhosa' : 'animada'} size={130} />
        </motion.div>

        {installed ? (
          <>
            <h1 className="mt-4 text-3xl font-bold leading-tight">App installed! 💜</h1>
            <p className="mt-2 text-ink-soft">Look for the <b>Pilates 21</b> icon on your home screen and open it from there for the best experience.</p>
            <img src="/app/icons/icon-192.png" alt="Pilates 21 app icon" className="mt-5 h-20 w-20 rounded-3xl shadow-card" />
            <div className="flex-1" />
            <button className="btn-primary shine mt-8 w-full" onClick={() => finish('installed')}>Continue here</button>
          </>
        ) : (
          <>
            <h1 className="mt-4 text-3xl font-bold leading-tight">Install your challenge app</h1>
            <p className="mt-2 text-ink-soft">It takes 5 seconds and makes your workouts so much easier.</p>

            <div className="mt-6 w-full space-y-2 text-left">
              {benefits.map((b, i) => (
                <motion.div key={b.t} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .2 + i * .1 }} className="card flex items-center gap-3 p-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-rose-100 to-lilac-200 text-grape-700"><b.icon size={20} /></span>
                  <span><span className="block font-bold">{b.t}</span><span className="block text-xs text-ink-soft">{b.d}</span></span>
                </motion.div>
              ))}
            </div>

            {!canPrompt && (
              <div className="mt-4 w-full rounded-3xl bg-white p-4 text-left text-sm shadow-soft ring-1 ring-lilac-100">
                <p className="font-bold">How to install {ios ? 'on iPhone' : 'on your phone'}:</p>
                {ios ? (
                  <ol className="mt-2 space-y-2">
                    <li>1. Tap <Share size={17} className="inline -mt-0.5 text-grape-600" /> <b>Share</b> in the Safari toolbar</li>
                    <li>2. Choose <SquarePlus size={17} className="inline -mt-0.5 text-grape-600" /> <b>Add to Home Screen</b></li>
                    <li>3. Tap <b>Add</b> and open it from the icon 💜</li>
                  </ol>
                ) : (
                  <ol className="mt-2 space-y-2">
                    <li>1. Tap the browser menu <MoreVertical size={17} className="inline -mt-0.5 text-grape-600" /></li>
                    <li>2. Choose <b>Install app</b> or <b>Add to Home screen</b></li>
                    <li>3. Confirm and open it from the icon 💜</li>
                  </ol>
                )}
              </div>
            )}

            <div className="flex-1" />
            {canPrompt && (
              <button className="btn-primary shine mt-8 w-full text-lg" disabled={busy} onClick={async () => { setBusy(true); await install(); setBusy(false); }}>
                <Download size={20} /> Install app
              </button>
            )}
            <button className={`${canPrompt ? 'btn-ghost mt-2' : 'btn-primary mt-8'} w-full`} onClick={() => finish('browser')}>
              {canPrompt ? 'Not now, continue in the browser' : 'I already installed it / continue in the browser'}
            </button>
            <p className="mt-2 text-[11px] text-ink-faint">You can install it later, anytime, from your Profile.</p>
          </>
        )}
      </div>
    </main>
  );
}
