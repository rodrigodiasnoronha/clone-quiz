'use client';

import { toKey } from './dates';
import { useStore } from './store';

/**
 * Lembretes opcionais. Sem servidor, não existe push remoto:
 * o lembrete é mostrado pelo próprio app (via service worker) quando ele
 * está aberto ou em segundo plano no horário escolhido. Alguns celulares
 * podem limitar isso para economizar bateria; por isso o app também mostra
 * um aviso dentro da tela inicial.
 */

export const notificationsSupported = () => typeof window !== 'undefined' && 'Notification' in window;

export async function requestPermission() {
  if (!notificationsSupported()) return 'unsupported' as const;
  if (Notification.permission === 'granted') return 'granted' as const;
  if (Notification.permission === 'denied') return 'denied' as const;
  return (await Notification.requestPermission()) as NotificationPermission;
}

export async function showNotification(title: string, body: string) {
  if (!notificationsSupported() || Notification.permission !== 'granted') return false;
  try {
    const reg = await navigator.serviceWorker?.getRegistration();
    const opts = { body, icon: '/app/icons/icon-192.png', badge: '/app/icons/icon-192.png', tag: 'pnp21-lembrete' };
    if (reg) await reg.showNotification(title, opts);
    else new Notification(title, opts);
    return true;
  } catch {
    return false;
  }
}

const MESSAGES = [
  ['It’s time to take care of you! 💜', 'Today’s workout is waiting for you.'],
  ['Lili has a new mission for you today!', 'It only takes a few minutes. Shall we?'],
  ['A little movement today? 🌷', 'Your body will thank you.'],
];

let timer: ReturnType<typeof setTimeout> | undefined;

/** Agenda o lembrete de hoje enquanto o app estiver aberto */
export function scheduleReminder() {
  clearTimeout(timer);
  const { settings, days } = useStore.getState();
  if (!settings.reminders || !notificationsSupported() || Notification.permission !== 'granted') return;
  const [h, m] = settings.reminderTime.split(':').map(Number);
  const at = new Date();
  at.setHours(h, m, 0, 0);
  const today = toKey();
  const sentKey = `pnp21-reminder-${today}`;
  const doneToday = Object.values(days).some(d => d.completedAt === today);
  if (doneToday || localStorage.getItem(sentKey)) return;
  const wait = at.getTime() - Date.now();
  if (wait < 0) return;
  timer = setTimeout(() => {
    const [title, body] = MESSAGES[new Date().getDate() % MESSAGES.length];
    showNotification(title, body).then(ok => ok && localStorage.setItem(sentKey, '1'));
  }, wait);
}
