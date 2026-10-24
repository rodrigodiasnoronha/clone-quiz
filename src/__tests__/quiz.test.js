import { readdirSync } from 'node:fs';
import quiz from '../quiz.json';
import layers from '../components/layers';
import { fill, plain, bracket, stepImages } from '../lib/text.js';

// Protege o quiz.json: quem editar o conteúdo descobre aqui se quebrou algo.
describe('quiz.json', () => {
  const ids = new Set(quiz.steps.map(s => s.id));
  const allLayers = quiz.steps.flatMap(s => s.layers);

  it('todo type de layer tem componente', () => {
    const missing = [...new Set(allLayers.map(l => l.type))].filter(t => !layers[t]);
    expect(missing).toEqual([]);
  });

  it('todo destination aponta para uma etapa que existe', () => {
    const dests = allLayers.flatMap(l => [l.content?.destination, ...(l.content?.options || []).map(o => o.destination)])
      .filter(d => d && d !== 'next' && !/^https?:/.test(d));
    expect(dests.filter(d => !ids.has(d))).toEqual([]);
  });

  it('toda imagem referenciada existe em public/assets', () => {
    const files = new Set(readdirSync('public/assets'));
    const missing = quiz.steps.flatMap(stepImages).filter(src => !files.has(src.replace('assets/', '')));
    expect(missing).toEqual([]);
  });
});

describe('lib/text', () => {
  it('fill troca {{vars}} e &nbsp;', () => {
    expect(fill('Oi, {{nome}}&nbsp;tudo?', { nome: 'Ana' })).toBe('Oi, Ana tudo?');
    expect(fill('{{x}}', {})).toBe('');
  });
  it('plain tira as tags', () => expect(plain('<p><strong>18 - 29</strong></p>')).toBe('18 - 29'));
  it('bracket lê classe arbitrária do Tailwind', () => {
    expect(bracket('h-[2rem]')).toBe('2rem');
    expect(bracket(undefined)).toBeUndefined();
  });
});
