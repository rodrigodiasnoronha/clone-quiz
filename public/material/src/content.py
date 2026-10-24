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
    'This material is educational and does not replace guidance from a doctor, dietitian or certified fitness '
    'professional. If you have any health condition, are pregnant, postpartum or feel pain, '
    'talk to a professional before starting and always respect your body\'s limits.'
)

# Link do grupo VIP no WhatsApp (aparece no PDF do Grupo VIP)
GRUPO_VIP_LINK = 'https://chat.whatsapp.com/TROQUE-PELO-LINK-DO-GRUPO'

# ─────────────────────────────── EXERCÍCIOS EXTRAS (fora do app) ───────────────────────────────
NEW_EX = {
    'polichinelo-sem-salto': {
        'name': 'No-jump jumping jacks',
        'muscles': ['Shoulders', 'Legs', 'Heart'],
        'position': 'Standing, feet together and arms by your sides.',
        'steps': [
            'Step your right leg out to the side while raising both arms overhead.',
            'Come back to center.',
            'Repeat with your left leg.',
            'Keep a pace that gets your breathing up without losing control.',
        ],
        'breathing': 'Breathe rhythmically, without holding your breath.',
        'errors': ['Arching your lower back as your arms go up.', 'Slamming your heel into the floor.'],
        'easier': 'Only raise your arms to shoulder height and go slower.',
        'safety': 'Great for getting your heart rate up with no impact on your knees.',
    },
    'corrida-parada': {
        'name': 'Easy running in place',
        'muscles': ['Legs', 'Glutes', 'Heart'],
        'position': 'Standing, facing the wall, hands on it at chest height.',
        'steps': [
            'Lean your body slightly forward, hands on the wall.',
            'Alternate bringing your knees up, like running in place.',
            'Land on the balls of your feet and keep your abs tight.',
        ],
        'breathing': 'Breathe in through your nose and out through your mouth, in rhythm with your steps.',
        'errors': ['Letting your hips drop back.', 'Landing on your heels.'],
        'easier': 'Switch to a quick march, never lifting both feet off the floor at once.',
        'safety': 'With knee pain, do the marching version.',
    },
    # Pilates Íntimo (assoalho pélvico)
    'kegel-lento': {
        'name': 'Slow pelvic floor squeeze',
        'muscles': ['Pelvic floor'],
        'position': 'Lying on your back, knees bent, feet on the floor and hands on your belly.',
        'steps': [
            'Breathe in through your nose and relax your belly and pelvic area.',
            'As you breathe out, close and draw your pelvic area in and up, as if holding in pee and gas at the same time.',
            'Hold the squeeze for 3 to 10 seconds, breathing normally.',
            'Fully release for the same amount of time you held before the next rep.',
        ],
        'breathing': 'Squeeze as you breathe out and never hold your breath during the squeeze.',
        'errors': ['Squeezing your butt, thighs or belly instead of your pelvic floor.', 'Not relaxing between reps.'],
        'easier': 'Hold for just 3 seconds and do 5 reps.',
        'safety': 'Don\'t use this exercise to stop your pee mid-stream: that interferes with emptying your bladder.',
    },
    'kegel-rapido': {
        'name': 'Quick squeezes (flicks)',
        'muscles': ['Pelvic floor'],
        'position': 'Lying down, sitting or standing, depending on the week of the plan.',
        'steps': [
            'Squeeze your pelvic area strongly and quickly, like a blink.',
            'Fully release right after.',
            'Repeat at a pace of about one flick per second.',
        ],
        'breathing': 'Breathe normally, without holding your breath.',
        'errors': ['Doing half-squeezes because you\'re rushing.', 'Forgetting to fully release between flicks.'],
        'easier': 'Do 5 flicks and rest 10 seconds before 5 more.',
        'safety': 'If you feel pelvic pain, stop and see a pelvic floor physical therapist.',
    },
    'elevador-pelvico': {
        'name': 'The elevator',
        'muscles': ['Pelvic floor', 'Transverse abdominis'],
        'position': 'Sitting on a sturdy chair, feet on the floor and spine long.',
        'steps': [
            'Imagine your pelvic area is an elevator on the ground floor.',
            'Squeeze a little and rise to the 1st floor. Hold 2 seconds.',
            'Squeeze more and rise to the 2nd floor. Hold 2 seconds.',
            'Squeeze as hard as you can and reach the 3rd floor. Hold 2 seconds.',
            'Come down floor by floor until you fully release on the ground floor.',
        ],
        'breathing': 'Breathe in short, calm breaths on the way up, without holding your breath.',
        'errors': ['Lifting your shoulders or clenching your belly hard.'],
        'easier': 'Use only two floors.',
        'safety': 'Control matters more than strength: go up and down slowly.',
    },
    # Adeus Braço de Tchauzinho
    'circulos-bracos': {
        'name': 'Arm circles',
        'muscles': ['Shoulders', 'Back of the arms'],
        'position': 'Standing, arms out at shoulder height and palms facing down.',
        'steps': [
            'Make small forward circles with your arms straight.',
            'Halfway through, reverse to backward circles.',
            'Keep your shoulders away from your ears.',
        ],
        'breathing': 'Breathe rhythmically, without holding your breath.',
        'errors': ['Letting your arms drop below shoulder height.', 'Bending your elbows.'],
        'easier': 'Rest your arms for 5 seconds whenever you need to.',
        'safety': 'With shoulder pain, make smaller circles with your arms a little lower.',
    },
    'triceps-parede': {
        'name': 'Close-grip wall push-up (triceps)',
        'muscles': ['Triceps', 'Chest'],
        'position': 'Facing the wall, an arm\'s length away, hands on it at chest height and close together.',
        'steps': [
            'Brace your abs and keep your body straight from head to heels.',
            'Bend your elbows back, close to your body, and bring your chest toward the wall.',
            'Push the wall and straighten your arms to come back.',
        ],
        'breathing': 'Inhale as you lower in and exhale as you push.',
        'errors': ['Flaring your elbows out to the sides.', 'Letting your hips drift back.'],
        'easier': 'Move your feet closer to the wall.',
        'safety': 'With wrist pain, rest on your forearms and just hold a plank.',
    },
    'mergulho-cadeira': {
        'name': 'Chair dips',
        'muscles': ['Triceps', 'Shoulders'],
        'position': 'Sitting on the edge of a sturdy chair against the wall, hands beside your hips with fingers forward and feet on the floor.',
        'steps': [
            'Lift your hips off the chair, putting your weight on your hands.',
            'Bend your elbows back and lower your hips a few inches.',
            'Push into the chair and straighten your arms to come up.',
        ],
        'breathing': 'Inhale as you lower and exhale as you rise.',
        'errors': ['Going too low and straining your shoulder.', 'Flaring your elbows out to the sides.'],
        'easier': 'Move your feet closer to the chair and only lower a little.',
        'safety': 'Only use a sturdy chair without wheels. With shoulder pain, switch to the close-grip wall push-up.',
    },
    'remada-toalha': {
        'name': 'Towel row',
        'muscles': ['Back', 'Back of the shoulder', 'Biceps'],
        'position': 'Standing, feet hip-width apart, holding a towel taut with both hands in front of your chest.',
        'steps': [
            'Pull the ends of the towel outward, as if trying to tear it.',
            'Keeping the tension, draw your elbows back and squeeze your shoulder blades together.',
            'Bring your arms back forward without losing tension on the towel.',
        ],
        'breathing': 'Exhale as you draw your elbows back.',
        'errors': ['Shrugging your shoulders.', 'Arching your lower back.'],
        'easier': 'Go slower and pull the towel less hard.',
        'safety': 'Keep your neck relaxed throughout the movement.',
    },
    'extensao-bracos-tras': {
        'name': 'Backward arm pulses',
        'muscles': ['Triceps', 'Back of the shoulder'],
        'position': 'Standing, torso leaning slightly forward, knees soft and arms straight by your sides, palms facing back.',
        'steps': [
            'Reach your straight arms back as far as you can.',
            'Make small up-and-down pulses.',
            'Feel the backs of your arms burn.',
        ],
        'breathing': 'Breathe rhythmically.',
        'errors': ['Bending your elbows.', 'Rounding your back.'],
        'easier': 'Do it standing with your torso upright.',
        'safety': 'Keep your abs tight to protect your lower back.',
    },
    # Yoga Facial
    'face-testa': {
        'name': 'Smooth forehead',
        'muscles': ['Forehead muscle (frontalis)'],
        'position': 'Sitting in front of the mirror, index fingers just above your eyebrows.',
        'steps': [
            'Gently hold the skin of your forehead down with your fingers.',
            'Try to raise your eyebrows against the resistance of your fingers.',
            'Hold for 5 seconds and release slowly.',
        ],
        'breathing': 'Breathe through your nose throughout the exercise.',
        'errors': ['Furrowing your forehead without your fingers holding it.', 'Pressing the skin hard.'],
        'safety': 'Do it with clean hands and without pulling your skin.',
    },
    'face-olhos': {
        'name': 'Firm gaze',
        'muscles': ['Muscle around the eyes (orbicularis)'],
        'position': 'Sitting, index fingers at the outer corners of your eyes and middle fingers at the inner corners.',
        'steps': [
            'Look up without moving your head.',
            'Gently squeeze your lower eyelids, like squinting into the sun.',
            'Hold for 5 seconds and relax.',
        ],
        'breathing': 'Breathe slowly through your nose.',
        'errors': ['Closing your eyes completely.', 'Wrinkling your forehead at the same time.'],
        'safety': 'Remove contact lenses first.',
    },
    'face-macas': {
        'name': 'Cheekbone lift',
        'muscles': ['Zygomaticus', 'Cheeks'],
        'position': 'Sitting in front of the mirror.',
        'steps': [
            'Make an "O" with your mouth, covering your teeth with your lips.',
            'Smile with the corners of your mouth, keeping the "O", and feel your cheeks lift.',
            'Place your fingers lightly on your cheekbones and lift them a little more.',
            'Hold for 5 seconds and relax.',
        ],
        'breathing': 'Breathe through your nose.',
        'errors': ['Opening your mouth too wide.', 'Furrowing your forehead.'],
        'safety': 'Stop if you feel pain in your jaw joint.',
    },
    'face-bigode': {
        'name': 'Air cheeks (smile lines)',
        'muscles': ['Cheeks', 'Muscles around the mouth'],
        'position': 'Sitting, spine straight and lips closed.',
        'steps': [
            'Fill your mouth with air.',
            'Slowly move the air from one cheek to the other.',
            'Then move the air above your upper lip and hold for 3 seconds.',
        ],
        'breathing': 'Breathe through your nose while holding the air in your mouth.',
        'errors': ['Tensing your neck.'],
        'safety': 'Do it gently, without forcing.',
    },
    'face-papada': {
        'name': 'Kiss the ceiling (double chin)',
        'muscles': ['Neck muscle (platysma)', 'Muscles under the chin'],
        'position': 'Sitting, spine straight and shoulders relaxed.',
        'steps': [
            'Tilt your head back, looking at the ceiling, without making your neck uncomfortable.',
            'Pucker your lips, like blowing a kiss to the ceiling.',
            'Hold for 5 seconds and bring your head back to center.',
        ],
        'breathing': 'Breathe through your nose.',
        'errors': ['Throwing your head back hard.', 'Lifting your shoulders.'],
        'easier': 'Only tilt your head back a little.',
        'safety': 'With neck problems or dizziness, do it looking straight ahead.',
    },
    'face-lingua': {
        'name': 'Tongue to the roof of your mouth',
        'muscles': ['Muscles under the chin', 'Tongue'],
        'position': 'Sitting, looking straight ahead, lips closed.',
        'steps': [
            'Press your whole tongue against the roof of your mouth, like a suction cup.',
            'Push your tongue up, feeling the area under your chin firm up.',
            'Hold for 5 seconds and release.',
        ],
        'breathing': 'Breathe through your nose.',
        'errors': ['Clenching your teeth.'],
        'safety': 'It\'s discreet: you can do it in traffic or at your computer.',
    },
}

