export interface Article {
  slug: string;
  title: string;
  emoji: string;
  minutes: number;
  intro: string;
  sections: { h: string; p: string[] }[];
}

export const ARTICLES: Article[] = [
  {
    slug: 'fundamentos', title: 'Fundamentos do Pilates na Parede', emoji: '🧱', minutes: 4,
    intro: 'O Pilates foi criado por Joseph Pilates no começo do século XX como um método de condicionamento que une força, controle e consciência corporal. Na versão com parede, ela vira o seu "aparelho": dá apoio, resistência e referência de alinhamento.',
    sections: [
      { h: 'Os 6 princípios', p: [
        'Concentração: cada movimento é feito com atenção total, não no automático.',
        'Controle: nenhum movimento é jogado; você conduz o corpo do início ao fim.',
        'Centro: o abdômen profundo, o assoalho pélvico e os músculos das costas formam a base de tudo.',
        'Respiração: a expiração acompanha o esforço e ajuda a estabilizar o tronco.',
        'Precisão: poucas repetições bem feitas valem mais que muitas apressadas.',
        'Fluidez: com o tempo, os movimentos se encadeiam de forma contínua.',
      ] },
      { h: 'Por que a parede ajuda', p: [
        'A parede mostra se a coluna está alinhada: quando quadril, costas e cabeça encostam, você tem uma referência clara de postura.',
        'Ela também serve de apoio para equilíbrio e de superfície para empurrar, criando resistência sem nenhum equipamento.',
      ] },
      { h: 'O que você precisa', p: ['Uma parede livre de quadros e tomadas na altura do corpo, um tapete ou toalha dobrada e roupas confortáveis. Pode treinar descalça ou com meias antiderrapantes.'] },
    ],
  },
  {
    slug: 'respiracao', title: 'Como respirar durante os exercícios', emoji: '🌬️', minutes: 3,
    intro: 'No Pilates usamos a respiração lateral (ou intercostal): o ar expande as costelas para os lados e para trás, enquanto o abdômen continua levemente ativo.',
    sections: [
      { h: 'Passo a passo', p: [
        'Coloque as mãos nas laterais das costelas.',
        'Inspire pelo nariz sentindo as costelas abrirem contra as mãos, sem estufar a barriga.',
        'Expire pela boca, devagar, como se soprasse uma vela sem apagá-la, e sinta as costelas se fecharem.',
      ] },
      { h: 'Quando inspirar e expirar', p: [
        'Regra geral: expire no momento de maior esforço (subir a ponte, empurrar a parede, elevar a perna) e inspire ao voltar.',
        'Nas sustentações (prancha, agachamento isométrico), respire continuamente. Prender o ar aumenta a pressão no tronco e cansa mais rápido.',
      ] },
      { h: 'Respiração para acalmar', p: ['Expirar por mais tempo do que inspira (por exemplo, 4 tempos para inspirar e 6 para expirar) é uma forma simples de desacelerar depois do treino ou antes de dormir.'] },
    ],
  },
  {
    slug: 'adaptar', title: 'Como adaptar os movimentos', emoji: '🪄', minutes: 3,
    intro: 'Adaptar não é fazer "menos": é fazer o exercício certo para o seu corpo hoje. Todo exercício do desafio tem uma versão mais fácil no botão "Versão mais fácil".',
    sections: [
      { h: 'As 4 alavancas de adaptação', p: [
        'Amplitude: faça um movimento menor. Um agachamento curto ainda fortalece.',
        'Inclinação: nos exercícios em pé de frente para a parede, aproxime os pés dela para deixar mais leve.',
        'Tempo: reduza a sustentação ou faça menos repetições, mantendo a qualidade.',
        'Apoio: use a parede, as mãos ou dobre os joelhos sempre que precisar.',
      ] },
      { h: 'Limitações informadas no início', p: ['Se você marcou joelhos, lombar, punhos, ombros ou pescoço no seu perfil, o app já troca automaticamente os exercícios que costumam sobrecarregar essas regiões. Você pode mudar isso no Perfil a qualquer momento.'] },
      { h: 'Quando ficou fácil', p: ['Se terminar as séries sentindo que poderia fazer muito mais, aumente o desafio no Perfil (nível intermediário ou avançado) ou escolha mais minutos por dia.'] },
    ],
  },
  {
    slug: 'postura', title: 'Postura no cotidiano', emoji: '🧍‍♀️', minutes: 4,
    intro: 'A postura não é uma posição fixa e "perfeita": é a capacidade de mudar de posição com conforto. Ainda assim, alguns ajustes simples fazem muita diferença ao longo do dia.',
    sections: [
      { h: 'No celular', p: ['Traga o celular para a altura dos olhos em vez de descer a cabeça. Cada vez que você lembrar, faça um "queixo duplo" suave para realinhar o pescoço.'] },
      { h: 'Sentada', p: ['Apoie os dois pés no chão, sente sobre os ísquios (os ossinhos do bumbum) e use um apoio atrás da lombar se a cadeira for funda. Levante-se a cada 45–60 minutos, nem que seja para pegar água.'] },
      { h: 'Carregando peso', p: ['Divida as sacolas entre as duas mãos, mantenha o peso perto do corpo e dobre os joelhos para pegar algo do chão, ativando o abdômen como no Pilates.'] },
      { h: 'O teste da parede', p: ['Encoste calcanhares, quadril, costas e cabeça na parede por 30 segundos. Perceba onde o corpo encosta com facilidade e onde não: esse é um ótimo lembrete do alinhamento que você treina no desafio.'] },
    ],
  },
  {
    slug: 'recuperacao', title: 'Recuperação e descanso', emoji: '🌙', minutes: 3,
    intro: 'O treino é o estímulo; a adaptação acontece no descanso. É por isso que o desafio tem dias de mobilidade e recuperação ativa.',
    sections: [
      { h: 'Dor muscular é normal?', p: ['Uma sensibilidade leve nos músculos 24 a 48 horas depois de um treino novo é comum e tende a diminuir com a regularidade. Dor aguda, pontada, inchaço ou dor na articulação não são normais: pause e, se persistir, procure um profissional de saúde.'] },
      { h: 'Sono', p: ['Dormir bem ajuda na recuperação muscular, no humor e no apetite. Tente manter horários parecidos para dormir e acordar, inclusive nos fins de semana.'] },
      { h: 'Recuperação ativa', p: ['Nos dias leves, movimentos suaves (mobilidade, caminhada, alongamento) ajudam a circulação e a sensação de corpo "solto" sem gerar cansaço extra.'] },
    ],
  },
  {
    slug: 'alongamentos', title: 'Alongamentos rápidos', emoji: '🤸‍♀️', minutes: 3,
    intro: 'Quatro alongamentos com a parede para qualquer pausa do dia. Fique de 20 a 40 segundos em cada um, respirando devagar.',
    sections: [
      { h: '1. Peitoral na parede', p: ['Antebraço apoiado na parede na altura do ombro, gire o peito para o lado oposto. Ótimo para quem passa muito tempo no computador.'] },
      { h: '2. Panturrilha', p: ['Mãos na parede, uma perna estendida atrás com o calcanhar no chão. Leve o quadril à frente.'] },
      { h: '3. Lateral do tronco', p: ['De lado para a parede, mão de dentro apoiada, braço de fora sobre a cabeça, incline em direção à parede.'] },
      { h: '4. Pernas na parede', p: ['Deitada com as pernas apoiadas na parede. Relaxa as pernas e é uma ótima forma de terminar o dia.'] },
      { h: 'Lembrete', p: ['Alongamento deve causar uma sensação de estiramento confortável. Se doer ou formigar, diminua a intensidade.'] },
    ],
  },
  {
    slug: 'mobilidade', title: 'Mobilidade para iniciantes', emoji: '🔄', minutes: 3,
    intro: 'Flexibilidade é o quanto um músculo consegue alongar. Mobilidade é o quanto você consegue mover ativamente uma articulação, com controle. As duas se complementam.',
    sections: [
      { h: 'Por que treinar mobilidade', p: ['Articulações com boa mobilidade facilitam movimentos do dia a dia, como pegar algo em uma prateleira alta, agachar para amarrar o tênis ou olhar para trás ao dirigir.'] },
      { h: 'As regiões-chave', p: ['Coluna torácica (meio das costas), quadril e tornozelos costumam ficar rígidos com o sedentarismo. Por isso aparecem tanto no desafio: rotação torácica, círculos de quadril e mobilidade de tornozelo.'] },
      { h: 'Como praticar', p: ['Movimentos lentos, sem balanço, dentro de uma amplitude confortável. Repetir um pouco todos os dias funciona melhor do que muito de vez em quando.'] },
    ],
  },
  {
    slug: 'constancia', title: 'Como manter a constância', emoji: '📆', minutes: 4,
    intro: 'Motivação vai e vem. Constância é construída com estratégia. Algumas ideias que funcionam para muita gente:',
    sections: [
      { h: 'Âncora o treino em um hábito', p: ['"Depois de escovar os dentes de manhã, eu faço meu treino." Ligar o novo hábito a algo que você já faz reduz o esforço de lembrar.'] },
      { h: 'Regra dos 2 minutos', p: ['Nos dias difíceis, combine consigo mesma fazer só o aquecimento. Muitas vezes você continua; e se não continuar, ainda manteve o hábito vivo.'] },
      { h: 'Prepare o ambiente', p: ['Deixe o tapete à vista, perto da parede. Quanto menos passos entre você e o treino, mais fácil começar.'] },
      { h: 'Perder um dia não é perder o desafio', p: ['Se faltar um dia, retome no seguinte. No app, os dias perdidos ficam como "pendentes" e você pode recuperá-los sem penalidade.'] },
      { h: 'Depois dos 21 dias', p: ['Ao concluir, use a rotina de manutenção (A, B e C) 3 vezes por semana para manter o que conquistou.'] },
    ],
  },
  {
    slug: 'cuidados', title: 'Cuidados durante a prática', emoji: '🩺', minutes: 3,
    intro: 'O Pilates na Parede é de baixo impacto, mas todo exercício físico pede atenção aos sinais do corpo.',
    sections: [
      { h: 'Pare o exercício se sentir', p: ['Dor no peito, falta de ar desproporcional, tontura, visão turva, dor aguda em articulações ou formigamento que não passa. Se os sintomas persistirem, procure atendimento médico.'] },
      { h: 'Converse com um profissional antes se', p: ['Você está grávida ou teve parto recente, tem doença cardíaca, pressão alta não controlada, hérnia de disco, cirurgia recente, osteoporose ou qualquer condição que exija acompanhamento.'] },
      { h: 'Ambiente seguro', p: ['Use uma superfície que não escorregue, afaste móveis com quinas e tenha água por perto.'] },
      { h: 'Importante', p: ['Este app oferece conteúdo educativo e de bem-estar e não substitui avaliação médica, fisioterapêutica ou acompanhamento de um profissional de Educação Física.'] },
    ],
  },
  {
    slug: 'faq', title: 'Perguntas frequentes', emoji: '💬', minutes: 4,
    intro: 'As dúvidas mais comuns sobre o desafio.',
    sections: [
      { h: 'Nunca fiz Pilates. Consigo acompanhar?', p: ['Sim. A Fase 1 foi pensada para quem está começando, e todo exercício tem uma versão mais fácil.'] },
      { h: 'Quanto tempo leva cada treino?', p: ['Depende do tempo que você escolheu no perfil: entre 10 e 30 minutos. O app ajusta as séries para caber no seu dia.'] },
      { h: 'Preciso treinar todos os dias?', p: ['O desafio libera um dia por vez. Se perder algum, ele fica pendente e você pode recuperar quando quiser, inclusive fazendo dois no mesmo dia, se se sentir bem.'] },
      { h: 'Vou emagrecer em 21 dias?', p: ['Cada corpo responde de um jeito, e não fazemos promessas de mudança corporal específica. O que o desafio busca é construir força, mobilidade, postura e, principalmente, o hábito do movimento. Resultados de composição corporal dependem também de alimentação, sono e continuidade.'] },
      { h: 'Meus dados ficam salvos onde?', p: ['Somente neste aparelho e neste navegador. Se limpar os dados do navegador ou trocar de celular, o progresso não é transferido. Em Perfil você pode exportar um backup.'] },
      { h: 'Os pontos servem para quê?', p: ['Os Pontos de Evolução mostram o quanto você participou e fazem você subir de nível. Eles não são trocados por dinheiro ou produtos.'] },
      { h: 'Posso refazer um treino?', p: ['Sim! Qualquer dia já concluído pode ser refeito a partir do calendário. Os pontos do treino contam uma vez por dia do desafio.'] },
    ],
  },
];

export const ARTICLE = (slug: string) => ARTICLES.find(a => a.slug === slug);
