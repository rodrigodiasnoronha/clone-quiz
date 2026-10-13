// URL para onde os botões finais ("OBTER MEU PLANO...") redirecionam.
// Usada só quando o botão do quiz.json não tem "destination".
export const REDIRECT_URL = 'https://wvltrack.com/t/obqtdteste';

// Oferta mostrada quando a pessoa tenta sair (botão voltar do navegador)
export const OFFER = {
  url: REDIRECT_URL, // troque pelo link do checkout com o desconto
  coupon: 'PILATES39',
  discount: '39%',
  oldPrice: 'R$ 27,90',
  price: 'R$ 17,00',
  minutes: 5,
};