# ─────────────────────────────── MATERIAIS ───────────────────────────────
MATERIALS = []

# 1) GUIA PRINCIPAL — montado a partir do conteúdo do app (ver build.py)
MATERIALS.append({
    'slug': 'wall-pilates-21-days',
    'group': 'programa',
    'title': 'Wall Pilates',
    'title2': '21-Day Challenge',
    'kicker': 'COMPLETE GUIDE',
    'desc': 'The day-by-day 21-day plan and the library with every exercise explained step by step.',
    'cover': 'app/fotos/parede.webp',
    'auto': 'program',
})

# 2) BÔNUS 1 — POSTURA DE FERRO
MATERIALS.append({
    'slug': 'bonus-1-iron-posture',
    'group': 'bonus',
    'title': 'Iron Posture',
    'title2': 'Protocol',
    'kicker': 'BONUS 1',
    'desc': 'A sequence to align your spine and relieve the tension of sitting all day.',
    'cover': 'app/fotos/alongamento.webp',
    'body': [
        ('h2', 'Why posture changes your body'),
        ('p', 'Spending hours sitting, looking at your phone or computer, pulls your shoulders forward, '
              'closes your chest and pushes your head forward. Over time, your chest muscles shorten, your back muscles '
              'get weak and your lower back and neck work harder than they should. The result is that heavy-body '
              'feeling, pain at the end of the day and a belly that looks bigger than it really is.'),
        ('p', 'The good news: posture is a habit. With <b>10 minutes a day</b> of wall exercises and a few simple '
              'tweaks to your routine, you teach your body to stay aligned effortlessly.'),
        ('tip', 'How to use this protocol', 'Do the <b>Iron Posture Routine</b> every day for 4 weeks, '
              'ideally in the morning or right after work. On 21-Day Challenge days, you can do it before '
              'your workout as a warm-up. Use the <b>micro-breaks</b> throughout the day.'),
        ('h2', 'The wall test: your starting point'),
        ('steps', [
            'Stand with your heels a hand-width from the wall.',
            'Press your hips, back and, if you can without forcing, the back of your head against the wall.',
            'Notice: does your head touch without lifting your chin? Do your shoulders touch the wall?',
            'Slide your hand between your lower back and the wall: a flat hand should fit, not a closed fist.',
        ]),
        ('p', 'Write down how the test went today and repeat it at the end of each week. It\'s the simplest way to see your progress.'),
        ('h2', 'The Iron Posture Routine (10 minutes)'),
        ('workout', 'Do them in order, without rushing', [
            ('respiracao-lateral', '1 minute'),
            ('gato-vaca-parede', '8 reps'),
            ('anjos-parede', '2 sets of 8'),
            ('rotacao-toracica', '6 per side'),
            ('swan-em-pe', '8 reps'),
            ('basculamento-pelvico', '10 reps'),
            ('prancha-parede', '3 x 20 seconds'),
            ('abertura-peito', '30 seconds per side'),
        ], 'Rest 15 to 20 seconds between exercises.'),
        ('h2', 'The exercises, step by step'),
        ('ex', 'respiracao-lateral', '1 minute'),
        ('ex', 'gato-vaca-parede', '8 reps'),
        ('ex', 'anjos-parede', '2 sets of 8'),
        ('ex', 'rotacao-toracica', '6 per side'),
        ('ex', 'swan-em-pe', '8 reps'),
        ('ex', 'basculamento-pelvico', '10 reps'),
        ('ex', 'prancha-parede', '3 x 20 seconds'),
        ('ex', 'abertura-peito', '30 seconds per side'),
        ('h2', '4-week plan'),
        ('table', ['Week', 'What to do', 'Focus'], [
            ['1', 'Full routine once a day, at the slowest pace', 'Learn the moves and notice your breathing'],
            ['2', 'Full routine + 3 micro-breaks a day', 'Bring good posture to work and your phone'],
            ['3', 'Routine with a 30 s plank + 4 micro-breaks', 'Strength to hold your alignment'],
            ['4', 'Routine with 3 sets of angels + 5 micro-breaks', 'Automatic posture, without having to think'],
        ]),
        ('h2', '1-minute micro-breaks'),
        ('p', 'Set an alarm every 1 or 2 hours. When it goes off, pick one:'),
        ('list', [
            '<b>Chin tucks:</b> seated, draw your chin back as if making a "double chin". Hold 3 s and release. 8 times.',
            '<b>Shoulders back and down:</b> roll your shoulders back 5 times and finish with your shoulder blades "in your back pockets".',
            '<b>Doorway chest opener:</b> forearms on the door frame, step forward and take 3 breaths.',
            '<b>Get up and walk:</b> 1 minute of walking, looking at the horizon, not the floor.',
            '<b>4-6 breathing:</b> inhale for 4 counts, exhale for 6. Three rounds.',
        ]),
        ('h2', 'Tweaks that change your day'),
        ('list', [
            '<b>Phone at eye level:</b> bring the phone up to your face, not your face down to the phone.',
            '<b>Computer screen:</b> top of the screen at eye level and an arm\'s length away.',
            '<b>Chair:</b> feet flat on the floor, hips all the way back and a small cushion behind your lower back.',
            '<b>Purse:</b> switch shoulders or choose a backpack with both straps.',
            '<b>Sleep:</b> on your side with a pillow between your knees; or on your back with a pillow under your knees.',
            '<b>Lifting things:</b> bend your knees, keep the object close to your body and exhale as you lift.',
        ]),
        ('h2', 'Daily checklist'),
        ('check', ['I did the Iron Posture Routine', 'I took at least 3 micro-breaks', 'I held my phone at eye level',
                   'I drank water throughout the day', 'I did the wall test (end of the week)']),
    ],
})

# 3) BÔNUS 2 — ANTI-FLACIDEZ
MATERIALS.append({
    'slug': 'bonus-2-anti-sagging',
    'group': 'bonus',
    'title': 'Anti-Sagging',
    'title2': 'Protocol',
    'kicker': 'BONUS 2',
    'desc': 'Workouts focused on firming your arms, belly and legs alongside the challenge.',
    'cover': 'app/fotos/fase2.webp',
    'body': [
        ('h2', 'What sagging is and what really works'),
        ('p', '"Loose" skin on your arms, belly and thighs usually has two main causes: <b>too little muscle</b> '
              'under the skin and <b>excess fat</b> in that area. Creams help your skin, but what truly '
              'firms you up is muscle. That\'s why this protocol focuses on strength, using your own body weight.'),
        ('list', [
            '<b>Strength training 3 to 4 times a week</b> stimulates muscle to grow and get firmer.',
            '<b>Protein at every meal</b> gives that muscle its building blocks (see Bonus 4).',
            '<b>Water and sleep</b> help your skin and recovery.',
            '<b>Consistency:</b> the first signs show up in 3 to 4 weeks; visible change in 8 to 12.',
        ]),
        ('tip', 'How to fit it into the 21-Day Challenge', 'Do one of the workouts below on challenge rest days or right after '
              'that day\'s workout, if you have the energy. Never train the same muscle group hard two days in a row.'),
        ('h2', 'Workout A — Firm arms and back'),
        ('workout', '3 rounds · 30 s rest between exercises', [
            ('flexao-parede', '12 reps'),
            ('anjos-parede', '10 reps'),
            ('prancha-parede', '30 seconds'),
            ('swan-em-pe', '10 reps'),
        ], 'To make it harder, move your feet further from the wall in the push-up and plank.'),
        ('h2', 'Workout B — A firmer belly'),
        ('workout', '3 rounds · 20 s rest', [
            ('dead-bug-parede', '10 reps (5 per side)'),
            ('toque-pes-parede', '12 reps'),
            ('hundred-parede', '50 arm pumps'),
            ('prancha-lateral-parede', '20 seconds per side'),
        ]),
        ('h2', 'Workout C — Legs and glutes'),
        ('workout', '3 rounds · 30 s rest', [
            ('ponte-parede', '15 reps'),
            ('agachamento-isometrico', '30 to 45 seconds'),
            ('afundo-apoiado', '10 per side'),
            ('abducao-em-pe', '12 per side'),
            ('concha-parede', '15 per side'),
        ]),
        ('h2', 'Sample week'),
        ('table', ['Day', 'Workout', 'Duration'], [
            ['Monday', 'Workout A (arms)', '12–15 min'],
            ['Tuesday', 'Workout C (legs and glutes)', '15 min'],
            ['Wednesday', '21-Day Challenge only / active rest', '—'],
            ['Thursday', 'Workout B (belly)', '12 min'],
            ['Friday', 'Workout C (legs and glutes)', '15 min'],
            ['Saturday', 'Workout A + B (2-round version)', '20 min'],
            ['Sunday', 'Rest, easy walk and stretching', '—'],
        ]),
        ('h2', 'How to progress each week'),
        ('steps', [
            'Week 1: learn the moves with 2 rounds.',
            'Week 2: do 3 full rounds.',
            'Week 3: add 2 to 4 reps or 10 seconds to each exercise.',
            'Week 4: cut rest to 20 seconds or slow the moves down (3 s on the way down).',
        ]),
        ('h2', 'The exercises, step by step'),
        *[('ex', i, '') for i in ['flexao-parede', 'anjos-parede', 'prancha-parede', 'swan-em-pe', 'dead-bug-parede',
                                  'toque-pes-parede', 'hundred-parede', 'prancha-lateral-parede', 'ponte-parede',
                                  'agachamento-isometrico', 'afundo-apoiado', 'abducao-em-pe', 'concha-parede']],
        ('h2', 'Habits that speed up results'),
        ('list', [
            'Include a protein source (eggs, chicken, fish, Greek yogurt, beans, cheese) at every meal.',
            'Drink water throughout the day: a good rule of thumb is half your body weight (in lbs) in ounces.',
            'Sleep 7 to 8 hours: muscles recover while you rest.',
            'Wear sunscreen: the sun is one of the main causes of skin losing firmness.',
            'Avoid very restrictive diets: losing weight too fast tends to increase sagging.',
        ]),
    ],
})

