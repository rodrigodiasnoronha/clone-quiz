# Conteúdo dos materiais em PDF entregues em /material.
# Gere os PDFs com:  python3 material/src/build.py
#
# Blocos aceitos em "body":
#   ("h2", "Título")                      ("h3", "Subtítulo")
#   ("p", "Texto com <b>HTML</b>")        ("list", [itens])        ("steps", [itens numerados])
#   ("tip", "Título", "Texto")            ("warn", "Texto")
#   ("ex", "id-do-exercicio", "prescrição")   -> ficha completa de um exercício do app
#   ("workout", "Título", [("id", "prescrição"), ...], "observação opcional")
#   ("table", ["Coluna", ...], [[...], ...])
#   ("recipe", {...})                     ("check", [itens com caixinha])
#   ("pagebreak",)
#   ("newex", {...})                      -> exercício que não está no app (mesmo formato da ficha)

DISCLAIMER = (
    'Este material é educativo e não substitui a orientação de médico, nutricionista ou profissional de '
    'Educação Física. Se você tem alguma condição de saúde, está grávida, em pós-parto ou sente dor, '
    'converse com um profissional antes de começar e respeite sempre os limites do seu corpo.'
)

# Link do grupo VIP no WhatsApp (aparece no PDF do Grupo VIP)
GRUPO_VIP_LINK = 'https://chat.whatsapp.com/TROQUE-PELO-LINK-DO-GRUPO'

# ─────────────────────────────── EXERCÍCIOS EXTRAS (fora do app) ───────────────────────────────
NEW_EX = {
    'polichinelo-sem-salto': {
        'name': 'Polichinelo sem salto',
        'muscles': ['Ombros', 'Pernas', 'Coração'],
        'position': 'Em pé, pés juntos e braços ao lado do corpo.',
        'steps': [
            'Leve a perna direita para o lado enquanto sobe os dois braços acima da cabeça.',
            'Volte ao centro.',
            'Repita com a perna esquerda.',
            'Mantenha um ritmo que acelere a respiração sem perder o controle.',
        ],
        'breathing': 'Respire de forma ritmada, sem prender o ar.',
        'errors': ['Arquear a lombar ao subir os braços.', 'Bater o calcanhar com força no chão.'],
        'easier': 'Suba só até a altura dos ombros e faça mais devagar.',
        'safety': 'Ótimo para quem quer acelerar o coração sem impacto nos joelhos.',
    },
    'corrida-parada': {
        'name': 'Corrida parada leve',
        'muscles': ['Pernas', 'Glúteos', 'Coração'],
        'position': 'Em pé, de frente para a parede, mãos apoiadas na altura do peito.',
        'steps': [
            'Incline levemente o corpo para a frente, com as mãos na parede.',
            'Alterne os joelhos para cima, como uma corrida no lugar.',
            'Pise com a ponta dos pés e mantenha o abdômen firme.',
        ],
        'breathing': 'Respire pelo nariz e solte pela boca no ritmo das passadas.',
        'errors': ['Deixar o quadril cair para trás.', 'Correr pisando com o calcanhar.'],
        'easier': 'Troque por uma marcha rápida, sem tirar os dois pés do chão ao mesmo tempo.',
        'safety': 'Com dor no joelho, faça a versão de marcha.',
    },
    # Pilates Íntimo (assoalho pélvico)
    'kegel-lento': {
        'name': 'Contração lenta do assoalho pélvico',
        'muscles': ['Assoalho pélvico'],
        'position': 'Deitada de barriga para cima, joelhos dobrados, pés no chão e mãos na barriga.',
        'steps': [
            'Inspire pelo nariz e solte a barriga e a região íntima.',
            'Ao soltar o ar, feche e puxe para dentro e para cima a região íntima, como se segurasse o xixi e um pum ao mesmo tempo.',
            'Segure a contração de 3 a 10 segundos, respirando normalmente.',
            'Solte completamente pelo mesmo tempo que segurou antes da próxima repetição.',
        ],
        'breathing': 'Contraia ao soltar o ar e nunca prenda a respiração durante a contração.',
        'errors': ['Apertar o bumbum, as coxas ou a barriga no lugar do assoalho pélvico.', 'Não relaxar entre uma repetição e outra.'],
        'easier': 'Segure só 3 segundos e faça 5 repetições.',
        'safety': 'Não use o exercício para interromper o xixi no banheiro: isso atrapalha o esvaziamento da bexiga.',
    },
    'kegel-rapido': {
        'name': 'Contrações rápidas (piscadas)',
        'muscles': ['Assoalho pélvico'],
        'position': 'Deitada, sentada ou em pé, conforme a semana do plano.',
        'steps': [
            'Contraia a região íntima com força e rapidez, como uma piscada.',
            'Solte totalmente logo em seguida.',
            'Repita no ritmo de mais ou menos uma piscada por segundo.',
        ],
        'breathing': 'Respire normalmente, sem prender o ar.',
        'errors': ['Fazer meia contração por pressa.', 'Esquecer de soltar totalmente entre as piscadas.'],
        'easier': 'Faça 5 piscadas e descanse 10 segundos antes de mais 5.',
        'safety': 'Se sentir dor na pelve, pare e procure uma fisioterapeuta pélvica.',
    },
    'elevador-pelvico': {
        'name': 'Elevador',
        'muscles': ['Assoalho pélvico', 'Transverso do abdômen'],
        'position': 'Sentada em uma cadeira firme, pés no chão e coluna alongada.',
        'steps': [
            'Imagine que a região íntima é um elevador no térreo.',
            'Contraia um pouco e suba para o 1º andar. Segure 2 segundos.',
            'Contraia mais e suba para o 2º andar. Segure 2 segundos.',
            'Contraia o máximo e chegue ao 3º andar. Segure 2 segundos.',
            'Desça andar por andar até soltar tudo no térreo.',
        ],
        'breathing': 'Respire de forma curta e tranquila durante a subida, sem prender o ar.',
        'errors': ['Subir os ombros ou contrair a barriga com força.'],
        'easier': 'Use só dois andares.',
        'safety': 'O controle vale mais que a força: suba e desça devagar.',
    },
    # Adeus Braço de Tchauzinho
    'circulos-bracos': {
        'name': 'Círculos de braço',
        'muscles': ['Ombros', 'Parte de trás do braço'],
        'position': 'Em pé, braços abertos na altura dos ombros e palmas viradas para baixo.',
        'steps': [
            'Faça pequenos círculos para a frente com os braços esticados.',
            'Na metade do tempo, inverta para trás.',
            'Mantenha os ombros longe das orelhas.',
        ],
        'breathing': 'Respire de forma ritmada, sem prender o ar.',
        'errors': ['Deixar os braços caírem abaixo da linha dos ombros.', 'Dobrar os cotovelos.'],
        'easier': 'Descanse os braços por 5 segundos sempre que precisar.',
        'safety': 'Com dor no ombro, faça círculos menores e com os braços um pouco mais baixos.',
    },
    'triceps-parede': {
        'name': 'Flexão fechada na parede (tríceps)',
        'muscles': ['Tríceps', 'Peito'],
        'position': 'De frente para a parede, a um braço de distância, mãos apoiadas na altura do peito e bem próximas uma da outra.',
        'steps': [
            'Firme o abdômen e deixe o corpo reto da cabeça aos calcanhares.',
            'Dobre os cotovelos levando-os para trás, rentes ao corpo, e aproxime o peito da parede.',
            'Empurre a parede e volte esticando os braços.',
        ],
        'breathing': 'Inspire ao descer e solte o ar ao empurrar.',
        'errors': ['Abrir os cotovelos para os lados.', 'Deixar o quadril ir para trás.'],
        'easier': 'Chegue os pés mais perto da parede.',
        'safety': 'Com dor nos punhos, apoie os antebraços e faça só a prancha.',
    },
    'mergulho-cadeira': {
        'name': 'Mergulho na cadeira',
        'muscles': ['Tríceps', 'Ombros'],
        'position': 'Sentada na beira de uma cadeira firme encostada na parede, mãos ao lado do quadril com os dedos para a frente e pés no chão.',
        'steps': [
            'Tire o quadril da cadeira, apoiando o peso nas mãos.',
            'Dobre os cotovelos para trás e desça o quadril alguns centímetros.',
            'Empurre a cadeira e estique os braços para subir.',
        ],
        'breathing': 'Inspire ao descer e solte o ar ao subir.',
        'errors': ['Descer demais, forçando o ombro.', 'Abrir os cotovelos para os lados.'],
        'easier': 'Aproxime os pés da cadeira e desça bem pouco.',
        'safety': 'Use só cadeira firme, sem rodinhas. Com dor no ombro, troque pela flexão fechada na parede.',
    },
    'remada-toalha': {
        'name': 'Remada com toalha',
        'muscles': ['Costas', 'Parte de trás do ombro', 'Bíceps'],
        'position': 'Em pé, pés afastados na largura do quadril, segurando uma toalha esticada com as duas mãos à frente do peito.',
        'steps': [
            'Puxe as pontas da toalha para fora, como se quisesse rasgá-la.',
            'Mantendo a tensão, leve os cotovelos para trás e junte as escápulas.',
            'Volte os braços à frente sem soltar a tensão da toalha.',
        ],
        'breathing': 'Solte o ar ao levar os cotovelos para trás.',
        'errors': ['Subir os ombros.', 'Arquear a lombar.'],
        'easier': 'Faça mais devagar e com menos força na toalha.',
        'safety': 'Mantenha o pescoço solto durante todo o movimento.',
    },
    'extensao-bracos-tras': {
        'name': 'Batidinha de braços para trás',
        'muscles': ['Tríceps', 'Parte de trás do ombro'],
        'position': 'Em pé, tronco levemente inclinado para a frente, joelhos soltos e braços esticados ao lado do corpo, palmas viradas para trás.',
        'steps': [
            'Leve os braços esticados para trás o máximo que conseguir.',
            'Faça pequenos movimentos para cima e para baixo, como batidinhas.',
            'Sinta a parte de trás do braço queimar.',
        ],
        'breathing': 'Respire de forma ritmada.',
        'errors': ['Dobrar os cotovelos.', 'Arredondar as costas.'],
        'easier': 'Faça em pé, com o tronco reto.',
        'safety': 'Mantenha o abdômen firme para proteger a lombar.',
    },
    # Yoga Facial
    'face-testa': {
        'name': 'Testa lisa',
        'muscles': ['Músculo da testa (frontal)'],
        'position': 'Sentada, de frente para o espelho, com os dedos indicadores logo acima das sobrancelhas.',
        'steps': [
            'Segure a pele da testa levemente para baixo com os dedos.',
            'Tente subir as sobrancelhas contra a resistência dos dedos.',
            'Segure 5 segundos e solte devagar.',
        ],
        'breathing': 'Respire pelo nariz durante todo o exercício.',
        'errors': ['Franzir a testa sem os dedos segurando.', 'Apertar a pele com força.'],
        'safety': 'Faça com as mãos limpas e sem puxar a pele.',
    },
    'face-olhos': {
        'name': 'Olhar firme',
        'muscles': ['Músculo ao redor dos olhos (orbicular)'],
        'position': 'Sentada, dedos indicadores no canto externo dos olhos e dedos médios no canto interno.',
        'steps': [
            'Olhe para cima, sem mexer a cabeça.',
            'Aperte levemente as pálpebras de baixo, como quem aperta os olhos contra o sol.',
            'Segure 5 segundos e relaxe.',
        ],
        'breathing': 'Respire devagar pelo nariz.',
        'errors': ['Fechar os olhos totalmente.', 'Enrugar a testa junto.'],
        'safety': 'Retire as lentes de contato antes.',
    },
    'face-macas': {
        'name': 'Maçãs do rosto',
        'muscles': ['Zigomáticos', 'Bochechas'],
        'position': 'Sentada, de frente para o espelho.',
        'steps': [
            'Faça um "O" com a boca, cobrindo os dentes com os lábios.',
            'Sorria com os cantos da boca, sem desfazer o "O", sentindo as maçãs subirem.',
            'Coloque os dedos levemente sobre as maçãs e suba-as um pouco mais.',
            'Segure 5 segundos e relaxe.',
        ],
        'breathing': 'Respire pelo nariz.',
        'errors': ['Abrir demais a boca.', 'Franzir a testa.'],
        'safety': 'Pare se sentir dor na articulação da mandíbula.',
    },
    'face-bigode': {
        'name': 'Bochecha de ar (bigode chinês)',
        'muscles': ['Bochechas', 'Músculos ao redor da boca'],
        'position': 'Sentada, coluna reta e lábios fechados.',
        'steps': [
            'Encha a boca de ar.',
            'Passe o ar de uma bochecha para a outra, devagar.',
            'Depois leve o ar para cima do lábio superior e segure 3 segundos.',
        ],
        'breathing': 'Respire pelo nariz enquanto segura o ar na boca.',
        'errors': ['Contrair o pescoço.'],
        'safety': 'Faça de forma suave, sem forçar.',
    },
    'face-papada': {
        'name': 'Beijo no teto (papada)',
        'muscles': ['Músculo do pescoço (platisma)', 'Musculatura abaixo do queixo'],
        'position': 'Sentada, coluna reta e ombros relaxados.',
        'steps': [
            'Incline a cabeça para trás, olhando para o teto, sem deixar o pescoço desconfortável.',
            'Faça bico, como quem manda um beijo para o teto.',
            'Segure 5 segundos e volte a cabeça ao centro.',
        ],
        'breathing': 'Respire pelo nariz.',
        'errors': ['Jogar a cabeça para trás com força.', 'Subir os ombros.'],
        'easier': 'Incline só um pouco a cabeça.',
        'safety': 'Com problemas na coluna cervical ou tontura, faça olhando para a frente.',
    },
    'face-lingua': {
        'name': 'Língua no céu da boca',
        'muscles': ['Musculatura abaixo do queixo', 'Língua'],
        'position': 'Sentada, olhando para a frente, lábios fechados.',
        'steps': [
            'Encoste toda a língua no céu da boca, como uma ventosa.',
            'Empurre a língua para cima, sentindo a região abaixo do queixo firmar.',
            'Segure 5 segundos e solte.',
        ],
        'breathing': 'Respire pelo nariz.',
        'errors': ['Apertar os dentes.'],
        'safety': 'É discreto: dá para fazer no trânsito ou no computador.',
    },
}

