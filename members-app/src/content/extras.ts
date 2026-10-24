export interface QuizQuestion {
  q: string;
  options: string[];
  answer: number;
  why: string;
}

/** Quiz do Corpo: 3 perguntas por dia, em rotação. */
export const QUIZ: QuizQuestion[] = [
  { q: 'Which muscle works like a natural "corset" around your belly?', options: ['Rectus abdominis', 'Transverse abdominis', 'Biceps'], answer: 1, why: 'The transverse abdominis is the deepest ab muscle and wraps around your torso like a corset, stabilizing your spine.' },
  { q: 'In Pilates, when do we usually exhale?', options: ['At the hardest part of the move', 'Only at the end of the workout', 'Never, we hold our breath'], answer: 0, why: 'Exhaling during the effort helps activate your deep abs and keeps you from holding your breath.' },
  { q: 'The breathing used in Pilates is called:', options: ['Belly breathing', 'Lateral (intercostal) breathing', 'Panting'], answer: 1, why: 'In lateral breathing your ribs expand out to the sides while your abs stay lightly engaged.' },
  { q: 'Who created the Pilates method?', options: ['Joseph Pilates', 'Jane Fonda', 'A group of Russian ballerinas'], answer: 0, why: 'Joseph Pilates developed the method in the early 20th century and called it "Contrology".' },
  { q: 'Which is the largest glute muscle?', options: ['Gluteus minimus', 'Gluteus medius', 'Gluteus maximus'], answer: 2, why: 'The gluteus maximus is the largest and works hard in the bridge and hip extension.' },
  { q: 'The gluteus medius is very important for:', options: ['Chewing', 'Stabilizing your hips when you walk', 'Moving your fingers'], answer: 1, why: 'It keeps your pelvis level when your weight is on one leg, like when you walk.' },
  { q: 'Feeling sharp pain in a joint during exercise means:', options: ['It\'s working', 'It\'s time to stop and modify', 'You need to go faster'], answer: 1, why: 'Sharp pain is a warning sign. Mild muscle discomfort is normal; joint pain is not.' },
  { q: 'Mobility is:', options: ['The same as flexibility', 'The ability to actively move a joint with control', 'Running fast'], answer: 1, why: 'Flexibility is how far a muscle stretches; mobility is how well you control that movement.' },
  { q: 'In the wall squat, your knees should point:', options: ['Inward', 'In the direction of your feet', 'Outward, wide open'], answer: 1, why: 'Knees aligned with your second toe spread the load across the joint better.' },
  { q: 'The pelvic floor is part of your:', options: ['Powerhouse (core)', 'Arm', 'Neck'], answer: 0, why: 'Together with the transverse abdominis, diaphragm and back muscles, the pelvic floor makes up your core.' },
  { q: 'Why are recovery days important?', options: ['Because muscles adapt during rest', 'They aren\'t important', 'To lose momentum'], answer: 0, why: 'Training creates the stimulus; recovery lets your body adapt and get stronger.' },
  { q: 'In the plank, if your lower back starts to sag, it\'s best to:', options: ['Hold your breath', 'Move your feet closer to the wall and re-engage your abs', 'Ignore it'], answer: 1, why: 'Reducing the incline makes the exercise lighter and protects your lower back.' },
  { q: 'Which part of the spine tends to get stiff when you sit a lot?', options: ['Thoracic spine (mid-back)', 'Your toes', 'None'], answer: 0, why: 'The thoracic spine tends to stiffen from sitting; that\'s why we do rotations and the Swan.' },
  { q: 'A stretch should feel like:', options: ['Strong pain', 'A comfortable pull', 'Tingling'], answer: 1, why: 'Stretching is comfortable. Pain or tingling means you need to ease off.' },
  { q: 'What happens when we hold our breath during effort?', options: ['Pressure in the torso goes up', 'We feel lighter', 'Nothing'], answer: 0, why: 'Holding your breath raises internal pressure and blood pressure, and tires you out faster.' },
  { q: 'Your calves help to:', options: ['Pump blood from your legs back to your heart', 'Digest food', 'See better'], answer: 0, why: 'Calf contractions act like a "pump" that helps blood return to the heart.' },
  { q: 'Which Pilates principle says a few well-done reps are worth more?', options: ['Flow', 'Precision', 'Speed'], answer: 1, why: 'Precision: quality of movement matters more than quantity.' },
  { q: 'How much sleep does an adult generally need?', options: ['3 to 4 hours', '7 to 9 hours', '12 hours'], answer: 1, why: 'Most adults benefit from 7 to 9 hours a night.' },
  { q: 'What helps you keep a new habit?', options: ['Linking it to something you already do', 'Waiting until you feel like it', 'Doing everything at once on day one'], answer: 0, why: 'Anchoring a habit to an existing routine makes it easier to remember and start.' },
  { q: 'In the bridge, your body weight should be on:', options: ['Your neck', 'Your shoulders and feet', 'Your head'], answer: 1, why: 'Your neck stays free; your shoulders and feet support your body.' },
  { q: 'Your hamstrings are located:', options: ['On the back of your thigh', 'On the front of your thigh', 'In your arm'], answer: 0, why: 'They bend your knee and extend your hip; we stretch them with a leg up the wall.' },
  { q: 'How many muscles make up the quadriceps?', options: ['2', '4', '10'], answer: 1, why: 'Quad = four: rectus femoris, vastus lateralis, vastus medialis and vastus intermedius.' },
  { q: 'Which of these is a sign to STOP exercising?', options: ['Light sweating', 'Dizziness or chest pain', 'Slightly faster breathing'], answer: 1, why: 'Dizziness and chest pain call for stopping immediately and, if they persist, getting medical care.' },
  { q: 'Why does a long exhale help you relax?', options: ['It triggers calming responses in the nervous system', 'It burns lots of calories', 'It doesn\'t help'], answer: 0, why: 'Slow exhaling is associated with activating the parasympathetic nervous system, linked to relaxation.' },
  { q: 'In Pilates, "center" means:', options: ['The middle of the room', 'The group of muscles that stabilize your torso', 'Just your belly button'], answer: 1, why: 'The center (powerhouse) includes your deep abs, pelvic floor, glutes and back muscles.' },
  { q: 'A good way to train balance safely is:', options: ['With your eyes closed on day one', 'Near a wall, with support available', 'Standing on a chair'], answer: 1, why: 'The wall gives you instant support if you lose your balance.' },
  { q: 'The diaphragm is mainly responsible for:', options: ['Breathing', 'Walking', 'Blinking'], answer: 0, why: 'The diaphragm is the main breathing muscle; it moves down as you inhale and up as you exhale.' },
  { q: 'What\'s the best strategy if you miss a day of the challenge?', options: ['Give up', 'Pick back up the next day, guilt-free', 'Do 5 workouts at once'], answer: 1, why: 'Consistency means getting back to it. Missed days stay pending so you can make them up at your own pace.' },
  { q: 'The rhomboids, worked in wall angels, are located:', options: ['Between your shoulder blades', 'In your foot', 'In your belly'], answer: 0, why: 'They pull your shoulder blades together and help keep your shoulders back.' },
  { q: 'Slow, controlled movements help to:', options: ['Recruit the muscles better and avoid compensating', 'Train less', 'Nothing'], answer: 0, why: 'Control forces the right muscles to work and reduces the use of momentum.' },
];