# 4) BÔNUS 3 — GUIA DO PRATO INTELIGENTE
MATERIALS.append({
    'slug': 'bonus-3-smart-plate-guide',
    'group': 'bonus',
    'title': 'Smart Plate',
    'title2': 'Guide',
    'kicker': 'BONUS 3',
    'desc': 'Build meals with what you already eat — no forbidden foods, no food scale and no calorie counting.',
    'cover': 'app/fotos/agua.webp',
    'body': [
        ('h2', 'No diet: meals made for your routine'),
        ('p', 'There\'s no single meal plan that works for every woman. So instead of a rigid list, '
              'this guide teaches you to <b>build your own plan</b> with the plate method and hand-sized portions: '
              'simple, no food scale and no calorie counting.'),
        ('h2', 'Step 1 — Find your portion size'),
        ('p', 'Use your own hands as a measure. They\'re proportional to your body and always with you.'),
        ('table', ['Group', 'Measure', 'Examples'], [
            ['Protein', '1 palm (without fingers)', 'Chicken, lean beef, fish, eggs (2), tofu'],
            ['Carbs', '1 cupped hand', 'Rice, potatoes, sweet potatoes, pasta, oats, bread (1 slice)'],
            ['Legumes', '1 cupped hand', 'Black beans, lentils, chickpeas, peas'],
            ['Vegetables', '2 open hands (as much as you like)', 'Leafy greens, tomato, zucchini, broccoli, carrots'],
            ['Healthy fats', '1 thumb', 'Olive oil, nuts, avocado, peanut butter'],
            ['Fruit', '1 fist', 'Apple, banana, berries, strawberries, orange'],
        ]),
        ('h2', 'Step 2 — Choose your goal'),
        ('table', ['Goal', 'Lunch and dinner', 'Snacks'], [
            ['Lose weight', '1 palm of protein + ½ cupped hand of carbs + 1 cupped hand of beans + veggies as you like',
             '1 small protein + 1 fruit'],
            ['Maintain and tone', '1 palm of protein + 1 cupped hand of carbs + 1 cupped hand of beans + veggies',
             '1 protein + 1 fruit + 1 thumb of healthy fat'],
            ['Firm up with lots of training', '1½ palms of protein + 1 to 1½ cupped hands of carbs + veggies',
             '1 protein + 1 fruit + 1 carb'],
        ]),
        ('tip', 'The ideal plate', 'Half the plate vegetables, a quarter protein and a quarter carbs or beans. '
              'Start your meal with the greens: you feel full sooner and eat less without trying.'),
        ('h2', 'Step 3 — Build your day'),
        ('table', ['Meal', 'How to build it', 'Example'], [
            ['Breakfast', '1 protein + 1 carb + 1 fruit', '2 scrambled eggs + 1 slice of whole-wheat toast + berries'],
            ['Morning snack', '1 fruit or 1 small protein', 'Plain Greek yogurt or 1 apple'],
            ['Lunch', 'Ideal plate', 'Grilled chicken, rice, black beans, salad and veggies'],
            ['Afternoon snack', '1 protein + 1 fruit', 'Greek yogurt with strawberries and oats'],
            ['Dinner', 'Ideal plate, with fewer carbs', 'Veggie omelet and salad'],
            ['Evening snack (if hungry)', '1 light protein', 'Herbal tea + 1 cheese stick'],
        ]),
        ('h2', '7-day meal plan (weight-loss example)'),
        ('table', ['Day', 'Breakfast', 'Lunch', 'Snack', 'Dinner'], [
            ['Mon', 'Scrambled eggs + whole-wheat toast + berries', 'Chicken, rice, beans, salad', 'Greek yogurt + oats', 'Veggie omelet + salad'],
            ['Tue', 'Banana-egg pancake', 'Ground turkey with zucchini, rice, salad', 'Apple + nuts', 'Chicken vegetable soup'],
            ['Wed', 'Whole-wheat tortilla with cottage cheese', 'Baked fish, potatoes, broccoli', 'Greek yogurt with strawberries', 'Big salad with tuna'],
            ['Thu', 'Greek yogurt + fruit + chia', 'Chicken, mashed butternut squash, beans, salad', 'Hard-boiled egg + fruit', 'Whole-wheat chicken wrap'],
            ['Fri', 'Eggs + whole-wheat tortilla', 'Sweet potato shepherd\'s pie', 'Banana-oat smoothie', 'Omelet + salad'],
            ['Sat', 'Whole-wheat toast + egg + cheese', 'Mindful free meal (ideal plate)', 'Fruit + Greek yogurt', 'Homemade skillet pizza'],
            ['Sun', 'Oatmeal pancakes', 'Family lunch (ideal plate)', 'Stovetop popcorn', 'Chicken vegetable broth'],
        ]),
        ('h2', 'Swap list (so you never get bored)'),
        ('table', ['Instead of...', 'Swap for...'], [
            ['White rice (1 cupped hand)', 'Potatoes, sweet potatoes, pasta, quinoa or couscous'],
            ['Chicken', 'Lean beef, fish, 2 eggs, tuna, tofu or 1 extra cupped hand of beans'],
            ['White bread', 'A small tortilla, 2 slices of whole-wheat bread, an English muffin or 3 tbsp of oats'],
            ['Dessert after lunch', '1 square of 70% dark chocolate or a piece of fruit'],
            ['Soda', 'Sparkling water with lemon and mint, or unsweetened iced tea'],
            ['Chips', 'Stovetop popcorn, roasted chickpeas or nuts'],
        ]),
        ('h2', 'Weekly grocery list'),
        ('list', [
            '<b>Protein:</b> eggs, chicken breast, lean ground beef or turkey, fish or tuna, plain Greek yogurt, cottage cheese.',
            '<b>Carbs:</b> rice, beans, potatoes, sweet potatoes, oats, whole-wheat bread, tortillas.',
            '<b>Vegetables:</b> lettuce, tomatoes, carrots, zucchini, broccoli, squash, onions, garlic.',
            '<b>Fruit:</b> bananas, apples, berries, strawberries, oranges.',
            '<b>Extras:</b> olive oil, nuts, chia seeds, cinnamon, cocoa powder, natural seasonings.',
        ]),
        ('h2', '7 golden rules'),
        ('steps', [
            'Eat every 3 to 4 hours, without skipping meals.',
            'Have protein at every meal.',
            'Drink water: a glass when you wake up and one before each meal.',
            'Eat slowly, without screens, chewing well.',
            'Plan ahead: keep protein and veggies prepped for 2 or 3 days.',
            'Don\'t cut out whole food groups; adjust your portions.',
            'One off-plan meal doesn\'t ruin anything. Get back on track at the next one.',
        ]),
    ],
})

# 5) BÔNUS 4 — 51 RECEITAS PROTEICAS (receitas no fim do arquivo)
MATERIALS.append({
    'slug': 'bonus-4-51-protein-recipes',
    'group': 'bonus',
    'title': '51 Protein',
    'title2': 'Recipes',
    'kicker': 'BONUS 4',
    'desc': 'Quick, tasty recipes, including the famous 3-ingredient pancake.',
    'cover': 'ww/img/tile-segredo.webp',
    'auto': 'recipes',
})

# 6) BÔNUS 5 — TREINO EXPRESS
MATERIALS.append({
    'slug': 'bonus-5-express-workout',
    'group': 'bonus',
    'title': 'Express Workout',
    'title2': 'Protocol',
    'kicker': 'BONUS 5',
    'desc': '10-minute workouts for busy days, so you never lose momentum.',
    'cover': 'app/fotos/energia.webp',
    'body': [
        ('h2', 'For the days when time isn\'t on your side'),
        ('p', 'Some days it just doesn\'t happen. Meetings, kids, traffic, exhaustion. On those days, the worst thing is doing nothing: '
              '<b>10 minutes keeps your momentum</b> and the habit alive. The workouts below use only the wall and the floor.'),
        ('tip', 'How it works', 'Each workout has 5 exercises. Do <b>40 seconds of work and 20 of rest</b>, '
              'then move to the next. When you finish all 5, start again: that\'s <b>2 rounds = 10 minutes</b>. '
              'Use your phone\'s timer or an interval app.'),
        ('h2', 'Express 1 — Full body'),
        ('workout', '40 s work · 20 s rest · 2 rounds', [
            ('agachamento-deslizante', '40 s'), ('flexao-parede', '40 s'), ('ponte-parede', '40 s'),
            ('escalador-parede', '40 s'), ('prancha-parede', '40 s'),
        ]),
        ('h2', 'Express 2 — Belly'),
        ('workout', '40 s / 20 s · 2 rounds', [
            ('dead-bug-parede', '40 s'), ('toque-pes-parede', '40 s'), ('prancha-lateral-parede', '20 s per side'),
            ('deslize-pernas', '40 s'), ('hundred-parede', '40 s'),
        ]),
        ('h2', 'Express 3 — Glutes and legs'),
        ('workout', '40 s / 20 s · 2 rounds', [
            ('ponte-marcha', '40 s'), ('agachamento-isometrico', '40 s'), ('abducao-em-pe', '20 s per side'),
            ('extensao-quadril', '20 s per side'), ('elevacao-panturrilha', '40 s'),
        ]),
        ('h2', 'Express 4 — Burn (heart pumping)'),
        ('workout', '40 s / 20 s · 2 rounds', [
            ('polichinelo-sem-salto', '40 s'), ('corrida-parada', '40 s'), ('agachamento-deslizante', '40 s'),
            ('escalador-parede', '40 s'), ('marcha-apoiada', '40 s'),
        ], 'No impact: great if you live in an apartment.'),
        ('h2', 'Express 5 — Posture and back'),
        ('workout', '40 s / 20 s · 2 rounds', [
            ('anjos-parede', '40 s'), ('swan-em-pe', '40 s'), ('rotacao-toracica', '20 s per side'),
            ('prancha-parede', '40 s'), ('gato-vaca-parede', '40 s'),
        ]),
        ('h2', 'Express 6 — Relax and stretch (evening)'),
        ('workout', '50 s in each position · 1 round', [
            ('pernas-na-parede', '1 min'), ('borboleta-parede', '1 min'), ('figura-quatro', '50 s per side'),
            ('posterior-parede', '50 s per side'), ('respiracao-lateral', '1 min'),
        ], 'Perfect before bed.'),
        ('h2', 'Which Express should you do today?'),
        ('table', ['If you...', 'Do'], [
            ['Only have 10 minutes and want to train everything', 'Express 1'],
            ['Want to focus on your belly', 'Express 2'],
            ['Want a firmer butt and legs', 'Express 3'],
            ['Want to sweat and boost your metabolism', 'Express 4'],
            ['Sat all day', 'Express 5'],
            ['Are tired or stressed', 'Express 6'],
        ]),
        ('h2', 'The new exercises in this protocol'),
        ('newex', 'polichinelo-sem-salto'),
        ('newex', 'corrida-parada'),
        ('p', 'All the other exercises are explained step by step in the <b>Wall Pilates — 21-Day Challenge</b> guide.'),
    ],
})

