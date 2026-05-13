<script setup>
import { DEFAULT_EXERCISES, EXERCISES_BY_GROUP, MUSCLE_GROUPS } from '../../lib/exercises'

const props = defineProps({
  exercise: { type: Object, required: true },
  index: { type: Number, required: true }
})

const emit = defineEmits(['remove', 'addSet', 'removeSet', 'update'])

function updateExercise(key, value) {
  emit('update', { ...props.exercise, [key]: value })
}

function updateSet(index, key, value) {
  const sets = [...props.exercise.sets]
  sets[index] = { ...sets[index], [key]: value }
  emit('update', { ...props.exercise, sets })
}
</script>

<template>
  <div class="bg-surface-container-low p-md rounded-xl border border-white/5 mb-md">
    <div class="flex items-center justify-between mb-sm">
      <select
        :value="exercise.exerciseId"
        @change="updateExercise('exerciseId', ($event.target).value)"
        class="bg-transparent border-none focus:ring-0 text-headline-md font-semibold text-on-surface p-0 w-full outline-none cursor-pointer"
      >
        <optgroup v-for="group in MUSCLE_GROUPS" :key="group" :label="group">
          <option v-for="ex in EXERCISES_BY_GROUP[group]" :key="ex.id" :value="ex.id">{{ ex.name }}</option>
        </optgroup>
      </select>
      <button type="button" @click="emit('remove')" class="text-error/70 hover:text-error transition-colors cursor-pointer">
        <span class="material-symbols-outlined">delete</span>
      </button>
    </div>

    <!-- Table header -->
    <div class="grid grid-cols-4 gap-sm text-center mb-base">
      <span class="text-label-sm text-on-surface-variant tracking-widest uppercase">Set</span>
      <span class="text-label-sm text-on-surface-variant tracking-widest uppercase">Reps</span>
      <span class="text-label-sm text-on-surface-variant tracking-widest uppercase">Weight (kg)</span>
      <span class="text-label-sm text-on-surface-variant tracking-widest uppercase"></span>
    </div>

    <!-- Sets -->
    <div class="space-y-base">
      <div v-for="(set, si) in exercise.sets" :key="si" class="grid grid-cols-4 gap-sm items-center">
        <div class="bg-surface-container-lowest h-12 flex items-center justify-center rounded-lg border border-white/5 font-bold">{{ si + 1 }}</div>
        <input type="number" :value="set.reps" @input="updateSet(si, 'reps', ($event.target).value)" placeholder="-" class="set-input bg-surface-container-lowest h-12 rounded-lg border border-white/5 text-center focus:border-primary-fixed focus:ring-0 outline-none w-full">
        <input type="number" step="0.5" :value="set.weight" @input="updateSet(si, 'weight', ($event.target).value)" placeholder="-" class="set-input bg-surface-container-lowest h-12 rounded-lg border border-white/5 text-center focus:border-primary-fixed focus:ring-0 outline-none w-full">
        <div class="flex justify-center">
          <button type="button" @click="emit('removeSet', si)" class="text-error/50 hover:text-error transition-colors cursor-pointer">
            <span class="material-symbols-outlined text-sm">remove_circle</span>
          </button>
        </div>
      </div>
    </div>

    <button type="button" @click="emit('addSet')" class="mt-md w-full py-base flex items-center justify-center gap-xs text-label-sm text-primary-fixed border border-primary-fixed/20 rounded-lg hover:bg-primary-fixed/5 transition-all cursor-pointer">
      <span class="material-symbols-outlined text-[18px]">add</span> ADD SET
    </button>
  </div>
</template>
