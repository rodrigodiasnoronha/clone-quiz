'use client';

import { useStore } from './store';

let ctx: AudioContext | null = null;

/** Bipe curto gerado na hora (não depende de arquivos de áudio) */
export function beep(freq = 880, ms = 140, volume = 0.15) {
  if (!useStore.getState().settings.sound) return;
  try {
    ctx ??= new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = freq;
    osc.type = 'sine';
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + ms / 1000);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + ms / 1000);
  } catch {}
}

export const chime = () => { beep(660, 120); setTimeout(() => beep(880, 120), 130); setTimeout(() => beep(1175, 220), 260); };

export function vibrate(pattern: number | number[]) {
  if (!useStore.getState().settings.vibration) return;
  try { navigator.vibrate?.(pattern); } catch {}
}

/** Mantém a tela ligada durante o treino, quando o navegador permite */
export async function keepAwake(): Promise<() => void> {
  try {
    const nav = navigator as Navigator & { wakeLock?: { request: (t: 'screen') => Promise<{ release: () => Promise<void> }> } };
    const lock = await nav.wakeLock?.request('screen');
    return () => { lock?.release().catch(() => {}); };
  } catch {
    return () => {};
  }
}

/** Reduz a foto para caber no localStorage (lado maior 640px, JPEG) */
export function compressImage(file: File, max = 640, quality = 0.72): Promise<string> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, max / Math.max(img.width, img.height));
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      canvas.getContext('2d')!.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL('image/jpeg', quality));
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Couldn’t read the image.')); };
    img.src = url;
  });
}

export function download(filename: string, href: string) {
  const a = document.createElement('a');
  a.href = href;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
}