# ─────────────────────────────── MATERIAIS ───────────────────────────────
MATERIALS = []

# 1) GUIA PRINCIPAL — montado a partir do conteúdo do app (ver build.py)
MATERIALS.append({
    'slug': 'pilates-na-parede-21-dias',
    'group': 'programa',
    'title': 'Pilates na Parede',
    'title2': 'Desafio 21 Dias',
    'kicker': 'GUIA COMPLETO',
    'desc': 'O plano dia a dia dos 21 dias e a biblioteca com todos os exercícios explicados passo a passo.',
    'cover': 'app/fotos/parede.webp',
    'auto': 'program',
})

# 2) BÔNUS 1 — POSTURA DE FERRO
MATERIALS.append({
    'slug': 'bonus-1-postura-de-ferro',
    'group': 'bonus',
    'title': 'Protocolo',
    'title2': 'Postura de Ferro',
    'kicker': 'BÔNUS 1',
    'desc': 'Sequência para alinhar a coluna e aliviar a tensão de quem passa o dia sentada.',
    'cover': 'app/fotos/alongamento.webp',
    'body': [
        ('h2', 'Por que a postura muda o seu corpo'),
        ('p', 'Passar horas sentada, olhando para o celular ou para o computador, faz os ombros irem para a frente, '
              'o peito fechar e a cabeça avançar. Com o tempo, os músculos do peito encurtam, os das costas ficam '
              'fracos e a lombar e o pescoço passam a trabalhar mais do que deveriam. O resultado é aquela sensação '
              'de corpo pesado, dor no fim do dia e uma barriga que parece maior do que realmente é.'),
        ('p', 'A boa notícia: postura é hábito. Com <b>10 minutos por dia</b> de exercícios na parede e alguns ajustes '
              'simples na rotina, você ensina o corpo a ficar alinhado sem esforço.'),
        ('tip', 'Como usar este protocolo', 'Faça a <b>Rotina Postura de Ferro</b> todos os dias durante 4 semanas, de '
              'preferência pela manhã ou logo depois do trabalho. Nos dias do Desafio 21 Dias, ela pode ser feita antes '
              'do treino como aquecimento. Use as <b>micropausas</b> ao longo do dia.'),
        ('h2', 'Teste da parede: seu ponto de partida'),
        ('steps', [
            'Fique em pé com os calcanhares a um palmo da parede.',
            'Encoste o quadril, as costas e, se conseguir sem forçar, a parte de trás da cabeça.',
            'Observe: a cabeça encosta sem levantar o queixo? Os ombros tocam a parede?',
            'Passe a mão entre a lombar e a parede: deve caber a mão espalmada, não um punho fechado.',
        ]),
        ('p', 'Anote como foi o teste hoje e repita ao final de cada semana. É a forma mais simples de ver a evolução.'),
        ('h2', 'A Rotina Postura de Ferro (10 minutos)'),
        ('workout', 'Faça na ordem, sem pressa', [
            ('respiracao-lateral', '1 minuto'),
            ('gato-vaca-parede', '8 repetições'),
            ('anjos-parede', '2 séries de 8'),
            ('rotacao-toracica', '6 para cada lado'),
            ('swan-em-pe', '8 repetições'),
            ('basculamento-pelvico', '10 repetições'),
            ('prancha-parede', '3 x 20 segundos'),
            ('abertura-peito', '30 segundos de cada lado'),
        ], 'Descanse 15 a 20 segundos entre os exercícios.'),
        ('h2', 'Os exercícios, passo a passo'),
        ('ex', 'respiracao-lateral', '1 minuto'),
        ('ex', 'gato-vaca-parede', '8 repetições'),
        ('ex', 'anjos-parede', '2 séries de 8'),
        ('ex', 'rotacao-toracica', '6 para cada lado'),
        ('ex', 'swan-em-pe', '8 repetições'),
        ('ex', 'basculamento-pelvico', '10 repetições'),
        ('ex', 'prancha-parede', '3 x 20 segundos'),
        ('ex', 'abertura-peito', '30 segundos de cada lado'),
        ('h2', 'Plano de 4 semanas'),
        ('table', ['Semana', 'O que fazer', 'Foco'], [
            ['1', 'Rotina completa 1x por dia, no ritmo mais lento', 'Aprender os movimentos e perceber a respiração'],
            ['2', 'Rotina completa + 3 micropausas por dia', 'Levar a postura para o trabalho e o celular'],
            ['3', 'Rotina com prancha de 30 s + 4 micropausas', 'Força para segurar o alinhamento'],
            ['4', 'Rotina com 3 séries de anjos + 5 micropausas', 'Postura automática, sem precisar pensar'],
        ]),
        ('h2', 'Micropausas de 1 minuto'),
        ('p', 'Coloque um alarme a cada 1 ou 2 horas. Quando tocar, escolha uma:'),
        ('list', [
            '<b>Queixo para trás:</b> sentada, leve o queixo para trás como se fizesse um "queixo duplo". Segure 3 s e solte. 8 vezes.',
            '<b>Ombros para trás e para baixo:</b> gire os ombros 5 vezes para trás e termine com as escápulas "no bolso de trás".',
            '<b>Peito aberto na porta:</b> antebraços no batente, dê um passo à frente e respire 3 vezes.',
            '<b>Levantar e caminhar:</b> 1 minuto andando, olhando para o horizonte, não para o chão.',
            '<b>Respiração 4-6:</b> inspire em 4 tempos, solte em 6. Três ciclos.',
        ]),
        ('h2', 'Ajustes que mudam o seu dia'),
        ('list', [
            '<b>Celular na altura dos olhos:</b> leve o aparelho até o rosto, não o rosto até o aparelho.',
            '<b>Tela do computador:</b> o topo da tela na altura dos olhos e a um braço de distância.',
            '<b>Cadeira:</b> pés apoiados no chão, quadril encostado no fundo e uma almofada pequena na lombar.',
            '<b>Bolsa:</b> alterne o ombro ou prefira mochila nas duas alças.',
            '<b>Dormir:</b> de lado, com um travesseiro entre os joelhos; ou de barriga para cima com um travesseiro sob os joelhos.',
            '<b>Ao pegar peso:</b> dobre os joelhos, traga o objeto perto do corpo e expire ao levantar.',
        ]),
        ('h2', 'Checklist diário'),
        ('check', ['Fiz a Rotina Postura de Ferro', 'Fiz pelo menos 3 micropausas', 'Usei o celular na altura dos olhos',
                   'Bebi água ao longo do dia', 'Fiz o teste da parede (fim da semana)']),
    ],
})

# 3) BÔNUS 2 — ANTI-FLACIDEZ
MATERIALS.append({
    'slug': 'bonus-2-anti-flacidez',
    'group': 'bonus',
    'title': 'Protocolo',
    'title2': 'Anti-Flacidez',
    'kicker': 'BÔNUS 2',
    'desc': 'Treinos focados em firmar braços, barriga e pernas junto com o desafio.',
    'cover': 'app/fotos/fase2.webp',
    'body': [
        ('h2', 'O que é flacidez e o que realmente funciona'),
        ('p', 'A pele mais "mole" em braços, barriga e coxas costuma ter duas causas principais: <b>pouca massa '
              'muscular</b> por baixo da pele e <b>excesso de gordura</b> na região. Cremes ajudam a pele, mas quem dá '
              'firmeza de verdade é o músculo. Por isso este protocolo foca em força, feita com o peso do próprio corpo.'),
        ('list', [
            '<b>Força 3 a 4 vezes por semana</b> estimula o músculo a crescer e ficar mais firme.',
            '<b>Proteína em todas as refeições</b> dá matéria-prima para esse músculo (veja o Bônus 4).',
            '<b>Água e sono</b> ajudam a pele e a recuperação.',
            '<b>Constância:</b> os primeiros sinais aparecem em 3 a 4 semanas; a mudança visível, em 8 a 12.',
        ]),
        ('tip', 'Como encaixar no Desafio 21 Dias', 'Faça um dos treinos abaixo nos dias de descanso do desafio ou logo depois '
              'do treino do dia, se tiver energia. Nunca treine o mesmo grupo dois dias seguidos com intensidade alta.'),
        ('h2', 'Treino A — Braços e costas firmes'),
        ('workout', '3 voltas · 30 s de descanso entre exercícios', [
            ('flexao-parede', '12 repetições'),
            ('anjos-parede', '10 repetições'),
            ('prancha-parede', '30 segundos'),
            ('swan-em-pe', '10 repetições'),
        ], 'Para intensificar, afaste mais os pés da parede na flexão e na prancha.'),
        ('h2', 'Treino B — Barriga mais firme'),
        ('workout', '3 voltas · 20 s de descanso', [
            ('dead-bug-parede', '10 repetições (5 de cada lado)'),
            ('toque-pes-parede', '12 repetições'),
            ('hundred-parede', '50 batidas de braço'),
            ('prancha-lateral-parede', '20 segundos de cada lado'),
        ]),
        ('h2', 'Treino C — Pernas e glúteos'),
        ('workout', '3 voltas · 30 s de descanso', [
            ('ponte-parede', '15 repetições'),
            ('agachamento-isometrico', '30 a 45 segundos'),
            ('afundo-apoiado', '10 de cada lado'),
            ('abducao-em-pe', '12 de cada lado'),
            ('concha-parede', '15 de cada lado'),
        ]),
        ('h2', 'Semana modelo'),
        ('table', ['Dia', 'Treino', 'Duração'], [
            ['Segunda', 'Treino A (braços)', '12–15 min'],
            ['Terça', 'Treino C (pernas e glúteos)', '15 min'],
            ['Quarta', 'Só o Desafio 21 Dias / descanso ativo', '—'],
            ['Quinta', 'Treino B (barriga)', '12 min'],
            ['Sexta', 'Treino C (pernas e glúteos)', '15 min'],
            ['Sábado', 'Treino A + B (versão de 2 voltas)', '20 min'],
            ['Domingo', 'Descanso, caminhada leve e alongamento', '—'],
        ]),
        ('h2', 'Como progredir a cada semana'),
        ('steps', [
            'Semana 1: aprenda os movimentos com 2 voltas.',
            'Semana 2: faça 3 voltas completas.',
            'Semana 3: aumente 2 a 4 repetições ou 10 segundos em cada exercício.',
            'Semana 4: diminua o descanso para 20 segundos ou faça os movimentos mais lentos (3 s para descer).',
        ]),
        ('h2', 'Os exercícios, passo a passo'),
        *[('ex', i, '') for i in ['flexao-parede', 'anjos-parede', 'prancha-parede', 'swan-em-pe', 'dead-bug-parede',
                                  'toque-pes-parede', 'hundred-parede', 'prancha-lateral-parede', 'ponte-parede',
                                  'agachamento-isometrico', 'afundo-apoiado', 'abducao-em-pe', 'concha-parede']],
        ('h2', 'Cuidados que aceleram o resultado'),
        ('list', [
            'Inclua uma fonte de proteína (ovos, frango, peixe, iogurte, feijão, queijo) em todas as refeições.',
            'Beba água ao longo do dia: uma boa referência é 35 ml por quilo de peso.',
            'Durma de 7 a 8 horas: é no descanso que o músculo se recupera.',
            'Use protetor solar: o sol é um dos principais responsáveis pela perda de firmeza da pele.',
            'Evite dietas muito restritivas: perder peso rápido demais costuma aumentar a flacidez.',
        ]),
    ],
})

