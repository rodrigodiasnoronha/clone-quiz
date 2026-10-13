export interface QuizQuestion {
  q: string;
  options: string[];
  answer: number;
  why: string;
}

/** Quiz do Corpo: 3 perguntas por dia, em rotação. */
export const QUIZ: QuizQuestion[] = [
  { q: 'Qual músculo funciona como uma "cinta" natural em volta da barriga?', options: ['Reto abdominal', 'Transverso do abdômen', 'Bíceps'], answer: 1, why: 'O transverso é o músculo abdominal mais profundo e envolve o tronco como uma cinta, estabilizando a coluna.' },
  { q: 'No Pilates, quando costumamos expirar?', options: ['No momento de maior esforço', 'Só no fim do treino', 'Nunca, prendemos o ar'], answer: 0, why: 'Expirar no esforço ajuda a ativar o abdômen profundo e evita prender o ar.' },
  { q: 'A respiração usada no Pilates é chamada de:', options: ['Respiração abdominal', 'Respiração lateral (intercostal)', 'Respiração ofegante'], answer: 1, why: 'Na respiração lateral as costelas se expandem para os lados, mantendo o abdômen levemente ativo.' },
  { q: 'Quem criou o método Pilates?', options: ['Joseph Pilates', 'Jane Fonda', 'Um grupo de bailarinas russas'], answer: 0, why: 'Joseph Pilates desenvolveu o método no início do século XX e o chamava de "Contrologia".' },
  { q: 'Qual é o maior músculo do glúteo?', options: ['Glúteo mínimo', 'Glúteo médio', 'Glúteo máximo'], answer: 2, why: 'O glúteo máximo é o maior e é muito ativado na ponte e na extensão de quadril.' },
  { q: 'O glúteo médio é muito importante para:', options: ['Mastigar', 'Estabilizar o quadril ao caminhar', 'Mexer os dedos'], answer: 1, why: 'Ele mantém a pelve nivelada quando você apoia o peso em uma perna só, como ao caminhar.' },
  { q: 'Sentir dor aguda em uma articulação durante o exercício significa:', options: ['Que está funcionando', 'Que é hora de parar e adaptar', 'Que precisa fazer mais rápido'], answer: 1, why: 'Dor aguda é um sinal de alerta. Desconforto muscular leve é normal; dor articular não.' },
  { q: 'Mobilidade é:', options: ['O mesmo que flexibilidade', 'A capacidade de mover ativamente uma articulação com controle', 'Correr rápido'], answer: 1, why: 'Flexibilidade é quanto o músculo alonga; mobilidade é quanto você controla esse movimento.' },
  { q: 'No agachamento na parede, os joelhos devem apontar para:', options: ['Dentro', 'A direção dos pés', 'Fora, bem abertos'], answer: 1, why: 'Joelhos alinhados com o segundo dedo do pé distribuem melhor a carga na articulação.' },
  { q: 'O assoalho pélvico faz parte do:', options: ['Centro de força (core)', 'Braço', 'Pescoço'], answer: 0, why: 'Junto com o transverso, o diafragma e os músculos das costas, o assoalho pélvico forma o core.' },
  { q: 'Por que os dias de recuperação são importantes?', options: ['Porque o músculo se adapta no descanso', 'Não são importantes', 'Para perder o ritmo'], answer: 0, why: 'O treino gera o estímulo; a recuperação permite que o corpo se adapte e fique mais forte.' },
  { q: 'Na prancha, se a lombar começa a afundar, o melhor é:', options: ['Prender o ar', 'Aproximar os pés da parede e reativar o abdômen', 'Ignorar'], answer: 1, why: 'Diminuir a inclinação deixa o exercício mais leve e protege a lombar.' },
  { q: 'Qual região da coluna costuma ficar rígida em quem passa muito tempo sentada?', options: ['Coluna torácica (meio das costas)', 'Os dedos do pé', 'Nenhuma'], answer: 0, why: 'A coluna torácica tende a enrijecer com a postura sentada; por isso fazemos rotações e o Swan.' },
  { q: 'Alongamento deve causar:', options: ['Dor forte', 'Sensação de estiramento confortável', 'Formigamento'], answer: 1, why: 'Alongar é confortável. Dor ou formigamento indicam que é preciso diminuir a intensidade.' },
  { q: 'O que acontece quando prendemos a respiração durante o esforço?', options: ['A pressão no tronco aumenta', 'Ficamos mais leves', 'Nada'], answer: 0, why: 'Prender o ar eleva a pressão interna e a pressão arterial, e cansa mais rápido.' },
  { q: 'A panturrilha ajuda a:', options: ['Bombear o sangue das pernas de volta ao coração', 'Digerir os alimentos', 'Enxergar melhor'], answer: 0, why: 'A contração da panturrilha funciona como uma "bomba" que auxilia o retorno do sangue.' },
  { q: 'Qual princípio do Pilates diz que poucas repetições bem feitas valem mais?', options: ['Fluidez', 'Precisão', 'Velocidade'], answer: 1, why: 'Precisão: a qualidade do movimento é mais importante que a quantidade.' },
  { q: 'Quanto tempo uma pessoa adulta precisa dormir, em geral?', options: ['3 a 4 horas', '7 a 9 horas', '12 horas'], answer: 1, why: 'A maioria dos adultos se beneficia de 7 a 9 horas por noite.' },
  { q: 'O que ajuda a manter um novo hábito?', options: ['Ligá-lo a algo que você já faz', 'Esperar ter vontade', 'Fazer tudo de uma vez no primeiro dia'], answer: 0, why: 'Ancorar o hábito em uma rotina existente reduz o esforço de lembrar e começar.' },
  { q: 'Na ponte, o peso do corpo deve ficar:', options: ['No pescoço', 'Nos ombros e nos pés', 'Na cabeça'], answer: 1, why: 'O pescoço fica livre; ombros e pés sustentam o corpo.' },
  { q: 'Os posteriores de coxa ficam:', options: ['Na parte de trás da coxa', 'Na frente da coxa', 'No braço'], answer: 0, why: 'Eles dobram o joelho e estendem o quadril; alongamos com a perna na parede.' },
  { q: 'O quadríceps é formado por quantos músculos?', options: ['2', '4', '10'], answer: 1, why: 'Quadri = quatro: reto femoral, vasto lateral, vasto medial e vasto intermédio.' },
  { q: 'Qual destes é um sinal para PARAR o exercício?', options: ['Suor leve', 'Tontura ou dor no peito', 'Respiração um pouco mais rápida'], answer: 1, why: 'Tontura e dor no peito pedem interrupção imediata e, se persistirem, atendimento médico.' },
  { q: 'Por que a expiração longa ajuda a relaxar?', options: ['Ela ativa respostas de calma do sistema nervoso', 'Ela gasta muitas calorias', 'Ela não ajuda'], answer: 0, why: 'Expirar devagar está associado à ativação do sistema nervoso parassimpático, ligado ao relaxamento.' },
  { q: 'No Pilates, "centro" significa:', options: ['O meio da sala', 'O conjunto de músculos que estabilizam o tronco', 'O umbigo apenas'], answer: 1, why: 'O centro (powerhouse) inclui abdômen profundo, assoalho pélvico, glúteos e músculos das costas.' },
  { q: 'Um bom jeito de treinar equilíbrio com segurança é:', options: ['De olhos fechados no primeiro dia', 'Perto de uma parede, com apoio disponível', 'Em cima de uma cadeira'], answer: 1, why: 'A parede dá apoio imediato caso você perca o equilíbrio.' },
  { q: 'O músculo diafragma é responsável principalmente por:', options: ['Respirar', 'Andar', 'Piscar'], answer: 0, why: 'O diafragma é o principal músculo da respiração; ele desce ao inspirar e sobe ao expirar.' },
  { q: 'Qual é a melhor estratégia se você perder um dia do desafio?', options: ['Desistir', 'Retomar no dia seguinte sem culpa', 'Fazer 5 treinos de uma vez'], answer: 1, why: 'Constância é retomar. Os dias perdidos ficam pendentes para você recuperar no seu ritmo.' },
  { q: 'Os romboides, trabalhados nos anjos na parede, ficam:', options: ['Entre as escápulas', 'No pé', 'Na barriga'], answer: 0, why: 'Eles aproximam as escápulas e ajudam a manter os ombros para trás.' },
  { q: 'Fazer movimentos lentos e controlados ajuda a:', options: ['Recrutar melhor os músculos e evitar compensações', 'Treinar menos', 'Nada'], answer: 0, why: 'O controle obriga os músculos certos a trabalhar e reduz o uso de impulso.' },
];