# 6b) BÔNUS EXTRA — CHÁ ASIÁTICO ANTICELULITE (prometido na oferta do quiz)
MATERIALS.append({
    'slug': 'bonus-asian-anti-cellulite-tea',
    'group': 'bonus',
    'title': 'Asian Anti-Cellulite',
    'title2': 'Tea',
    'kicker': 'EXTRA BONUS',
    'desc': 'The green tea ritual to stay hydrated, swap out sugary drinks and team up with Pilates against cellulite.',
    'cover': 'app/fotos/agua.webp',
    'body': [
        ('h2', 'The little dark green herb'),
        ('p', 'The "Asian tea" is <b>green tea</b>, made from the leaves of <i>Camellia sinensis</i> — the same plant enjoyed for centuries '
              'in China and Japan. You can find it at any grocery store: loose-leaf, in tea bags or as a powder (<b>matcha</b>).'),
        ('h2', 'What the tea does — and what it doesn\'t'),
        ('p', 'Cellulite depends on genetics, hormones, fat and the firmness of your skin and muscles. <b>No tea on its own '
              'makes cellulite disappear.</b> The tea is an ally to your plan:'),
        ('list', [
            '<b>Hydration:</b> it helps you drink more fluids throughout the day, which makes your skin look better.',
            '<b>A smart swap:</b> unsweetened, it has practically zero calories and replaces soda and bottled juices.',
            '<b>Ritual:</b> a cup at the same time every day reminds you to take care of your body — and to do your workout.',
        ]),
        ('tip', 'The duo that works', 'While the tea takes care of hydration, <b>Wall Pilates firms your glutes and legs</b>. '
              'Firmer muscle under the skin is what improves the look of cellulite the most.'),
        ('h2', 'How to make it the right way'),
        ('steps', [
            'Heat the water until the first little bubbles appear (160 to 175 °F). <b>Don\'t use boiling water</b>: it makes the tea bitter.',
            'Use 1 teaspoon of leaves or 1 tea bag per cup (7 oz).',
            'Steep for <b>2 to 3 minutes</b> and strain. Any longer also makes it bitter.',
            'Drink it unsweetened. If you need to, add a little cinnamon, lemon or mint for flavor.',
        ]),
        ('h2', '5 recipes so you never get bored'),
        ('h3', '1. Classic warm'),
        ('p', '1 green tea bag + 7 oz of hot water. Steep 3 minutes. Ideal in the morning.'),
        ('h3', '2. Green tea with ginger and lemon'),
        ('p', '1 tea bag + 2 thin slices of ginger + 7 oz of hot water. Steep 3 minutes and finish with a squeeze of lemon.'),
        ('h3', '3. Iced with mint'),
        ('p', 'Brew 2 cups of tea, let it cool and refrigerate with mint leaves and lemon slices. Replaces your lunchtime soda.'),
        ('h3', '4. Matcha latte'),
        ('p', '1 teaspoon of matcha + 2 oz of hot water (whisk until dissolved) + 5 oz of hot milk or plant milk. Dust with cinnamon.'),
        ('h3', '5. Green tea with cinnamon and apple'),
        ('p', '1 tea bag + 1 cinnamon stick + a few apple slices + 8 oz of hot water. Steep 5 minutes with the apple and remove the tea bag at 3.'),
        ('h2', 'Your daily ritual'),
        ('table', ['When', 'What to do'], [
            ['Morning', '1 cup of the classic or the ginger version, with breakfast.'],
            ['Lunch', 'Swap your soda for iced tea with mint.'],
            ['Afternoon', 'Matcha latte or cinnamon tea with your snack — nothing after 5 pm.'],
            ['Evening', 'Water only. Green tea has caffeine and can disrupt your sleep.'],
        ]),
        ('warn', '<b>Precautions:</b> no more than 3 cups a day. Green tea has caffeine — avoid it at night and if you have anxiety, '
                 'insomnia, high blood pressure or arrhythmia. Pregnant or breastfeeding women and anyone taking blood thinners or other daily medications '
                 'should talk to their doctor first. Stick to tea in a cup: <b>don\'t use concentrated extract capsules</b>, '
                 'which have been linked to liver problems.'),
        ('h2', '21-day checklist'),
        ('check', ['I bought green tea (bags, loose-leaf or matcha)', 'I drank my 1st cup unsweetened',
                   'I swapped 1 soda for iced tea', 'I did the ritual 7 days in a row', 'I did the ritual 21 days in a row']),
    ],
})

# 7) UPSELL 1 — CARDÁPIO DESINCHAÇO 21 DIAS
MATERIALS.append({
    'slug': '21-day-debloat-meal-plan',
    'group': 'extra',
    'title': 'Debloat Meal Plan',
    'title2': '21 Days',
    'kicker': 'CHALLENGE ADD-ON',
    'desc': 'A 21-day meal plan, grocery list and teas to de-bloat your belly alongside your workouts.',
    'cover': 'app/fotos/agua.webp',
    'body': [
        ('h2', 'Why your belly bloats'),
        ('p', 'That puffy belly at the end of the day, the jeans that button in the morning and squeeze at night — it isn\'t always fat. '
              'Most of the time it\'s <b>bloating</b>: retained fluid and gas. It comes from too much salt and '
              'ultra-processed food, too little water, too little fiber, constipation, eating fast and, for many women, the '
              'hormonal shifts of your cycle and menopause.'),
        ('p', 'The good news: bloating responds fast. With the right meal plan, most women feel the difference '
              'in their clothes <b>in the very first week</b>. Pilates does half the work; this meal plan does the rest.'),
        ('h2', 'The 7 rules of de-bloating'),
        ('steps', [
            '<b>Water throughout the day.</b> A good rule of thumb is half your body weight (in lbs) in ounces. It sounds contradictory, but people who drink too little water retain more.',
            '<b>Less hidden salt.</b> Deli meats, seasoning packets, bouillon cubes, chips and frozen meals are the worst offenders.',
            '<b>Fiber every day.</b> Greens, vegetables, fruit with the peel, oats and beans keep your gut moving.',
            '<b>Protein at every meal.</b> It keeps hunger in check and helps maintain the muscles you\'re strengthening.',
            '<b>Potassium on your plate.</b> Bananas, avocados, beans, tomatoes and dark leafy greens help your body flush out excess sodium.',
            '<b>Eat slowly.</b> Eating fast means swallowing air, and air turns into gas.',
            '<b>Eat dinner earlier and lighter.</b> 2 to 3 hours before bed.',
        ]),
        ('h2', 'What to avoid for 21 days'),
        ('table', ['Avoid', 'Swap for'], [
            ['Soda and sparkling water', 'Water, lemon water or unsweetened iced tea'],
            ['Ham, hot dogs, deli turkey', 'Shredded chicken, eggs or cottage cheese'],
            ['Bouillon cubes and seasoning packets', 'Garlic, onion, herbs, lemon and paprika'],
            ['Chips and cookies', 'Stovetop popcorn, fruit or nuts'],
            ['Gum and candy', 'A clove, a cinnamon stick or a piece of fruit'],
            ['White bread every day', 'Whole-wheat bread, a tortilla with egg or oatmeal'],
        ]),
        ('tip', 'Do beans and cabbage make you bloated?', 'Soak dried beans for 12 hours and drain the water before cooking (or rinse canned beans well). '
              'Start with small portions: your gut adjusts within a few days.'),
        ('h2', 'De-bloating teas'),
        ('p', 'Pick one a day and drink 1 to 2 cups, unsweetened, ideally between meals.'),
        ('table', ['Tea', 'What for', 'Note'], [
            ['Ginger and lemon', 'Digestion and a lighter-feeling stomach', 'Avoid if you have gastritis or take blood thinners'],
            ['Peppermint', 'Gas and bloating', 'Can worsen acid reflux in some people'],
            ['Fennel', 'Gas and cramping', 'Safe for most people'],
            ['Chamomile', 'Digestion and sleep (great at night)', 'Avoid if you\'re allergic to ragweed or daisies'],
            ['Hibiscus', 'Mild diuretic effect', 'Avoid if you have low blood pressure, are pregnant or breastfeeding'],
        ]),
        ('h2', 'How to build your plate'),
        ('list', [
            '<b>Half the plate:</b> greens and vegetables (raw and cooked).',
            '<b>A quarter:</b> protein (chicken, fish, eggs, lean beef, tofu).',
            '<b>A quarter:</b> real-food carbs (rice, beans, potatoes, sweet potatoes, corn).',
            '<b>Seasoning:</b> olive oil, lemon, garlic and herbs instead of extra salt.',
        ]),
        ('pagebreak',),
        ('h2', 'Week 1 — De-bloat'),
        ('p', 'Focus: cut hidden salt and get your gut moving. Meals repeat on purpose to make grocery shopping easier.'),
        ('table', ['Day', 'Breakfast', 'Lunch', 'Snack', 'Dinner'], [
            ['1', 'Scrambled eggs + berries', 'Grilled chicken, rice, beans and green salad', 'Plain Greek yogurt + oats', 'Butternut squash soup with shredded chicken'],
            ['2', 'Greek yogurt + banana + oats', 'Baked fish, mashed potatoes and broccoli', 'Apple + nuts', 'Spinach omelet + tomato salad'],
            ['3', 'Egg on a whole-wheat tortilla + peppermint tea', 'Ground turkey with zucchini, rice and salad', 'Banana with cinnamon', 'Chicken vegetable soup'],
            ['4', 'Scrambled eggs + berries', 'Grilled chicken, rice, beans and cooked carrots', 'Plain Greek yogurt + chia', 'Fish with steamed vegetables'],
            ['5', 'Oatmeal with a boiled egg', 'Baked veggie frittata and salad', 'Pear + nuts', 'Chicken and vegetable broth'],
            ['6', 'Greek yogurt + strawberries + oats', 'Fish, rice, beans and leafy salad', 'Mashed avocado with lemon', 'Omelet with tomato and cottage cheese'],
            ['7', 'Banana-oat pancakes', 'Free meal (with half the plate salad)', 'Fruit', 'Butternut squash soup with shredded chicken'],
        ]),
        ('h2', 'Week 2 — Firm up'),
        ('p', 'Focus: more protein and more variety of vegetables, to keep hunger in check and support your muscles.'),
        ('table', ['Day', 'Breakfast', 'Lunch', 'Snack', 'Dinner'], [
            ['8', 'Hard-boiled eggs + pineapple', 'Chicken curry with rice and green beans', 'Greek yogurt + oats', 'Big salad with tuna and chickpeas'],
            ['9', 'Whole-wheat toast with cottage cheese', 'Pot roast with vegetables and rice', 'Banana + peanut butter', 'Lentil soup'],
            ['10', 'Greek yogurt + kiwi + chia', 'Baked fish, sweet potato and salad', 'Hard-boiled egg + tomato', 'Shredded chicken with sautéed zucchini'],
            ['11', 'Chicken on a whole-wheat tortilla', 'Veggie omelet, rice, beans and salad', 'Apple + nuts', 'Light kale and potato soup (no sausage)'],
            ['12', 'Scrambled eggs + berries', 'Grilled chicken, quinoa or rice and broccoli', 'Greek yogurt + strawberries', 'Fish with mashed butternut squash'],
            ['13', 'Oatmeal with a boiled egg', 'Ground turkey with vegetables and salad', 'Stovetop popcorn', 'Warm chicken and vegetable salad'],
            ['14', 'Banana-oat pancakes', 'Free meal (with half the plate salad)', 'Fruit', 'Vegetable soup with egg'],
        ]),
        ('h2', 'Week 3 — Maintain'),
        ('p', 'Focus: turn what worked into habits, so the results don\'t disappear after day 21.'),
        ('table', ['Day', 'Breakfast', 'Lunch', 'Snack', 'Dinner'], [
            ['15', 'Greek yogurt + banana + oats', 'Fish, rice, beans and colorful salad', 'Avocado with cocoa', 'Baked veggie frittata'],
            ['16', 'Scrambled eggs + whole-wheat toast', 'Grilled chicken, boiled sweet potato and salad', 'Pear + nuts', 'Butternut squash soup with chicken'],
            ['17', 'Whole-wheat tortilla with cottage cheese', 'Lean beef, rice, beans and beets', 'Greek yogurt + chia', 'Salad with tuna and egg'],
            ['18', 'Oatmeal with a boiled egg', 'Chicken and squash shepherd\'s pie', 'Fruit + nuts', 'Chicken and vegetable broth'],
            ['19', 'Greek yogurt + strawberries + oats', 'Baked fish with vegetables and rice', 'Hard-boiled egg + carrots', 'Spinach omelet'],
            ['20', 'Hard-boiled eggs + berries', 'Chicken in tomato sauce, rice and salad', 'Stovetop popcorn', 'Lentil soup'],
            ['21', 'Banana-oat pancakes', 'Celebrate! Free meal, with half the plate salad', 'Fruit', 'Chicken vegetable soup'],
        ]),
        ('tip', 'Portions', 'This is a reference meal plan, not a strict diet. Eat until you\'re satisfied, not stuffed. '
              'If you have diabetes, kidney disease or another health condition, adjust it with your dietitian.'),
        ('h2', 'Easy swaps'),
        ('table', ['If you don\'t have', 'Use'], [
            ['Chicken', 'Eggs, fish, lean beef or tofu'],
            ['Plain Greek yogurt', 'Kefir, skyr or cottage cheese'],
            ['Rice', 'Potatoes, sweet potatoes, corn, quinoa or couscous'],
            ['Butternut squash', 'Carrots, pumpkin or zucchini'],
            ['Nuts', 'Peanuts or seeds (sunflower, pumpkin)'],
        ]),
        ('h2', 'Weekly grocery list'),
        ('check', ['2 dozen eggs', '2 lbs of chicken breast', '1 lb of fish (tilapia or cod)', '1 lb of lean ground beef or turkey',
                   '6 cups of plain Greek yogurt', 'Oats, chia and nuts', 'Rice, beans and lentils', 'Butternut squash, zucchini, carrots and broccoli',
                   'Leafy greens, tomatoes and cucumbers', 'Bananas, berries, apples and strawberries', 'Lemons, garlic, onions and fresh herbs',
                   'Teas: ginger, peppermint, fennel, chamomile']),
        ('h2', 'Daily checklist'),
        ('check', ['I hit my water goal', 'I had my tea of the day', 'Half my plate was vegetables', 'Protein at every meal',
                   'I avoided deli meats and seasoning packets', 'I ate slowly', 'I did my 21-Day Challenge workout']),
    ],
})

