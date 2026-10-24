# clone-quiz

Funil de vendas do Pilates na Parede. São dois projetos independentes:

| Pasta | O que é | Stack | Aparece em |
|-------|---------|-------|------------|
| `src/` (raiz) | quiz de vendas | Vite + React | `/` |
| [`members-app/`](members-app/README.md) | app do Desafio 21 Dias, entregue após a compra | Next.js | `/app` |

O build do `members-app` é copiado para `public/app/` e já vai versionado.

```bash
npm install
npm run dev      # http://localhost:5173 com hot reload
npm run build    # gera dist/ (é isso que vai pro ar)
npm test         # Vitest: valida o quiz.json (tipos, destinos, imagens) e o fluxo do App
```

## Onde mexer

| Quero mudar…                              | Arquivo |
|-------------------------------------------|---------|
| Textos, opções, imagens e ordem das telas | [`src/quiz.json`](src/quiz.json) |
| Links de checkout, preço da oferta, webhook | [`src/config.js`](src/config.js) |
| Textos da oferta de saída (presente, bônus, FAQ) | [`src/components/ExitOffer.jsx`](src/components/ExitOffer.jsx) |
| Visual de um tipo de tela                 | [`src/components/layers/`](src/components/layers) + [`src/styles.css`](src/styles.css) |
| Pixel do Meta / UTMify                    | [`index.html`](index.html) |

## Como o quiz funciona

`src/quiz.json` é uma lista de **etapas** (`steps`); cada etapa é uma lista de **layers** (`text`, `options`, `button`, `field`, `price`…). `App.jsx` mostra uma etapa por vez e, para cada layer, renderiza o componente do mesmo `type` em `src/components/layers/index.js`.

- Respostas ficam em `answers` e entram nos textos via `{{nome}}`, `{{peso}}`…
- `useQuiz()` (em `src/context.js`) dá a qualquer layer: `answers`, `setAnswer`, `go`, `next`.
- `useValidate(fn)` impede o botão "Continuar" de avançar enquanto `fn()` for falso.
- **Tipo de tela novo:** crie `src/components/layers/MeuTipo.jsx` e registre em `layers/index.js`.

```
src/
  App.jsx            etapa atual, histórico, back redirect
  context.js         useQuiz / useValidate
  config.js          links e valores da oferta
  quiz.json          o conteúdo do funil
  components/        Header, ExitOffer, Rich, Media, Countdown
  components/layers/ um arquivo por tipo de tela
  lib/               texto/{{vars}}, Pixel e webhook
public/              arquivos servidos como estão (abaixo)
```

## `public/` (não passa pelo React)

- `assets/` — imagens e vídeo do quiz.
- `ww-up1` … `ww-up6`, `ww-tks`, `ww/` — páginas de upsell (links dos botões em `ww/config.js`).
- `material/` — PDFs. Para editar textos: `material/src/content.py`, depois `python3 public/material/src/build.py`.
- `app/` — app do Desafio 21 Dias (código em `members-app/`, ver [`members-app/README.md`](members-app/README.md)).

## Deploy (Vercel)

Preset **Vite**: build `npm run build`, output `dist`.
