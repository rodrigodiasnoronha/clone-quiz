# clone-quiz

Site estático com duas partes:

- **`/`** — quiz de vendas do Pilates na Parede (`index.html`, `js/`, `css/`, `data/quiz.json`, `assets/`).
- **`/ww-up1` … `/ww-up6`** — páginas de upsell (estilos, ícones e imagens em `ww/`). Os links dos botões ficam em [`ww/config.js`](ww/config.js).
- **`/material`** — downloads dos materiais em PDF (`material/pdf/`). Para editar textos: `material/src/content.py` e rode `python3 material/src/build.py`.
- **`/app`** — app do Desafio 21 Dias entregue após a compra (build pronto em `app/`, código-fonte em `app-src/`).

Para publicar, sirva a raiz do repositório como site estático (Vercel: preset "Other", sem build, output `.`).
Detalhes do app, como rodar e como atualizar o build: [`app-src/README.md`](app-src/README.md).
