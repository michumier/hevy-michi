<script setup>
import { ref, computed } from 'vue'
import { useWorkoutStore } from '../stores/workouts'
import { useTemplateStore } from '../stores/templates'
import { todayStr, formatDate } from '../lib/helpers'
import { getExerciseById } from '../lib/exercises'
import ExerciseForm from '../components/workouts/ExerciseForm.vue'
import TemplatePicker from '../components/templates/TemplatePicker.vue'

const workoutStore = useWorkoutStore()
const templateStore = useTemplateStore()

const mode = ref('gym')
const showTemplatePicker = ref(false)
const editingId = ref(null)

// Gym form
const gymDate = ref(todayStr())
const gymDuration = ref('')
const gymNotes = ref('')
const gymExercises = ref([{ exerciseId: 'press-banca', sets: [{ reps: '', weight: '' }] }])

// Run form
const runDate = ref(todayStr())
const runDistance = ref('')
const runDuration = ref('')
const runNotes = ref('')

const isEditing = computed(() => editingId.value !== null)

function toggleMode(m) {
  mode.value = m
}

function addExercise() {
  gymExercises.value.push({ exerciseId: 'press-banca', sets: [{ reps: '', weight: '' }] })
}

function removeExercise(index) {
  gymExercises.value.splice(index, 1)
}

function addSet(exerciseIndex) {
  gymExercises.value[exerciseIndex].sets.push({ reps: '', weight: '' })
}

function removeSet(exerciseIndex, setIndex) {
  gymExercises.value[exerciseIndex].sets.splice(setIndex, 1)
}

function resetForm() {
  editingId.value = null
  gymDate.value = todayStr()
  gymDuration.value = ''
  gymNotes.value = ''
  gymExercises.value = [{ exerciseId: 'press-banca', sets: [{ reps: '', weight: '' }] }]
}

