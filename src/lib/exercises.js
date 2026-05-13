export const DEFAULT_EXERCISES = [
  { id: 'press-banca', name: 'Press Banca', muscleGroup: 'Pecho' },
  { id: 'press-inclinado', name: 'Press Inclinado', muscleGroup: 'Pecho' },
  { id: 'aperturas', name: 'Aperturas', muscleGroup: 'Pecho' },
  { id: 'flexiones', name: 'Flexiones', muscleGroup: 'Pecho' },
  { id: 'peso-muerto', name: 'Peso Muerto', muscleGroup: 'Espalda' },
  { id: 'dominadas', name: 'Dominadas', muscleGroup: 'Espalda' },
  { id: 'remo-barra', name: 'Remo Barra', muscleGroup: 'Espalda' },
  { id: 'remo-mancuerna', name: 'Remo Mancuerna', muscleGroup: 'Espalda' },
  { id: 'jalones', name: 'Jalones al Pecho', muscleGroup: 'Espalda' },
  { id: 'press-hombro', name: 'Press Hombro', muscleGroup: 'Hombros' },
  { id: 'elevaciones-laterales', name: 'Elevaciones Laterales', muscleGroup: 'Hombros' },
  { id: 'elevaciones-frontales', name: 'Elevaciones Frontales', muscleGroup: 'Hombros' },
  { id: 'pajaros', name: 'Pájaros', muscleGroup: 'Hombros' },
  { id: 'sentadilla', name: 'Sentadilla', muscleGroup: 'Piernas' },
  { id: 'peso-muerto-rumano', name: 'Peso Muerto Rumano', muscleGroup: 'Piernas' },
  { id: 'prensa', name: 'Prensa', muscleGroup: 'Piernas' },
  { id: 'extensiones', name: 'Extensiones Cuádriceps', muscleGroup: 'Piernas' },
  { id: 'femoral', name: 'Femoral Acostado', muscleGroup: 'Piernas' },
  { id: 'gemelos', name: 'Gemelos de Pie', muscleGroup: 'Piernas' },
  { id: 'curl-barra', name: 'Curl Barra', muscleGroup: 'Brazos' },
  { id: 'curl-mancuerna', name: 'Curl Mancuerna', muscleGroup: 'Brazos' },
  { id: 'martillo', name: 'Curl Martillo', muscleGroup: 'Brazos' },
  { id: 'frances', name: 'Press Francés', muscleGroup: 'Brazos' },
  { id: 'cuerdas', name: 'Extensiones Cuerdas', muscleGroup: 'Brazos' },
  { id: 'plancha', name: 'Plancha', muscleGroup: 'Core' },
  { id: 'crunch', name: 'Crunch', muscleGroup: 'Core' },
  { id: 'elevaciones-piernas', name: 'Elevaciones Piernas', muscleGroup: 'Core' },
  { id: 'rueda', name: 'Rueda Abdominal', muscleGroup: 'Core' },
]

export function getExerciseById(id) {
  return DEFAULT_EXERCISES.find(e => e.id === id)
}

export const MUSCLE_GROUPS = [
  'Pecho', 'Espalda', 'Hombros', 'Piernas', 'Brazos', 'Core'
]

export const EXERCISES_BY_GROUP = MUSCLE_GROUPS.reduce((acc, group) => {
  acc[group] = DEFAULT_EXERCISES.filter(e => e.muscleGroup === group)
  return acc
}, {})
