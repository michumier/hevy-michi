<script setup>
import { computed } from 'vue'
import { useWorkoutStore } from '../stores/workouts'
import { getWeekNumber } from '../lib/helpers'
import ProgressRing from '../components/dashboard/ProgressRing.vue'
import ActivityBarChart from '../components/dashboard/ActivityBarChart.vue'
import RecentActivity from '../components/dashboard/RecentActivity.vue'

const workoutStore = useWorkoutStore()

const now = new Date()
const weekStart = new Date(now)
weekStart.setDate(now.getDate() - now.getDay())
weekStart.setHours(0, 0, 0, 0)

const weeklyWorkouts = computed(() =>
  workoutStore.workouts.filter(w => new Date(w.date) >= weekStart).length
)

const weeklyKm = computed(() =>
  workoutStore.runs
    .filter(r => new Date(r.date) >= weekStart)
    .reduce((sum, r) => sum + r.distance, 0)
)

const goal = 5
const progressPct = computed(() => Math.min(100, Math.round((weeklyWorkouts.value / goal) * 100)))
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-12 gap-md">
    <!-- Progress Ring -->
    <div class="md:col-span-4 glass-card p-lg rounded-xl flex flex-col items-center justify-center min-h-[320px]">
      <ProgressRing :pct="progressPct" />

      <div class="grid grid-cols-2 gap-xl mt-lg w-full">
        <div class="text-center">
          <p class="text-label-sm text-on-surface-variant tracking-widest uppercase">Entrenos</p>
          <p class="text-headline-md font-semibold text-primary">{{ weeklyWorkouts }}</p>
        </div>
        <div class="text-center">
          <p class="text-label-sm text-on-surface-variant tracking-widest uppercase">KM run</p>
          <p class="text-headline-md font-semibold text-primary">{{ weeklyKm.toFixed(1) }}</p>
        </div>
      </div>
    </div>

    <!-- Weekly Activity -->
    <div class="md:col-span-8 glass-card p-lg rounded-xl">
      <div class="flex justify-between items-center mb-lg">
        <h3 class="text-headline-md font-semibold text-primary">Resumen Semanal</h3>
        <span class="px-sm py-xs bg-surface-container-high rounded text-label-sm text-on-surface-variant">Esta semana</span>
      </div>
      <ActivityBarChart :workouts="workoutStore.workouts" :runs="workoutStore.runs" :week-start="weekStart" />
    </div>

    <!-- Recent Activity -->
    <div class="md:col-span-12 mt-md">
      <div class="flex justify-between items-center mb-md">
        <h3 class="text-headline-md font-semibold text-primary">Última actividad</h3>
        <router-link to="/training" class="text-primary-fixed text-label-sm hover:underline">VER TODO</router-link>
      </div>
      <RecentActivity :activities="workoutStore.recentActivity" />
    </div>
  </div>
</template>