# 8) UPSELL 2 — MENOPAUSA SEM BARRIGA
MATERIALS.append({
    'slug': 'menopause-flat-belly',
    'group': 'extra',
    'title': 'Menopause',
    'title2': 'Flat Belly',
    'kicker': 'NATURAL PROTOCOL',
    'desc': 'Nutrition, workouts and habits for hormonal belly fat, hot flashes and low energy after 40.',
    'cover': 'app/fotos/energia.webp',
    'body': [
        ('h2', 'It\'s not a lack of willpower. It\'s hormonal.'),
        ('p', 'After 40, many women notice their belly growing even though they eat the same. There\'s a reason for that: '
              'during <b>perimenopause</b> (the years before your last period) and after menopause, <b>estrogen drops</b>. '
              'As a result, fat stops building up on your hips and thighs and starts going to your <b>belly</b>. At the same '
              'time, your body loses muscle faster, your metabolism slows down and your sleep gets worse.'),
        ('p', 'This protocol works on the 5 pillars that make a difference in this phase. None of them depend on medication, and all '
              'of them go hand in hand with the 21-Day Challenge.'),
        ('warn', 'Talk to your OB-GYN about your symptoms. For many women, hormone therapy is safe and '
                 'very effective, and only a doctor can tell if it\'s right for you. This protocol works with or without it.'),
        ('h2', 'Pillar 1 — Muscle is your medicine'),
        ('p', 'Muscle burns energy even at rest, protects your bones (which get more fragile without estrogen) and improves how '
              'your body uses sugar. That\'s why, in this phase, <b>strength training is worth more than hours of cardio</b>.'),
        ('list', [
            'Do your 21-Day Challenge workout every day.',
            'Add 2 to 3 strength workouts a week (below), on alternate days.',
            'Walk 20 to 30 minutes most days: it helps your heart, mood and sleep.',
        ]),
        ('workout', '35+ strength workout · 3 rounds · 30 s rest', [
            ('agachamento-deslizante', '12 reps'),
            ('flexao-parede', '10 reps'),
            ('ponte-parede', '15 reps'),
            ('afundo-apoiado', '8 per side'),
            ('prancha-parede', '30 seconds'),
            ('elevacao-panturrilha', '15 reps'),
        ], 'Standing, light-impact exercises also help protect your bones.'),
        ('h2', 'Pillar 2 — The hormonal plate'),
        ('table', ['What to prioritize', 'Why', 'Where to find it'], [
            ['Protein (20 to 30 g per meal)', 'Preserves muscle and keeps hunger in check', 'Eggs, chicken, fish, Greek yogurt, cheese, beans, tofu'],
            ['Calcium', 'Protects your bones', 'Milk, yogurt, cheese, sardines, broccoli, sesame seeds'],
            ['Vitamin D', 'Helps calcium reach your bones', '15 min of morning sun; ask your doctor for a blood test'],
            ['Fiber', 'Blood sugar control and gut health', 'Greens, vegetables, oats, beans, fruit with the peel'],
            ['Soy and flaxseed', 'They contain phytoestrogens, which help some women with hot flashes', 'Tofu, edamame, soy milk, ground flaxseed'],
            ['Healthy fats', 'Heart health, which becomes more vulnerable in this phase', 'Olive oil, avocado, nuts, fish'],
        ]),
        ('h3', 'A day on the hormonal plate'),
        ('list', [
            '<b>Breakfast:</b> plain Greek yogurt with 1 tbsp of ground flaxseed, oats and fruit.',
            '<b>Lunch:</b> half the plate vegetables, fish or chicken, rice and beans.',
            '<b>Snack:</b> cottage cheese with tomato or a handful of nuts.',
            '<b>Dinner:</b> veggie omelet or soup with chicken or tofu.',
        ]),
        ('h2', 'Pillar 3 — Fewer hot flashes'),
        ('p', 'Find your triggers by logging your hot flashes for a week in the table at the end of this guide. The most common are:'),
        ('list', [
            '<b>Alcohol</b>, especially red wine.',
            '<b>Too much coffee</b> and very hot drinks.',
            '<b>Spicy food.</b>',
            '<b>Hot rooms</b> and synthetic clothing.',
            '<b>Stress.</b>',
        ]),
        ('tip', 'Breathing for hot flashes', 'When you feel the heat rising: breathe in through your nose counting to 5 and out through your mouth '
              'counting to 5. Keep it up for 2 minutes. Practicing 15 minutes a day, even without a hot flash, helps make them less frequent.'),
        ('list', [
            'Dress in layers you can take off quickly.',
            'Choose cotton fabrics, including your pajamas and sheets.',
            'Keep a glass of ice water and a fan by your bed.',
            'Keep your bedroom cool and well-ventilated.',
        ]),
        ('h2', 'Pillar 4 — Restorative sleep'),
        ('p', 'Poor sleep increases hunger and sugar cravings the next day and makes it harder to lose belly fat.'),
        ('list', [
            'Same bedtime and wake-up time, including weekends.',
            'Last coffee by 2 pm.',
            'Light dinner, 2 to 3 hours before bed.',
            'Screens off 30 minutes before sleep.',
            'In bed, do the legs-up-the-wall pose for 3 minutes.',
        ]),
        ('ex', 'pernas-na-parede', '3 minutes before bed'),
        ('h2', 'Pillar 5 — Mood and stress'),
        ('p', 'Irritability, anxiety and "brain fog" are also part of the hormonal transition. High cortisol from stress '
              'encourages fat to build up around your belly.'),
        ('list', [
            '<b>5 minutes of breathing</b> a day (the challenge\'s lateral breathing is perfect).',
            '<b>Sunlight and a walk</b> in the morning.',
            '<b>Talk it out:</b> talking with friends going through the same thing helps more than you\'d think.',
            '<b>Ask for help</b> if sadness lasts more than two weeks.',
        ]),
        ('ex', 'respiracao-lateral', '5 minutes'),
        ('h2', '4-week plan'),
        ('table', ['Week', 'Focus', 'Goal'], [
            ['1', 'Hormonal plate', 'Protein at every meal + hot flash diary'],
            ['2', 'Strength', '2 strength workouts + walking 3x a week'],
            ['3', 'Sleep', 'Sleep routine every night + coffee only until 2 pm'],
            ['4', 'Put it all together', '3 strength workouts + daily breathing + avoid your triggers'],
        ]),
        ('h2', 'Symptom diary'),
        ('table', ['Day', 'Hot flashes (how many)', 'Trigger', 'Sleep (0 to 10)', 'Energy (0 to 10)'],
         [[str(d), '', '', '', ''] for d in range(1, 8)]),
        ('tip', 'Bring it to your appointment', 'This diary really helps your OB-GYN understand what\'s going on.'),
        ('h2', 'Daily checklist'),
        ('check', ['Protein at every meal', 'Flaxseed or soy today', 'Challenge or strength workout',
                   'A walk or morning sun', '5 minutes of breathing', 'Coffee only until 2 pm', 'I slept at least 7 hours']),
    ],
})

