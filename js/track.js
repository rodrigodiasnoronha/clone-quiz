// Eventos do Meta Pixel (o código base do Pixel fica no <head> do index.html).
export function track(event, params) {
  try { window.fbq?.('track', event, params); } catch (e) {}
}

// Envia o evento e só depois troca de página, para o Pixel ter tempo de disparar.
export function trackAndGo(url, event, params) {
  track(event, params);
  setTimeout(() => (location.href = url), window.fbq ? 300 : 0);
}
