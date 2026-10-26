// O jsdom não implementa rolagem.
Element.prototype.scrollTo = () => {};
window.scrollTo = () => {};
// Nem canvas (a raspadinha só desenha no navegador).
HTMLCanvasElement.prototype.getContext = () => null;