# 9) UPSELL 3 — PILATES ÍNTIMO
MATERIALS.append({
    'slug': 'intimate-pilates',
    'group': 'extra',
    'title': 'Intimate Pilates',
    'title2': 'Strong Pelvic Floor',
    'kicker': '10 MINUTES A DAY',
    'desc': 'Pelvic floor exercises to stop bladder leaks, firm your belly and boost intimacy.',
    'cover': 'app/fotos/fase1.webp',
    'body': [
        ('h2', 'The muscle no one introduced you to'),
        ('p', 'The <b>pelvic floor</b> is a group of muscles at the base of your pelvis, like a hammock that supports your '
              'bladder, uterus and bowel. Pregnancy, childbirth, the hormonal drop of menopause, constipation and years '
              'of straining the wrong way all weaken that hammock.'),
        ('p', 'The most common signs are <b>bladder leaks</b> when you cough, sneeze, laugh or jump, a sudden urge to go to the '
              'bathroom, a feeling of heaviness down there and less sensation during sex. Bladder leaks are common, but '
              '<b>they are not a normal part of aging</b>. And pelvic floor training is the first recommendation for these cases.'),
        ('warn', 'See an OB-GYN or a pelvic floor physical therapist if you have pain, bleeding, a feeling of a "bulge" coming '
                 'out of the vagina, recurring urinary tract infections or if you recently gave birth.'),
        ('h2', 'Find your pelvic floor'),
        ('steps', [
            'Sit on a sturdy chair with your feet on the floor.',
            'Imagine you\'re holding in gas and, at the same time, pee.',
            'You should feel your pelvic area close and lift slightly inward.',
            'Your butt, thighs and belly should stay relaxed.',
        ]),
        ('tip', 'Didn\'t feel anything?', 'Lie on your side and place your hand on your perineum, between the vagina and the anus, over '
              'your clothes. When you squeeze, you\'ll feel the area lift away from your hand. This is normal at first: your awareness '
              'improves within a few days of training.'),
        ('h2', 'The Intimate Routine (10 minutes)'),
        ('workout', 'Do them in order, ideally at the same time each day', [
            ('respiracao-lateral', '1 minute'),
            ('kegel-lento', '10 reps of 5 seconds'),
            ('kegel-rapido', '10 flicks'),
            ('basculamento-pelvico', '10 reps'),
            ('ponte-parede', '10 reps, squeezing your pelvic floor on the way up'),
            ('elevador-pelvico', '5 rides up'),
            ('concha-parede', '10 per side'),
            ('pernas-na-parede', '1 minute relaxing everything'),
        ], 'Relaxing is just as important as squeezing: a muscle that can\'t relax doesn\'t work well either.'),
        ('h2', 'The exercises, step by step'),
        ('newex', 'kegel-lento'),
        ('newex', 'kegel-rapido'),
        ('newex', 'elevador-pelvico'),
        ('ex', 'basculamento-pelvico', '10 reps'),
        ('ex', 'ponte-parede', '10 reps'),
        ('ex', 'concha-parede', '10 per side'),
        ('h2', 'The lock: the trick against leaks'),
        ('p', 'Before you cough, sneeze, laugh, lift something or get up from a chair, <b>squeeze your pelvic floor one second '
              'beforehand</b> and hold it during the effort. With practice, it becomes automatic and leaks decrease within the '
              'first few weeks.'),
        ('h2', '4-week plan'),
        ('table', ['Week', 'Position', 'Slow squeeze', 'Flicks'], [
            ['1', 'Lying down', '10 x 3 seconds', '10'],
            ['2', 'Lying down and seated', '10 x 5 seconds', '15'],
            ['3', 'Seated', '10 x 8 seconds', '20'],
            ['4', 'Standing', '10 x 10 seconds', '20 + the lock with every effort'],
        ]),
        ('p', 'After the 4 weeks, keep the routine going at least 3 times a week. Results usually become clear between 6 and 12 weeks.'),
        ('h2', 'More strength, more pleasure'),
        ('p', 'Strong pelvic floor muscles with good blood flow are linked to <b>more sensation</b> and reaching orgasm '
              'more easily. Knowing and controlling this area also brings more confidence in intimacy. During '
              'sex, try squeezing and relaxing slowly.'),
        ('h2', 'Habits that protect your pelvic floor'),
        ('list', [
            '<b>Don\'t hold your pee for hours</b>, but don\'t go "just in case" all the time either.',
            '<b>Don\'t strain on the toilet.</b> Use a small stool under your feet and load up on fiber and water.',
            '<b>When lifting things,</b> breathe out and use the lock.',
            '<b>Avoid too much coffee and soda</b>, which irritate the bladder.',
            '<b>Keep a healthy weight:</b> extra belly weight increases pressure on your pelvis.',
        ]),
        ('h2', 'Leak diary'),
        ('table', ['Week', 'Leaks per day (average)', 'In what situation', 'How I feel'],
         [[str(s), '', '', ''] for s in range(1, 5)]),
        ('h2', 'Daily checklist'),
        ('check', ['I did the Intimate Routine', 'I used the lock when coughing or lifting', 'I drank water throughout the day', 'I ate fiber',
                   'I relaxed my pelvic floor at the end of the workout']),
    ],
})

# 10) UPSELL 4 — GRUPO VIP DE ACOMPANHAMENTO
MATERIALS.append({
    'slug': 'vip-support-group',
    'group': 'extra',
    'title': 'VIP Group',
    'title2': '21-Day Support',
    'kicker': 'YOUR GROUP GUIDE',
    'desc': 'How to join and make the most of the VIP Group, the anti-quitting plan and your 21-day journal.',
    'cover': 'app/fotos/grupo.webp',
    'body': [
        ('h2', 'Welcome to the VIP Group'),
        ('p', 'Many women quit on their own in week two, when the excitement of the beginning '
              'wears off. In the VIP Group you get <b>daily reminders</b>, <b>Q&amp;A</b> and other women in the same '
              'challenge cheering you on until day 21.'),
        ('tip', 'Join the group now', f'Use this link: <b>{GRUPO_VIP_LINK}</b>. Star the group in WhatsApp '
              'so you don\'t miss any messages.'),
        ('h2', 'How the group works'),
        ('table', ['When', 'What happens'], [
            ['Every morning', 'A message with the day\'s workout and a tip'],
            ['Throughout the day', 'You check in when you finish your workout'],
            ['Every Monday', 'Goal of the week'],
            ['Every Sunday', 'Time to share the week\'s wins'],
            ['Anytime', 'Questions about the exercises get answered in the group'],
        ]),
        ('h2', 'How to check in'),
        ('p', 'After your workout, post a message in the group like this:'),
        ('p', '<b>✅ Day 5 done! Energy: 8/10. Today I felt: my legs firmer in the bridge.</b>'),
        ('p', 'That\'s it. No photo needed, no long text. Checking in is a commitment to yourself.'),
        ('h2', 'Group rules'),
        ('list', [
            'Always be respectful: nobody here judges bodies, ages or pace.',
            'No selling, chain messages or ads.',
            'Specific health questions should go to your doctor.',
            'Share photos only if you want to. No one is required to.',
        ]),
        ('h2', 'The anti-quitting plan'),
        ('steps', [
            '<b>Never miss two days in a row.</b> Missed a day? That\'s normal. What matters is coming back the next day.',
            '<b>On a bad day, do the Emergency Workout</b> (below). Three minutes count.',
            '<b>Tell the group when you\'re feeling down.</b> You\'ll be surprised by the support.',
            '<b>Look back, not just forward.</b> Compare your measurements and photos to day 1, not your body to someone else\'s.',
            '<b>Work out at the same time each day.</b> What\'s scheduled gets done.',
        ]),
        ('workout', 'Emergency Workout · 3 minutes', [
            ('respiracao-lateral', '30 seconds'),
            ('agachamento-deslizante', '45 seconds'),
            ('flexao-parede', '45 seconds'),
            ('ponte-parede', '45 seconds'),
            ('pernas-na-parede', '15 seconds'),
        ], 'Done? Check in as usual: a day done is a day done.'),
        ('h2', 'Your measurements'),
        ('table', ['Measurement', 'Day 1', 'Day 11', 'Day 21'], [
            ['Waist (at belly-button level)', '', '', ''],
            ['Hips (widest part)', '', '', ''],
            ['Arm (mid-upper arm)', '', '', ''],
            ['Thigh (mid-thigh)', '', '', ''],
            ['Weight', '', '', ''],
        ]),
        ('tip', 'Day 1 photos', 'Take one photo from the front and one from the side, in the same clothes and the same light. Repeat on day 21. '
              'Photos show changes the everyday mirror hides.'),
        ('pagebreak',),
        ('h2', 'Your 21-day journal'),
        ('table', ['Day', 'Workout done', 'Group check-in', 'Energy (0 to 10)', 'One win of the day'],
         [[str(d), '', '', '', ''] for d in range(1, 22)]),
        ('h2', 'A letter to yourself on day 21'),
        ('p', 'Write today, on day 1, why you started. Read it again on day 21.'),
        ('check', ['I started because...', 'On day 21 I want to feel...', 'When I feel like quitting, I\'ll remember that...']),
    ],
})

