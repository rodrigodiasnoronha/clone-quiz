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
    slug: 'fundamentos', title: 'Wall Pilates Fundamentals', emoji: '🧱', minutes: 4,
    intro: 'Pilates was created by Joseph Pilates in the early 20th century as a conditioning method that combines strength, control and body awareness. In the wall version, the wall becomes your "equipment": it gives you support, resistance and an alignment reference.',
    sections: [
      { h: 'The 6 principles', p: [
        'Concentration: every movement is done with full attention, never on autopilot.',
        'Control: no movement is thrown; you guide your body from start to finish.',
        'Center: your deep abs, pelvic floor and back muscles are the foundation of everything.',
        'Breathing: the exhale goes with the effort and helps stabilize your torso.',
        'Precision: a few well-done reps are worth more than many rushed ones.',
        'Flow: over time, the movements link together continuously.',
      ] },
      { h: 'Why the wall helps', p: [
        'The wall shows you whether your spine is aligned: when your hips, back and head touch it, you have a clear posture reference.',
        'It also serves as support for balance and as a surface to push against, creating resistance without any equipment.',
      ] },
      { h: 'What you need', p: ['A wall clear of pictures and outlets at body height, a mat or folded towel and comfortable clothes. You can train barefoot or in non-slip socks.'] },
    ],
  },
  {
    slug: 'respiracao', title: 'How to breathe during exercise', emoji: '🌬️', minutes: 3,
    intro: 'In Pilates we use lateral (or intercostal) breathing: the air expands your ribs out to the sides and back, while your abs stay lightly engaged.',
    sections: [
      { h: 'Step by step', p: [
        'Place your hands on the sides of your ribs.',
        'Breathe in through your nose, feeling your ribs open into your hands, without pushing out your belly.',
        'Breathe out slowly through your mouth, as if blowing on a candle without putting it out, and feel your ribs close.',
      ] },
      { h: 'When to inhale and exhale', p: [
        'General rule: exhale at the hardest part of the move (lifting into the bridge, pushing the wall, raising your leg) and inhale as you return.',
        'During holds (plank, wall sit), breathe continuously. Holding your breath increases pressure in your torso and tires you out faster.',
      ] },
      { h: 'Breathing to calm down', p: ['Exhaling for longer than you inhale (for example, 4 counts in and 6 counts out) is a simple way to wind down after a workout or before bed.'] },
    ],
  },
  {
    slug: 'adaptar', title: 'How to modify the moves', emoji: '🪄', minutes: 3,
    intro: 'Modifying isn\'t doing "less": it\'s doing the right exercise for your body today. Every exercise in the challenge has an easier version under the "Easier version" button.',
    sections: [
      { h: 'The 4 levers for modifying', p: [
        'Range: make the movement smaller. A short squat still builds strength.',
        'Incline: in standing exercises facing the wall, move your feet closer to it to make it lighter.',
        'Time: shorten the hold or do fewer reps, while keeping good form.',
        'Support: use the wall, your hands or bend your knees whenever you need to.',
      ] },
      { h: 'Limitations you told us about', p: ['If you marked knees, lower back, wrists, shoulders or neck in your profile, the app automatically swaps out exercises that tend to strain those areas. You can change this in your Profile at any time.'] },
      { h: 'When it gets easy', p: ['If you finish your sets feeling like you could do a lot more, raise the challenge in your Profile (intermediate or advanced level) or choose more minutes per day.'] },
    ],
  },
  {
    slug: 'postura', title: 'Everyday posture', emoji: '🧍‍♀️', minutes: 4,
    intro: 'Posture isn\'t a fixed, "perfect" position: it\'s the ability to change positions comfortably. Still, a few simple tweaks make a big difference throughout the day.',
    sections: [
      { h: 'On your phone', p: ['Bring your phone up to eye level instead of dropping your head. Every time you remember, do a gentle "double chin" to realign your neck.'] },
      { h: 'Sitting', p: ['Keep both feet on the floor, sit on your sit bones and use a cushion behind your lower back if the chair is deep. Get up every 45–60 minutes, even if it\'s just to grab some water.'] },
      { h: 'Carrying things', p: ['Split your bags between both hands, keep the weight close to your body and bend your knees to pick something up from the floor, engaging your abs like in Pilates.'] },
      { h: 'The wall test', p: ['Stand with your heels, hips, back and head against the wall for 30 seconds. Notice where your body touches easily and where it doesn\'t: it\'s a great reminder of the alignment you\'re training in the challenge.'] },
    ],
  },
  {
    slug: 'recuperacao', title: 'Recovery and rest', emoji: '🌙', minutes: 3,
    intro: 'The workout is the stimulus; the adaptation happens during rest. That\'s why the challenge includes mobility and active recovery days.',
    sections: [
      { h: 'Is muscle soreness normal?', p: ['Mild muscle tenderness 24 to 48 hours after a new workout is common and tends to fade as you stay consistent. Sharp or stabbing pain, swelling or joint pain are not normal: stop and, if it persists, see a healthcare professional.'] },
      { h: 'Sleep', p: ['Good sleep helps muscle recovery, mood and appetite. Try to keep similar bedtimes and wake-up times, including on weekends.'] },
      { h: 'Active recovery', p: ['On lighter days, gentle movement (mobility, walking, stretching) helps circulation and that "loose" body feeling without adding extra fatigue.'] },
    ],
  },
  {
    slug: 'alongamentos', title: 'Quick stretches', emoji: '🤸‍♀️', minutes: 3,
    intro: 'Four wall stretches for any break in your day. Hold each one for 20 to 40 seconds, breathing slowly.',
    sections: [
      { h: '1. Chest on the wall', p: ['Forearm on the wall at shoulder height, turn your chest the other way. Great if you spend a lot of time at the computer.'] },
      { h: '2. Calf', p: ['Hands on the wall, one leg extended behind with the heel on the floor. Shift your hips forward.'] },
      { h: '3. Side body', p: ['Sideways to the wall, inner hand resting on it, outer arm overhead, lean toward the wall.'] },
      { h: '4. Legs up the wall', p: ['Lie down with your legs resting on the wall. It relaxes your legs and is a great way to end the day.'] },
      { h: 'Reminder', p: ['A stretch should feel like a comfortable pull. If it hurts or tingles, ease off.'] },
    ],
  },
  {
    slug: 'mobilidade', title: 'Mobility for beginners', emoji: '🔄', minutes: 3,
    intro: 'Flexibility is how far a muscle can stretch. Mobility is how far you can actively move a joint, with control. The two go hand in hand.',
    sections: [
      { h: 'Why train mobility', p: ['Joints with good mobility make everyday movements easier, like reaching a high shelf, squatting to tie your shoes or looking over your shoulder while driving.'] },
      { h: 'The key areas', p: ['Your mid-back, hips and ankles tend to get stiff from sitting too much. That\'s why they show up so often in the challenge: thoracic rotation, hip circles and ankle mobility.'] },
      { h: 'How to practice', p: ['Slow movements, no bouncing, within a comfortable range. A little every day works better than a lot once in a while.'] },
    ],
  },
  {
    slug: 'constancia', title: 'How to stay consistent', emoji: '📆', minutes: 4,
    intro: 'Motivation comes and goes. Consistency is built with strategy. Here are some ideas that work for a lot of people:',
    sections: [
      { h: 'Anchor your workout to a habit', p: ['"After I brush my teeth in the morning, I do my workout." Linking the new habit to something you already do makes it easier to remember.'] },
      { h: 'The 2-minute rule', p: ['On tough days, agree with yourself to do just the warm-up. Often you\'ll keep going; and if you don\'t, you still kept the habit alive.'] },
      { h: 'Set up your space', p: ['Leave your mat in sight, near the wall. The fewer steps between you and your workout, the easier it is to start.'] },
      { h: 'Missing a day isn\'t failing the challenge', p: ['If you miss a day, pick back up the next. In the app, missed days stay "pending" and you can make them up with no penalty.'] },
      { h: 'After the 21 days', p: ['Once you finish, use the maintenance routine (A, B and C) 3 times a week to keep what you\'ve gained.'] },
    ],
  },
  {
    slug: 'cuidados', title: 'Staying safe while you practice', emoji: '🩺', minutes: 3,
    intro: 'Wall Pilates is low-impact, but any physical exercise calls for paying attention to your body\'s signals.',
    sections: [
      { h: 'Stop the exercise if you feel', p: ['Chest pain, unusual shortness of breath, dizziness, blurred vision, sharp joint pain or tingling that doesn\'t go away. If symptoms persist, seek medical care.'] },
      { h: 'Talk to a professional first if', p: ['You\'re pregnant or recently gave birth, have heart disease, uncontrolled high blood pressure, a herniated disc, recent surgery, osteoporosis or any condition that requires supervision.'] },
      { h: 'A safe space', p: ['Use a non-slip surface, move furniture with sharp corners out of the way and keep water nearby.'] },
      { h: 'Important', p: ['This app offers educational and wellness content and does not replace an evaluation by a doctor or physical therapist, or guidance from a certified fitness professional.'] },
    ],
  },
  {
    slug: 'faq', title: 'Frequently asked questions', emoji: '💬', minutes: 4,
    intro: 'The most common questions about the challenge.',
    sections: [
      { h: 'I\'ve never done Pilates. Can I keep up?', p: ['Yes. Phase 1 was designed for beginners, and every exercise has an easier version.'] },
      { h: 'How long does each workout take?', p: ['It depends on the time you chose in your profile: between 10 and 30 minutes. The app adjusts the sets to fit your day.'] },
      { h: 'Do I need to work out every day?', p: ['The challenge unlocks one day at a time. If you miss one, it stays pending and you can make it up whenever you want — even doing two in one day, if you feel good.'] },
      { h: 'Will I lose weight in 21 days?', p: ['Every body responds differently, and we don\'t promise any specific body changes. The challenge aims to build strength, mobility, posture and, above all, the habit of moving. Body composition results also depend on nutrition, sleep and consistency.'] },
      { h: 'Where is my data saved?', p: ['Only on this device and in this browser. If you clear your browser data or switch phones, your progress won\'t transfer. In your Profile you can export a backup.'] },
      { h: 'What are the points for?', p: ['Evolution Points show how much you\'ve participated and help you level up. They can\'t be exchanged for money or products.'] },
      { h: 'Can I redo a workout?', p: ['Yes! Any completed day can be redone from the calendar. Workout points count once per challenge day.'] },
    ],
  },
];

export const ARTICLE = (slug: string) => ARTICLES.find(a => a.slug === slug);
