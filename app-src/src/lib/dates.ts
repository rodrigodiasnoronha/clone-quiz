/** Datas sempre no fuso local, no formato AAAA-MM-DD */
export function toKey(d = new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function fromKey(key: string) {
  const [y, m, d] = key.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function daysBetween(a: string, b: string) {
  return Math.round((fromKey(b).getTime() - fromKey(a).getTime()) / 86_400_000);
}

export function addDays(key: string, n: number) {
  const d = fromKey(key);
  d.setDate(d.getDate() + n);
  return toKey(d);
}

export function formatDate(key: string, opts: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short' }) {
  return fromKey(key).toLocaleDateString('pt-BR', opts);
}

/** Índice estável para conteúdos que mudam por dia */
export function dayIndex(key: string, size: number) {
  return Math.abs(Math.floor(fromKey(key).getTime() / 86_400_000)) % size;
}