# 11) UPSELL 5 — ADEUS BRAÇO DE TCHAUZINHO
MATERIALS.append({
    'slug': 'bye-bye-bat-wings',
    'group': 'extra',
    'title': 'Bye-Bye',
    'title2': 'Bat Wings',
    'kicker': '7 MINUTES A DAY',
    'desc': '7-minute, no-weight workouts to firm the backs of your arms and underarm area.',
    'cover': 'app/fotos/fase3.webp',
    'body': [
        ('h2', 'Why your arms "wave"'),
        ('p', 'The famous bat wings sit on the back of your upper arm, where your <b>triceps</b> are. It\'s a muscle you rarely use '
              'in daily life, and it loses strength and volume over the years. On top of it, your skin loses elasticity and '
              'it\'s common for fat to build up in that area.'),
        ('p', 'Being honest with you: no exercise burns fat from your arms only. Fat comes off your whole body, with the challenge '
              'workouts and nutrition. What this guide does is <b>firm and build the muscle under your skin</b>, and '
              'that\'s what makes your arms look toned and stop jiggling.'),
        ('h2', 'Workout A — Triceps (7 minutes)'),
        ('workout', '40 s work · 20 s rest · 7 exercises', [
            ('circulos-bracos', '40 seconds'),
            ('triceps-parede', '40 seconds'),
            ('extensao-bracos-tras', '40 seconds'),
            ('mergulho-cadeira', '40 seconds'),
            ('prancha-parede', '40 seconds'),
            ('triceps-parede', '40 seconds'),
            ('abertura-peito', '40 seconds'),
        ]),
        ('h2', 'Workout B — Arms and underarms (7 minutes)'),
        ('workout', '40 s work · 20 s rest · 7 exercises', [
            ('anjos-parede', '40 seconds'),
            ('remada-toalha', '40 seconds'),
            ('flexao-parede', '40 seconds'),
            ('extensao-bracos-tras', '40 seconds'),
            ('swan-em-pe', '40 seconds'),
            ('circulos-bracos', '40 seconds'),
            ('abertura-peito', '40 seconds'),
        ], 'The towel row and wall angels work your back and underarm area, where bra bulge shows up.'),
        ('h2', 'The exercises, step by step'),
        ('newex', 'circulos-bracos'),
        ('newex', 'triceps-parede'),
        ('newex', 'extensao-bracos-tras'),
        ('newex', 'mergulho-cadeira'),
        ('newex', 'remada-toalha'),
        ('ex', 'flexao-parede', ''),
        ('ex', 'anjos-parede', ''),
        ('ex', 'prancha-parede', ''),
        ('h2', '4-week plan'),
        ('table', ['Week', 'What to do', 'How to progress'], [
            ['1', 'Alternate Workouts A and B, 5 days a week', '30 s work and 30 s rest'],
            ['2', 'Alternate Workouts A and B, 5 days a week', '40 s work and 20 s rest'],
            ['3', 'Alternate Workouts A and B, 6 days a week', 'Move your feet further from the wall'],
            ['4', 'Workout A + B on the same day, 3 days a week', '45 s work and 15 s rest'],
        ]),
        ('h2', 'To see results faster'),
        ('list', [
            '<b>Protein at every meal:</b> it\'s the building block of muscle.',
            '<b>Don\'t skip the 21-Day Challenge:</b> it\'s what helps reduce fat all over your body.',
            '<b>Moisturize the skin</b> on your arms after showering and wear sunscreen when in short sleeves.',
            '<b>Posture:</b> shoulders back instantly makes your arms look slimmer.',
            '<b>A well-fitted bra:</b> tight straps and band create that underarm fold.',
        ]),
        ('h2', 'Track your progress'),
        ('table', ['Measurement', 'Day 1', 'Day 14', 'Day 28'], [
            ['Right arm (mid-upper arm)', '', '', ''],
            ['Left arm (mid-upper arm)', '', '', ''],
            ['Wall push-ups in a row', '', '', ''],
        ]),
        ('tip', 'The tank top test', 'On day 1, take a photo in a tank top, from behind, with your arms out. Repeat on day 28.'),
        ('h2', 'Daily checklist'),
        ('check', ['I did my arm workout (A or B)', 'I did my 21-Day Challenge workout', 'Protein at every meal',
                   'I drank water throughout the day', 'I minded my posture']),
    ],
})

# 12) UPSELL 6 — YOGA FACIAL
MATERIALS.append({
    'slug': 'face-yoga',
    'group': 'extra',
    'title': 'Face Yoga',
    'title2': '10 Minutes a Day',
    'kicker': 'FIRMER FACE',
    'desc': 'Facial exercises and self-massage for a firmer face, less double chin and more glow.',
    'cover': 'app/fotos/sono.webp',
    'body': [
        ('h2', 'A gym for your face'),
        ('p', 'Your face has more than 40 muscles. Just like the ones in your body, they lose volume and firmness over the years, and the skin '
              'on top follows. Face yoga is a set of exercises that <b>works those muscles</b>, combined with '
              'self-massage, which boosts circulation and reduces puffiness.'),
        ('p', 'In a Northwestern University study (USA, 2018), women aged 40 to 65 who did facial exercises '
              'for 20 weeks had fuller cheeks and a younger appearance as rated by dermatologists. '
              'The study was small, but the result is encouraging and the method is simple, cheap and safe.'),
        ('tip', 'How to do it', 'Do it in front of the mirror, with clean hands and a little moisturizer or oil on your face so your '
              'fingers glide. The best time is in the morning, to de-puff, or at night, along with your skincare routine.'),
        ('h2', 'Firm Face Routine (10 minutes)'),
        ('workout', 'Do them in order', [
            ('face-testa', '5 reps'),
            ('face-olhos', '5 reps'),
            ('face-macas', '5 reps'),
            ('face-bigode', '1 minute'),
            ('face-papada', '8 reps'),
            ('face-lingua', '8 reps'),
        ], 'Finish with the 3-minute self-massage (below).'),
        ('h2', 'The exercises, step by step'),
        *[('newex', i) for i in ['face-testa', 'face-olhos', 'face-macas', 'face-bigode', 'face-papada', 'face-lingua']],
        ('h2', 'De-puffing self-massage (3 minutes)'),
        ('steps', [
            '<b>Neck:</b> with flat fingers, glide from your ear down to your collarbone, 5 times per side. This "opens the path" for fluid to drain.',
            '<b>Jawline:</b> with your knuckles, glide from your chin to your ear, following your jawline. 5 times.',
            '<b>Cheeks:</b> glide from the side of your nose to your temple, 5 times.',
            '<b>Eyes:</b> with your ring finger, very lightly, glide from the inner to the outer corner under your eye. 5 times.',
            '<b>Forehead:</b> glide from the center of your forehead to your temples, alternating hands. 5 times.',
            '<b>Finish:</b> glide from your temples down to your neck and collarbone, 3 times.',
        ]),
        ('tip', 'Always from the inside out and from the bottom up', 'And always gently: your face doesn\'t need force, it needs consistency.'),
        ('h2', '4-week plan'),
        ('table', ['Week', 'Routine', 'Focus'], [
            ['1', 'Full routine once a day', 'Learn the moves in front of the mirror'],
            ['2', 'Full routine + self-massage every morning', 'De-puff your face when you wake up'],
            ['3', 'Routine with 8 reps of each exercise', 'Firmer cheeks and jawline'],
            ['4', 'Full routine + tongue to the roof of your mouth throughout the day', 'Double chin and neck'],
        ]),
        ('h2', 'Habits that age you (and what to do)'),
        ('table', ['Habit', 'Swap for'], [
            ['Going out without sunscreen', 'Sunscreen every day, even when cloudy and indoors near a window'],
            ['Looking down at your phone', 'Phone at eye level (it\'s what marks your neck the most)'],
            ['Sleeping face-down on your pillow', 'Sleeping on your back or side with a satin pillowcase'],
            ['Too little water and sleep', 'About 8 cups of water and 7 to 8 hours of sleep'],
            ['Smoking', 'Get help quitting: it\'s what ages skin the most'],
        ]),
        ('h2', 'Progress photos'),
        ('p', 'Take one photo from the front and one in profile on day 1, without makeup, in the same light (ideally near a '
              'window). Repeat on day 28. The changes are gradual and photos help you notice them.'),
        ('warn', 'Don\'t do the exercises if you have a wound, inflammation or a recent cosmetic procedure on your face (Botox, '
                 'fillers, peels). In those cases, ask your dermatologist when you can start.'),
        ('h2', 'Daily checklist'),
        ('check', ['I did the Firm Face Routine', 'I did the self-massage', 'I wore sunscreen', 'I held my phone at eye level',
                   'I drank water throughout the day']),
    ],
})

