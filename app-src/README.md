# Pilates na Parede — Desafio 21 Dias (app)

App web (PWA) entregue após a compra. Fica em **seudominio.com/app**; o quiz de vendas continua na raiz do site.

- **Só frontend**: Next.js 14 (App Router) com exportação estática, React, TypeScript, Tailwind CSS, Framer Motion, Lucide Icons e Zustand.
- **Dados no localStorage** (chave `pnp21`; fotos em chaves `pnp21-photo-*`). Nada é enviado para servidor.
- **PWA instalável**: manifesto, ícones e service worker (`public/sw.js`) com cache para funcionar offline depois do primeiro acesso.

## Rodar localmente

```bash
cd app-src
npm install
npm run dev          # http://localhost:3000/app
```

## Publicar

O build gera arquivos estáticos e copia para a pasta `app/` na raiz do repositório:

```bash
cd app-src
npm run export:site  # next build + copia out/ para ../app
```

Depois é só publicar o repositório como site estático. A pasta `app/` já vai versionada, então **qualquer hospedagem estática** serve o quiz em `/` e o app em `/app`.

### Vercel

1. Importe o repositório na Vercel.
2. *Framework Preset*: **Other**. *Build Command*: deixe vazio. *Output Directory*: `.` (raiz).
3. Deploy. O quiz abre em `/` e o app em `/app/`.

> Sempre que mudar algo em `app-src/`, rode `npm run export:site` e faça commit da pasta `app/`.
> Para o service worker entregar a versão nova a quem já instalou, aumente `VERSION` em `public/sw.js`.

## Navegação e telas

Menu inferior: **Início · Desafios · Treinar · Conquistas · Mais**.

- **Início** (`/`): Lili, dia atual, sequência, pontos, progresso, treino do dia, missões, próxima recompensa.
- **Desafios** (`/desafios`): calendário / mapa da jornada, dia atual, missões do dia e desafios semanais. Detalhe do dia em `/treinos/dia/[n]`, treino em `/treinar/[n]`.
- **Treinar** (`/treinar`): biblioteca com os 38 exercícios, busca, filtros por região, detalhes e prática avulsa (`/praticar/[id]`), aulas e sessões.
- **Conquistas** (`/conquistas`): nível com a Lili, medalhas (todas / em progresso / concluídas), conteúdos desbloqueados, origem dos pontos. Compartilhar em `/compartilhar` (imagem 1080×1920 para Stories). Certificados em `/certificado/[tipo]`.
- **Mais** (`/mais`): Minha Jornada (`/evolucao`), Hidratação (`/hidratacao`), Modo Relaxamento (`/relaxar`: respiração, alongamento, meditação, sono), Missões e jogos (`/missoes`, `/jogos/*`), Biblioteca VIP (`/biblioteca`), Perfil (`/perfil`).

Endereços antigos `/treinos` e `/evolucao/bau` redirecionam para `/desafios` e `/conquistas`.

## Imagens

- `public/lili/` — a mascote **Lili**, recortada da arte de referência do produto. Os recortes são pequenos (a arte original tinha várias telas em uma imagem); para mais nitidez, substitua pelos arquivos originais em alta resolução mantendo os mesmos nomes.
- `public/fotos/` — fotos do quiz usadas só como decoração (cards e banners), não como demonstração de exercício.

## Estrutura

```
src/
  app/          telas (rotas acima)
  components/   Lili (mascote), Player, Games, Charts, Garden, JourneyMap, Calendar, ui (TopBar, HeroHeader, Logo…)
  content/      exercises.ts, program.ts (21 dias e sessões), library.ts, extras.ts (quiz, cartas, roleta)
  lib/          store (localStorage), progress (pontos, níveis, medalhas), workout (adaptação), shareCard, certificate
```

## Regras principais

- **Liberação**: 1 dia novo por dia corrido, em ordem. Dias perdidos ficam *pendentes* e podem ser recuperados sem penalidade (até dois no mesmo dia).
- **Pontos de Evolução**: calculados a partir dos fatos registrados (treino concluído, missão, diário…), cada um com chave única. Recarregar a página ou refazer um treino não soma de novo.
- **Adaptação**: tempo por dia muda o número de séries; nível muda repetições, tempo e descanso; limitações (joelhos, lombar, punhos, ombros, pescoço) trocam automaticamente os exercícios contraindicados; o objetivo adiciona um bônus opcional ao fim do treino.
- **Modo demonstração** (Perfil): libera todos os dias para testar.
- **Lembretes**: opcionais, com permissão do navegador. Sem servidor não há push remoto: o lembrete é exibido pelo app quando ele está aberto/ativo no horário.

