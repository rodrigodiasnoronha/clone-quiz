// Eventos do Meta Pixel (o código base do Pixel fica no <head> do index.html).
export function track(event, params) {
  try { window.fbq?.('track', event, params); } catch (e) {}
}

// Vai para o checkout levando os parâmetros do anúncio (utm_*, fbclid...) que vieram na URL.
// window.open (e não location.href) porque a UTMify só intercepta links, forms e window.open:
// assim ela também acrescenta os UTMs que guardou de visitas anteriores.
// O InitiateCheckout fica com o checkout da PerfectPay, que já envia com eventID (sem duplicar).
export function goToCheckout(url) {
  const dest = new URL(url);
  new URLSearchParams(location.search).forEach((v, k) => { if (!dest.searchParams.has(k)) dest.searchParams.set(k, v); });
  window.open(dest.href, '_self');
}

// Envia o lead para o webhook configurado (não trava o quiz se falhar)
export function sendLead(url, data) {
  if (!url) return;
  try { fetch(url, { method: 'POST', mode: 'no-cors', keepalive: true, headers: { 'Content-Type': 'text/plain' }, body: JSON.stringify(data) }); } catch (e) {}
}
