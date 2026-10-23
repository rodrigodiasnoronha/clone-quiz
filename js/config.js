// URL para onde os botões finais ("OBTER MEU PLANO...") redirecionam.
// Usada só quando o botão do quiz.json não tem "destination".
export const REDIRECT_URL = 'https://go.centerpag.com/PPU38CQH917?upsell=true';

// Oferta mostrada quando a pessoa tenta sair (botão voltar do navegador)
export const OFFER = {
  url: 'https://go.centerpag.com/PPU38CQH9BJ?upsell=true', // checkout do back redirect (já com o desconto)
  discount: '37%',
  oldPrice: '$27',
  price: '$17',
  minutes: 5,
};

// Para onde vão os leads (nome, e-mail e respostas) quando a pessoa informa o e-mail.
// Cole aqui a URL de um webhook (n8n, Make, Zapier, Google Apps Script...). Vazio = não envia.
export const LEAD_WEBHOOK = '';

// ALTERE O LINK PARA A PÁGINA QUE QUISER MOSTRAR QUANDO O USUÁRIO TENTAR SAIR
// da tela do presente ("Antes de sair... resgate o seu presente 🎁"). Padrão: checkout com desconto.
export const BACK_REDIRECT_URL = OFFER.url;