/** Cartas de motivação: uma por dia do desafio + extras para dias seguintes */
export const CARDS: string[] = [
  'Starting is the bravest part. You did it today. 💜',
  'Your body doesn\'t need to be different to deserve care. It deserves it now.',
  'Small steps every day create paths you never imagined.',
  'You don\'t need perfection. You need presence.',
  'Every mindful breath is a minute you gave to yourself.',
  'The strength you\'re building goes far beyond your muscles.',
  'One week! The woman who started would be proud of you.',
  'Hard days count too. Especially those.',
  'Your pace is the right pace.',
  'Halfway there. Look back and see how far you\'ve come.',
  'Resting isn\'t quitting. It\'s getting ready to keep going.',
  'You\'re learning to trust your own body.',
  'Being consistent is choosing yourself, again and again.',
  'Two weeks of commitment to yourself. That has a name: determination.',
  'Your body hears every caring thing you do for it.',
  'You\'re capable of things you haven\'t even tried yet.',
  'Flexibility is also being gentle with yourself on imperfect days.',
  'The balance you train at the wall, you carry into life.',
  'Two days left. You\'re already a different woman: stronger, more present.',
  'Tomorrow is a day to celebrate. Today, be proud of the journey.',
  'You\'ve reached the end of the challenge, but this is just the beginning of your new routine. Thank you for not giving up on yourself. 💜 — Lili',
  'You keep showing up for yourself. That\'s beautiful.',
  'Movement is a way of saying "I care about me".',
  'Today, done beats perfect.',
];

/** Roleta do Bem-Estar: pequenas atividades saudáveis */
export const ROULETTE: { emoji: string; title: string; desc: string; color: string }[] = [
  { emoji: '💧', title: 'Glass of water', desc: 'Drink a glass of water now, slowly.', color: '#E86AA8' },
  { emoji: '🌬️', title: '5 breaths', desc: 'Take 5 slow breaths, exhaling for longer.', color: '#FF5FA2' },
  { emoji: '🚶‍♀️', title: 'Mini walk', desc: 'Walk for 3 minutes, inside or outside.', color: '#C42A78' },
  { emoji: '🧘‍♀️', title: 'Neck stretch', desc: 'Tilt your head to each side for 20 seconds.', color: '#FF9ECB' },
  { emoji: '☀️', title: 'Natural light', desc: 'Spend 2 minutes near a window or outdoors.', color: '#FFB3D3' },
  { emoji: '🎶', title: 'Favorite song', desc: 'Play a song that makes you happy and move however you like.', color: '#EC4C93' },
  { emoji: '📵', title: 'Screen break', desc: 'Go 5 minutes without looking at any screen.', color: '#A61F66' },
  { emoji: '🍎', title: 'Fruit of the day', desc: 'Add a piece of fruit to your next snack.', color: '#FF5FA2' },
  { emoji: '✍️', title: '3 gratitudes', desc: 'Think of 3 good things that happened today.', color: '#E86AA8' },
  { emoji: '🧍‍♀️', title: 'Wall test', desc: 'Stand with your heels, hips, back and head against the wall for 30 seconds.', color: '#C42A78' },
  { emoji: '💬', title: 'Kind message', desc: 'Send a kind message to someone you care about.', color: '#FF9ECB' },
  { emoji: '😌', title: 'Loose shoulders', desc: 'Lift your shoulders to your ears, hold 3 seconds and release. Repeat 5 times.', color: '#FFB3D3' },
];

export const PHRASES: string[] = [
  'Today is a day to take care of yourself with love.',
  'Your body thanks you for every minute of attention.',
  'Consistency is more powerful than intensity.',
  'One workout at a time, one day at a time.',
  'You\'re building something no one can take from you.',
  'Movement is energy that comes back to you.',
  'The best workout is the one you actually do.',
  'Take a deep breath: you\'re exactly where you need to be.',
  'Strength is also knowing when to go easy.',
  'Your progress doesn\'t have to be fast to be real.',
  'Today you choose you.',
  'Every completed day is a promise kept to yourself.',
];

export const GREETING = (h: number) => (h < 5 ? 'Good evening' : h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening');