function editWorkout(id) {
  const w = workoutStore.getWorkoutById(id)
  if (!w) return

  editingId.value = id
  gymDate.value = w.date
  gymDuration.value = String(w.duration || '')
  gymNotes.value = w.notes || ''
  gymExercises.value = w.exercises.map(ex => ({
    exerciseId: ex.exerciseId,
    sets: ex.sets.map(s => ({ reps: String(s.reps || ''), weight: String(s.weight || '') }))
  }))
  mode.value = 'gym'
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function cancelEdit() {
  resetForm()
}

async function submitGym() {
  if (!gymDate.value) return

  const exercises = []
  let hasData = false

  gymExercises.value.forEach(ex => {
    const sets = ex.sets
      .filter(s => (parseInt(s.reps) || 0) > 0 || (parseFloat(s.weight) || 0) > 0)
      .map(s => ({ reps: parseInt(s.reps) || 0, weight: parseFloat(s.weight) || 0 }))

    if (sets.length > 0) {
      exercises.push({ exerciseId: ex.exerciseId, sets })
      hasData = true
    }
  })

  if (!hasData) return

  const data = {
    date: gymDate.value,
    duration: parseInt(gymDuration.value) || 0,
    notes: gymNotes.value,
    exercises
  }

  if (isEditing.value) {
    await workoutStore.updateWorkout(editingId.value, data)
  } else {
    await workoutStore.addWorkout(data)
  }

  resetForm()
}

async function deleteWorkout(id) {
  if (confirm('¿Eliminar este entrenamiento?')) {
    await workoutStore.deleteWorkout(id)
    if (editingId.value === id) resetForm()
  }
}

async function submitRun() {
  if (!runDate.value || !runDistance.value || !runDuration.value) return

  const parts = runDuration.value.split(':').map(Number)
  if (parts.length !== 3 || parts.some(isNaN)) return

  const durationSec = parts[0] * 3600 + parts[1] * 60 + parts[2]
  if (durationSec <= 0) return

  await workoutStore.addRun({
    date: runDate.value,
    distance: parseFloat(runDistance.value),
    durationSec,
    notes: runNotes.value
  })

  runDistance.value = ''
  runDuration.value = ''
  runNotes.value = ''
}

function applyTemplate(template) {
  gymExercises.value = template.exercises.map(ex => ({
    exerciseId: ex.exerciseId,
    sets: [{ reps: '', weight: '' }]
  }))
  showTemplatePicker.value = false
  mode.value = 'gym'
}

async function deleteRun(id) {
  if (confirm('¿Eliminar esta carrera?')) {
    await workoutStore.deleteRun(id)
  }
}

function totalSets(exercises) {
  return exercises?.reduce((s, e) => s + (e.sets?.length || 0), 0) || 0
}
</script>

<template>
  <div class="mb-lg">
    <h2 class="text-display-lg font-bold text-on-surface">Training</h2>
    <p class="text-body-md text-on-surface-variant">Registra tus sesiones de gym y running.</p>
  </div>

  <section class="bg-surface-container border border-white/10 rounded-xl overflow-hidden">
    <div class="p-md border-b border-white/5 bg-white/5 flex flex-col sm:flex-row sm:items-center gap-sm">
      <div class="flex items-center gap-sm flex-1">
        <span class="material-symbols-outlined text-primary-fixed">{{ mode === 'gym' ? 'fitness_center' : 'directions_run' }}</span>
        <h3 class="text-headline-md font-semibold">
          <template v-if="isEditing">Editar Entreno</template>
          <template v-else>{{ mode === 'gym' ? 'Registrar Entreno' : 'Registrar Carrera' }}</template>
        </h3>
      </div>
      <div class="flex bg-surface-container-low rounded-lg p-xs">
        <button
          class="flex-1 py-1.5 px-3 rounded-lg text-label-sm flex items-center justify-center gap-1 cursor-pointer transition-all"
          :class="mode === 'gym' ? 'bg-primary-container/10 text-primary-fixed' : 'text-on-surface-variant hover:bg-surface-container-high'"
          @click="toggleMode('gym')"
        >
          <span class="material-symbols-outlined text-[16px]">fitness_center</span> Gym
        </button>
        <button
          class="flex-1 py-1.5 px-3 rounded-lg text-label-sm flex items-center justify-center gap-1 cursor-pointer transition-all"
          :class="mode === 'run' ? 'bg-primary-container/10 text-primary-fixed' : 'text-on-surface-variant hover:bg-surface-container-high'"
          @click="toggleMode('run')"
        >
          <span class="material-symbols-outlined text-[16px]">directions_run</span> Run
        </button>
      </div>
    </div>

    <div class="p-md space-y-md">
      <!-- GYM -->
      <div v-if="mode === 'gym'">
        <form @submit.prevent="submitGym">
          <div class="flex gap-md mb-md">
            <button type="button" @click="showTemplatePicker = true" class="flex items-center gap-xs text-primary-fixed text-label-sm hover:underline cursor-pointer">
              <span class="material-symbols-outlined text-sm">description</span>
              Desde plantilla
            </button>
            <button v-if="isEditing" type="button" @click="cancelEdit" class="flex items-center gap-xs text-on-surface-variant text-label-sm hover:text-on-surface cursor-pointer">
              <span class="material-symbols-outlined text-sm">close</span>
              Cancelar edición
            </button>
          </div>

          <div class="grid grid-cols-2 gap-md mb-md">
            <div>
              <label class="text-label-sm text-on-surface-variant tracking-widest uppercase mb-xs block">Fecha</label>
              <input type="date" v-model="gymDate" class="w-full bg-surface-container-lowest h-12 rounded-lg border border-white/5 px-md text-body-md focus:border-primary-fixed focus:ring-0 outline-none">
            </div>
            <div>
              <label class="text-label-sm text-on-surface-variant tracking-widest uppercase mb-xs block">Duración (min)</label>
              <input type="number" v-model="gymDuration" min="1" placeholder="45" class="w-full bg-surface-container-lowest h-12 rounded-lg border border-white/5 px-md text-body-md focus:border-primary-fixed focus:ring-0 outline-none">
            </div>
          </div>

          <div class="mb-md">
            <label class="text-label-sm text-on-surface-variant tracking-widest uppercase mb-xs block">Notas</label>
            <input type="text" v-model="gymNotes" placeholder="Opcional" class="w-full bg-surface-container-lowest h-12 rounded-lg border border-white/5 px-md text-body-md focus:border-primary-fixed focus:ring-0 outline-none">
          </div>

          <div class="space-y-sm">
            <ExerciseForm
              v-for="(exercise, i) in gymExercises"
              :key="i"
              :exercise="exercise"
              :index="i"
              @remove="removeExercise(i)"
              @add-set="addSet(i)"
              @remove-set="(si) => removeSet(i, si)"
              @update="(val) => gymExercises[i] = val"
            />
          </div>

          <button type="button" @click="addExercise" class="w-full py-md border-2 border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center gap-xs text-on-surface-variant hover:border-primary-fixed/40 hover:text-on-surface transition-all cursor-pointer mt-sm">
            <span class="material-symbols-outlined text-display-lg">post_add</span>
            <span class="text-label-sm tracking-widest uppercase">Add Exercise</span>
          </button>

          <div class="mt-xl">
            <button type="submit" class="w-full bg-primary-fixed text-on-primary-fixed py-md rounded-xl text-headline-md font-semibold hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-primary-fixed/20 cursor-pointer">
              {{ isEditing ? 'Actualizar Entrenamiento' : 'Guardar Entrenamiento' }}
            </button>
          </div>
        </form>

        <TemplatePicker v-if="showTemplatePicker" @close="showTemplatePicker = false" @select="applyTemplate" />
      </div>

      <!-- RUN -->
      <div v-else>
        <form @submit.prevent="submitRun">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-md">
            <div>
              <label class="text-label-sm text-on-surface-variant tracking-widest uppercase">Fecha</label>
              <input type="date" v-model="runDate" class="w-full bg-surface-container-lowest h-14 rounded-lg border border-white/5 px-md text-headline-md focus:border-primary-fixed focus:ring-0 outline-none">
            </div>
            <div>
              <label class="text-label-sm text-on-surface-variant tracking-widest uppercase">Distancia (KM)</label>
              <input type="number" step="0.01" min="0.1" v-model="runDistance" placeholder="0.00" class="w-full bg-surface-container-lowest h-14 rounded-lg border border-white/5 px-md text-headline-md focus:border-primary-fixed focus:ring-0 outline-none">
            </div>
            <div>
              <label class="text-label-sm text-on-surface-variant tracking-widest uppercase">Tiempo</label>
              <input type="text" v-model="runDuration" placeholder="hh:mm:ss" class="w-full bg-surface-container-lowest h-14 rounded-lg border border-white/5 px-md text-headline-md focus:border-primary-fixed focus:ring-0 outline-none">
            </div>
          </div>
          <div class="mt-md">
            <label class="text-label-sm text-on-surface-variant tracking-widest uppercase mb-xs block">Notas</label>
            <input type="text" v-model="runNotes" placeholder="Opcional" class="w-full bg-surface-container-lowest h-12 rounded-lg border border-white/5 px-md text-body-md focus:border-primary-fixed focus:ring-0 outline-none">
          </div>
          <div class="mt-xl">
            <button type="submit" class="w-full bg-primary-fixed text-on-primary-fixed py-md rounded-xl text-headline-md font-semibold hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-primary-fixed/20 cursor-pointer">
              Guardar Carrera
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>

  <!-- WORKOUT HISTORY -->
  <div class="mt-lg">
    <div class="flex items-center justify-between mb-md">
      <h3 class="text-headline-md font-semibold text-primary">Historial de entrenos</h3>
    </div>
    <div v-if="workoutStore.workouts.length === 0" class="glass-card p-md rounded-xl text-center text-on-surface-variant text-label-sm">
      Sin entrenos registrados
    </div>
    <div v-else class="space-y-sm">
      <div
        v-for="w in workoutStore.workouts"
        :key="w.id"
        class="glass-card p-md rounded-xl cursor-pointer transition-all"
        :class="editingId === w.id ? 'border-primary-fixed' : 'hover:border-primary-fixed/40'"
        @click="editWorkout(w.id)"
      >
        <div class="flex justify-between items-start">
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-sm">
              <span class="material-symbols-outlined text-primary-fixed text-sm">fitness_center</span>
              <span class="text-label-sm text-on-surface-variant">{{ formatDate(w.date) }}</span>
              <span v-if="w.duration" class="text-label-sm text-on-surface-variant">· {{ w.duration }} min</span>
            </div>
            <div class="flex flex-wrap gap-x-md gap-y-xs mt-sm">
              <span v-for="ex in w.exercises" :key="ex.exerciseId" class="text-body-sm px-sm py-xs bg-surface-container-high rounded text-on-surface-variant text-xs">
                {{ getExerciseById(ex.exerciseId)?.name || ex.exerciseId }}
                <span class="text-primary-fixed/60">({{ ex.sets?.length || 0 }})</span>
              </span>
            </div>
            <p v-if="w.notes" class="text-label-sm text-on-surface-variant mt-xs">📝 {{ w.notes }}</p>
          </div>
          <div class="flex items-center gap-xs shrink-0 ml-md">
            <span class="text-label-sm text-on-surface-variant">{{ totalSets(w.exercises) }} series</span>
            <button @click.stop="deleteWorkout(w.id)" class="text-error/50 hover:text-error transition-colors cursor-pointer">
              <span class="material-symbols-outlined">delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- RUN HISTORY -->
  <div class="mt-lg">
    <h3 class="text-headline-md font-semibold text-primary mb-md">Historial de carreras</h3>
    <div v-if="workoutStore.runs.length === 0" class="glass-card p-md rounded-xl text-center text-on-surface-variant text-label-sm">
      Sin carreras registradas
    </div>
    <div v-else class="space-y-sm">
      <div v-for="run in workoutStore.runs" :key="run.id" class="glass-card p-md rounded-xl">
        <div class="flex justify-between items-start">
          <div>
            <div class="flex items-center gap-sm">
              <span class="material-symbols-outlined text-primary-fixed text-sm">directions_run</span>
              <span class="text-label-sm text-on-surface-variant">{{ formatDate(run.date) }}</span>
            </div>
            <h4 class="text-headline-md font-semibold text-primary mt-xs">{{ run.distance.toFixed(2) }} km</h4>
            <p v-if="run.notes" class="text-label-sm text-on-surface-variant mt-xs">📝 {{ run.notes }}</p>
          </div>
          <button @click="deleteRun(run.id)" class="text-error/50 hover:text-error transition-colors cursor-pointer">
            <span class="material-symbols-outlined">delete</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