# 4) BÔNUS 3 — GUIA DO PRATO INTELIGENTE
MATERIALS.append({
    'slug': 'bonus-3-dieta-personalizada',
    'group': 'bonus',
    'title': 'Guia do Prato',
    'title2': 'Inteligente',
    'kicker': 'BÔNUS 3',
    'desc': 'Monte refeições com o que você já come — sem cardápio proibido, sem balança e sem contar calorias.',
    'cover': 'app/fotos/agua.webp',
    'body': [
        ('h2', 'Sem dieta: refeições feitas para a sua rotina'),
        ('p', 'Não existe um cardápio único que sirva para todas as mulheres. Por isso, em vez de uma lista rígida, '
              'este guia ensina você a <b>montar o seu próprio plano</b> com o método do prato e das porções na mão: '
              'simples, sem balança e sem contar calorias.'),
        ('h2', 'Passo 1 — Descubra o seu tamanho de porção'),
        ('p', 'Use as suas próprias mãos como medida. Elas são proporcionais ao seu corpo e estão sempre com você.'),
        ('table', ['Grupo', 'Medida', 'Exemplos'], [
            ['Proteínas', '1 palma da mão (sem os dedos)', 'Frango, carne magra, peixe, ovos (2), tofu'],
            ['Carboidratos', '1 mão em concha', 'Arroz, batata, mandioca, macarrão, aveia, pão (1 fatia)'],
            ['Leguminosas', '1 mão em concha', 'Feijão, lentilha, grão-de-bico, ervilha'],
            ['Vegetais', '2 mãos abertas (à vontade)', 'Folhas, tomate, abobrinha, brócolis, cenoura'],
            ['Gorduras boas', '1 polegar', 'Azeite, castanhas, abacate, pasta de amendoim'],
            ['Frutas', '1 punho fechado', 'Maçã, banana, mamão, morango, laranja'],
        ]),
        ('h2', 'Passo 2 — Escolha o seu objetivo'),
        ('table', ['Objetivo', 'Almoço e jantar', 'Lanches'], [
            ['Emagrecer', '1 palma de proteína + ½ concha de carboidrato + 1 concha de feijão + vegetais à vontade',
             '1 proteína pequena + 1 fruta'],
            ['Manter e definir', '1 palma de proteína + 1 concha de carboidrato + 1 concha de feijão + vegetais',
             '1 proteína + 1 fruta + 1 polegar de gordura boa'],
            ['Ganhar firmeza com muito treino', '1½ palma de proteína + 1 a 1½ concha de carboidrato + vegetais',
             '1 proteína + 1 fruta + 1 carboidrato'],
        ]),
        ('tip', 'O prato ideal', 'Metade do prato com vegetais, um quarto com proteína e um quarto com carboidrato ou feijão. '
              'Comece a refeição pelas folhas: você sente saciedade antes e come menos sem esforço.'),
        ('h2', 'Passo 3 — Monte o seu dia'),
        ('table', ['Refeição', 'Como montar', 'Exemplo'], [
            ['Café da manhã', '1 proteína + 1 carboidrato + 1 fruta', '2 ovos mexidos + 1 fatia de pão integral + mamão'],
            ['Lanche da manhã', '1 fruta ou 1 proteína pequena', 'Iogurte natural ou 1 maçã'],
            ['Almoço', 'Prato ideal', 'Frango grelhado, arroz, feijão, salada e legumes'],
            ['Lanche da tarde', '1 proteína + 1 fruta', 'Iogurte com morango e aveia'],
            ['Jantar', 'Prato ideal, com menos carboidrato', 'Omelete com legumes e salada'],
            ['Ceia (se tiver fome)', '1 proteína leve', 'Chá + 1 fatia de queijo branco'],
        ]),
        ('h2', 'Cardápio de 7 dias (exemplo para emagrecer)'),
        ('table', ['Dia', 'Café', 'Almoço', 'Lanche', 'Jantar'], [
            ['Seg', 'Ovos mexidos + pão integral + mamão', 'Frango, arroz, feijão, salada', 'Iogurte + aveia', 'Omelete de legumes + salada'],
            ['Ter', 'Panqueca de banana e ovo', 'Carne moída com abobrinha, arroz, salada', 'Maçã + castanhas', 'Sopa de legumes com frango'],
            ['Qua', 'Tapioca com queijo branco', 'Peixe assado, batata, brócolis', 'Iogurte com morango', 'Salada completa com atum'],
            ['Qui', 'Iogurte + fruta + chia', 'Frango, purê de abóbora, feijão, salada', 'Ovo cozido + fruta', 'Wrap integral de frango'],
            ['Sex', 'Ovos + tapioca', 'Escondidinho de mandioca com carne', 'Vitamina de banana com aveia', 'Omelete + salada'],
            ['Sáb', 'Pão integral + ovo + queijo', 'Livre com consciência (prato ideal)', 'Fruta + iogurte', 'Pizza caseira de frigideira'],
            ['Dom', 'Panqueca de aveia', 'Almoço em família (prato ideal)', 'Pipoca de panela', 'Caldo de legumes com frango'],
        ]),
        ('h2', 'Lista de trocas (para nunca enjoar)'),
        ('table', ['Em vez de...', 'Troque por...'], [
            ['Arroz branco (1 concha)', 'Batata, mandioca, macarrão, cuscuz ou 2 colheres de farofa'],
            ['Frango', 'Carne magra, peixe, 2 ovos, atum, tofu ou 1 concha extra de feijão'],
            ['Pão francês', 'Tapioca pequena, 2 fatias de pão integral, cuscuz ou 3 colheres de aveia'],
            ['Doce depois do almoço', '1 quadradinho de chocolate 70% ou uma fruta'],
            ['Refrigerante', 'Água com gás, limão e hortelã ou chá gelado sem açúcar'],
            ['Salgadinho', 'Pipoca de panela, grão-de-bico assado ou castanhas'],
        ]),
        ('h2', 'Lista de compras da semana'),
        ('list', [
            '<b>Proteínas:</b> ovos, peito de frango, carne moída magra, peixe ou atum, iogurte natural, queijo branco.',
            '<b>Carboidratos:</b> arroz, feijão, batata, mandioca, aveia, pão integral, tapioca.',
            '<b>Vegetais:</b> alface, tomate, cenoura, abobrinha, brócolis, abóbora, cebola, alho.',
            '<b>Frutas:</b> banana, maçã, mamão, morango, laranja.',
            '<b>Extras:</b> azeite, castanhas, chia, canela, cacau em pó, temperos naturais.',
        ]),
        ('h2', '7 regras de ouro'),
        ('steps', [
            'Coma de 3 em 3 ou de 4 em 4 horas, sem pular refeições.',
            'Tenha proteína em todas as refeições.',
            'Beba água: um copo ao acordar e um antes de cada refeição.',
            'Coma devagar, sem tela, mastigando bem.',
            'Planeje: deixe proteínas e legumes prontos para 2 ou 3 dias.',
            'Não corte grupos inteiros de alimentos; ajuste as porções.',
            'Uma refeição fora do plano não estraga nada. Volte na próxima.',
        ]),
    ],
})

# 5) BÔNUS 4 — 51 RECEITAS PROTEICAS (receitas no fim do arquivo)
MATERIALS.append({
    'slug': 'bonus-4-51-receitas-proteicas',
    'group': 'bonus',
    'title': '51 Receitas',
    'title2': 'Proteicas',
    'kicker': 'BÔNUS 4',
    'desc': 'Receitas rápidas e gostosas, incluindo a famosa panqueca de 3 ingredientes.',
    'cover': 'ww/img/tile-segredo.webp',
    'auto': 'recipes',
})

# 6) BÔNUS 5 — TREINO EXPRESS
MATERIALS.append({
    'slug': 'bonus-5-treino-express',
    'group': 'bonus',
    'title': 'Protocolo',
    'title2': 'Treino Express',
    'kicker': 'BÔNUS 5',
    'desc': 'Treinos de 10 minutos para os dias corridos, sem perder o ritmo.',
    'cover': 'app/fotos/energia.webp',
    'body': [
        ('h2', 'Para os dias em que o tempo não ajuda'),
        ('p', 'Tem dia que não dá. Reunião, filhos, trânsito, cansaço. Nesses dias, o pior é zerar: '
              '<b>10 minutos mantêm o seu ritmo</b> e o hábito vivo. Os treinos abaixo usam só a parede e o chão.'),
        ('tip', 'Como funciona', 'Cada treino tem 5 exercícios. Faça <b>40 segundos de exercício e 20 de descanso</b>, '
              'passando para o próximo. Ao terminar os 5, comece de novo: são <b>2 voltas = 10 minutos</b>. '
              'Use o cronômetro do celular ou um app de intervalos.'),
        ('h2', 'Express 1 — Corpo inteiro'),
        ('workout', '40 s de exercício · 20 s de descanso · 2 voltas', [
            ('agachamento-deslizante', '40 s'), ('flexao-parede', '40 s'), ('ponte-parede', '40 s'),
            ('escalador-parede', '40 s'), ('prancha-parede', '40 s'),
        ]),
        ('h2', 'Express 2 — Barriga'),
        ('workout', '40 s / 20 s · 2 voltas', [
            ('dead-bug-parede', '40 s'), ('toque-pes-parede', '40 s'), ('prancha-lateral-parede', '20 s cada lado'),
            ('deslize-pernas', '40 s'), ('hundred-parede', '40 s'),
        ]),
        ('h2', 'Express 3 — Glúteos e pernas'),
        ('workout', '40 s / 20 s · 2 voltas', [
            ('ponte-marcha', '40 s'), ('agachamento-isometrico', '40 s'), ('abducao-em-pe', '20 s cada lado'),
            ('extensao-quadril', '20 s cada lado'), ('elevacao-panturrilha', '40 s'),
        ]),
        ('h2', 'Express 4 — Queima (coração acelerado)'),
        ('workout', '40 s / 20 s · 2 voltas', [
            ('polichinelo-sem-salto', '40 s'), ('corrida-parada', '40 s'), ('agachamento-deslizante', '40 s'),
            ('escalador-parede', '40 s'), ('marcha-apoiada', '40 s'),
        ], 'Sem impacto: ótimo para quem mora em apartamento.'),
        ('h2', 'Express 5 — Postura e costas'),
        ('workout', '40 s / 20 s · 2 voltas', [
            ('anjos-parede', '40 s'), ('swan-em-pe', '40 s'), ('rotacao-toracica', '20 s cada lado'),
            ('prancha-parede', '40 s'), ('gato-vaca-parede', '40 s'),
        ]),
        ('h2', 'Express 6 — Relaxa e alonga (noite)'),
        ('workout', '50 s em cada posição · 1 volta', [
            ('pernas-na-parede', '1 min'), ('borboleta-parede', '1 min'), ('figura-quatro', '50 s cada lado'),
            ('posterior-parede', '50 s cada lado'), ('respiracao-lateral', '1 min'),
        ], 'Perfeito antes de dormir.'),
        ('h2', 'Qual Express fazer hoje?'),
        ('table', ['Se você...', 'Faça'], [
            ['Tem só 10 minutos e quer treinar tudo', 'Express 1'],
            ['Quer focar na barriga', 'Express 2'],
            ['Quer bumbum e pernas mais firmes', 'Express 3'],
            ['Quer suar e acelerar o metabolismo', 'Express 4'],
            ['Passou o dia sentada', 'Express 5'],
            ['Está cansada ou estressada', 'Express 6'],
        ]),
        ('h2', 'Os exercícios novos deste protocolo'),
        ('newex', 'polichinelo-sem-salto'),
        ('newex', 'corrida-parada'),
        ('p', 'Os demais exercícios estão explicados passo a passo no guia <b>Pilates na Parede — Desafio 21 Dias</b>.'),
    ],
})

