<script setup>
import { watch, onMounted, ref } from 'vue'
import { getWeekLabel } from '../../lib/helpers'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

const props = defineProps({
  runs: { type: Array, default: () => [] }
})

const canvasRef = ref(null)
let chart = null

function buildChart() {
  if (!canvasRef.value) return

  const weeklyData = {}
  props.runs.forEach(r => {
    const label = getWeekLabel(r.date)
    if (!weeklyData[label]) weeklyData[label] = 0
    weeklyData[label] += r.distance
  })

  const labels = Object.keys(weeklyData).sort()
  const data = labels.map(l => weeklyData[l])

  if (chart) chart.destroy()

  if (labels.length === 0) return

  const ctx = canvasRef.value.getContext('2d')
  const gradient = ctx.createLinearGradient(0, 0, 0, 300)
  gradient.addColorStop(0, '#4ade80')
  gradient.addColorStop(1, '#22c55e')

  chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'KM',
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

watch(() => props.runs, buildChart, { deep: true })
onMounted(buildChart)
</script>

<template>
  <canvas ref="canvasRef"></canvas>
</template>