/** Cartas de motivação: uma por dia do desafio + extras para dias seguintes */
export const CARDS: string[] = [
  'Começar já é a parte mais corajosa. Você fez isso hoje. 💜',
  'Seu corpo não precisa ser diferente para merecer cuidado. Ele merece agora.',
  'Pequenos passos todos os dias criam caminhos que você nem imaginava.',
  'Você não precisa de perfeição. Precisa de presença.',
  'Cada respiração consciente é um minuto que você dedicou a si mesma.',
  'A força que você está construindo vai muito além dos músculos.',
  'Uma semana! A mulher que começou ficaria orgulhosa de você.',
  'Dias difíceis também contam. Especialmente eles.',
  'Seu ritmo é o ritmo certo.',
  'Metade do caminho. Olhe para trás e veja o quanto já andou.',
  'Descansar não é desistir. É se preparar para continuar.',
  'Você está aprendendo a confiar no seu próprio corpo.',
  'Ser constante é escolher você, de novo e de novo.',
  'Duas semanas de compromisso com você. Isso tem nome: determinação.',
  'Seu corpo está ouvindo cada gesto de carinho que você faz por ele.',
  'Você é capaz de coisas que ainda nem tentou.',
  'Flexibilidade também é ser gentil com você nos dias imperfeitos.',
  'O equilíbrio que você treina na parede você leva para a vida.',
  'Faltam dois dias. Você já é outra mulher: mais forte, mais presente.',
  'Amanhã é dia de celebrar. Hoje, sinta orgulho do caminho.',
  'Você chegou ao fim do desafio, mas este é só o começo da sua nova rotina. Obrigada por não desistir de você. 💜 — Luna',
  'Você continua aparecendo para si mesma. Isso é lindo.',
  'Movimento é uma forma de dizer "eu me importo comigo".',
  'Hoje vale mais feito do que perfeito.',
];

