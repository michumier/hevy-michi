<script setup>
import { computed } from 'vue'

const props = defineProps({
  pct: { type: Number, default: 0 }
})

const circumference = 2 * Math.PI * 80
const offset = computed(() => circumference - (props.pct / 100) * circumference)
</script>

<template>
  <div class="relative w-48 h-48">
    <svg class="w-full h-full transform -rotate-90" viewBox="0 0 192 192">
      <circle cx="96" cy="96" r="80" fill="transparent" stroke="#353534" stroke-width="12" />
      <circle
        cx="96" cy="96" r="80"
        fill="transparent"
        stroke="#c3f400"
        stroke-width="12"
        stroke-linecap="round"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="offset"
        class="transition-all duration-500"
      />
    </svg>
    <div class="absolute inset-0 flex flex-col items-center justify-center text-center">
      <span class="text-stat-lg font-bold text-primary-fixed tracking-tight">{{ pct }}%</span>
      <span class="text-label-sm text-on-surface-variant tracking-widest">DEL OBJETIVO</span>
    </div>
  </div>
</template>
