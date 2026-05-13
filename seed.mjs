import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://cooiitepulftfudybmhk.supabase.co',
  'sb_publishable_s58orpIkAWN3SMi0CWSxcA_gtqAPVkK'
)

async function seed() {
  // ── BODY WEIGHT ──────────────────────────────
  const bodyWeights = [
    { weight: 82.5, date: '2026-03-01' },
    { weight: 81.8, date: '2026-03-08' },
    { weight: 81.2, date: '2026-03-15' },
    { weight: 80.5, date: '2026-03-22' },
    { weight: 80.0, date: '2026-03-29' },
    { weight: 79.5, date: '2026-04-05' },
    { weight: 79.0, date: '2026-04-12' },
    { weight: 78.5, date: '2026-04-19' },
    { weight: 78.0, date: '2026-04-26' },
    { weight: 77.5, date: '2026-05-03' },
    { weight: 77.2, date: '2026-05-10' },
    { weight: 77.0, date: '2026-05-13' },
  ]

  for (const w of bodyWeights) {
    await supabase.from('body_weights').insert(w)
  }
  console.log('✅ Body weights inserted')

  // ── RUNS ─────────────────────────────────────
  const runs = [
    { date: '2026-03-02', distance: 3.0, duration_sec: 1260, pace: 7.0 },
    { date: '2026-03-05', distance: 5.0, duration_sec: 2100, pace: 7.0 },
    { date: '2026-03-09', distance: 5.0, duration_sec: 1950, pace: 6.5 },
    { date: '2026-03-12', distance: 7.0, duration_sec: 2730, pace: 6.5 },
    { date: '2026-03-16', distance: 5.0, duration_sec: 1800, pace: 6.0 },
    { date: '2026-03-19', distance: 8.0, duration_sec: 2880, pace: 6.0 },
    { date: '2026-03-23', distance: 5.0, duration_sec: 1650, pace: 5.5 },
    { date: '2026-03-26', distance: 10.0, duration_sec: 3300, pace: 5.5 },
    { date: '2026-03-30', distance: 5.0, duration_sec: 1500, pace: 5.0 },
    { date: '2026-04-02', distance: 12.0, duration_sec: 3720, pace: 5.17 },
    { date: '2026-04-06', distance: 5.0, duration_sec: 1500, pace: 5.0 },
    { date: '2026-04-09', distance: 10.0, duration_sec: 3000, pace: 5.0 },
    { date: '2026-04-13', distance: 5.0, duration_sec: 1620, pace: 5.4 },
    { date: '2026-04-16', distance: 8.0, duration_sec: 2640, pace: 5.5 },
    { date: '2026-04-20', distance: 5.0, duration_sec: 1500, pace: 5.0 },
    { date: '2026-04-23', distance: 15.0, duration_sec: 4500, pace: 5.0 },
    { date: '2026-04-27', distance: 5.0, duration_sec: 1440, pace: 4.8 },
    { date: '2026-04-30', distance: 10.0, duration_sec: 2880, pace: 4.8 },
    { date: '2026-05-04', distance: 5.0, duration_sec: 1380, pace: 4.6 },
    { date: '2026-05-07', distance: 8.0, duration_sec: 2208, pace: 4.6 },
    { date: '2026-05-11', distance: 5.0, duration_sec: 1350, pace: 4.5 },
  ]

  for (const r of runs) {
    await supabase.from('runs').insert(r)
  }
  console.log('✅ Runs inserted')

  // ── WORKOUTS ─────────────────────────────────
  const workouts = [
    {
      date: '2026-03-03', duration: 45, notes: 'Pecho + Triceps',
      workout_exercises: [
        { exercise_id: 'press-banca', sort_order: 0, sets: [
          { reps: 10, weight: 50, sort_order: 0 }, { reps: 8, weight: 60, sort_order: 1 }, { reps: 6, weight: 65, sort_order: 2 }
        ]},
        { exercise_id: 'press-inclinado', sort_order: 1, sets: [
          { reps: 10, weight: 40, sort_order: 0 }, { reps: 8, weight: 45, sort_order: 1 }, { reps: 8, weight: 45, sort_order: 2 }
        ]},
        { exercise_id: 'aperturas', sort_order: 2, sets: [
          { reps: 12, weight: 16, sort_order: 0 }, { reps: 12, weight: 16, sort_order: 1 }, { reps: 10, weight: 18, sort_order: 2 }
        ]},
        { exercise_id: 'frances', sort_order: 3, sets: [
          { reps: 10, weight: 20, sort_order: 0 }, { reps: 10, weight: 20, sort_order: 1 }, { reps: 8, weight: 22, sort_order: 2 }
        ]},
      ]
    },
    {
      date: '2026-03-06', duration: 50, notes: 'Espalda + Biceps',
      workout_exercises: [
        { exercise_id: 'peso-muerto', sort_order: 0, sets: [
          { reps: 8, weight: 70, sort_order: 0 }, { reps: 6, weight: 80, sort_order: 1 }, { reps: 5, weight: 90, sort_order: 2 }
        ]},
        { exercise_id: 'dominadas', sort_order: 1, sets: [
          { reps: 8, weight: 0, sort_order: 0 }, { reps: 6, weight: 0, sort_order: 1 }, { reps: 6, weight: 0, sort_order: 2 }
        ]},
        { exercise_id: 'remo-barra', sort_order: 2, sets: [
          { reps: 10, weight: 50, sort_order: 0 }, { reps: 8, weight: 60, sort_order: 1 }, { reps: 8, weight: 60, sort_order: 2 }
        ]},
        { exercise_id: 'curl-barra', sort_order: 3, sets: [
          { reps: 12, weight: 25, sort_order: 0 }, { reps: 10, weight: 30, sort_order: 1 }, { reps: 8, weight: 32, sort_order: 2 }
        ]},
      ]
    },
    {
      date: '2026-03-10', duration: 45, notes: 'Piernas',
      workout_exercises: [
        { exercise_id: 'sentadilla', sort_order: 0, sets: [
          { reps: 10, weight: 60, sort_order: 0 }, { reps: 8, weight: 70, sort_order: 1 }, { reps: 6, weight: 80, sort_order: 2 }, { reps: 5, weight: 85, sort_order: 3 }
        ]},
        { exercise_id: 'prensa', sort_order: 1, sets: [
          { reps: 12, weight: 100, sort_order: 0 }, { reps: 10, weight: 120, sort_order: 1 }, { reps: 8, weight: 140, sort_order: 2 }
        ]},
        { exercise_id: 'extensiones', sort_order: 2, sets: [
          { reps: 12, weight: 35, sort_order: 0 }, { reps: 10, weight: 40, sort_order: 1 }, { reps: 10, weight: 40, sort_order: 2 }
        ]},
        { exercise_id: 'femoral', sort_order: 3, sets: [
          { reps: 12, weight: 30, sort_order: 0 }, { reps: 10, weight: 35, sort_order: 1 }, { reps: 10, weight: 35, sort_order: 2 }
        ]},
      ]
    },
    {
      date: '2026-03-13', duration: 40, notes: 'Hombros + Core',
      workout_exercises: [
        { exercise_id: 'press-hombro', sort_order: 0, sets: [
          { reps: 10, weight: 30, sort_order: 0 }, { reps: 8, weight: 35, sort_order: 1 }, { reps: 6, weight: 40, sort_order: 2 }
        ]},
        { exercise_id: 'elevaciones-laterales', sort_order: 1, sets: [
          { reps: 12, weight: 10, sort_order: 0 }, { reps: 12, weight: 10, sort_order: 1 }, { reps: 10, weight: 12, sort_order: 2 }
        ]},
        { exercise_id: 'plancha', sort_order: 2, sets: [
          { reps: 30, weight: 0, sort_order: 0 }, { reps: 25, weight: 0, sort_order: 1 }, { reps: 20, weight: 0, sort_order: 2 }
        ]},
      ]
    },
    // More recent workouts with progression
    {
      date: '2026-04-14', duration: 50, notes: 'Pecho + Triceps - PR en banca',
      workout_exercises: [
        { exercise_id: 'press-banca', sort_order: 0, sets: [
          { reps: 10, weight: 55, sort_order: 0 }, { reps: 8, weight: 65, sort_order: 1 }, { reps: 5, weight: 75, sort_order: 2 }, { reps: 3, weight: 80, sort_order: 3 }
        ]},
        { exercise_id: 'press-inclinado', sort_order: 1, sets: [
          { reps: 10, weight: 45, sort_order: 0 }, { reps: 8, weight: 50, sort_order: 1 }, { reps: 6, weight: 52, sort_order: 2 }
        ]},
        { exercise_id: 'cuerdas', sort_order: 2, sets: [
          { reps: 15, weight: 15, sort_order: 0 }, { reps: 12, weight: 17, sort_order: 1 }, { reps: 12, weight: 17, sort_order: 2 }
        ]},
      ]
    },
    {
      date: '2026-04-17', duration: 55, notes: 'Espalda + Biceps',
      workout_exercises: [
        { exercise_id: 'peso-muerto', sort_order: 0, sets: [
          { reps: 8, weight: 80, sort_order: 0 }, { reps: 6, weight: 90, sort_order: 1 }, { reps: 4, weight: 100, sort_order: 2 }, { reps: 3, weight: 105, sort_order: 3 }
        ]},
        { exercise_id: 'jalones', sort_order: 1, sets: [
          { reps: 10, weight: 55, sort_order: 0 }, { reps: 8, weight: 60, sort_order: 1 }, { reps: 8, weight: 60, sort_order: 2 }
        ]},
        { exercise_id: 'remo-mancuerna', sort_order: 2, sets: [
          { reps: 10, weight: 28, sort_order: 0 }, { reps: 8, weight: 32, sort_order: 1 }, { reps: 8, weight: 32, sort_order: 2 }
        ]},
        { exercise_id: 'martillo', sort_order: 3, sets: [
          { reps: 12, weight: 16, sort_order: 0 }, { reps: 10, weight: 18, sort_order: 1 }, { reps: 10, weight: 18, sort_order: 2 }
        ]},
      ]
    },
    {
      date: '2026-04-21', duration: 50, notes: 'Piernas - sentadilla PR',
      workout_exercises: [
        { exercise_id: 'sentadilla', sort_order: 0, sets: [
          { reps: 10, weight: 65, sort_order: 0 }, { reps: 8, weight: 75, sort_order: 1 }, { reps: 6, weight: 85, sort_order: 2 }, { reps: 4, weight: 95, sort_order: 3 }, { reps: 2, weight: 100, sort_order: 4 }
        ]},
        { exercise_id: 'peso-muerto-rumano', sort_order: 1, sets: [
          { reps: 10, weight: 50, sort_order: 0 }, { reps: 8, weight: 60, sort_order: 1 }, { reps: 8, weight: 60, sort_order: 2 }
        ]},
        { exercise_id: 'gemelos', sort_order: 2, sets: [
          { reps: 15, weight: 60, sort_order: 0 }, { reps: 12, weight: 70, sort_order: 1 }, { reps: 12, weight: 70, sort_order: 2 }
        ]},
      ]
    },
    {
      date: '2026-04-28', duration: 45, notes: '',
      workout_exercises: [
        { exercise_id: 'press-banca', sort_order: 0, sets: [
          { reps: 10, weight: 55, sort_order: 0 }, { reps: 8, weight: 65, sort_order: 1 }, { reps: 6, weight: 72, sort_order: 2 }, { reps: 4, weight: 78, sort_order: 3 }
        ]},
        { exercise_id: 'aperturas', sort_order: 1, sets: [
          { reps: 12, weight: 18, sort_order: 0 }, { reps: 12, weight: 18, sort_order: 1 }, { reps: 10, weight: 20, sort_order: 2 }
        ]},
        { exercise_id: 'frances', sort_order: 2, sets: [
          { reps: 10, weight: 22, sort_order: 0 }, { reps: 8, weight: 24, sort_order: 1 }, { reps: 8, weight: 24, sort_order: 2 }
        ]},
      ]
    },
    {
      date: '2026-05-05', duration: 55, notes: 'Full body',
      workout_exercises: [
        { exercise_id: 'sentadilla', sort_order: 0, sets: [
          { reps: 10, weight: 60, sort_order: 0 }, { reps: 8, weight: 70, sort_order: 1 }, { reps: 6, weight: 80, sort_order: 2 }
        ]},
        { exercise_id: 'press-banca', sort_order: 1, sets: [
          { reps: 8, weight: 60, sort_order: 0 }, { reps: 6, weight: 70, sort_order: 1 }, { reps: 4, weight: 75, sort_order: 2 }
        ]},
        { exercise_id: 'remo-barra', sort_order: 2, sets: [
          { reps: 10, weight: 55, sort_order: 0 }, { reps: 8, weight: 65, sort_order: 1 }, { reps: 6, weight: 70, sort_order: 2 }
        ]},
        { exercise_id: 'press-hombro', sort_order: 3, sets: [
          { reps: 10, weight: 32, sort_order: 0 }, { reps: 8, weight: 37, sort_order: 1 }, { reps: 6, weight: 40, sort_order: 2 }
        ]},
      ]
    },
    {
      date: '2026-05-08', duration: 50, notes: 'Pecho + Biceps',
      workout_exercises: [
        { exercise_id: 'press-banca', sort_order: 0, sets: [
          { reps: 10, weight: 55, sort_order: 0 }, { reps: 8, weight: 65, sort_order: 1 }, { reps: 6, weight: 72, sort_order: 2 }, { reps: 5, weight: 75, sort_order: 3 }
        ]},
        { exercise_id: 'flexiones', sort_order: 1, sets: [
          { reps: 20, weight: 0, sort_order: 0 }, { reps: 15, weight: 0, sort_order: 1 }, { reps: 12, weight: 0, sort_order: 2 }
        ]},
        { exercise_id: 'curl-mancuerna', sort_order: 2, sets: [
          { reps: 12, weight: 12, sort_order: 0 }, { reps: 10, weight: 14, sort_order: 1 }, { reps: 8, weight: 16, sort_order: 2 }
        ]},
        { exercise_id: 'martillo', sort_order: 3, sets: [
          { reps: 10, weight: 16, sort_order: 0 }, { reps: 8, weight: 18, sort_order: 1 }, { reps: 8, weight: 18, sort_order: 2 }
        ]},
      ]
    },
    {
      date: '2026-05-12', duration: 45, notes: 'Espalda + Hombros',
      workout_exercises: [
        { exercise_id: 'peso-muerto', sort_order: 0, sets: [
          { reps: 8, weight: 80, sort_order: 0 }, { reps: 6, weight: 95, sort_order: 1 }, { reps: 4, weight: 105, sort_order: 2 }, { reps: 3, weight: 110, sort_order: 3 }
        ]},
        { exercise_id: 'dominadas', sort_order: 1, sets: [
          { reps: 10, weight: 0, sort_order: 0 }, { reps: 8, weight: 0, sort_order: 1 }, { reps: 7, weight: 0, sort_order: 2 }
        ]},
        { exercise_id: 'press-hombro', sort_order: 2, sets: [
          { reps: 8, weight: 35, sort_order: 0 }, { reps: 6, weight: 40, sort_order: 1 }, { reps: 5, weight: 42, sort_order: 2 }
        ]},
        { exercise_id: 'pajaros', sort_order: 3, sets: [
          { reps: 12, weight: 10, sort_order: 0 }, { reps: 12, weight: 10, sort_order: 1 }, { reps: 10, weight: 12, sort_order: 2 }
        ]},
      ]
    },
  ]

  for (const w of workouts) {
    await supabase.from('workouts').insert(w)
  }
  console.log('✅ Workouts inserted')

  // ── TEMPLATES ────────────────────────────────
  const templates = [
    {
      name: 'Pecho + Tríceps',
      template_exercises: [
        { exercise_id: 'press-banca', sort_order: 0 },
        { exercise_id: 'press-inclinado', sort_order: 1 },
        { exercise_id: 'aperturas', sort_order: 2 },
        { exercise_id: 'frances', sort_order: 3 },
        { exercise_id: 'cuerdas', sort_order: 4 },
      ]
    },
    {
      name: 'Espalda + Bíceps',
      template_exercises: [
        { exercise_id: 'peso-muerto', sort_order: 0 },
        { exercise_id: 'dominadas', sort_order: 1 },
        { exercise_id: 'remo-barra', sort_order: 2 },
        { exercise_id: 'curl-barra', sort_order: 3 },
        { exercise_id: 'martillo', sort_order: 4 },
      ]
    },
    {
      name: 'Piernas',
      template_exercises: [
        { exercise_id: 'sentadilla', sort_order: 0 },
        { exercise_id: 'prensa', sort_order: 1 },
        { exercise_id: 'extensiones', sort_order: 2 },
        { exercise_id: 'femoral', sort_order: 3 },
        { exercise_id: 'gemelos', sort_order: 4 },
      ]
    },
  ]

  for (const t of templates) {
    await supabase.from('workout_templates').insert(t)
  }
  console.log('✅ Templates inserted')

  console.log('\n🎯 Todos los datos de prueba insertados correctamente')
}

seed().catch(e => console.error('Seed error:', e))