## O que ainda precisa de material ou validação externa

1. **Vídeos dos exercícios** — hoje cada exercício mostra um espaço reservado identificado ("Vídeo demonstrativo em breve"), sem ilustrações de corpo humano. Para colocar um vídeo real:
   - grave/obtenha o vídeo (MP4, vertical ou 4:3, leve, sem som);
   - salve em `public/media/<id>.mp4`;
   - no exercício correspondente em `src/content/exercises.ts`, adicione `video: '/app/media/<id>.mp4'`.

   | id | exercício |
   |---|---|
   | `respiracao-lateral` | Respiração lateral na parede |
   | `basculamento-pelvico` | Basculamento pélvico com pés na parede |
   | `rolamento-coluna` | Rolamento de coluna na parede |
   | `anjos-parede` | Anjos na parede |
   | `gato-vaca-parede` | Gato-vaca em pé na parede |
   | `circulos-quadril` | Círculos de quadril com apoio na parede |
   | `rotacao-toracica` | Rotação torácica na parede |
   | `abertura-peito` | Alongamento de peitoral na parede |
   | `marcha-apoiada` | Marcha com apoio na parede |
   | `mobilidade-tornozelo` | Mobilidade de tornozelo na parede |
   | `ponte-parede` | Ponte com pés na parede |
   | `ponte-marcha` | Ponte com marcha na parede |
   | `ponte-unilateral` | Ponte unilateral na parede |
   | `agachamento-isometrico` | Agachamento isométrico na parede |
   | `agachamento-deslizante` | Agachamento deslizante na parede |
   | `flexao-parede` | Flexão de braços na parede |
   | `prancha-parede` | Prancha inclinada na parede |
   | `escalador-parede` | Escalador inclinado na parede |
   | `abducao-em-pe` | Abdução de quadril em pé na parede |
   | `extensao-quadril` | Extensão de quadril em pé na parede |
   | `elevacao-panturrilha` | Elevação de calcanhares na parede |
   | `dead-bug-parede` | Dead bug empurrando a parede |
   | `hundred-parede` | Hundred preparatório com pés na parede |
   | `toque-pes-parede` | Toque alternado de pés (pés na parede) |
   | `deslize-pernas` | Deslize de pernas na parede |
   | `circulos-perna` | Círculos de perna com pé na parede |
   | `concha-parede` | Concha deitada com pés na parede |
   | `prancha-lateral-parede` | Prancha lateral inclinada na parede |
   | `afundo-apoiado` | Afundo estático com apoio na parede |
   | `swan-em-pe` | Abertura de peito em pé (Swan na parede) |
   | `equilibrio-unipodal` | Equilíbrio em uma perna com apoio na parede |
   | `pernas-na-parede` | Pernas para cima na parede |
   | `borboleta-parede` | Borboleta com pernas na parede |
   | `figura-quatro` | Alongamento figura 4 com pé na parede |
   | `posterior-parede` | Alongamento de posterior com perna na parede |
   | `quadriceps-apoio` | Alongamento de quadríceps com apoio na parede |
   | `panturrilha-alongamento` | Alongamento de panturrilha na parede |
   | `inclinacao-lateral` | Inclinação lateral com apoio na parede |
2. **Revisão profissional** — os textos de execução, respiração, erros comuns, adaptações e segurança (`src/content/exercises.ts` e `program.ts`) foram escritos para iniciantes com base em exercícios reais de Pilates na Parede, mas devem ser revisados por um(a) profissional de Pilates/Educação Física antes da publicação.
3. **Ilustrações** — a mascote Luna é um SVG original (uma lua com faixa). Se quiser ilustrações de pessoas, use artes feitas por ilustrador(a) e revisadas.
4. **Notificações push remotas** exigiriam um servidor (Web Push); não fazem parte desta versão só frontend.