# 6b) BÔNUS EXTRA — CHÁ ASIÁTICO ANTICELULITE (prometido na oferta do quiz)
MATERIALS.append({
    'slug': 'bonus-cha-asiatico-anticelulite',
    'group': 'bonus',
    'title': 'Chá Asiático',
    'title2': 'Anticelulite',
    'kicker': 'BÔNUS EXTRA',
    'desc': 'O ritual do chá verde para se hidratar, trocar as bebidas doces e somar ao Pilates no cuidado com a celulite.',
    'cover': 'app/fotos/agua.webp',
    'body': [
        ('h2', 'A plantinha verde-escura'),
        ('p', 'O "chá asiático" é o <b>chá verde</b>, feito das folhas da <i>Camellia sinensis</i> — a mesma planta tomada há séculos '
              'na China e no Japão. Você encontra em qualquer mercado: em folhas soltas, em sachê ou em pó (o <b>matcha</b>).'),
        ('h2', 'O que o chá faz — e o que ele não faz'),
        ('p', 'A celulite depende de genética, hormônios, gordura e firmeza da pele e dos músculos. <b>Nenhum chá, sozinho, '
              'faz a celulite sumir.</b> O chá entra como aliado do seu plano:'),
        ('list', [
            '<b>Hidratação:</b> ajuda você a beber mais líquido ao longo do dia, o que deixa a pele com melhor aspecto.',
            '<b>Troca inteligente:</b> sem açúcar, tem praticamente zero calorias e substitui refrigerante e sucos de caixinha.',
            '<b>Ritual:</b> uma xícara no mesmo horário todo dia lembra você de cuidar do corpo — e de fazer o seu treino.',
        ]),
        ('tip', 'A dupla que funciona', 'Enquanto o chá cuida da hidratação, o <b>Pilates na Parede firma glúteos e pernas</b>. '
              'Músculo mais firme por baixo da pele é o que mais melhora o aspecto da celulite.'),
        ('h2', 'Como preparar do jeito certo'),
        ('steps', [
            'Aqueça a água até começar a soltar as primeiras bolhinhas (70 a 80 °C). <b>Não use água fervendo</b>: o chá fica amargo.',
            'Use 1 colher (chá) de folhas ou 1 sachê para cada xícara (200 ml).',
            'Abafe por <b>2 a 3 minutos</b> e coe. Mais tempo que isso também amarga.',
            'Tome sem açúcar. Se precisar, use um pouco de canela, limão ou hortelã para dar sabor.',
        ]),
        ('h2', '5 receitas para não enjoar'),
        ('h3', '1. Clássico morno'),
        ('p', '1 sachê de chá verde + 200 ml de água morna. Abafe 3 minutos. Ideal pela manhã.'),
        ('h3', '2. Chá verde com gengibre e limão'),
        ('p', '1 sachê + 2 rodelas finas de gengibre + 200 ml de água morna. Abafe 3 minutos e finalize com gotas de limão.'),
        ('h3', '3. Gelado com hortelã'),
        ('p', 'Prepare 500 ml de chá, deixe esfriar e leve à geladeira com folhas de hortelã e rodelas de limão. Substitui o refrigerante do almoço.'),
        ('h3', '4. Matcha latte'),
        ('p', '1 colher (chá) de matcha + 50 ml de água morna (mexa até dissolver) + 150 ml de leite ou bebida vegetal quente. Polvilhe canela.'),
        ('h3', '5. Chá verde com canela e maçã'),
        ('p', '1 sachê + 1 pau de canela + algumas lascas de maçã + 250 ml de água morna. Abafe 5 minutos com a maçã e retire o sachê aos 3.'),
        ('h2', 'Seu ritual diário'),
        ('table', ['Momento', 'O que fazer'], [
            ['Manhã', '1 xícara do clássico ou com gengibre, junto com o café da manhã.'],
            ['Almoço', 'Troque o refrigerante pelo chá gelado com hortelã.'],
            ['Tarde', 'Matcha latte ou chá com canela no lanche — nada depois das 17h.'],
            ['Noite', 'Só água. O chá verde tem cafeína e pode atrapalhar o sono.'],
        ]),
        ('warn', '<b>Cuidados:</b> no máximo 3 xícaras por dia. O chá verde tem cafeína — evite à noite e se você tem ansiedade, '
                 'insônia, pressão alta ou arritmia. Grávidas, lactantes e quem usa anticoagulantes ou outros remédios de uso contínuo '
                 'devem falar com o médico antes. Prefira o chá da xícara: <b>não use cápsulas de extrato concentrado</b>, '
                 'que já foram associadas a problemas no fígado.'),
        ('h2', 'Checklist dos 21 dias'),
        ('check', ['Comprei chá verde (sachê, folhas ou matcha)', 'Tomei a 1ª xícara sem açúcar',
                   'Troquei 1 refrigerante pelo chá gelado', 'Fiz o ritual 7 dias seguidos', 'Fiz o ritual 21 dias seguidos']),
    ],
})

# 7) UPSELL 1 — CARDÁPIO DESINCHAÇO 21 DIAS
MATERIALS.append({
    'slug': 'cardapio-desinchaco-21-dias',
    'group': 'extra',
    'title': 'Cardápio Desinchaço',
    'title2': '21 Dias',
    'kicker': 'COMPLEMENTO DO DESAFIO',
    'desc': 'Cardápio de 21 dias, lista de compras e chás para desinchar a barriga junto com os treinos.',
    'cover': 'app/fotos/agua.webp',
    'body': [
        ('h2', 'Por que a barriga incha'),
        ('p', 'Aquela barriga estufada no fim do dia, a calça que fecha de manhã e aperta à noite, nem sempre é gordura. '
              'Na maioria das vezes é <b>inchaço</b>: líquido retido e gases. Ele vem de excesso de sal e de '
              'ultraprocessados, pouca água, pouca fibra, intestino preso, comer rápido e, em muitas mulheres, das '
              'variações hormonais do ciclo e da menopausa.'),
        ('p', 'A boa notícia: o inchaço responde rápido. Com o cardápio certo, a maioria das mulheres sente a diferença '
              'na roupa <b>já na primeira semana</b>. O Pilates faz metade do trabalho; este cardápio faz o resto.'),
        ('h2', 'As 7 regras do desinchaço'),
        ('steps', [
            '<b>Água ao longo do dia.</b> Uma boa referência é 35 ml por quilo de peso. Parece contraditório, mas quem bebe pouca água retém mais.',
            '<b>Menos sal escondido.</b> Embutidos, temperos prontos, caldos em cubo, salgadinhos e comida congelada são os campeões.',
            '<b>Fibra todo dia.</b> Verduras, legumes, frutas com casca, aveia e feijão fazem o intestino funcionar.',
            '<b>Proteína em todas as refeições.</b> Segura a fome e ajuda a manter os músculos que você está fortalecendo.',
            '<b>Potássio no prato.</b> Banana, abacate, feijão, tomate e folhas escuras ajudam o corpo a eliminar o excesso de sódio.',
            '<b>Coma devagar.</b> Quem come rápido engole ar, e ar vira gás.',
            '<b>Jante mais cedo e mais leve.</b> De 2 a 3 horas antes de dormir.',
        ]),
        ('h2', 'O que evitar nos 21 dias'),
        ('table', ['Evite', 'Troque por'], [
            ['Refrigerante e água com gás', 'Água, água com limão ou chá gelado sem açúcar'],
            ['Presunto, salsicha, peito de peru', 'Frango desfiado, ovos ou queijo branco'],
            ['Caldo em cubo e tempero pronto', 'Alho, cebola, ervas, limão e páprica'],
            ['Salgadinho e biscoito recheado', 'Pipoca de panela, fruta ou castanhas'],
            ['Chiclete e bala', 'Cravo, canela em pau ou uma fruta'],
            ['Pão branco todo dia', 'Pão integral, tapioca com ovo ou cuscuz'],
        ]),
        ('tip', 'Feijão e repolho estufam?', 'Deixe o feijão de molho por 12 horas e jogue a água fora antes de cozinhar. '
              'Comece com porções pequenas: o intestino se acostuma em poucos dias.'),
        ('h2', 'Os chás do desinchaço'),
        ('p', 'Escolha um por dia e tome de 1 a 2 xícaras, sem açúcar, de preferência entre as refeições.'),
        ('table', ['Chá', 'Para quê', 'Atenção'], [
            ['Gengibre com limão', 'Digestão e sensação de estômago leve', 'Evite se tiver gastrite ou usar anticoagulante'],
            ['Hortelã', 'Gases e estufamento', 'Pode piorar o refluxo em algumas pessoas'],
            ['Erva-doce', 'Gases e cólica', 'Seguro para a maioria das pessoas'],
            ['Camomila', 'Digestão e sono (ótimo à noite)', 'Evite se tiver alergia a margarida'],
            ['Hibisco', 'Ação diurética leve', 'Evite se tiver pressão baixa, estiver grávida ou amamentando'],
        ]),
        ('h2', 'Como montar o prato'),
        ('list', [
            '<b>Metade do prato:</b> verduras e legumes (crus e cozidos).',
            '<b>Um quarto:</b> proteína (frango, peixe, ovos, carne magra, tofu).',
            '<b>Um quarto:</b> carboidrato de verdade (arroz, feijão, batata, mandioca, milho).',
            '<b>Tempero:</b> azeite, limão, alho e ervas no lugar do sal em excesso.',
        ]),
        ('pagebreak',),
        ('h2', 'Semana 1 — Desinchar'),
        ('p', 'Foco: cortar o sal escondido e fazer o intestino funcionar. As refeições se repetem de propósito, para facilitar as compras.'),
        ('table', ['Dia', 'Café da manhã', 'Almoço', 'Lanche', 'Jantar'], [
            ['1', 'Ovos mexidos + mamão', 'Frango grelhado, arroz, feijão e salada verde', 'Iogurte natural + aveia', 'Sopa de abóbora com frango desfiado'],
            ['2', 'Iogurte + banana + aveia', 'Peixe assado, purê de batata e brócolis', 'Maçã + castanhas', 'Omelete de espinafre + salada de tomate'],
            ['3', 'Tapioca com ovo + chá de hortelã', 'Carne moída com abobrinha, arroz e salada', 'Banana com canela', 'Sopa de legumes com frango'],
            ['4', 'Ovos mexidos + mamão', 'Frango grelhado, arroz, feijão e cenoura cozida', 'Iogurte natural + chia', 'Peixe com legumes no vapor'],
            ['5', 'Cuscuz com ovo', 'Omelete de forno com legumes e salada', 'Pera + castanhas', 'Caldo de frango com legumes'],
            ['6', 'Iogurte + morango + aveia', 'Peixe, arroz, feijão e salada de folhas', 'Abacate amassado com limão', 'Omelete com tomate e queijo branco'],
            ['7', 'Panqueca de banana e aveia', 'Livre (com metade do prato de salada)', 'Fruta', 'Sopa de abóbora com frango desfiado'],
        ]),
        ('h2', 'Semana 2 — Firmar'),
        ('p', 'Foco: mais proteína e mais variedade de vegetais, para segurar a fome e ajudar os músculos.'),
        ('table', ['Dia', 'Café da manhã', 'Almoço', 'Lanche', 'Jantar'], [
            ['8', 'Ovos cozidos + abacaxi', 'Frango ao curry com arroz e vagem', 'Iogurte + aveia', 'Salada completa com atum e grão-de-bico'],
            ['9', 'Pão integral com queijo branco', 'Carne de panela com legumes e arroz', 'Banana + pasta de amendoim', 'Sopa de lentilha'],
            ['10', 'Iogurte + kiwi + chia', 'Peixe assado, batata-doce e salada', 'Ovo cozido + tomate', 'Frango desfiado com abobrinha refogada'],
            ['11', 'Tapioca com frango', 'Omelete de legumes, arroz, feijão e salada', 'Maçã + castanhas', 'Caldo verde leve (sem linguiça)'],
            ['12', 'Ovos mexidos + mamão', 'Frango grelhado, quinoa ou arroz e brócolis', 'Iogurte + morango', 'Peixe com purê de abóbora'],
            ['13', 'Cuscuz com ovo', 'Carne moída com legumes e salada', 'Pipoca de panela', 'Salada morna de frango e legumes'],
            ['14', 'Panqueca de banana e aveia', 'Livre (com metade do prato de salada)', 'Fruta', 'Sopa de legumes com ovo'],
        ]),
        ('h2', 'Semana 3 — Manter'),
        ('p', 'Foco: transformar o que deu certo em hábito, para o resultado não ir embora depois do dia 21.'),
        ('table', ['Dia', 'Café da manhã', 'Almoço', 'Lanche', 'Jantar'], [
            ['15', 'Iogurte + banana + aveia', 'Peixe, arroz, feijão e salada colorida', 'Abacate com cacau', 'Omelete de forno com legumes'],
            ['16', 'Ovos mexidos + pão integral', 'Frango grelhado, mandioca cozida e salada', 'Pera + castanhas', 'Sopa de abóbora com frango'],
            ['17', 'Tapioca com queijo branco', 'Carne magra, arroz, feijão e beterraba', 'Iogurte + chia', 'Salada com atum e ovo'],
            ['18', 'Cuscuz com ovo', 'Escondidinho de frango com abóbora', 'Fruta + castanhas', 'Caldo de legumes com frango'],
            ['19', 'Iogurte + morango + aveia', 'Peixe assado com legumes e arroz', 'Ovo cozido + cenoura', 'Omelete de espinafre'],
            ['20', 'Ovos cozidos + mamão', 'Frango ao molho de tomate, arroz e salada', 'Pipoca de panela', 'Sopa de lentilha'],
            ['21', 'Panqueca de banana e aveia', 'Comemore! Livre, com metade do prato de salada', 'Fruta', 'Sopa de legumes com frango'],
        ]),
        ('tip', 'Quantidades', 'Este é um cardápio de referência, não uma dieta fechada. Coma até ficar satisfeita, não cheia. '
              'Se tiver diabetes, doença nos rins ou outra condição de saúde, ajuste com o seu nutricionista.'),
        ('h2', 'Trocas livres'),
        ('table', ['Se não tiver', 'Use'], [
            ['Frango', 'Ovos, peixe, carne magra ou tofu'],
            ['Iogurte natural', 'Kefir, coalhada ou queijo branco'],
            ['Arroz', 'Batata, mandioca, milho, quinoa ou cuscuz'],
            ['Abóbora', 'Cenoura, mandioquinha ou chuchu'],
            ['Castanhas', 'Amendoim ou sementes (girassol, abóbora)'],
        ]),
        ('h2', 'Lista de compras da semana'),
        ('check', ['2 dúzias de ovos', '1 kg de peito de frango', '500 g de peixe (tilápia ou merluza)', '500 g de carne moída magra',
                   '6 potes de iogurte natural', 'Aveia, chia e castanhas', 'Arroz, feijão e lentilha', 'Abóbora, abobrinha, cenoura e brócolis',
                   'Folhas verdes, tomate e pepino', 'Banana, mamão, maçã e morango', 'Limão, alho, cebola e ervas frescas',
                   'Chás: gengibre, hortelã, erva-doce, camomila']),
        ('h2', 'Checklist diário'),
        ('check', ['Bebi a minha meta de água', 'Tomei o chá do dia', 'Metade do prato com vegetais', 'Proteína em todas as refeições',
                   'Evitei embutidos e tempero pronto', 'Comi devagar', 'Fiz o treino do Desafio 21 Dias']),
    ],
})

