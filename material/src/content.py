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

# ─────────────────────────────── EXERCÍCIOS EXTRAS (fora do app) ───────────────────────────────
NEW_EX = {
    'vacuo-abdominal': {
        'name': 'Vácuo abdominal (respiração da cintura)',
        'muscles': ['Transverso do abdômen', 'Diafragma'],
        'position': 'Em pé, costas apoiadas na parede, joelhos levemente soltos e mãos na cintura.',
        'steps': [
            'Inspire pelo nariz enchendo as costelas para os lados.',
            'Solte todo o ar pela boca, devagar, até esvaziar os pulmões.',
            'Sem puxar o ar de novo, leve o umbigo para dentro e para cima, como se fechasse um zíper.',
            'Segure de 5 a 15 segundos e solte, voltando a respirar normalmente.',
        ],
        'breathing': 'A contração acontece com os pulmões vazios. Entre uma repetição e outra, faça 2 respirações normais.',
        'errors': ['Prender a respiração com os pulmões cheios.', 'Encolher os ombros ou travar o pescoço.'],
        'easier': 'Faça deitada de barriga para cima, joelhos dobrados, segurando só 5 segundos.',
        'safety': 'Não faça de estômago cheio, grávida, com pressão alta não controlada ou se sentir tontura.',
    },
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
    'abdominal-bicicleta-lento': {
        'name': 'Bicicleta lenta deitada',
        'muscles': ['Oblíquos', 'Reto abdominal'],
        'position': 'Deitada de barriga para cima, mãos atrás da cabeça, joelhos dobrados a 90° no ar.',
        'steps': [
            'Tire levemente a cabeça e os ombros do chão.',
            'Estenda a perna direita enquanto gira o tronco levando o cotovelo direito na direção do joelho esquerdo.',
            'Troque o lado devagar, sentindo a cintura trabalhar.',
        ],
        'breathing': 'Expire a cada giro.',
        'errors': ['Puxar o pescoço com as mãos.', 'Fazer rápido e sem controle.'],
        'easier': 'Mantenha os pés no chão e faça só o giro do tronco.',
        'safety': 'Se sentir a lombar, estenda menos a perna (mais alta).',
    },
    'elevacao-lateral-deitada': {
        'name': 'Elevação de perna deitada de lado',
        'muscles': ['Glúteo médio', 'Lateral da coxa'],
        'position': 'Deitada de lado, cabeça apoiada no braço, pernas estendidas uma sobre a outra.',
        'steps': [
            'Firme o abdômen e mantenha o quadril empilhado.',
            'Suba a perna de cima até a altura do quadril, com o pé paralelo ao chão.',
            'Desça devagar sem encostar totalmente na outra perna.',
        ],
        'breathing': 'Expire ao subir, inspire ao descer.',
        'errors': ['Girar o pé para cima.', 'Deixar o quadril cair para trás.'],
        'easier': 'Dobre o joelho de baixo para ter mais estabilidade.',
        'safety': 'Movimento curto e controlado vale mais que perna alta.',
        'perSide': True,
    },
    'quatro-apoios-coice': {
        'name': 'Coice em quatro apoios',
        'muscles': ['Glúteo máximo', 'Posteriores de coxa'],
        'position': 'Em quatro apoios, mãos abaixo dos ombros e joelhos abaixo do quadril (use uma toalha nos joelhos).',
        'steps': [
            'Firme o abdômen para a lombar não afundar.',
            'Leve um joelho dobrado para trás e para cima, sola do pé apontando para o teto.',
            'Aperte o glúteo no alto e desça devagar.',
        ],
        'breathing': 'Expire ao subir a perna.',
        'errors': ['Arquear a lombar para subir mais.', 'Girar o quadril.'],
        'easier': 'Faça em pé, com as mãos na parede (extensão de quadril).',
        'safety': 'Com dor nos punhos, apoie os antebraços em uma cadeira ou no sofá.',
        'perSide': True,
    },
    'superman-deitada': {
        'name': 'Superman alternado',
        'muscles': ['Eretores da coluna', 'Glúteos', 'Costas'],
        'position': 'Deitada de barriga para baixo, braços estendidos à frente, testa apoiada em uma toalha.',
        'steps': [
            'Firme o abdômen, como se tirasse o umbigo do chão.',
            'Eleve o braço direito e a perna esquerda poucos centímetros.',
            'Segure 2 segundos, desça e troque o lado.',
        ],
        'breathing': 'Expire ao subir.',
        'errors': ['Jogar a cabeça para trás.', 'Subir muito alto, comprimindo a lombar.'],
        'easier': 'Suba só os braços ou só as pernas.',
        'safety': 'Pare se sentir incômodo na lombar.',
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

# 4) BÔNUS 3 — DIETA PERSONALIZADA
MATERIALS.append({
    'slug': 'bonus-3-dieta-personalizada',
    'group': 'bonus',
    'title': 'Dieta 100%',
    'title2': 'Personalizada',
    'kicker': 'BÔNUS 3',
    'desc': 'Monte o seu plano alimentar com refeições simples do dia a dia, para emagrecer sem passar fome.',
    'cover': 'app/fotos/agua.webp',
    'body': [
        ('h2', 'Uma dieta feita para a sua rotina'),
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

# 7) UPSELL 1 — ACELERADOR DE RESULTADOS TURBO 3X
MATERIALS.append({
    'slug': 'acelerador-de-resultados-turbo-3x',
    'group': 'extra',
    'title': 'Acelerador de Resultados',
    'title2': 'Turbo 3X',
    'kicker': 'ATALHO DA TRANSFORMAÇÃO',
    'desc': 'Estratégias para queimar mais gordura e ver resultado mais rápido, sem academia e sem dieta maluca.',
    'cover': 'ww/img/tablet1.webp',
    'body': [
        ('h2', 'Os 3 aceleradores'),
        ('p', 'O Desafio 21 Dias fortalece e alinha o seu corpo. Este guia soma <b>três aceleradores</b> que fazem '
              'o resultado aparecer mais rápido: <b>mover mais o corpo no dia a dia</b>, <b>circuitos que aceleram o '
              'coração</b> e <b>hábitos que ajudam o corpo a queimar gordura</b>.'),
        ('h2', 'Acelerador 1 — Movimento do dia a dia'),
        ('p', 'Grande parte da energia que gastamos não vem do treino, e sim de tudo o que fazemos fora dele: andar, '
              'subir escadas, arrumar a casa. Aumentar esse movimento é a forma mais fácil de queimar mais sem treinar mais.'),
        ('list', [
            '<b>Meta de passos:</b> descubra a sua média atual no celular e some 1.000 passos por semana até chegar perto de 8.000.',
            '<b>Escada sempre que possível</b> e estacionar ou descer do ônibus um pouco mais longe.',
            '<b>Ligações em pé</b> ou caminhando pela casa.',
            '<b>Regra dos 50 minutos:</b> a cada 50 minutos sentada, levante e se mexa por 2 minutos.',
            '<b>Caminhada pós-refeição:</b> 10 minutos depois do almoço ou do jantar ajudam a digestão e o controle do açúcar no sangue.',
        ]),
        ('h2', 'Acelerador 2 — Circuito Turbo (12 minutos)'),
        ('p', 'Faça 3 vezes por semana, em dias alternados, depois do treino do desafio ou em outro horário do dia.'),
        ('workout', '30 s de exercício · 15 s de descanso · 4 voltas', [
            ('polichinelo-sem-salto', '30 s'), ('agachamento-deslizante', '30 s'),
            ('escalador-parede', '30 s'), ('ponte-marcha', '30 s'),
        ], 'Semana 1: 3 voltas. Semana 2: 4 voltas. Semana 3: 40 s de exercício e 15 s de descanso.'),
        ('newex', 'polichinelo-sem-salto'),
        ('ex', 'agachamento-deslizante', '30 s'),
        ('ex', 'escalador-parede', '30 s'),
        ('ex', 'ponte-marcha', '30 s'),
        ('h2', 'Acelerador 3 — Hábitos que queimam'),
        ('table', ['Hábito', 'Por que acelera', 'Como fazer'], [
            ['Proteína no café da manhã', 'Aumenta a saciedade e ajuda a preservar músculo', 'Ovos, iogurte ou queijo branco já na primeira refeição'],
            ['Água antes das refeições', 'Ajuda a perceber a saciedade', '1 copo 15 minutos antes do almoço e do jantar'],
            ['Dormir 7–8 horas', 'Sono ruim aumenta a fome no dia seguinte', 'Mesmo horário para deitar, quarto escuro, sem tela 30 min antes'],
            ['Vegetais primeiro', 'Mais fibras, menos calorias no prato', 'Comece pela salada em todas as refeições principais'],
            ['Menos líquidos açucarados', 'Calorias que não dão saciedade', 'Troque refrigerante e suco por água com limão ou chá'],
            ['Jantar mais cedo e mais leve', 'Melhor sono e digestão', 'Jante 2 a 3 horas antes de dormir'],
        ]),
        ('h2', 'Plano Turbo de 21 dias'),
        ('table', ['Dias', 'Movimento', 'Circuito Turbo', 'Hábito-foco'], [
            ['1–7', 'Média de passos + 1.000', '2x na semana, 3 voltas', 'Proteína no café + água antes das refeições'],
            ['8–14', 'Média + 2.000', '3x na semana, 4 voltas', 'Vegetais primeiro + caminhada pós-refeição'],
            ['15–21', 'Média + 3.000', '3x na semana, 40 s/15 s', 'Sono 7–8 h + jantar mais cedo'],
        ]),
        ('h2', 'Checklist Turbo diário'),
        ('check', ['Treino do Desafio 21 Dias', 'Meta de passos', 'Proteína no café da manhã', '2 litros de água',
                   'Circuito Turbo (nos dias marcados)', '7 horas de sono']),
        ('tip', 'Meça o que importa', 'Tire as medidas de cintura, quadril e coxa e uma foto de frente e de lado no dia 1. '
              'Repita no dia 21, na mesma hora e com a mesma roupa. A fita métrica e o espelho mostram mudanças que a balança não mostra.'),
    ],
})

# 8) UPSELL 2 — CÓDIGO PROIBIDO DO CORPO VIOLÃO
MATERIALS.append({
    'slug': 'codigo-proibido-do-corpo-violao',
    'group': 'extra',
    'title': 'Código Proibido do',
    'title2': 'Corpo Violão',
    'kicker': 'MÉTODO VIP',
    'desc': 'Cintura definida, barriga mais seca e curvas realçadas com um método simples, rápido e sem academia.',
    'cover': 'ww/img/tablet2.webp',
    'body': [
        ('h2', 'O "código" do corpo violão'),
        ('p', 'O formato de violão vem do <b>contraste</b> entre uma cintura mais fina e um quadril e glúteos mais '
              'cheios. Não dá para escolher de onde o corpo perde gordura, mas dá para <b>fortalecer o abdômen profundo</b> '
              '(que funciona como uma cinta natural) e <b>desenvolver os glúteos</b>, o que realça a curva.'),
        ('list', [
            '<b>Código 1 — Cintura:</b> respiração, vácuo abdominal e exercícios de core que "fecham" a cintura.',
            '<b>Código 2 — Curvas:</b> glúteo máximo e médio fortes para levantar e arredondar o bumbum.',
            '<b>Código 3 — Barriga seca:</b> constância, alimentação com proteína e menos inchaço.',
        ]),
        ('h2', 'Código 1 — Treino Cintura (10 minutos)'),
        ('workout', '3 voltas · 20 s de descanso', [
            ('vacuo-abdominal', '5 x 10 s'), ('dead-bug-parede', '10 repetições'),
            ('prancha-lateral-parede', '20 s de cada lado'), ('abdominal-bicicleta-lento', '12 repetições'),
        ]),
        ('newex', 'vacuo-abdominal'),
        ('ex', 'dead-bug-parede', ''),
        ('ex', 'prancha-lateral-parede', ''),
        ('newex', 'abdominal-bicicleta-lento'),
        ('h2', 'Código 2 — Treino Curvas (15 minutos)'),
        ('workout', '3 voltas · 30 s de descanso', [
            ('ponte-unilateral', '10 de cada lado'), ('quatro-apoios-coice', '15 de cada lado'),
            ('abducao-em-pe', '15 de cada lado'), ('afundo-apoiado', '10 de cada lado'),
            ('elevacao-lateral-deitada', '15 de cada lado'),
        ], 'Segure 2 segundos no ponto mais alto de cada repetição, apertando o glúteo.'),
        ('ex', 'ponte-unilateral', ''),
        ('newex', 'quatro-apoios-coice'),
        ('ex', 'abducao-em-pe', ''),
        ('ex', 'afundo-apoiado', ''),
        ('newex', 'elevacao-lateral-deitada'),
        ('h2', 'Código 3 — Barriga seca'),
        ('list', [
            '<b>Menos inchaço:</b> reduza ultraprocessados, embutidos e excesso de sal; aumente água, frutas e vegetais.',
            '<b>Proteína + fibra</b> em todas as refeições para controlar a fome.',
            '<b>Atenção às bebidas:</b> refrigerantes e bebidas alcoólicas aumentam o inchaço e as calorias.',
            '<b>Postura:</b> abdômen ativo e ombros abertos mudam a silhueta na hora (veja o Bônus 1).',
        ]),
        ('h2', 'Plano VIP de 4 semanas'),
        ('table', ['Dia', 'Semanas 1 e 2', 'Semanas 3 e 4'], [
            ['Segunda', 'Treino Curvas', 'Treino Curvas (4 voltas)'],
            ['Terça', 'Treino Cintura', 'Treino Cintura + vácuo 2x no dia'],
            ['Quarta', 'Descanso ativo (caminhada)', 'Descanso ativo (caminhada)'],
            ['Quinta', 'Treino Curvas', 'Treino Curvas (4 voltas)'],
            ['Sexta', 'Treino Cintura', 'Treino Cintura (4 voltas)'],
            ['Sábado', 'Curvas + Cintura (2 voltas cada)', 'Curvas + Cintura (3 voltas cada)'],
            ['Domingo', 'Descanso', 'Descanso'],
        ]),
        ('h2', 'Acompanhe as suas medidas'),
        ('table', ['Medida', 'Dia 1', 'Dia 14', 'Dia 28'], [
            ['Cintura (na altura do umbigo)', '', '', ''],
            ['Quadril (parte mais larga do bumbum)', '', '', ''],
            ['Coxa (meio da coxa)', '', '', ''],
            ['Relação cintura ÷ quadril', '', '', ''],
        ]),
        ('tip', 'Dica VIP', 'Meça sempre pela manhã, em jejum, com a fita bem rente à pele sem apertar. '
              'Quando a cintura diminui e o quadril se mantém ou aumenta, o formato violão está aparecendo.'),
    ],
})

# 9) UPSELL 3 — PREGUIÇOSA GOSTOSA
MATERIALS.append({
    'slug': 'preguicosa-gostosa',
    'group': 'extra',
    'title': 'Preguiçosa Gostosa',
    'title2': 'Corpo Durinho Sem Academia',
    'kicker': 'MÉTODO',
    'desc': 'Exercícios rápidos e simples, a maioria deitada, para tonificar o corpo sem sair de casa.',
    'cover': 'ww/img/tablet3.webp',
    'body': [
        ('h2', 'O método para quem tem preguiça (e tudo bem)'),
        ('p', 'Você não precisa amar treinar para ter um corpo mais firme. O Preguiçosa Gostosa foi pensado para os dias '
              'em que a energia está lá embaixo: <b>quase tudo é feito deitada</b>, no tapete ou até na cama, com '
              'movimentos lentos que trabalham fundo o abdômen, os glúteos e as pernas.'),
        ('tip', 'A regra de ouro', '<b>Combine o treino com algo que você já faz.</b> Ao acordar, antes de levantar da cama; '
              'ou à noite, assistindo à sua série. O hábito "pega carona" e você nem percebe que treinou.'),
        ('h2', 'Treino da Cama — manhã (7 minutos)'),
        ('workout', '45 s cada · sem descanso · 1 volta', [
            ('respiracao-lateral', '45 s'), ('basculamento-pelvico', '45 s'), ('ponte-parede', '45 s'),
            ('concha-parede', '45 s (troque o lado na metade)'), ('toque-pes-parede', '45 s'),
            ('deslize-pernas', '45 s'), ('pernas-na-parede', '1 min'),
        ], 'Na cama, use a cabeceira ou a parede ao lado. Se o colchão for muito macio, prefira um tapete.'),
        ('h2', 'Treino do Sofá — noite (8 minutos)'),
        ('workout', '40 s cada · 10 s de descanso · 2 voltas', [
            ('elevacao-lateral-deitada', '40 s (20 s cada lado)'), ('circulos-perna', '40 s (20 s cada lado)'),
            ('dead-bug-parede', '40 s'), ('superman-deitada', '40 s'),
        ]),
        ('h2', 'Treino Preguiça Zero (para os dias com um pouco mais de energia — 10 min)'),
        ('workout', '40 s / 20 s · 2 voltas', [
            ('ponte-marcha', '40 s'), ('agachamento-isometrico', '40 s'), ('prancha-parede', '40 s'),
            ('abducao-em-pe', '40 s (20 s cada lado)'), ('elevacao-panturrilha', '40 s'),
        ]),
        ('h2', 'Plano de 14 dias'),
        ('table', ['Dia', 'Manhã', 'Noite'], [
            ['1, 2, 3', 'Treino da Cama', '—'],
            ['4', 'Treino da Cama', 'Treino do Sofá (1 volta)'],
            ['5', 'Descanso', 'Pernas na parede 3 min'],
            ['6, 7', 'Treino da Cama', 'Treino do Sofá'],
            ['8', 'Preguiça Zero', '—'],
            ['9, 10', 'Treino da Cama', 'Treino do Sofá'],
            ['11', 'Descanso', 'Pernas na parede 3 min'],
            ['12, 13', 'Treino da Cama', 'Treino do Sofá'],
            ['14', 'Preguiça Zero', 'Comemore! Compare suas fotos'],
        ]),
        ('h2', 'Os exercícios, passo a passo'),
        *[('ex', i, '') for i in ['basculamento-pelvico', 'ponte-parede', 'concha-parede', 'toque-pes-parede',
                                  'deslize-pernas', 'circulos-perna', 'dead-bug-parede']],
        ('newex', 'elevacao-lateral-deitada'),
        ('newex', 'superman-deitada'),
        ('h2', 'Truques da preguiçosa esperta'),
        ('list', [
            'Deixe o tapete aberto no quarto: o que está à vista vira hábito.',
            'Coloque uma música animada de 7 minutos e treine até ela acabar.',
            'Marque um X no calendário a cada dia feito. Não quebre a corrente!',
            'Em dias péssimos, faça só 1 exercício. Começar já conta.',
        ]),
    ],
})

# 10) UPSELL 4 — RITUAL SECRETO DA GOSTOSA
MATERIALS.append({
    'slug': 'ritual-secreto-da-gostosa',
    'group': 'extra',
    'title': 'Ritual Secreto da',
    'title2': 'Gostosa',
    'kicker': '5 MINUTOS POR DIA',
    'desc': 'Um ritual de 5 minutos por dia para cintura definida, bumbum empinado e corpo mais firme.',
    'cover': 'ww/img/tablet4.webp',
    'body': [
        ('h2', 'Cinco minutos que mudam o seu dia'),
        ('p', 'O Ritual Secreto é uma sequência curta, feita <b>todos os dias no mesmo horário</b>. Cada dia da semana '
              'tem um ritual diferente, com 5 exercícios de 50 segundos e 10 segundos para trocar: exatamente 5 minutos.'),
        ('tip', 'O segredo está no ritual', 'Escolha um gatilho fixo: logo depois de escovar os dentes de manhã, ou antes do '
              'banho. Separe a roupa, abra o tapete e comece. O corpo aprende rápido quando a hora é sempre a mesma.'),
        ('h2', 'Segunda — Ritual Cintura'),
        ('workout', '50 s cada · 10 s para trocar', [
            ('vacuo-abdominal', '50 s (repetições de 10 s)'), ('dead-bug-parede', '50 s'),
            ('prancha-lateral-parede', '25 s cada lado'), ('abdominal-bicicleta-lento', '50 s'), ('respiracao-lateral', '50 s'),
        ]),
        ('h2', 'Terça — Ritual Bumbum'),
        ('workout', '50 s cada · 10 s para trocar', [
            ('ponte-parede', '50 s'), ('quatro-apoios-coice', '25 s cada lado'), ('concha-parede', '25 s cada lado'),
            ('ponte-marcha', '50 s'), ('figura-quatro', '25 s cada lado'),
        ]),
        ('h2', 'Quarta — Ritual Pernas'),
        ('workout', '50 s cada · 10 s para trocar', [
            ('agachamento-deslizante', '50 s'), ('afundo-apoiado', '25 s cada lado'), ('agachamento-isometrico', '50 s'),
            ('elevacao-panturrilha', '50 s'), ('quadriceps-apoio', '25 s cada lado'),
        ]),
        ('h2', 'Quinta — Ritual Postura'),
        ('workout', '50 s cada · 10 s para trocar', [
            ('anjos-parede', '50 s'), ('swan-em-pe', '50 s'), ('flexao-parede', '50 s'),
            ('rotacao-toracica', '25 s cada lado'), ('abertura-peito', '25 s cada lado'),
        ]),
        ('h2', 'Sexta — Ritual Queima'),
        ('workout', '50 s cada · 10 s para trocar', [
            ('polichinelo-sem-salto', '50 s'), ('escalador-parede', '50 s'), ('corrida-parada', '50 s'),
            ('agachamento-deslizante', '50 s'), ('marcha-apoiada', '50 s'),
        ]),
        ('h2', 'Sábado — Ritual Curvas'),
        ('workout', '50 s cada · 10 s para trocar', [
            ('ponte-unilateral', '25 s cada lado'), ('abducao-em-pe', '25 s cada lado'),
            ('elevacao-lateral-deitada', '25 s cada lado'), ('extensao-quadril', '25 s cada lado'), ('prancha-parede', '50 s'),
        ]),
        ('h2', 'Domingo — Ritual Leveza'),
        ('workout', '1 minuto em cada posição', [
            ('pernas-na-parede', '1 min'), ('borboleta-parede', '1 min'), ('posterior-parede', '30 s cada lado'),
            ('inclinacao-lateral', '30 s cada lado'), ('respiracao-lateral', '1 min'),
        ]),
        ('h2', 'Os exercícios exclusivos do Ritual'),
        ('newex', 'vacuo-abdominal'),
        ('newex', 'abdominal-bicicleta-lento'),
        ('newex', 'quatro-apoios-coice'),
        ('newex', 'elevacao-lateral-deitada'),
        ('newex', 'polichinelo-sem-salto'),
        ('newex', 'corrida-parada'),
        ('p', 'Os demais exercícios estão explicados passo a passo no guia <b>Pilates na Parede — Desafio 21 Dias</b>.'),
        ('h2', 'Calendário de 30 dias'),
        ('p', 'Marque cada dia em que fizer o seu ritual. Ao completar 30, você terá criado um hábito para a vida.'),
        ('grid30',),
    ],
})

# 11) UPSELL 5 — O SEGREDO DAS MULHERES QUE NÃO ENGORDAM
MATERIALS.append({
    'slug': 'o-segredo-das-mulheres-que-nao-engordam',
    'group': 'extra',
    'title': 'O Segredo das Mulheres',
    'title2': 'que Não Engordam',
    'kicker': 'HÁBITOS SIMPLES E REAIS',
    'desc': 'Os hábitos que mantêm o corpo em forma, sem dietas malucas e sem passar fome.',
    'cover': 'ww/img/tablet5.webp',
    'body': [
        ('h2', 'Não é genética. São hábitos.'),
        ('p', 'Sabe aquela amiga que "come de tudo e não engorda"? Quase sempre ela tem hábitos que ninguém vê: come '
              'devagar, para quando está satisfeita, se mexe o dia todo e não passa o dia beliscando. Este guia '
              'reúne esses hábitos para você colocar em prática, <b>um de cada vez</b>.'),
        ('h2', 'Os 10 hábitos'),
        ('steps', [
            '<b>Come devagar.</b> Leva uns 20 minutos para o cérebro perceber a saciedade. Apoie os talheres entre as garfadas.',
            '<b>Para no "satisfeita", não no "cheia".</b> Use a escala de fome abaixo antes e no meio da refeição.',
            '<b>Prato colorido primeiro.</b> Metade do prato de vegetais, sempre.',
            '<b>Proteína em todas as refeições.</b> Ela segura a fome por mais tempo.',
            '<b>Não belisca.</b> Faz refeições de verdade em horários parecidos.',
            '<b>Bebe água e não bebe calorias.</b> Refrigerante e suco são exceção, não regra.',
            '<b>Se mexe o dia todo.</b> Anda, sobe escada, brinca, dança. Não depende só do treino.',
            '<b>Dorme bem.</b> Noite mal dormida aumenta a vontade de doce no dia seguinte.',
            '<b>Não proíbe nada.</b> Come o doce com calma, sem culpa, e segue a vida. Proibir aumenta a vontade.',
            '<b>Tem um plano para o fim de semana.</b> Escolhe onde vai "chutar o balde" e mantém o resto.',
        ]),
        ('h2', 'A escala da fome'),
        ('table', ['Nota', 'Como você se sente', 'O que fazer'], [
            ['1–2', 'Fome intensa, irritada, tonta', 'Você esperou demais. Coma algo com proteína agora.'],
            ['3–4', 'Fome tranquila, estômago "chamando"', 'Hora ideal para comer.'],
            ['5', 'Neutra', 'Não precisa comer.'],
            ['6–7', 'Satisfeita, confortável', 'Hora ideal para parar.'],
            ['8–10', 'Cheia, estufada, sonolenta', 'Passou do ponto. Observe o que levou a isso, sem culpa.'],
        ]),
        ('h2', 'Fome física ou vontade emocional?'),
        ('table', ['Fome física', 'Fome emocional'], [
            ['Vem aos poucos', 'Vem de repente'],
            ['Qualquer comida resolve', 'Pede um alimento específico (doce, salgado)'],
            ['Passa quando você come', 'Continua mesmo depois de comer'],
            ['Sem culpa depois', 'Costuma vir com culpa'],
        ]),
        ('tip', 'Pausa de 10 minutos', 'Quando bater a vontade fora de hora, beba um copo de água e espere 10 minutos fazendo '
              'outra coisa. Se ainda quiser, coma uma porção pequena, sentada e com calma.'),
        ('h2', 'Como comer fora sem sair do eixo'),
        ('list', [
            '<b>Restaurante por quilo:</b> monte primeiro a salada, depois a proteína e por último o carboidrato.',
            '<b>Lanchonete:</b> prefira sanduíche com proteína e salada; divida a batata frita.',
            '<b>Pizza:</b> coma 2 fatias com salada antes; escolha sabores com mais recheio e menos borda.',
            '<b>Festa:</b> não chegue com fome; faça um lanche com proteína antes.',
            '<b>Bebida alcoólica:</b> intercale cada copo com um copo de água.',
        ]),
        ('h2', 'Lanches que seguram a fome'),
        ('list', [
            'Iogurte natural com fruta e aveia.', 'Ovo cozido e uma fruta.', 'Queijo branco com tomate e orégano.',
            'Maçã com 1 colher de pasta de amendoim.', 'Pipoca de panela com pouco óleo.', 'Grão-de-bico assado com páprica.',
        ]),
        ('h2', 'Plano de 21 dias: um hábito por vez'),
        ('table', ['Dias', 'Hábito novo', 'Mantenha também'], [
            ['1–3', 'Comer devagar (20 min por refeição)', '—'],
            ['4–6', 'Metade do prato com vegetais', 'Comer devagar'],
            ['7–9', 'Proteína em todas as refeições', 'Os anteriores'],
            ['10–12', 'Água no lugar de bebidas com açúcar', 'Os anteriores'],
            ['13–15', 'Usar a escala da fome', 'Os anteriores'],
            ['16–18', 'Dormir 7 horas', 'Os anteriores'],
            ['19–21', 'Plano para o fim de semana', 'Todos os hábitos'],
        ]),
        ('h2', 'Checklist diário'),
        ('check', ['Comi devagar', 'Metade do prato com vegetais', 'Proteína em todas as refeições', 'Bebi água e evitei bebidas açucaradas',
                   'Parei no "satisfeita"', 'Me movimentei além do treino', 'Dormi pelo menos 7 horas']),
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
