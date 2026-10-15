// Eventos do Meta Pixel (o código base do Pixel fica no <head> do index.html).
export function track(event, params) {
  try { window.fbq?.('track', event, params); } catch (e) {}
}

// Repassa os parâmetros da URL atual (utm_*, src, sck...) para o link de destino
export function withParams(url) {
  const u = new URL(url, location.href);
  new URLSearchParams(location.search).forEach((v, k) => u.searchParams.has(k) || u.searchParams.set(k, v));
  return u.href;
}

// Envia o evento e só depois troca de página, para o Pixel ter tempo de disparar.
export function trackAndGo(url, event, params) {
  track(event, params);
  setTimeout(() => (location.href = withParams(url)), window.fbq ? 300 : 0);
}

// Envia o lead para o webhook configurado (não trava o quiz se falhar)
export function sendLead(url, data) {
  if (!url) return;
  try { fetch(url, { method: 'POST', mode: 'no-cors', keepalive: true, headers: { 'Content-Type': 'text/plain' }, body: JSON.stringify(data) }); } catch (e) {}
}
