// O jsdom não implementa rolagem.
Element.prototype.scrollTo = () => {};
window.scrollTo = () => {};