# ─────────────────────────────── 51 RECEITAS ───────────────────────────────
# (nome, tempo, rendimento, [ingredientes], [preparo])
RECIPES = {
    'Breakfast': [
        ('3-ingredient pancake', '10 min', '1 serving', ['1 ripe banana', '2 eggs', '2 tbsp oats'],
         ['Mash the banana and mix with the eggs and oats.', 'Pour into a greased nonstick skillet and brown on both sides.', 'Serve with cinnamon or fruit.']),
        ('Creamy cheesy scrambled eggs', '7 min', '1 serving', ['2 eggs', '1 tbsp light cream cheese', 'Salt, pepper and chives'],
         ['Whisk the eggs with the cream cheese.', 'Cook over low heat, stirring constantly, until creamy.', 'Finish with chives.']),
        ('Mug omelet', '5 min', '1 serving', ['2 eggs', '2 tbsp diced feta or mozzarella', 'Chopped tomato and spinach'],
         ['Mix everything in a greased mug.', 'Microwave for 1 min, stir and microwave another 40 s.']),
        ('Protein overnight oats', '5 min + fridge', '1 serving', ['3 tbsp oats', '1 cup plain Greek yogurt', '1 tbsp chia seeds', 'Mixed berries'],
         ['Mix the oats, yogurt and chia in a jar.', 'Refrigerate overnight.', 'Top with the berries before eating.']),
        ('Chicken egg crepe', '10 min', '1 serving', ['1 egg', '2 tbsp tapioca flour', '3 tbsp shredded chicken', 'Oregano'],
         ['Whisk the egg with the tapioca flour.', 'Pour into the skillet, fill with the chicken and fold in half.']),
        ('Egg and cheese breakfast quesadilla', '8 min', '1 serving', ['1 small whole-wheat tortilla', '1 scrambled egg', '1 slice of mozzarella'],
         ['Warm the tortilla in a hot skillet.', 'Fill with the egg and cheese, fold and toast both sides.']),
        ('Skillet cheese bread (gluten-free)', '10 min', '1 serving', ['1 egg', '2 tbsp tapioca flour', '1 tbsp cream cheese', '2 tbsp grated Parmesan'],
         ['Mix everything into a smooth batter.', 'Cook in a covered skillet, 3 min per side.']),
        ('Protein oatmeal', '7 min', '1 serving', ['3 tbsp oats', '¾ cup milk', '1 scoop protein powder or 1 tbsp milk powder', 'Cinnamon'],
         ['Cook the oats in the milk, stirring until thick.', 'Turn off the heat and stir in the protein powder and cinnamon.']),
        ('Power yogurt parfait', '3 min', '1 serving', ['1 cup plain Greek yogurt', '1 tbsp peanut butter', '½ banana', 'Unsweetened granola'],
         ['Layer everything in a glass.']),
        ('Egg wrap', '8 min', '1 serving', ['2 beaten eggs', '1 slice of turkey breast', 'Greens and tomato'],
         ['Make a thin "pancake" with the eggs in the skillet.', 'Fill with the turkey and salad and roll up.']),
        ('Savory grits with egg', '10 min', '1 serving', ['¼ cup quick grits', '1 egg', 'Salt and water'],
         ['Cook the grits in salted water, stirring, until thick.', 'Serve topped with a boiled or scrambled egg.']),
        ('Strawberry protein smoothie', '3 min', '1 glass', ['¾ cup milk', '1 cup plain Greek yogurt', '5 strawberries', '1 tbsp oats'],
         ['Blend everything and serve cold.']),
    ],
    'Snacks': [
        ('Egg and veggie muffins', '25 min', '6 muffins', ['6 eggs', '1 grated carrot', '½ grated zucchini', 'Grated cheese and salt'],
         ['Whisk the eggs and mix in the veggies and cheese.', 'Divide into muffin cups and bake at 350 °F for 20 min.']),
        ('Crunchy roasted chickpeas', '35 min', '4 servings', ['2 cups cooked chickpeas', '1 tbsp olive oil', 'Paprika, salt and garlic powder'],
         ['Dry the chickpeas well and season.', 'Roast at 400 °F for 30 min, stirring halfway.']),
        ('Tuna spread', '5 min', '3 servings', ['1 can of tuna', '3 tbsp plain Greek yogurt', 'Lemon, chives and salt'],
         ['Mash the tuna and mix in the other ingredients.', 'Serve with carrot sticks or whole-wheat bread.']),
        ('Seasoned hard-boiled eggs', '12 min', '2 servings', ['4 eggs', 'Salt, pepper and paprika'],
         ['Cook the eggs for 9 min in boiling water.', 'Cool, peel and season.']),
        ('Protein popcorn', '8 min', '2 servings', ['3 tbsp popcorn kernels', '1 tsp oil', '2 tbsp grated Parmesan'],
         ['Pop the kernels in a pot with the oil.', 'Finish with the Parmesan.']),
        ('Air fryer chicken bites', '20 min', '10 bites', ['2 cups shredded chicken', '1 egg', '2 tbsp oats', 'Seasonings'],
         ['Mix everything and shape into balls.', 'Air fry at 350 °F for 12 min.']),
        ('Homemade Greek yogurt with honey', '5 min + 4 h', '2 servings', ['2 cups plain yogurt', '1 tbsp honey', 'Cinnamon'],
         ['Strain the yogurt through a clean cloth in the fridge for 4 hours.', 'Serve with honey and cinnamon.']),
        ('Grilled halloumi with tomato', '6 min', '1 serving', ['2 slices of halloumi', 'Cherry tomatoes', 'Oregano'],
         ['Grill the cheese in a skillet until golden.', 'Serve with the tomatoes and oregano.']),
        ('Chickpea hummus', '10 min', '4 servings', ['1 cup cooked chickpeas', '1 tbsp tahini or peanut butter', 'Lemon, garlic, salt and water'],
         ['Blend everything in a food processor until creamy.', 'Serve with raw veggies.']),
        ('Chicken salad sandwich', '7 min', '1 serving', ['2 slices of whole-wheat bread', '3 tbsp shredded chicken', '1 tbsp light cream cheese', 'Grated carrot'],
         ['Mix the chicken, cream cheese and carrot.', 'Fill the bread.']),
        ('Iced coffee protein shake', '3 min', '1 glass', ['⅔ cup cold milk', '1 shot of coffee', '1 tbsp milk powder or protein powder', 'Ice'],
         ['Blend everything.']),
        ('Caprese skewers', '5 min', '1 serving', ['Fresh mozzarella balls', 'Cherry tomatoes', 'Basil'],
         ['Thread onto skewers, alternating the ingredients.', 'Season with olive oil and salt.']),
    ],
    'Lunch and dinner': [
        ('Lemon grilled chicken', '20 min', '2 servings', ['2 chicken breasts', 'Juice of 1 lemon', 'Garlic, salt and paprika'],
         ['Season the chicken and marinate 10 min in the lemon.', 'Grill in a hot skillet 5 min per side.']),
        ('Sweet potato shepherd\'s pie', '40 min', '4 servings', ['1 lb cooked sweet potatoes', '14 oz lean ground beef', 'Onion, garlic and tomato', 'Grated cheese'],
         ['Sauté the beef with the seasonings.', 'Mash the sweet potatoes with a little of the cooking liquid.', 'Layer, top with cheese and broil until golden.']),
        ('Baked veggie frittata', '30 min', '4 servings', ['6 eggs', 'Chopped broccoli, tomato and onion', '3 tbsp grated cheese'],
         ['Whisk the eggs and mix in the veggies and cheese.', 'Bake in a greased dish at 350 °F for 25 min.']),
        ('Baked fish with potatoes', '35 min', '2 servings', ['2 tilapia fillets', '2 sliced potatoes', 'Lemon, olive oil, salt and herbs'],
         ['Arrange the potatoes on a sheet pan and bake 15 min.', 'Add the seasoned fish and bake 15 min more.']),
        ('Ground beef with zucchini', '20 min', '3 servings', ['14 oz lean ground beef', '1 diced zucchini', 'Onion, garlic and tomato'],
         ['Sauté the beef with the seasonings.', 'Add the zucchini and cook until tender.']),
        ('Lighter chicken stroganoff', '25 min', '3 servings', ['14 oz diced chicken', '1 cup plain Greek yogurt', '2 tbsp tomato sauce', 'Mushrooms'],
         ['Brown the chicken with onion and garlic.', 'Add the sauce and mushrooms.', 'Turn off the heat and stir in the yogurt.']),
        ('Loaded tuna salad', '10 min', '1 serving', ['Mixed greens', '1 can of tuna', '1 hard-boiled egg', 'Chickpeas, tomato and olive oil'],
         ['Assemble everything in a large bowl and dress.']),
        ('Whole-wheat chicken wrap', '10 min', '1 serving', ['1 whole-wheat tortilla', '3 tbsp shredded chicken', 'Greens, tomato and seasoned yogurt'],
         ['Fill the tortilla and roll it up.', 'Warm in a skillet to seal.']),
        ('Protein skillet pizza', '15 min', '1 serving', ['2 eggs', '2 tbsp oats', 'Tomato sauce', 'Cheese and shredded chicken'],
         ['Whisk the eggs and oats and make a disc in the skillet.', 'Flip, top with sauce, cheese and chicken and cover until melted.']),
        ('Chicken vegetable soup', '35 min', '4 servings', ['10 oz diced chicken', 'Butternut squash, carrot, zucchini and potato', 'Onion, garlic and parsley'],
         ['Sauté the chicken with onion and garlic.', 'Add the vegetables and water and cook until tender.']),
        ('Baked meatballs', '35 min', '4 servings', ['1 lb lean ground beef', '1 egg', '3 tbsp oats', 'Seasonings and tomato sauce'],
         ['Mix the beef, egg, oats and seasonings and shape into balls.', 'Bake at 400 °F for 20 min and top with sauce.']),
        ('Lentils with vegetables', '30 min', '4 servings', ['1 cup lentils', 'Diced carrot and zucchini', 'Onion, garlic and cumin'],
         ['Cook the lentils for 15 min.', 'Sauté the vegetables and stir into the lentils.']),
        ('Healthy chicken stir-fry', '25 min', '3 servings', ['14 oz diced chicken', 'Colorful bell peppers and onion', '2 tbsp light soy sauce', 'Peanuts'],
         ['Brown the chicken.', 'Add the vegetables and soy sauce and stir-fry.', 'Finish with peanuts.']),
        ('Cauliflower rice with shrimp', '20 min', '2 servings', ['½ head of riced cauliflower', '7 oz peeled shrimp', 'Garlic, olive oil and parsley'],
         ['Sauté the shrimp in garlic and olive oil.', 'Add the cauliflower and cook 5 min.']),
        ('Steak, bean and veggie bowl', '15 min', '1 serving', ['1 palm of steak strips', '1 cupped hand of black beans', 'Sautéed vegetables', '½ cupped hand of rice'],
         ['Sauté the steak and vegetables.', 'Build the bowl with the beans and rice.']),
    ],
    'Protein desserts': [
        ('Chocolate yogurt mousse', '5 min + fridge', '2 servings', ['2 cups plain Greek yogurt', '2 tbsp cocoa powder', 'Sweetener or honey to taste'],
         ['Mix everything until smooth.', 'Refrigerate for 1 hour.']),
        ('Healthy chocolate fudge (brigadeiro)', '10 min', '2 servings', ['4 tbsp milk powder', '2 tbsp cocoa', '½ cup milk'],
         ['Cook everything over low heat, stirring, until it pulls away from the bottom of the pan.']),
        ('Banana mug cake', '5 min', '1 serving', ['1 banana', '1 egg', '2 tbsp oats', '1 tbsp cocoa', '½ tsp baking powder'],
         ['Mash the banana and mix everything in the mug.', 'Microwave for 2 min.']),
        ('Oat and peanut butter cookies', '20 min', '10 cookies', ['1 cup oats', '3 tbsp peanut butter', '1 mashed banana', '70% dark chocolate chips'],
         ['Mix everything and shape the cookies.', 'Bake at 350 °F for 12 min.']),
        ('Chocolate banana "nice cream"', '5 min + freezer', '2 servings', ['2 frozen bananas', '1 tbsp cocoa', '2 tbsp yogurt'],
         ['Blend everything in a food processor until creamy.']),
        ('Chia pudding', '5 min + fridge', '2 servings', ['4 tbsp chia seeds', '1 cup milk', 'Vanilla and fruit'],
         ['Mix the chia with the milk and vanilla.', 'Refrigerate 4 hours and top with fruit.']),
        ('Cheesecake in a jar', '10 min', '2 servings', ['1 cup Greek yogurt', '2 tbsp ricotta', 'Crushed graham crackers', 'Berry sauce'],
         ['Blend the yogurt with the ricotta.', 'Layer in a jar: crackers, cream and sauce.']),
        ('Sweet cocoa pancakes', '10 min', '1 serving', ['1 egg', '1 banana', '1 tbsp cocoa', '1 tbsp oats'],
         ['Blend everything and make small pancakes in the skillet.']),
        ('Baked cinnamon apple with yogurt', '20 min', '2 servings', ['2 apples', 'Cinnamon', '1 cup plain Greek yogurt'],
         ['Slice the apples, sprinkle with cinnamon and bake at 350 °F for 15 min.', 'Serve with yogurt.']),
        ('Peanut butter truffles', '15 min', '12 truffles', ['4 tbsp peanut butter', '4 tbsp milk powder', '1 tbsp honey', 'Cocoa for coating'],
         ['Mix until it forms a dough.', 'Shape into balls and roll in cocoa.']),
        ('Protein jello', '5 min + fridge', '4 servings', ['1 box of sugar-free gelatin', '1 cup plain Greek yogurt', '1 cup hot water'],
         ['Dissolve the gelatin in the hot water.', 'Blend with the yogurt and refrigerate.']),
        ('Strawberry yogurt popsicles', '5 min + freezer', '4 popsicles', ['2 cups plain Greek yogurt', '8 strawberries', 'Honey to taste'],
         ['Blend everything and pour into popsicle molds.', 'Freeze for 6 hours.']),
    ],
}
