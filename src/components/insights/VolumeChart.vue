<script setup>
import { computed, watch, onMounted, ref } from 'vue'
import { getWeekLabel } from '../../lib/helpers'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

const props = defineProps({
  workouts: { type: Array, default: () => [] }
})

const canvasRef = ref(null)
let chart = null

function buildChart() {
  if (!canvasRef.value) return

  const weeklyData = {}
  props.workouts.forEach(w => {
    const label = getWeekLabel(w.date)
    if (!weeklyData[label]) weeklyData[label] = 0
    w.exercises?.forEach(ex => {
      ex.sets?.forEach(set => {
        weeklyData[label] += (set.weight || 0) * (set.reps || 0)
      })
    })
  })

  const labels = Object.keys(weeklyData).sort()
  const data = labels.map(l => weeklyData[l])

  if (chart) chart.destroy()

  if (labels.length === 0) return

  const ctx = canvasRef.value.getContext('2d')
  const gradient = ctx.createLinearGradient(0, 0, 0, 300)
  gradient.addColorStop(0, '#c3f400')
  gradient.addColorStop(1, '#abd600')

  chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Volumen (kg)',
        data,
        backgroundColor: gradient,
        borderRadius: 4,
        borderSkipped: false,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#888' } },
        x: { grid: { display: false }, ticks: { color: '#888' } }
      }
    }
  })
}

watch(() => props.workouts, buildChart, { deep: true })
onMounted(buildChart)
</script>

<template>
  <canvas ref="canvasRef"></canvas>
</template>
