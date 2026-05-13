<script setup>
import { computed } from 'vue'
import { useWorkoutStore } from '../stores/workouts'
import { DEFAULT_EXERCISES } from '../lib/exercises'
import { formatDate, formatPace } from '../lib/helpers'
import VolumeChart from '../components/insights/VolumeChart.vue'
import RunningChart from '../components/insights/RunningChart.vue'

const workoutStore = useWorkoutStore()

const squatPR = computed(() => workoutStore.findPR('sentadilla'))
const benchPR = computed(() => workoutStore.findPR('press-banca'))
const deadliftPR = computed(() => workoutStore.findPR('peso-muerto'))
const best5kPace = computed(() => workoutStore.findBest5kPace())

const topPRs = computed(() => {
  const allPRs = []
  DEFAULT_EXERCISES.forEach(ex => {
    const pr = workoutStore.findPR(ex.id)
    if (pr) allPRs.push({ ...pr, name: ex.name, id: ex.id })
  })
  return allPRs.sort((a, b) => b.weight - a.weight).slice(0, 9)
})
</script>

<template>
  <div class="flex flex-col md:flex-row md:items-end justify-between gap-md mb-lg">
    <div>
      <h2 class="text-headline-md font-semibold text-on-surface">Insights</h2>
      <p class="text-on-surface-variant">Track your progression and peak metrics</p>
    </div>
  </div>

  <!-- PR Cards -->
  <div class="grid grid-cols-2 md:grid-cols-4 gap-md mb-lg">
    <div class="bg-surface-container-low border border-outline-variant/10 p-md rounded-xl">
      <p class="text-label-sm text-on-surface-variant tracking-widest uppercase mb-xs">Squat PR</p>
      <div class="flex items-baseline gap-xs">
        <span class="text-stat-lg font-bold text-primary-fixed">{{ squatPR?.weight ?? '—' }}</span>
        <span class="text-label-sm text-on-surface-variant">KG</span>
      </div>
      <div class="mt-sm flex items-center gap-xs text-xs font-bold" :class="squatPR ? 'text-primary-fixed' : 'text-on-surface-variant'">
        <template v-if="squatPR">
          <span class="material-symbols-outlined text-xs">check_circle</span>
          {{ squatPR.reps }} reps · {{ formatDate(squatPR.date) }}
        </template>
        <template v-else>
          <span class="material-symbols-outlined text-xs">horizontal_rule</span>
          Sin datos
        </template>
      </div>
    </div>

    <div class="bg-surface-container-low border border-outline-variant/10 p-md rounded-xl">
      <p class="text-label-sm text-on-surface-variant tracking-widest uppercase mb-xs">Bench PR</p>
      <div class="flex items-baseline gap-xs">
        <span class="text-stat-lg font-bold text-primary-fixed">{{ benchPR?.weight ?? '—' }}</span>
        <span class="text-label-sm text-on-surface-variant">KG</span>
      </div>
      <div class="mt-sm flex items-center gap-xs text-xs font-bold" :class="benchPR ? 'text-primary-fixed' : 'text-on-surface-variant'">
        <template v-if="benchPR">
          <span class="material-symbols-outlined text-xs">check_circle</span>
          {{ benchPR.reps }} reps · {{ formatDate(benchPR.date) }}
        </template>
        <template v-else>
          <span class="material-symbols-outlined text-xs">horizontal_rule</span>
          Sin datos
        </template>
      </div>
    </div>

    <div class="bg-surface-container-low border border-outline-variant/10 p-md rounded-xl">
      <p class="text-label-sm text-on-surface-variant tracking-widest uppercase mb-xs">Deadlift PR</p>
      <div class="flex items-baseline gap-xs">
        <span class="text-stat-lg font-bold text-primary-fixed">{{ deadliftPR?.weight ?? '—' }}</span>
        <span class="text-label-sm text-on-surface-variant">KG</span>
      </div>
      <div class="mt-sm flex items-center gap-xs text-xs font-bold" :class="deadliftPR ? 'text-primary-fixed' : 'text-on-surface-variant'">
        <template v-if="deadliftPR">
          <span class="material-symbols-outlined text-xs">check_circle</span>
          {{ deadliftPR.reps }} reps · {{ formatDate(deadliftPR.date) }}
        </template>
        <template v-else>
          <span class="material-symbols-outlined text-xs">horizontal_rule</span>
          Sin datos
        </template>
      </div>
    </div>

    <div class="bg-surface-container-low border border-outline-variant/10 p-md rounded-xl">
      <p class="text-label-sm text-on-surface-variant tracking-widest uppercase mb-xs">5K Pace</p>
      <div class="flex items-baseline gap-xs">
        <span class="text-stat-lg font-bold text-primary-fixed">{{ best5kPace ? formatPace(best5kPace.pace) : '—' }}</span>
      </div>
      <div class="mt-sm flex items-center gap-xs text-xs font-bold" :class="best5kPace ? 'text-primary-fixed' : 'text-on-surface-variant'">
        <template v-if="best5kPace">
          <span class="material-symbols-outlined text-xs">check_circle</span>
          {{ best5kPace.distance.toFixed(1) }} km · {{ formatDate(best5kPace.date) }}
        </template>
        <template v-else>
          <span class="material-symbols-outlined text-xs">horizontal_rule</span>
          Sin datos
        </template>
      </div>
    </div>
  </div>

  <!-- Charts -->
  <div class="grid lg:grid-cols-2 gap-lg">
    <div class="bg-surface-container border border-outline-variant/10 rounded-xl p-md">
      <div class="flex justify-between items-center mb-lg">
        <h3 class="text-headline-md font-semibold">Volumen Semanal</h3>
        <div class="flex items-center gap-xs text-xs text-on-surface-variant">
          <span class="w-3 h-3 rounded-full bg-primary-fixed"></span> Vol (kg)
        </div>
      </div>
      <div class="h-64">
        <VolumeChart :workouts="workoutStore.workouts" />
      </div>
    </div>
    <div class="bg-surface-container border border-outline-variant/10 rounded-xl p-md">
      <div class="flex justify-between items-center mb-lg">
        <h3 class="text-headline-md font-semibold">KM Semanales</h3>
        <span class="material-symbols-outlined text-on-surface-variant">info</span>
      </div>
      <div class="h-64">
        <RunningChart :runs="workoutStore.runs" />
      </div>
    </div>
  </div>

  <!-- PR List -->
  <div class="mt-lg">
    <h3 class="text-headline-md font-semibold text-primary mb-md">Récords Personales</h3>
    <div v-if="topPRs.length === 0" class="text-on-surface-variant text-label-sm">Aún no hay marcas</div>
    <div v-else class="grid md:grid-cols-3 gap-md">
      <div
        v-for="pr in topPRs"
        :key="pr.id"
        class="group bg-surface-container-low border border-outline-variant/10 p-md rounded-xl hover:border-primary-fixed/50 transition-colors cursor-pointer"
      >
        <div class="flex items-start justify-between mb-sm">
          <span class="material-symbols-outlined text-primary-fixed">fitness_center</span>
          <span class="text-xs text-on-surface-variant">{{ formatDate(pr.date) }}</span>
        </div>
        <h4 class="font-bold text-on-surface">{{ pr.name }}</h4>
        <p class="text-stat-lg font-bold text-primary-fixed mt-xs">{{ pr.weight }} <span class="text-label-sm text-on-surface-variant">KG</span></p>
        <p class="text-label-sm text-on-surface-variant">{{ pr.reps }} reps</p>
      </div>
    </div>
  </div>
</template>
