import { goToCheckout } from '../lib/track.js';

describe('goToCheckout', () => {
  it('leva os parâmetros do anúncio sem sobrescrever os do link', () => {
    history.replaceState({}, '', '/?utm_source=fb&fbclid=abc&upsell=false');
    window.open = vi.fn();
    goToCheckout('https://go.centerpag.com/PPU38CQH917?upsell=true');
    const url = new URL(window.open.mock.calls[0][0]);
    expect(window.open.mock.calls[0][1]).toBe('_self');
    expect(url.searchParams.get('utm_source')).toBe('fb');
    expect(url.searchParams.get('fbclid')).toBe('abc');
    expect(url.searchParams.get('upsell')).toBe('true');
  });
});
