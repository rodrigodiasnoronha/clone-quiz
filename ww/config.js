// Links do funil de upsell.
// yes = botão "SIM, QUERO..." (troque pelo link/checkout do upsell)
// no  = botão "AGORA NÃO..." (próxima página do funil)
const FUNNEL = {
  'ww-up1': { yes: '/ww-up2', no: '/ww-up2' },
  'ww-down1': { yes: '/ww-up2', no: '/ww-up2' }, // downsell do up1 (a recusa do up1 é definida no botão da Cakto)
  'ww-up2': { yes: '/ww-up3', no: '/ww-down2' },
  'ww-down2': { yes: '/ww-up3', no: '/ww-up3' }, // downsell do up2
  'ww-up3': { yes: '/ww-up4', no: '/ww-down3' },
  'ww-down3': { yes: '/ww-up4', no: '/ww-up4' }, // downsell do up3
  'ww-up4': { yes: '/ww-up5', no: '/ww-down4' },
  'ww-down4': { yes: '/ww-up5', no: '/ww-up5' }, // downsell do up4
  'ww-up5': { yes: '/ww-up6', no: '/ww-down5' },
  'ww-down5': { yes: '/ww-up6', no: '/ww-up6' }, // downsell do up5
  'ww-up6': { yes: '/ww-tks', no: '/ww-down6' },
  'ww-down6': { yes: '/ww-tks', no: '/ww-tks' }, // downsell do up6
  'ww-tks': { yes: '/material/' }, // botão "Acesse o material"
};

// Repassa os parâmetros da URL (utm, src, dados do comprador...) para o próximo link.
(function () {
  const page = document.body.dataset.page;
  const links = FUNNEL[page] || {};
  const params = new URLSearchParams(location.search);
  document.querySelectorAll('[data-go]').forEach((a) => {
    const target = links[a.dataset.go];
    if (!target) return;
    const url = new URL(target, location.origin);
    params.forEach((v, k) => { if (!url.searchParams.has(k)) url.searchParams.set(k, v); });
    a.href = url.origin === location.origin ? url.pathname + url.search + url.hash : url.href;
  });
})();
