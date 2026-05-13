<script setup>
import { computed } from 'vue'

const props = defineProps({
  workouts: { type: Array, default: () => [] },
  runs: { type: Array, default: () => [] },
  weekStart: { type: Date, required: true }
})

const dayLabels = ['L', 'M', 'M', 'J', 'V', 'S', 'D']

const dayCounts = computed(() => {
  const counts = [0, 0, 0, 0, 0, 0, 0]

  props.workouts.forEach(w => {
    const d = new Date(w.date + 'T12:00:00')
    if (d >= props.weekStart) {
      const day = d.getDay()
      const idx = day === 0 ? 6 : day - 1
      counts[idx]++
    }
  })
  props.runs.forEach(r => {
    const d = new Date(r.date + 'T12:00:00')
    if (d >= props.weekStart) {
      const day = d.getDay()
      const idx = day === 0 ? 6 : day - 1
      counts[idx]++
    }
  })

  return counts
})

const maxVal = computed(() => Math.max(...dayCounts.value, 1))

function barHeight(count) {
  const h = (count / maxVal.value) * 100
  return count > 0 ? `${Math.max(h, 8)}%` : '4px'
}
</script>

<template>
  <div class="flex items-end justify-between h-48 gap-base">
    <div v-for="(count, i) in dayCounts" :key="i" class="flex-1 flex flex-col items-center gap-sm">
      <div class="w-full bg-primary-fixed/20 rounded-t-lg relative h-full min-h-[4px] overflow-hidden">
        <div
          class="absolute bottom-0 w-full rounded-t-lg transition-all duration-300"
          :class="i === 6 ? 'bg-surface-container-highest' : 'bg-primary-fixed'"
          :style="{ height: barHeight(count) }"
        ></div>
      </div>
      <span class="text-label-sm text-on-surface-variant">{{ dayLabels[i] }}</span>
    </div>
  </div>
</template>