# 8) UPSELL 2 — MENOPAUSA SEM BARRIGA
MATERIALS.append({
    'slug': 'menopausa-sem-barriga',
    'group': 'extra',
    'title': 'Menopausa',
    'title2': 'Sem Barriga',
    'kicker': 'PROTOCOLO NATURAL',
    'desc': 'Alimentação, treino e hábitos para a barriga hormonal, os calorões e a falta de energia depois dos 40.',
    'cover': 'app/fotos/energia.webp',
    'body': [
        ('h2', 'Não é falta de força de vontade. É hormonal.'),
        ('p', 'A partir dos 40 anos, muitas mulheres percebem que a barriga cresce mesmo comendo igual. Isso tem explicação: '
              'na <b>perimenopausa</b> (os anos antes da última menstruação) e depois da menopausa, o <b>estrogênio cai</b>. '
              'Com isso, a gordura deixa de se acumular no quadril e nas coxas e passa a ir para a <b>barriga</b>. Ao mesmo '
              'tempo, o corpo perde músculo mais rápido, o metabolismo desacelera e o sono piora.'),
        ('p', 'Este protocolo trabalha os 5 pilares que fazem diferença nessa fase. Nenhum deles depende de remédio, e todos '
              'combinam com o Desafio 21 Dias.'),
        ('warn', 'Converse com seu ginecologista sobre os seus sintomas. Para muitas mulheres, a terapia hormonal é segura e '
                 'muito eficaz, e só o médico pode avaliar se é indicada para você. Este protocolo funciona com ou sem ela.'),
        ('h2', 'Pilar 1 — Músculo é o seu remédio'),
        ('p', 'Músculo gasta energia até em repouso, protege os ossos (que ficam mais frágeis sem estrogênio) e melhora a forma '
              'como o corpo usa o açúcar. Por isso, nessa fase, <b>exercício de força vale mais que horas de cardio</b>.'),
        ('list', [
            'Faça o treino do Desafio 21 Dias todos os dias.',
            'Some 2 a 3 treinos de força por semana (abaixo), em dias alternados.',
            'Caminhe 20 a 30 minutos na maioria dos dias: ajuda o coração, o humor e o sono.',
        ]),
        ('workout', 'Treino de força 35+ · 3 voltas · 30 s de descanso', [
            ('agachamento-deslizante', '12 repetições'),
            ('flexao-parede', '10 repetições'),
            ('ponte-parede', '15 repetições'),
            ('afundo-apoiado', '8 de cada lado'),
            ('prancha-parede', '30 segundos'),
            ('elevacao-panturrilha', '15 repetições'),
        ], 'Exercícios em pé e com impacto leve também ajudam a proteger os ossos.'),
        ('h2', 'Pilar 2 — O prato hormonal'),
        ('table', ['O que priorizar', 'Por quê', 'Onde encontrar'], [
            ['Proteína (20 a 30 g por refeição)', 'Preserva o músculo e segura a fome', 'Ovos, frango, peixe, iogurte, queijo, feijão, tofu'],
            ['Cálcio', 'Protege os ossos', 'Leite, iogurte, queijo, sardinha, brócolis, gergelim'],
            ['Vitamina D', 'Ajuda o cálcio a chegar aos ossos', 'Sol da manhã por 15 min; peça o exame ao médico'],
            ['Fibras', 'Controle do açúcar no sangue e intestino', 'Verduras, legumes, aveia, feijão, frutas com casca'],
            ['Soja e linhaça', 'Têm fitoestrógenos, que ajudam algumas mulheres com os calorões', 'Tofu, edamame, bebida de soja, linhaça moída'],
            ['Gorduras boas', 'Saúde do coração, que fica mais vulnerável nessa fase', 'Azeite, abacate, castanhas, peixes'],
        ]),
        ('h3', 'Um dia no prato hormonal'),
        ('list', [
            '<b>Café da manhã:</b> iogurte natural com 1 colher de linhaça moída, aveia e fruta.',
            '<b>Almoço:</b> metade do prato de vegetais, peixe ou frango, arroz e feijão.',
            '<b>Lanche:</b> queijo branco com tomate ou um punhado de castanhas.',
            '<b>Jantar:</b> omelete com legumes ou sopa com frango ou tofu.',
        ]),
        ('h2', 'Pilar 3 — Menos calorões'),
        ('p', 'Descubra os seus gatilhos anotando os calorões por uma semana na tabela do fim deste guia. Os mais comuns são:'),
        ('list', [
            '<b>Álcool</b>, principalmente vinho tinto.',
            '<b>Café em excesso</b> e bebidas muito quentes.',
            '<b>Comida apimentada.</b>',
            '<b>Ambiente quente</b> e roupas sintéticas.',
            '<b>Estresse.</b>',
        ]),
        ('tip', 'Respiração para o calorão', 'Quando sentir o calor subindo: inspire pelo nariz contando até 5 e solte pela boca '
              'contando até 5. Faça por 2 minutos. Praticar 15 minutos por dia, mesmo sem calorão, ajuda a diminuir a frequência deles.'),
        ('list', [
            'Vista-se em camadas, que dá para tirar rápido.',
            'Prefira tecidos de algodão, inclusive no pijama e nos lençóis.',
            'Deixe um copo de água gelada e um leque perto da cama.',
            'Mantenha o quarto fresco e ventilado.',
        ]),
        ('h2', 'Pilar 4 — Sono que recupera'),
        ('p', 'Dormir mal aumenta a fome e a vontade de doce no dia seguinte e dificulta a perda de barriga.'),
        ('list', [
            'Mesmo horário para dormir e acordar, inclusive no fim de semana.',
            'Último café até as 14h.',
            'Jantar leve, 2 a 3 horas antes de deitar.',
            'Tela desligada 30 minutos antes de dormir.',
            'Na cama, faça a postura das pernas na parede por 3 minutos.',
        ]),
        ('ex', 'pernas-na-parede', '3 minutos antes de dormir'),
        ('h2', 'Pilar 5 — Humor e estresse'),
        ('p', 'A irritação, a ansiedade e a "névoa mental" também fazem parte da transição hormonal. O cortisol alto do estresse '
              'favorece o acúmulo de gordura na barriga.'),
        ('list', [
            '<b>5 minutos de respiração</b> por dia (a respiração lateral do desafio é perfeita).',
            '<b>Sol e caminhada</b> pela manhã.',
            '<b>Conversar:</b> falar com amigas que passam pelo mesmo ajuda mais do que parece.',
            '<b>Peça ajuda</b> se a tristeza durar mais de duas semanas.',
        ]),
        ('ex', 'respiracao-lateral', '5 minutos'),
        ('h2', 'Plano de 4 semanas'),
        ('table', ['Semana', 'Foco', 'Meta'], [
            ['1', 'Prato hormonal', 'Proteína em todas as refeições + diário de calorões'],
            ['2', 'Força', '2 treinos de força + caminhada 3x na semana'],
            ['3', 'Sono', 'Rotina do sono todas as noites + café só até as 14h'],
            ['4', 'Juntar tudo', '3 treinos de força + respiração diária + evitar os seus gatilhos'],
        ]),
        ('h2', 'Diário de sintomas'),
        ('table', ['Dia', 'Calorões (quantos)', 'Gatilho', 'Sono (0 a 10)', 'Energia (0 a 10)'],
         [[str(d), '', '', '', ''] for d in range(1, 8)]),
        ('tip', 'Leve para a consulta', 'Esse diário ajuda muito o seu ginecologista a entender o que está acontecendo.'),
        ('h2', 'Checklist diário'),
        ('check', ['Proteína em todas as refeições', 'Linhaça ou soja no dia', 'Treino do desafio ou de força',
                   'Caminhada ou sol da manhã', '5 minutos de respiração', 'Café só até as 14h', 'Dormi pelo menos 7 horas']),
    ],
})

