import { render, screen, cleanup, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App.jsx';

afterEach(cleanup);

const back = () => document.querySelector('#back');
const title = () => document.querySelector('#app h1')?.textContent;

describe('App', () => {
  it('mostra a primeira etapa e avança ao escolher uma opção', async () => {
    render(<App />);
    const first = title();
    expect(first).toBe('What is your age?');
    expect(back().hidden).toBe(true);

    await userEvent.click(document.querySelector('.opt'));
    await waitFor(() => expect(title()).not.toBe(first));
    expect(back().hidden).toBe(false);
  });

  it('o botão voltar retorna à etapa anterior', async () => {
    render(<App />);
    await userEvent.click(document.querySelector('.opt'));
    await waitFor(() => expect(back().hidden).toBe(false));
    await userEvent.click(back());
    expect(title()).toBe('What is your age?');
  });

  it('o popstate (voltar do navegador) abre o presente de saída', async () => {
    render(<App />);
    dispatchEvent(new PopStateEvent('popstate'));
    expect(await screen.findByText('Wait!')).toBeTruthy();
  });
});
