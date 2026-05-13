<script setup>
import { computed } from 'vue'
import { getExerciseById } from '../../lib/exercises'
import { timeAgo, formatDuration, formatPace } from '../../lib/helpers'

const props = defineProps({
  activities: { type: Array, default: () => [] }
})

function totalSets(exercises) {
  return exercises?.reduce((s, e) => s + (e.sets?.length || 0), 0) || 0
}
</script>

<template>
  <div v-if="activities.length === 0" class="glass-card p-md rounded-xl flex items-center justify-center text-on-surface-variant text-label-sm">
    Sin actividad aún
  </div>

  <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-md">
    <div
      v-for="a in activities"
      :key="a.id"
      class="glass-card p-md rounded-xl flex items-center gap-md group hover:border-primary-fixed transition-all cursor-pointer"
    >
      <!-- Gym -->
      <template v-if="a.type === 'gym'">
        <div class="w-16 h-16 rounded-lg bg-surface-container-highest flex items-center justify-center text-primary-fixed shrink-0">
          <span class="material-symbols-outlined text-4xl">fitness_center</span>
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-label-sm text-on-surface-variant">{{ timeAgo(a.date) }}</p>
          <h4 class="text-body-lg font-bold text-primary truncate">{{ a.exercises?.length || 0 }} ejercicios</h4>
          <div class="flex gap-md mt-xs flex-wrap">
            <span class="text-label-sm text-on-surface-variant flex items-center gap-xs">
              <span class="material-symbols-outlined text-sm">timer</span> {{ a.duration || '—' }} min
            </span>
            <span class="text-label-sm text-on-surface-variant flex items-center gap-xs">
              <span class="material-symbols-outlined text-sm">fitness_center</span> {{ totalSets(a.exercises) }} series
            </span>
          </div>
        </div>
      </template>

      <!-- Run -->
      <template v-else>
        <div class="w-16 h-16 rounded-lg bg-surface-container-highest flex items-center justify-center text-primary-fixed shrink-0">
          <span class="material-symbols-outlined text-4xl">directions_run</span>
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-label-sm text-on-surface-variant">{{ timeAgo(a.date) }}</p>
          <h4 class="text-body-lg font-bold text-primary">{{ a.distance?.toFixed(2) }} km</h4>
          <div class="flex gap-md mt-xs flex-wrap">
            <span class="text-label-sm text-on-surface-variant flex items-center gap-xs">
              <span class="material-symbols-outlined text-sm">timer</span> {{ formatDuration(a.durationSec) }}
            </span>
            <span class="text-label-sm text-on-surface-variant flex items-center gap-xs">
              <span class="material-symbols-outlined text-sm">route</span> {{ a.pace ? formatPace(a.pace) : '—' }}
            </span>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
