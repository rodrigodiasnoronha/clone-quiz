'use client';

import { motion } from 'framer-motion';
import { Download, Share, SquarePlus, Wifi, Maximize, Smartphone, MoreVertical } from 'lucide-react';
import { useState } from 'react';
import { Luna } from './Luna';
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
    { icon: Smartphone, t: 'Ícone na tela inicial', d: 'Seu desafio a um toque, como qualquer app.' },
    { icon: Maximize, t: 'Tela cheia', d: 'Sem barra do navegador durante o treino.' },
    { icon: Wifi, t: 'Funciona sem internet', d: 'Depois do primeiro acesso, treine em qualquer lugar.' },
  ];

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-5 pb-8 pt-10">
      <div className="flex flex-1 flex-col items-center text-center">
        <motion.div initial={{ scale: .6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', damping: 14 }}>
          <Luna mood={installed ? 'orgulhosa' : 'animada'} size={130} />
        </motion.div>

        {installed ? (
          <>
            <h1 className="mt-4 text-3xl font-bold leading-tight">App instalado! 💜</h1>
            <p className="mt-2 text-ink-soft">Procure o ícone <b>Pilates 21</b> na sua tela inicial e abra por lá para a melhor experiência.</p>
            <img src="/app/icons/icon-192.png" alt="Ícone do app Pilates 21" className="mt-5 h-20 w-20 rounded-3xl shadow-card" />
            <div className="flex-1" />
            <button className="btn-primary shine mt-8 w-full" onClick={() => finish('installed')}>Continuar por aqui</button>
          </>
        ) : (
          <>
            <h1 className="mt-4 text-3xl font-bold leading-tight">Instale o app do seu desafio</h1>
            <p className="mt-2 text-ink-soft">Leva 5 segundos e deixa seus treinos muito mais práticos.</p>

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
                <p className="font-bold">Como instalar {ios ? 'no iPhone' : 'no seu celular'}:</p>
                {ios ? (
                  <ol className="mt-2 space-y-2">
                    <li>1. Toque em <Share size={17} className="inline -mt-0.5 text-grape-600" /> <b>Compartilhar</b>, na barra do Safari</li>
                    <li>2. Escolha <SquarePlus size={17} className="inline -mt-0.5 text-grape-600" /> <b>Adicionar à Tela de Início</b></li>
                    <li>3. Toque em <b>Adicionar</b> e abra pelo ícone 💜</li>
                  </ol>
                ) : (
                  <ol className="mt-2 space-y-2">
                    <li>1. Toque no menu <MoreVertical size={17} className="inline -mt-0.5 text-grape-600" /> do navegador</li>
                    <li>2. Escolha <b>Instalar app</b> ou <b>Adicionar à tela inicial</b></li>
                    <li>3. Confirme e abra pelo ícone 💜</li>
                  </ol>
                )}
              </div>
            )}

            <div className="flex-1" />
            {canPrompt && (
              <button className="btn-primary shine mt-8 w-full text-lg" disabled={busy} onClick={async () => { setBusy(true); await install(); setBusy(false); }}>
                <Download size={20} /> Instalar app
              </button>
            )}
            <button className={`${canPrompt ? 'btn-ghost mt-2' : 'btn-primary mt-8'} w-full`} onClick={() => finish('browser')}>
              {canPrompt ? 'Agora não, continuar no navegador' : 'Já instalei / continuar no navegador'}
            </button>
            <p className="mt-2 text-[11px] text-ink-faint">Você pode instalar depois, a qualquer momento, pelo Perfil.</p>
          </>
        )}
      </div>
    </main>
  );
}
