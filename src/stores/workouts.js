import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { supabase } from '../lib/supabase'

export const useWorkoutStore = defineStore('workouts', () => {
  const workouts = ref([])
  const runs = ref([])
  const loaded = ref(false)

  async function loadAll() {
    await Promise.all([loadWorkouts(), loadRuns()])
    loaded.value = true
  }

  // ── GYM WORKOUTS ──────────────────────────────────

  async function loadWorkouts() {
    const { data } = await supabase
      .from('workouts')
      .select('*, workout_exercises(*, sets(*))')
      .order('date', { ascending: false })
      .order('sort_order', { foreignTable: 'workout_exercises' })
      .order('sort_order', { foreignTable: 'workout_exercises.sets' })

    workouts.value = (data || []).map(w => ({
      id: w.id,
      date: w.date,
      duration: w.duration,
      notes: w.notes || '',
      type: w.type || 'gym',
      createdAt: new Date(w.created_at).getTime(),
      exercises: (w.workout_exercises || [])
        .sort((a, b) => a.sort_order - b.sort_order)
        .map(we => ({
          exerciseId: we.exercise_id,
          id: we.id,
          sets: (we.sets || [])
            .sort((a, b) => a.sort_order - b.sort_order)
            .map(s => ({ id: s.id, weight: s.weight, reps: s.reps }))
        }))
    }))
  }

  async function addWorkout(workout) {
    const { data, error } = await supabase.from('workouts').insert({
      date: workout.date,
      duration: workout.duration || 0,
      notes: workout.notes || '',
      type: 'gym',
      workout_exercises: (workout.exercises || []).map((ex, i) => ({
        exercise_id: ex.exerciseId,
        sort_order: i,
        sets: (ex.sets || []).filter(s => s.reps > 0 || s.weight > 0).map((s, j) => ({
          reps: parseInt(s.reps) || 0,
          weight: parseFloat(s.weight) || 0,
          sort_order: j
        }))
      }))
    }).select('*, workout_exercises(*, sets(*))')

    if (error) throw error
    await loadWorkouts()
    return data?.[0]
  }

  async function updateWorkout(id, updates) {
    // Delete all existing exercises/sets (cascade)
    await supabase.from('workout_exercises').delete().eq('workout_id', id)

    // Update workout fields
    await supabase.from('workouts').update({
      date: updates.date,
      duration: updates.duration || 0,
      notes: updates.notes || ''
    }).eq('id', id)

    // Re-insert exercises and sets
    if (updates.exercises?.length > 0) {
      const exercisesToInsert = updates.exercises
        .filter(ex => ex.sets?.some(s => (parseInt(s.reps) || 0) > 0 || (parseFloat(s.weight) || 0) > 0))
        .map((ex, i) => ({
          workout_id: id,
          exercise_id: ex.exerciseId,
          sort_order: i,
          sets: (ex.sets || [])
            .filter(s => (parseInt(s.reps) || 0) > 0 || (parseFloat(s.weight) || 0) > 0)
            .map((s, j) => ({
              reps: parseInt(s.reps) || 0,
              weight: parseFloat(s.weight) || 0,
              sort_order: j
            }))
        }))

      for (const exData of exercisesToInsert) {
        const { sets, ...weData } = exData
        const { data: we } = await supabase.from('workout_exercises').insert(weData).select().single()
        if (sets.length > 0 && we) {
          await supabase.from('sets').insert(sets.map(s => ({ ...s, workout_exercise_id: we.id })))
        }
      }
    }

    await loadWorkouts()
  }

  async function deleteWorkout(id) {
    await supabase.from('workouts').delete().eq('id', id)
    workouts.value = workouts.value.filter(w => w.id !== id)
  }

  function getWorkoutById(id) {
    return workouts.value.find(w => w.id === id)
  }

  // ── RUNS ──────────────────────────────────────────

  async function loadRuns() {
    const { data } = await supabase
      .from('runs')
      .select('*')
      .order('date', { ascending: false })

    runs.value = (data || []).map(r => ({
      ...r,
      createdAt: new Date(r.created_at).getTime()
    }))
  }

  async function addRun(run) {
    const distance = parseFloat(run.distance)
    const durationSec = run.durationSec
    const pace = distance > 0 ? (durationSec / 60) / distance : 0

    const { data, error } = await supabase.from('runs').insert({
      date: run.date,
      distance,
      duration_sec: durationSec,
      pace,
      notes: run.notes || ''
    }).select().single()

    if (error) throw error
    runs.value.unshift({ ...data, createdAt: Date.now() })
  }

  async function deleteRun(id) {
    await supabase.from('runs').delete().eq('id', id)
    runs.value = runs.value.filter(r => r.id !== id)
  }

  // ── COMPUTED ──────────────────────────────────────

  const allActivity = computed(() => {
    const gym = workouts.value.map(w => ({ ...w, type: 'gym' }))
    const run = runs.value.map(r => ({ ...r, type: 'run' }))
    return [...gym, ...run].sort((a, b) => new Date(b.date) - new Date(a.date))
  })

  const recentActivity = computed(() => allActivity.value.slice(0, 4))

  function findPR(exerciseId) {
    let best = null
    workouts.value.forEach(w => {
      w.exercises?.forEach(ex => {
        if (ex.exerciseId !== exerciseId) return
        ex.sets?.forEach(set => {
          if (set.weight > 0 && (!best || set.weight > best.weight)) {
            best = { weight: set.weight, reps: set.reps, date: w.date }
          }
        })
      })
    })
    return best
  }

  function findBest5kPace() {
    let best = null
    runs.value.forEach(r => {
      if (r.distance >= 4.5 && r.pace && (!best || r.pace < best.pace)) {
        best = { pace: r.pace, distance: r.distance, date: r.date }
      }
    })
    return best
  }

  return {
    workouts, runs, loaded, allActivity, recentActivity,
    loadAll, addWorkout, updateWorkout, deleteWorkout, getWorkoutById,
    addRun, deleteRun, findPR, findBest5kPace
  }
})