# 9) UPSELL 3 — PILATES ÍNTIMO
MATERIALS.append({
    'slug': 'pilates-intimo',
    'group': 'extra',
    'title': 'Pilates Íntimo',
    'title2': 'Assoalho Pélvico Forte',
    'kicker': '10 MINUTOS POR DIA',
    'desc': 'Exercícios para o assoalho pélvico contra os escapes de xixi, para a barriga mais firme e para a intimidade.',
    'cover': 'app/fotos/fase1.webp',
    'body': [
        ('h2', 'O músculo que ninguém te apresentou'),
        ('p', 'O <b>assoalho pélvico</b> é um conjunto de músculos que fica na base da pelve, como uma rede que sustenta a '
              'bexiga, o útero e o intestino. Gestações, partos, a queda hormonal da menopausa, a prisão de ventre e anos '
              'de esforço errado deixam essa rede mais fraca.'),
        ('p', 'Os sinais mais comuns são <b>escapes de xixi</b> ao tossir, espirrar, rir ou pular, vontade urgente de ir ao '
              'banheiro, sensação de peso na região íntima e menos sensibilidade na relação. Escape de xixi é comum, mas '
              '<b>não é normal da idade</b>. E o treino do assoalho pélvico é a primeira recomendação para esses casos.'),
        ('warn', 'Procure um ginecologista ou uma fisioterapeuta pélvica se tiver dor, sangramento, sensação de "bola" saindo '
                 'pela vagina, infecções urinárias de repetição ou se estiver no pós-parto recente.'),
        ('h2', 'Encontre o seu assoalho pélvico'),
        ('steps', [
            'Sente-se em uma cadeira firme, com os pés no chão.',
            'Imagine que você está segurando um pum e, ao mesmo tempo, o xixi.',
            'Você deve sentir a região íntima fechar e subir levemente para dentro.',
            'Bumbum, coxas e barriga devem continuar relaxados.',
        ]),
        ('tip', 'Não sentiu nada?', 'Deite de lado e coloque a mão na região do períneo, entre a vagina e o ânus, por cima da '
              'roupa. Ao contrair, você vai sentir a região subir, se afastando da mão. Isso é normal no começo: a percepção '
              'melhora em poucos dias de treino.'),
        ('h2', 'A Rotina Íntima (10 minutos)'),
        ('workout', 'Faça na ordem, de preferência no mesmo horário', [
            ('respiracao-lateral', '1 minuto'),
            ('kegel-lento', '10 repetições de 5 segundos'),
            ('kegel-rapido', '10 piscadas'),
            ('basculamento-pelvico', '10 repetições'),
            ('ponte-parede', '10 repetições contraindo o assoalho na subida'),
            ('elevador-pelvico', '5 subidas'),
            ('concha-parede', '10 de cada lado'),
            ('pernas-na-parede', '1 minuto relaxando tudo'),
        ], 'O relaxamento é tão importante quanto a contração: um músculo que não relaxa também funciona mal.'),
        ('h2', 'Os exercícios, passo a passo'),
        ('newex', 'kegel-lento'),
        ('newex', 'kegel-rapido'),
        ('newex', 'elevador-pelvico'),
        ('ex', 'basculamento-pelvico', '10 repetições'),
        ('ex', 'ponte-parede', '10 repetições'),
        ('ex', 'concha-parede', '10 de cada lado'),
        ('h2', 'A trava: o truque contra os escapes'),
        ('p', 'Antes de tossir, espirrar, rir, pegar peso ou levantar da cadeira, <b>contraia o assoalho pélvico um segundo '
              'antes</b> e mantenha durante o esforço. Com a prática, isso fica automático e os escapes diminuem já nas '
              'primeiras semanas.'),
        ('h2', 'Plano de 4 semanas'),
        ('table', ['Semana', 'Posição', 'Contração lenta', 'Piscadas'], [
            ['1', 'Deitada', '10 x 3 segundos', '10'],
            ['2', 'Deitada e sentada', '10 x 5 segundos', '15'],
            ['3', 'Sentada', '10 x 8 segundos', '20'],
            ['4', 'Em pé', '10 x 10 segundos', '20 + a trava em todo esforço'],
        ]),
        ('p', 'Depois das 4 semanas, mantenha a rotina pelo menos 3 vezes por semana. Os resultados costumam ficar claros entre 6 e 12 semanas.'),
        ('h2', 'Mais força, mais prazer'),
        ('p', 'Músculos do assoalho pélvico fortes e bem irrigados estão ligados a <b>mais sensibilidade</b> e mais facilidade '
              'para chegar ao orgasmo. Conhecer e controlar essa região também traz mais confiança na intimidade. Durante a '
              'relação, experimente contrair e relaxar devagar.'),
        ('h2', 'Hábitos que protegem o assoalho pélvico'),
        ('list', [
            '<b>Não segure o xixi por horas</b>, mas também não vá ao banheiro "por precaução" o tempo todo.',
            '<b>Não faça força para fazer cocô.</b> Use um banquinho embaixo dos pés no vaso e capriche nas fibras e na água.',
            '<b>Ao pegar peso,</b> solte o ar e use a trava.',
            '<b>Evite excesso de café e refrigerante</b>, que irritam a bexiga.',
            '<b>Mantenha o peso saudável:</b> o excesso de barriga aumenta a pressão sobre a pelve.',
        ]),
        ('h2', 'Diário de escapes'),
        ('table', ['Semana', 'Escapes por dia (média)', 'Em que situação', 'Como me sinto'],
         [[str(s), '', '', ''] for s in range(1, 5)]),
        ('h2', 'Checklist diário'),
        ('check', ['Fiz a Rotina Íntima', 'Usei a trava ao tossir ou pegar peso', 'Bebi água ao longo do dia', 'Comi fibras',
                   'Relaxei o assoalho pélvico no fim do treino']),
    ],
})

# 10) UPSELL 4 — GRUPO VIP DE ACOMPANHAMENTO
MATERIALS.append({
    'slug': 'grupo-vip-acompanhamento',
    'group': 'extra',
    'title': 'Grupo VIP',
    'title2': 'Acompanhamento 21 Dias',
    'kicker': 'SEU GUIA DO GRUPO',
    'desc': 'Como entrar e aproveitar o Grupo VIP, o plano anti-desistência e o seu diário dos 21 dias.',
    'cover': 'app/fotos/grupo.webp',
    'body': [
        ('h2', 'Bem-vinda ao Grupo VIP'),
        ('p', 'Muitas mulheres desistem sozinhas na segunda semana, quando a empolgação '
              'do começo passa. No Grupo VIP você tem <b>lembrete diário</b>, <b>tira-dúvidas</b> e outras mulheres no mesmo '
              'desafio torcendo por você até o dia 21.'),
        ('tip', 'Entre agora no grupo', f'Acesse pelo link: <b>{GRUPO_VIP_LINK}</b>. Salve o grupo nos favoritos do WhatsApp '
              'para não perder as mensagens.'),
        ('h2', 'Como o grupo funciona'),
        ('table', ['Quando', 'O que acontece'], [
            ['Todo dia de manhã', 'Mensagem com o treino do dia e uma dica'],
            ['Ao longo do dia', 'Você faz o check-in quando terminar o treino'],
            ['Toda segunda', 'Meta da semana'],
            ['Todo domingo', 'Hora de compartilhar as conquistas da semana'],
            ['Sempre', 'Dúvidas sobre os exercícios são respondidas no grupo'],
        ]),
        ('h2', 'Como fazer o seu check-in'),
        ('p', 'Depois do treino, mande no grupo uma mensagem assim:'),
        ('p', '<b>✅ Dia 5 feito! Energia: 8/10. Hoje senti: as pernas mais firmes na ponte.</b>'),
        ('p', 'Só isso. Não precisa foto, não precisa texto longo. O check-in é um compromisso com você mesma.'),
        ('h2', 'As regras do grupo'),
        ('list', [
            'Respeito sempre: aqui ninguém julga corpo, idade ou ritmo.',
            'Nada de venda, corrente ou propaganda.',
            'Dúvidas de saúde específicas devem ser levadas ao seu médico.',
            'Compartilhe fotos só se quiser. Ninguém é obrigada.',
        ]),
        ('h2', 'O plano anti-desistência'),
        ('steps', [
            '<b>Nunca falhe dois dias seguidos.</b> Perdeu um dia? Normal. O importante é voltar no dia seguinte.',
            '<b>Em dia ruim, faça o Treino de Emergência</b> (abaixo). Três minutos contam.',
            '<b>Avise no grupo quando estiver desanimada.</b> Você vai se surpreender com o apoio.',
            '<b>Olhe para trás, não só para a frente.</b> Compare as suas medidas e fotos do dia 1, não o seu corpo com o de outra pessoa.',
            '<b>Treine no mesmo horário.</b> O que tem hora marcada acontece.',
        ]),
        ('workout', 'Treino de Emergência · 3 minutos', [
            ('respiracao-lateral', '30 segundos'),
            ('agachamento-deslizante', '45 segundos'),
            ('flexao-parede', '45 segundos'),
            ('ponte-parede', '45 segundos'),
            ('pernas-na-parede', '15 segundos'),
        ], 'Fez? Faça o check-in normalmente: dia feito é dia feito.'),
        ('h2', 'Suas medidas'),
        ('table', ['Medida', 'Dia 1', 'Dia 11', 'Dia 21'], [
            ['Cintura (na altura do umbigo)', '', '', ''],
            ['Quadril (parte mais larga)', '', '', ''],
            ['Braço (meio do braço)', '', '', ''],
            ['Coxa (meio da coxa)', '', '', ''],
            ['Peso', '', '', ''],
        ]),
        ('tip', 'Fotos do dia 1', 'Tire uma foto de frente e uma de lado, com a mesma roupa e a mesma luz. Repita no dia 21. '
              'As fotos mostram mudanças que o espelho do dia a dia esconde.'),
        ('pagebreak',),
        ('h2', 'Seu diário dos 21 dias'),
        ('table', ['Dia', 'Treino feito', 'Check-in no grupo', 'Energia (0 a 10)', 'Uma conquista do dia'],
         [[str(d), '', '', '', ''] for d in range(1, 22)]),
        ('h2', 'Carta para você no dia 21'),
        ('p', 'Escreva hoje, no dia 1, por que você começou. Leia de novo no dia 21.'),
        ('check', ['Eu comecei porque...', 'No dia 21 eu quero sentir...', 'Quando der vontade de desistir, vou lembrar que...']),
    ],
})

