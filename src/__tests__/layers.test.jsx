import { useRef, useState } from 'react';
import { render, screen, cleanup, fireEvent, act } from '@testing-library/react';
import { QuizContext } from '../context.js';
import Field from '../components/layers/Field.jsx';
import Options from '../components/layers/Options.jsx';
import { Weight } from '../components/layers/Ruler.jsx';
import Button from '../components/layers/Button.jsx';
import Rich from '../components/Rich.jsx';

afterEach(cleanup);

// Monta um layer com um contexto de quiz mínimo; `api.next()` roda as validações como o botão Continuar.
function mount(ui, initial = {}) {
  const api = { go: vi.fn() };
  function Harness() {
    const [answers, setAnswers] = useState(initial);
    const validators = useRef(new Set());
    api.answers = answers;
    api.next = () => [...validators.current].every(fn => fn());
    const ctx = {
      answers,
      setAnswer: (k, v) => setAnswers(a => ({ ...a, [k]: v })),
      go: api.go,
      next: api.next,
      validate: fn => { validators.current.add(fn); return () => validators.current.delete(fn); },
    };
    return <QuizContext.Provider value={ctx}>{ui}</QuizContext.Provider>;
  }
  render(<Harness />);
  return api;
}

describe('Field', () => {
  const email = { name: 'email', mask: 'email', required: true, error: 'Invalid email', placeholder: 'email' };

  it('bloqueia e-mail inválido e mostra o erro', () => {
    const api = mount(<Field content={email} />);
    fireEvent.change(screen.getByPlaceholderText('email'), { target: { value: 'ana@' } });
    let ok;
    act(() => { ok = api.next(); });
    expect(ok).toBe(false);
    expect(screen.getByText('Invalid email')).toBeTruthy();
  });

  it('aceita e-mail válido e salva a resposta', () => {
    const api = mount(<Field content={email} />);
    fireEvent.change(screen.getByPlaceholderText('email'), { target: { value: ' ana@site.com ' } });
    expect(api.next()).toBe(true);
    expect(api.answers.email).toBe('ana@site.com');
  });
});

describe('Options', () => {
  const opts = [{ id: 'a', label: '<p>Belly</p>' }, { id: 'b', label: '<p>Legs</p>' }];

  it('múltipla escolha obrigatória só avança com algo marcado', () => {
    const api = mount(<Options content={{ name: 'areas', multiple: true, required: true, options: opts }} design={{}} />);
    expect(api.next()).toBe(false);
    fireEvent.click(screen.getByText('Belly'));
    fireEvent.click(screen.getByText('Legs'));
    expect(api.next()).toBe(true);
    expect(api.answers.areas).toBe('Belly, Legs');
  });

  it('escolha única avança sozinha para o destino da opção', () => {
    vi.useFakeTimers();
    const api = mount(<Options content={{ name: 'age', options: [{ ...opts[0], destination: 'X1' }] }} design={{}} />);
    fireEvent.click(screen.getByText('Belly'));
    act(() => vi.runAllTimers());
    vi.useRealTimers();
    expect(api.go).toHaveBeenCalledWith('X1');
    expect(api.answers.age).toBe('Belly');
  });
});

describe('Ruler', () => {
  it('meta de peso precisa ser menor que o peso atual', () => {
    const api = mount(<Weight content={{ name: 'objetivo', value: 140 }} />, { peso: 150, objetivo: 160 });
    let ok;
    act(() => { ok = api.next(); });
    expect(ok).toBe(false);
    expect(screen.getByText(/must be lower than your current weight/)).toBeTruthy();
  });

  it('começa a meta 10 lb abaixo do peso informado', () => {
    const api = mount(<Weight content={{ name: 'objetivo', value: 140 }} />, { peso: 150 });
    expect(api.answers.objetivo).toBe(140);
    expect(api.next()).toBe(true);
  });
});

describe('Button', () => {
  it('botão de compra vai para o checkout com os parâmetros do anúncio', () => {
    history.replaceState({}, '', '/?utm_source=fb');
    window.open = vi.fn();
    mount(<Button content={{ type: 'redirect', label: 'BUY', destination: 'https://go.centerpag.com/X' }} design={{}} />);
    fireEvent.click(screen.getByText('BUY'));
    expect(window.open).toHaveBeenCalledWith('https://go.centerpag.com/X?utm_source=fb', '_self');
  });

  it('não dispara InitiateCheckout (fica com a PerfectPay)', () => {
    window.fbq = vi.fn();
    window.open = vi.fn();
    mount(<Button content={{ type: 'redirect', label: 'BUY', destination: 'https://go.centerpag.com/X' }} design={{}} />);
    fireEvent.click(screen.getByText('BUY'));
    expect(window.fbq).not.toHaveBeenCalled();
    delete window.fbq;
  });

  it('botão de lead só dispara Lead se a validação passar', () => {
    window.fbq = vi.fn();
    const api = mount(<><Field content={{ name: 'email', mask: 'email', required: true, error: 'x', placeholder: 'email' }} /><Button content={{ type: 'next', label: 'GO', lead: true }} design={{}} /></>);
    act(() => { fireEvent.click(screen.getByText('GO')); });
    expect(window.fbq).not.toHaveBeenCalled();
    fireEvent.change(screen.getByPlaceholderText('email'), { target: { value: 'a@b.com' } });
    fireEvent.click(screen.getByText('GO'));
    expect(window.fbq).toHaveBeenCalledWith('track', 'Lead', expect.anything());
    expect(api.next()).toBe(true);
    delete window.fbq;
  });

  it('Enter ("Ir" do teclado) no campo toca no botão da etapa', () => {
    window.fbq = vi.fn();
    mount(<main><Field content={{ name: 'email', mask: 'email', required: true, placeholder: 'email' }} /><Button content={{ type: 'next', label: 'GO', lead: true }} design={{}} /></main>);
    const input = screen.getByPlaceholderText('email');
    fireEvent.change(input, { target: { value: 'a@b.com' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(window.fbq).toHaveBeenCalledWith('track', 'Lead', expect.anything());
    delete window.fbq;
  });
});

describe('Rich', () => {
  it('preenche {{variáveis}} com as respostas', () => {
    mount(<Rich html="<h1>{{nome}}, your plan</h1>" />, { nome: 'Ana' });
    expect(screen.getByText('Ana, your plan')).toBeTruthy();
  });
});