/** Roleta do Bem-Estar: pequenas atividades saudáveis */
export const ROULETTE: { emoji: string; title: string; desc: string; color: string }[] = [
  { emoji: '💧', title: 'Copo de água', desc: 'Beba um copo de água agora, com calma.', color: '#A98BFA' },
  { emoji: '🌬️', title: '5 respirações', desc: 'Faça 5 respirações lentas, expirando por mais tempo.', color: '#F873AE' },
  { emoji: '🚶‍♀️', title: 'Mini caminhada', desc: 'Caminhe por 3 minutos, dentro ou fora de casa.', color: '#7C4DDB' },
  { emoji: '🧘‍♀️', title: 'Alongue o pescoço', desc: 'Incline a cabeça para cada lado por 20 segundos.', color: '#FF9ECB' },
  { emoji: '☀️', title: 'Luz natural', desc: 'Fique 2 minutos perto de uma janela ou ao ar livre.', color: '#C6B1FF' },
  { emoji: '🎶', title: 'Música favorita', desc: 'Ouça uma música que te deixa feliz e se mexa como quiser.', color: '#EC4C93' },
  { emoji: '📵', title: 'Pausa da tela', desc: 'Fique 5 minutos sem olhar para nenhuma tela.', color: '#8E6CF0' },
  { emoji: '🍎', title: 'Fruta do dia', desc: 'Inclua uma fruta no seu próximo lanche.', color: '#F873AE' },
  { emoji: '✍️', title: '3 gratidões', desc: 'Pense em 3 coisas boas que aconteceram hoje.', color: '#A98BFA' },
  { emoji: '🧍‍♀️', title: 'Teste da parede', desc: 'Encoste calcanhares, quadril, costas e cabeça na parede por 30 segundos.', color: '#7C4DDB' },
  { emoji: '💬', title: 'Mensagem carinhosa', desc: 'Mande uma mensagem gentil para alguém de quem você gosta.', color: '#FF9ECB' },
  { emoji: '😌', title: 'Ombros soltos', desc: 'Suba os ombros até as orelhas, segure 3 segundos e solte. Repita 5 vezes.', color: '#C6B1FF' },
];

export const PHRASES: string[] = [
  'Hoje é dia de cuidar de você com carinho.',
  'Seu corpo agradece cada minuto de atenção.',
  'Constância é mais poderosa que intensidade.',
  'Um treino de cada vez, um dia de cada vez.',
  'Você está construindo algo que ninguém pode tirar de você.',
  'Movimento é energia que volta para você.',
  'O melhor treino é aquele que você faz.',
  'Respire fundo: você está exatamente onde precisa estar.',
  'Força também é saber ir com calma.',
  'Sua evolução não precisa ser rápida para ser real.',
  'Hoje você escolhe você.',
  'Cada dia concluído é uma promessa cumprida consigo mesma.',
];

export const GREETING = (h: number) => (h < 5 ? 'Boa noite' : h < 12 ? 'Bom dia' : h < 18 ? 'Boa tarde' : 'Boa noite');
