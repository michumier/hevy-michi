<script setup>
import { watch, onMounted, ref } from 'vue'
import { formatDate } from '../../lib/helpers'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

const props = defineProps({
  weights: { type: Array, default: () => [] }
})

const canvasRef = ref(null)
let chart = null

function buildChart() {
  if (!canvasRef.value) return

  if (chart) chart.destroy()

  const sorted = [...props.weights].reverse()
  if (sorted.length < 2) {
    const ctx = canvasRef.value.getContext('2d')
    ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height)
    return
  }

  const labels = sorted.map(w => formatDate(w.date))
  const data = sorted.map(w => w.weight)

  const ctx = canvasRef.value.getContext('2d')
  const gradient = ctx.createLinearGradient(0, 0, 0, 300)
  gradient.addColorStop(0, 'rgba(195, 244, 0, 0.3)')
  gradient.addColorStop(1, 'rgba(195, 244, 0, 0)')

  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Peso (kg)',
        data,
        borderColor: '#c3f400',
        backgroundColor: gradient,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#c3f400',
        pointBorderColor: '#131313',
        pointBorderWidth: 2,
        pointRadius: 4,
        borderWidth: 3,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#888' } },
        x: { grid: { display: false }, ticks: { color: '#888', maxTicksLimit: 6 } }
      }
    }
  })
}

watch(() => props.weights, buildChart, { deep: true })
onMounted(buildChart)
</script>

<template>
  <canvas ref="canvasRef"></canvas>
</template>
