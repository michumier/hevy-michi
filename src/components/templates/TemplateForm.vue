<script setup>
import { ref } from 'vue'
import { useTemplateStore } from '../../stores/templates'
import { DEFAULT_EXERCISES, EXERCISES_BY_GROUP, MUSCLE_GROUPS } from '../../lib/exercises'

const templateStore = useTemplateStore()
const emit = defineEmits(['close', 'saved'])

const name = ref('')
const exercises = ref([{ exerciseId: 'press-banca', sets: [{ reps: '', weight: '' }] }])

function addExercise() {
  exercises.value.push({ exerciseId: 'press-banca', sets: [{ reps: '', weight: '' }] })
}

function removeExercise(index) {
  exercises.value.splice(index, 1)
}

function save() {
  if (!name.value) return

  const cleanExercises = exercises.value.map(ex => ({
    exerciseId: ex.exerciseId,
    sets: []  // Templates store exercise structure but not the actual set values
  }))

  templateStore.addTemplate({ name: name.value, exercises: cleanExercises })
  emit('saved')
}
</script>

<template>
  <div class="space-y-md">
    <div>
      <label class="text-label-sm text-on-surface-variant tracking-widest uppercase mb-xs block">Nombre de la plantilla</label>
      <input v-model="name" type="text" placeholder="Ej: Pecho + Tríceps" class="w-full bg-surface-container-lowest h-12 rounded-lg border border-white/5 px-md text-body-md focus:border-primary-fixed focus:ring-0 outline-none">
    </div>

    <div v-for="(ex, i) in exercises" :key="i" class="bg-surface-container-lowest p-md rounded-lg border border-white/5">
      <div class="flex items-center justify-between mb-sm">
        <select
          v-model="ex.exerciseId"
          class="bg-transparent border-none focus:ring-0 text-body-md text-on-surface p-0 w-full outline-none cursor-pointer"
        >
          <optgroup v-for="group in MUSCLE_GROUPS" :key="group" :label="group">
            <option v-for="e in EXERCISES_BY_GROUP[group]" :key="e.id" :value="e.id">{{ e.name }}</option>
          </optgroup>
        </select>
        <button type="button" @click="removeExercise(i)" class="text-error/50 hover:text-error cursor-pointer">
          <span class="material-symbols-outlined text-sm">delete</span>
        </button>
      </div>
    </div>

    <button type="button" @click="addExercise" class="w-full py-sm border-2 border-dashed border-white/10 rounded-lg text-on-surface-variant hover:border-primary-fixed/40 transition-all text-label-sm cursor-pointer">
      + Añadir ejercicio
    </button>

    <div class="flex gap-sm">
      <button @click="emit('close')" class="flex-1 py-sm rounded-xl border border-white/10 text-on-surface-variant hover:bg-surface-container-high transition-all cursor-pointer">Cancelar</button>
      <button @click="save" class="flex-1 bg-primary-fixed text-on-primary-fixed py-sm rounded-xl font-bold hover:brightness-110 transition-all cursor-pointer">Guardar</button>
    </div>
  </div>
</template>