# 11) UPSELL 5 — ADEUS BRAÇO DE TCHAUZINHO
MATERIALS.append({
    'slug': 'adeus-braco-de-tchauzinho',
    'group': 'extra',
    'title': 'Adeus Braço',
    'title2': 'de Tchauzinho',
    'kicker': '7 MINUTOS POR DIA',
    'desc': 'Treinos de 7 minutos, sem pesos, para firmar a parte de trás do braço e a região da axila.',
    'cover': 'app/fotos/fase3.webp',
    'body': [
        ('h2', 'Por que o braço "balança"'),
        ('p', 'O famoso braço de tchauzinho fica na parte de trás do braço, onde está o <b>tríceps</b>. É um músculo pouco usado '
              'no dia a dia, que perde força e volume com o passar dos anos. Por cima dele, a pele perde elasticidade e é '
              'comum acumular gordura nessa região.'),
        ('p', 'Sendo sincera com você: nenhum exercício queima gordura só do braço. A gordura sai do corpo todo, com o treino '
              'do desafio e a alimentação. O que este guia faz é <b>firmar e dar volume ao músculo por baixo da pele</b>, e '
              'é isso que deixa o braço com aspecto durinho e para de balançar.'),
        ('h2', 'Treino A — Tríceps (7 minutos)'),
        ('workout', '40 s de exercício · 20 s de descanso · 7 exercícios', [
            ('circulos-bracos', '40 segundos'),
            ('triceps-parede', '40 segundos'),
            ('extensao-bracos-tras', '40 segundos'),
            ('mergulho-cadeira', '40 segundos'),
            ('prancha-parede', '40 segundos'),
            ('triceps-parede', '40 segundos'),
            ('abertura-peito', '40 segundos'),
        ]),
        ('h2', 'Treino B — Braço e axila (7 minutos)'),
        ('workout', '40 s de exercício · 20 s de descanso · 7 exercícios', [
            ('anjos-parede', '40 segundos'),
            ('remada-toalha', '40 segundos'),
            ('flexao-parede', '40 segundos'),
            ('extensao-bracos-tras', '40 segundos'),
            ('swan-em-pe', '40 segundos'),
            ('circulos-bracos', '40 segundos'),
            ('abertura-peito', '40 segundos'),
        ], 'A remada com toalha e os anjos na parede trabalham as costas e a região da axila, onde fica a gordurinha do sutiã.'),
        ('h2', 'Os exercícios, passo a passo'),
        ('newex', 'circulos-bracos'),
        ('newex', 'triceps-parede'),
        ('newex', 'extensao-bracos-tras'),
        ('newex', 'mergulho-cadeira'),
        ('newex', 'remada-toalha'),
        ('ex', 'flexao-parede', ''),
        ('ex', 'anjos-parede', ''),
        ('ex', 'prancha-parede', ''),
        ('h2', 'Plano de 4 semanas'),
        ('table', ['Semana', 'O que fazer', 'Como progredir'], [
            ['1', 'Treino A e B alternados, 5 dias na semana', '30 s de exercício e 30 s de descanso'],
            ['2', 'Treino A e B alternados, 5 dias na semana', '40 s de exercício e 20 s de descanso'],
            ['3', 'Treino A e B alternados, 6 dias na semana', 'Afaste mais os pés da parede'],
            ['4', 'Treino A + B no mesmo dia, 3 dias na semana', '45 s de exercício e 15 s de descanso'],
        ]),
        ('h2', 'Para o resultado aparecer mais rápido'),
        ('list', [
            '<b>Proteína em todas as refeições:</b> é a matéria-prima do músculo.',
            '<b>Não pule o Desafio 21 Dias:</b> é ele que ajuda a reduzir a gordura do corpo todo.',
            '<b>Hidrate a pele</b> do braço depois do banho e use protetor solar quando estiver de manga curta.',
            '<b>Postura:</b> ombros para trás deixam o braço visualmente mais fino na hora.',
            '<b>Sutiã do tamanho certo:</b> alça e costas apertadas criam a dobrinha da axila.',
        ]),
        ('h2', 'Acompanhe a sua evolução'),
        ('table', ['Medida', 'Dia 1', 'Dia 14', 'Dia 28'], [
            ['Braço direito (meio do braço)', '', '', ''],
            ['Braço esquerdo (meio do braço)', '', '', ''],
            ['Flexões na parede seguidas', '', '', ''],
        ]),
        ('tip', 'O teste da regata', 'No dia 1, tire uma foto de regata, de costas, com os braços abertos. Repita no dia 28.'),
        ('h2', 'Checklist diário'),
        ('check', ['Fiz o treino do braço (A ou B)', 'Fiz o treino do Desafio 21 Dias', 'Proteína em todas as refeições',
                   'Bebi água ao longo do dia', 'Cuidei da postura']),
    ],
})

# 12) UPSELL 6 — YOGA FACIAL
MATERIALS.append({
    'slug': 'yoga-facial',
    'group': 'extra',
    'title': 'Yoga Facial',
    'title2': '10 Minutos por Dia',
    'kicker': 'ROSTO FIRME',
    'desc': 'Exercícios faciais e automassagem para um rosto mais firme, menos papada e mais viço.',
    'cover': 'app/fotos/sono.webp',
    'body': [
        ('h2', 'Academia para o rosto'),
        ('p', 'O rosto tem mais de 40 músculos. Assim como os do corpo, eles perdem volume e firmeza com os anos, e a pele por '
              'cima acompanha. A yoga facial é um conjunto de exercícios que <b>trabalha esses músculos</b>, somado à '
              'automassagem, que ativa a circulação e desincha.'),
        ('p', 'Em um estudo da Northwestern University (Estados Unidos, 2018), mulheres de 40 a 65 anos que fizeram exercícios '
              'faciais por 20 semanas tiveram as bochechas mais cheias e aparência mais jovem na avaliação de dermatologistas. '
              'O estudo foi pequeno, mas o resultado é animador e o método é simples, barato e seguro.'),
        ('tip', 'Como fazer', 'Faça em frente ao espelho, com as mãos limpas e um pouco de hidratante ou óleo no rosto para os '
              'dedos deslizarem. O melhor horário é de manhã, para desinchar, ou à noite, junto com a sua rotina de cuidados.'),
        ('h2', 'Rotina Rosto Firme (10 minutos)'),
        ('workout', 'Faça na ordem', [
            ('face-testa', '5 repetições'),
            ('face-olhos', '5 repetições'),
            ('face-macas', '5 repetições'),
            ('face-bigode', '1 minuto'),
            ('face-papada', '8 repetições'),
            ('face-lingua', '8 repetições'),
        ], 'Termine com a automassagem de 3 minutos (abaixo).'),
        ('h2', 'Os exercícios, passo a passo'),
        *[('newex', i) for i in ['face-testa', 'face-olhos', 'face-macas', 'face-bigode', 'face-papada', 'face-lingua']],
        ('h2', 'Automassagem desinchante (3 minutos)'),
        ('steps', [
            '<b>Pescoço:</b> com os dedos espalmados, deslize da orelha até a clavícula, 5 vezes de cada lado. Isso "abre o caminho" para o líquido drenar.',
            '<b>Contorno do rosto:</b> com os nós dos dedos, deslize do queixo até a orelha, seguindo a linha da mandíbula. 5 vezes.',
            '<b>Maçãs:</b> deslize do canto do nariz até a têmpora, 5 vezes.',
            '<b>Olhos:</b> com o dedo anelar, bem leve, deslize do canto interno ao externo por baixo do olho. 5 vezes.',
            '<b>Testa:</b> deslize do centro da testa para as têmporas, alternando as mãos. 5 vezes.',
            '<b>Final:</b> desça das têmporas até o pescoço e a clavícula, 3 vezes.',
        ]),
        ('tip', 'Sempre de dentro para fora e de baixo para cima', 'E sempre com leveza: o rosto não precisa de força, precisa de constância.'),
        ('h2', 'Plano de 4 semanas'),
        ('table', ['Semana', 'Rotina', 'Foco'], [
            ['1', 'Rotina completa 1x por dia', 'Aprender os movimentos em frente ao espelho'],
            ['2', 'Rotina completa + automassagem toda manhã', 'Desinchar o rosto ao acordar'],
            ['3', 'Rotina com 8 repetições em cada exercício', 'Mais firmeza nas maçãs e no contorno'],
            ['4', 'Rotina completa + língua no céu da boca ao longo do dia', 'Papada e pescoço'],
        ]),
        ('h2', 'Hábitos que envelhecem (e o que fazer)'),
        ('table', ['Hábito', 'Troque por'], [
            ['Sair sem protetor solar', 'Protetor todos os dias, inclusive nublado e dentro de casa perto da janela'],
            ['Olhar o celular com a cabeça baixa', 'Celular na altura dos olhos (é o que mais marca o pescoço)'],
            ['Dormir de bruços com o rosto no travesseiro', 'Dormir de costas ou de lado com fronha de cetim'],
            ['Pouca água e pouco sono', '2 litros de água e 7 a 8 horas de sono'],
            ['Fumar', 'Procure ajuda para parar: é o que mais envelhece a pele'],
        ]),
        ('h2', 'Fotos de progresso'),
        ('p', 'Tire uma foto de frente e uma de perfil no dia 1, sem maquiagem, com a mesma luz (de preferência perto de uma '
              'janela). Repita no dia 28. As mudanças são graduais e a foto ajuda a percebê-las.'),
        ('warn', 'Não faça os exercícios se tiver ferida, inflamação ou procedimento estético recente no rosto (botox, '
                 'preenchimento, peeling). Nesses casos, pergunte antes ao seu dermatologista quando pode começar.'),
        ('h2', 'Checklist diário'),
        ('check', ['Fiz a Rotina Rosto Firme', 'Fiz a automassagem', 'Usei protetor solar', 'Olhei o celular na altura dos olhos',
                   'Bebi água ao longo do dia']),
    ],
})

