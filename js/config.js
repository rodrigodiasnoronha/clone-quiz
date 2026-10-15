// URL para onde os botões finais ("OBTER MEU PLANO...") redirecionam.
// Usada só quando o botão do quiz.json não tem "destination".
export const REDIRECT_URL = 'https://pay.cakto.com.br/3dqkyya_1198209';

// Oferta mostrada quando a pessoa tenta sair (botão voltar do navegador)
export const OFFER = {
  url: 'https://pay.cakto.com.br/3g64u9w', // checkout do back redirect (já com o desconto)
  discount: '39%',
  oldPrice: 'R$ 27,90',
  price: 'R$ 17,00',
  minutes: 5,
};

// Para onde vão os leads (nome, e-mail e respostas) quando a pessoa informa o e-mail.
// Cole aqui a URL de um webhook (n8n, Make, Zapier, Google Apps Script...). Vazio = não envia.
export const LEAD_WEBHOOK = '';

// ALTERE O LINK PARA A PÁGINA QUE QUISER MOSTRAR QUANDO O USUÁRIO TENTAR SAIR
// da tela do presente ("Antes de sair... resgate o seu presente 🎁"). Padrão: checkout com desconto.
export const BACK_REDIRECT_URL = OFFER.url;