# ─────────────────────────────── 51 RECEITAS ───────────────────────────────
# (nome, tempo, rendimento, [ingredientes], [preparo])
RECIPES = {
    'Café da manhã': [
        ('Panqueca de 3 ingredientes', '10 min', '1 porção', ['1 banana madura', '2 ovos', '2 colheres (sopa) de aveia'],
         ['Amasse a banana e misture com os ovos e a aveia.', 'Despeje em frigideira antiaderente untada e doure dos dois lados.', 'Sirva com canela ou frutas.']),
        ('Ovos mexidos cremosos com queijo', '7 min', '1 porção', ['2 ovos', '1 colher (sopa) de requeijão light', 'Sal, pimenta e cheiro-verde'],
         ['Bata os ovos com o requeijão.', 'Cozinhe em fogo baixo, mexendo sempre, até ficar cremoso.', 'Finalize com cheiro-verde.']),
        ('Omelete de forno em xícara', '5 min', '1 porção', ['2 ovos', '2 colheres de queijo branco picado', 'Tomate e espinafre picados'],
         ['Misture tudo em uma caneca untada.', 'Leve ao micro-ondas por 1 min, mexa e volte por mais 40 s.']),
        ('Overnight oats proteico', '5 min + geladeira', '1 porção', ['3 colheres de aveia', '1 pote de iogurte natural', '1 colher de chia', 'Frutas vermelhas'],
         ['Misture aveia, iogurte e chia em um pote.', 'Deixe na geladeira de um dia para o outro.', 'Cubra com as frutas antes de comer.']),
        ('Crepioca de frango', '10 min', '1 porção', ['1 ovo', '2 colheres de goma de tapioca', '3 colheres de frango desfiado', 'Orégano'],
         ['Bata o ovo com a tapioca.', 'Despeje na frigideira, recheie com o frango e dobre ao meio.']),
        ('Tapioca de ovo e queijo', '8 min', '1 porção', ['3 colheres de goma de tapioca', '1 ovo mexido', '1 fatia de queijo branco'],
         ['Espalhe a goma na frigideira quente até firmar.', 'Recheie com o ovo e o queijo e dobre.']),
        ('Pão de queijo de frigideira', '10 min', '1 porção', ['1 ovo', '2 colheres de goma de tapioca', '1 colher de requeijão', '2 colheres de queijo ralado'],
         ['Misture tudo até formar uma massa lisa.', 'Doure em frigideira tampada, 3 min de cada lado.']),
        ('Mingau de aveia com whey ou leite em pó', '7 min', '1 porção', ['3 colheres de aveia', '200 ml de leite', '1 colher de leite em pó ou whey', 'Canela'],
         ['Cozinhe a aveia no leite mexendo até engrossar.', 'Desligue, misture o leite em pó ou whey e a canela.']),
        ('Iogurte turbinado', '3 min', '1 porção', ['1 pote de iogurte natural', '1 colher de pasta de amendoim', '½ banana', 'Granola sem açúcar'],
         ['Monte tudo em camadas em um copo.']),
        ('Wrap de ovo', '8 min', '1 porção', ['2 ovos batidos', '1 fatia de peito de peru', 'Folhas e tomate'],
         ['Faça uma "panqueca" fina com os ovos na frigideira.', 'Recheie com peito de peru e salada e enrole.']),
        ('Cuscuz com ovo', '10 min', '1 porção', ['4 colheres de flocão de milho', '1 ovo', 'Sal e água'],
         ['Hidrate o flocão com água e sal e cozinhe no micro-ondas ou cuscuzeira.', 'Sirva com ovo cozido ou mexido por cima.']),
        ('Vitamina proteica de morango', '3 min', '1 copo', ['200 ml de leite', '1 pote de iogurte natural', '5 morangos', '1 colher de aveia'],
         ['Bata tudo no liquidificador e sirva gelado.']),
    ],
    'Lanches': [
        ('Muffin de ovo e legumes', '25 min', '6 unidades', ['6 ovos', '1 cenoura ralada', '½ abobrinha ralada', 'Queijo ralado e sal'],
         ['Bata os ovos e misture os legumes e o queijo.', 'Distribua em forminhas e asse a 180 °C por 20 min.']),
        ('Grão-de-bico crocante', '35 min', '4 porções', ['2 xícaras de grão-de-bico cozido', '1 colher de azeite', 'Páprica, sal e alho em pó'],
         ['Seque bem o grão-de-bico e tempere.', 'Asse a 200 °C por 30 min, mexendo na metade.']),
        ('Patê de atum', '5 min', '3 porções', ['1 lata de atum', '3 colheres de iogurte natural', 'Limão, cebolinha e sal'],
         ['Amasse o atum e misture os demais ingredientes.', 'Sirva com palitos de cenoura ou pão integral.']),
        ('Ovos cozidos temperados', '12 min', '2 porções', ['4 ovos', 'Sal, pimenta e páprica'],
         ['Cozinhe os ovos por 9 min em água fervente.', 'Esfrie, descasque e tempere.']),
        ('Pipoca proteica', '8 min', '2 porções', ['3 colheres de milho de pipoca', '1 colher de chá de óleo', '2 colheres de queijo parmesão ralado'],
         ['Estoure a pipoca na panela com o óleo.', 'Finalize com o parmesão.']),
        ('Bolinho de frango de air fryer', '20 min', '10 unidades', ['2 xícaras de frango desfiado', '1 ovo', '2 colheres de aveia', 'Temperos'],
         ['Misture tudo e modele bolinhas.', 'Asse na air fryer a 180 °C por 12 min.']),
        ('Iogurte grego caseiro com mel', '5 min + 4 h', '2 porções', ['2 potes de iogurte natural', '1 colher de mel', 'Canela'],
         ['Coe o iogurte em um pano limpo na geladeira por 4 horas.', 'Sirva com mel e canela.']),
        ('Queijo branco grelhado com tomate', '6 min', '1 porção', ['2 fatias de queijo coalho ou minas', 'Tomate-cereja', 'Orégano'],
         ['Grelhe o queijo na frigideira até dourar.', 'Sirva com tomate e orégano.']),
        ('Homus de grão-de-bico', '10 min', '4 porções', ['1 xícara de grão-de-bico cozido', '1 colher de tahine ou pasta de amendoim', 'Limão, alho, sal e água'],
         ['Bata tudo no processador até ficar cremoso.', 'Sirva com legumes crus.']),
        ('Sanduíche natural de frango', '7 min', '1 porção', ['2 fatias de pão integral', '3 colheres de frango desfiado', '1 colher de requeijão light', 'Cenoura ralada'],
         ['Misture o frango, o requeijão e a cenoura.', 'Recheie o pão.']),
        ('Shake de café gelado', '3 min', '1 copo', ['150 ml de leite gelado', '1 dose de café', '1 colher de leite em pó', 'Gelo'],
         ['Bata tudo no liquidificador.']),
        ('Espetinho caprese', '5 min', '1 porção', ['Bolinhas de muçarela de búfala', 'Tomate-cereja', 'Manjericão'],
         ['Monte no palito alternando os ingredientes.', 'Tempere com azeite e sal.']),
    ],
    'Almoço e jantar': [
        ('Frango grelhado ao limão', '20 min', '2 porções', ['2 filés de frango', 'Suco de 1 limão', 'Alho, sal e páprica'],
         ['Tempere o frango e deixe 10 min no limão.', 'Grelhe em frigideira quente 5 min de cada lado.']),
        ('Escondidinho de mandioca com carne', '40 min', '4 porções', ['500 g de mandioca cozida', '400 g de carne moída magra', 'Cebola, alho e tomate', 'Queijo ralado'],
         ['Refogue a carne com os temperos.', 'Amasse a mandioca com um pouco do caldo.', 'Monte em camadas, cubra com queijo e gratine.']),
        ('Omelete de forno com legumes', '30 min', '4 porções', ['6 ovos', 'Brócolis, tomate e cebola picados', '3 colheres de queijo ralado'],
         ['Bata os ovos, misture os legumes e o queijo.', 'Asse em forma untada a 180 °C por 25 min.']),
        ('Peixe assado com batatas', '35 min', '2 porções', ['2 filés de tilápia', '2 batatas em rodelas', 'Limão, azeite, sal e ervas'],
         ['Arrume as batatas na assadeira e asse 15 min.', 'Junte o peixe temperado e asse mais 15 min.']),
        ('Carne moída com abobrinha', '20 min', '3 porções', ['400 g de carne moída magra', '1 abobrinha em cubos', 'Cebola, alho e tomate'],
         ['Refogue a carne com os temperos.', 'Junte a abobrinha e cozinhe até ficar macia.']),
        ('Strogonoff fit de frango', '25 min', '3 porções', ['400 g de frango em cubos', '1 pote de iogurte natural', '2 colheres de molho de tomate', 'Champignon'],
         ['Doure o frango com cebola e alho.', 'Junte molho e champignon.', 'Desligue e misture o iogurte.']),
        ('Salada completa com atum', '10 min', '1 porção', ['Folhas variadas', '1 lata de atum', '1 ovo cozido', 'Grão-de-bico, tomate e azeite'],
         ['Monte tudo em uma tigela grande e tempere.']),
        ('Wrap integral de frango', '10 min', '1 porção', ['1 tortilha integral', '3 colheres de frango desfiado', 'Folhas, tomate e iogurte temperado'],
         ['Recheie a tortilha e enrole.', 'Aqueça na frigideira para selar.']),
        ('Pizza de frigideira proteica', '15 min', '1 porção', ['2 ovos', '2 colheres de aveia', 'Molho de tomate', 'Queijo e frango desfiado'],
         ['Bata ovos e aveia e faça um disco na frigideira.', 'Vire, cubra com molho, queijo e frango e tampe até derreter.']),
        ('Sopa de legumes com frango', '35 min', '4 porções', ['300 g de frango em cubos', 'Abóbora, cenoura, chuchu e batata', 'Cebola, alho e cheiro-verde'],
         ['Refogue o frango com cebola e alho.', 'Junte os legumes e água e cozinhe até ficarem macios.']),
        ('Almôndegas de forno', '35 min', '4 porções', ['500 g de carne moída magra', '1 ovo', '3 colheres de aveia', 'Temperos e molho de tomate'],
         ['Misture carne, ovo, aveia e temperos e modele bolinhas.', 'Asse a 200 °C por 20 min e cubra com molho.']),
        ('Lentilha com legumes', '30 min', '4 porções', ['1 xícara de lentilha', 'Cenoura e abobrinha em cubos', 'Cebola, alho e cominho'],
         ['Cozinhe a lentilha por 15 min.', 'Refogue os legumes e misture à lentilha.']),
        ('Frango xadrez fit', '25 min', '3 porções', ['400 g de frango em cubos', 'Pimentões coloridos e cebola', '2 colheres de shoyu light', 'Amendoim'],
         ['Doure o frango.', 'Junte os legumes e o shoyu e salteie.', 'Finalize com amendoim.']),
        ('Arroz de couve-flor com camarão', '20 min', '2 porções', ['½ couve-flor ralada', '200 g de camarão limpo', 'Alho, azeite e cheiro-verde'],
         ['Salteie o camarão no alho e azeite.', 'Junte a couve-flor e refogue 5 min.']),
        ('Bowl de carne, feijão e legumes', '15 min', '1 porção', ['1 palma de carne em tiras', '1 concha de feijão', 'Legumes salteados', '½ concha de arroz'],
         ['Salteie a carne e os legumes.', 'Monte o bowl com feijão e arroz.']),
    ],
    'Doces proteicos': [
        ('Mousse de chocolate com iogurte', '5 min + geladeira', '2 porções', ['2 potes de iogurte natural', '2 colheres de cacau em pó', 'Adoçante ou mel a gosto'],
         ['Misture tudo até ficar homogêneo.', 'Leve à geladeira por 1 hora.']),
        ('Brigadeiro de colher fit', '10 min', '2 porções', ['4 colheres de leite em pó', '2 colheres de cacau', '½ xícara de leite'],
         ['Cozinhe tudo em fogo baixo mexendo até desgrudar do fundo.']),
        ('Bolo de caneca de banana', '5 min', '1 porção', ['1 banana', '1 ovo', '2 colheres de aveia', '1 colher de cacau', '½ colher de fermento'],
         ['Amasse a banana e misture tudo na caneca.', 'Micro-ondas por 2 min.']),
        ('Cookies de aveia e pasta de amendoim', '20 min', '10 unidades', ['1 xícara de aveia', '3 colheres de pasta de amendoim', '1 banana amassada', 'Gotas de chocolate 70%'],
         ['Misture tudo e modele os cookies.', 'Asse a 180 °C por 12 min.']),
        ('Sorvete de banana com cacau', '5 min + freezer', '2 porções', ['2 bananas congeladas', '1 colher de cacau', '2 colheres de iogurte'],
         ['Bata tudo no processador até virar um creme.']),
        ('Pudim de chia', '5 min + geladeira', '2 porções', ['4 colheres de chia', '250 ml de leite', 'Baunilha e frutas'],
         ['Misture a chia com o leite e a baunilha.', 'Deixe 4 horas na geladeira e cubra com frutas.']),
        ('Cheesecake de pote', '10 min', '2 porções', ['1 pote de iogurte grego', '2 colheres de ricota', 'Biscoito integral triturado', 'Calda de frutas vermelhas'],
         ['Bata iogurte com ricota.', 'Monte no pote: biscoito, creme e calda.']),
        ('Panqueca doce de cacau', '10 min', '1 porção', ['1 ovo', '1 banana', '1 colher de cacau', '1 colher de aveia'],
         ['Bata tudo e faça panquecas pequenas na frigideira.']),
        ('Maçã assada com canela e iogurte', '20 min', '2 porções', ['2 maçãs', 'Canela', '1 pote de iogurte natural'],
         ['Corte as maçãs, polvilhe canela e asse a 180 °C por 15 min.', 'Sirva com iogurte.']),
        ('Trufa de pasta de amendoim', '15 min', '12 unidades', ['4 colheres de pasta de amendoim', '4 colheres de leite em pó', '1 colher de mel', 'Cacau para envolver'],
         ['Misture até formar uma massa.', 'Modele bolinhas e passe no cacau.']),
        ('Gelatina proteica', '5 min + geladeira', '4 porções', ['1 envelope de gelatina zero', '1 pote de iogurte natural', '250 ml de água quente'],
         ['Dissolva a gelatina na água quente.', 'Bata com o iogurte e leve à geladeira.']),
        ('Picolé de iogurte com morango', '5 min + freezer', '4 unidades', ['2 potes de iogurte natural', '8 morangos', 'Mel a gosto'],
         ['Bata tudo e coloque em forminhas de picolé.', 'Congele por 6 horas.']),
    ],
}
