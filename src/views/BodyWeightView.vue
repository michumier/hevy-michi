<script setup>
import { ref, computed } from 'vue'
import { useBodyWeightStore } from '../stores/bodyWeight'
import { formatDate } from '../lib/helpers'
import WeightChart from '../components/body/WeightChart.vue'

const bodyStore = useBodyWeightStore()
const weightInput = ref('')

async function submitWeight() {
  const w = parseFloat(weightInput.value)
  if (!w || w <= 0) return
  await bodyStore.addWeight(w)
  weightInput.value = ''
}

async function deleteWeight(id) {
  if (confirm('¿Eliminar este registro?')) {
    await bodyStore.deleteWeight(id)
  }
}

const history = computed(() => bodyStore.weights.slice(0, 20))
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-md">
    <!-- Weight Chart -->
    <div class="md:col-span-2 glass-card rounded-xl p-md md:p-lg flex flex-col">
      <div class="flex justify-between items-start mb-lg">
        <div>
          <p class="text-label-sm text-on-surface-variant tracking-wider uppercase mb-xs">Weight Trend</p>
          <h3 class="text-stat-lg font-bold text-primary">
            {{ bodyStore.currentWeight ?? '—' }}
            <span class="text-body-md font-normal text-on-surface-variant">kg</span>
          </h3>
        </div>
        <div class="bg-primary-container/10 px-sm py-xs rounded-lg flex items-center gap-xs">
          <span v-if="bodyStore.trend.direction === 'flat'" class="material-symbols-outlined text-primary-fixed text-sm">trending_flat</span>
          <span v-else-if="bodyStore.trend.direction === 'down'" class="material-symbols-outlined text-sm" style="color:#4ade80">trending_down</span>
          <span v-else class="material-symbols-outlined text-sm" style="color:#f87171">trending_up</span>
          <span class="text-label-sm" :class="bodyStore.trend.direction === 'flat' ? 'text-primary-fixed' : bodyStore.trend.direction === 'down' ? 'text-green-400' : 'text-red-400'">
            {{ bodyStore.trend.label }}
          </span>
        </div>
      </div>
      <div class="flex-1 min-h-[240px] w-full relative">
        <WeightChart :weights="bodyStore.weights" />
      </div>
    </div>

    <!-- Input & Goal -->
    <div class="space-y-md">
      <div class="glass-card rounded-xl p-md">
        <label class="text-label-sm text-on-surface-variant tracking-wider uppercase mb-base block">Registrar peso de hoy</label>
        <form @submit.prevent="submitWeight">
          <div class="flex gap-base">
            <div class="relative flex-1">
              <input
                v-model="weightInput"
                type="number"
                step="0.1"
                placeholder="00.0"
                class="w-full bg-surface-container-lowest border border-outline-variant/20 rounded-lg px-md py-md text-stat-lg font-bold text-primary-fixed focus:ring-1 focus:ring-primary-fixed focus:border-primary-fixed outline-none transition-all placeholder:text-on-surface-variant/30"
              >
              <span class="absolute right-md top-1/2 -translate-y-1/2 text-body-md text-on-surface-variant">kg</span>
            </div>
            <button type="submit" class="bg-primary-fixed text-on-primary-fixed px-md rounded-lg font-bold hover:scale-95 transition-transform flex items-center justify-center cursor-pointer">
              <span class="material-symbols-outlined">add</span>
            </button>
          </div>
        </form>
      </div>

      <div class="glass-card rounded-xl p-md flex flex-col justify-between min-h-[160px] relative overflow-hidden">
        <div>
          <p class="text-label-sm text-on-surface-variant tracking-wider uppercase mb-xs">Objetivo</p>
          <h4 class="text-headline-md font-semibold text-on-surface">{{ bodyStore.goalProgress.goalWeight }}.0 kg</h4>
        </div>
        <div class="space-y-xs">
          <div class="flex justify-between text-label-sm text-on-surface-variant">
            <span>Progreso</span>
            <span>{{ bodyStore.goalProgress.pct }}%</span>
          </div>
          <div class="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden">
            <div class="h-full bg-primary-fixed transition-all" :style="{ width: bodyStore.goalProgress.pct + '%' }"></div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- History table -->
  <div class="mt-lg space-y-md">
    <h3 class="text-headline-md font-semibold text-on-surface px-xs">Registros Recientes</h3>
    <div class="glass-card rounded-xl overflow-hidden">
      <div v-if="history.length === 0" class="p-md text-center text-on-surface-variant text-label-sm">Sin registros</div>
      <table v-else class="w-full text-left border-collapse">
        <thead>
          <tr class="border-b border-outline-variant/10">
            <th class="px-md py-md text-label-sm text-on-surface-variant tracking-widest uppercase">Fecha</th>
            <th class="px-md py-md text-label-sm text-on-surface-variant tracking-widest uppercase">Peso</th>
            <th class="px-md py-md text-label-sm text-on-surface-variant tracking-widest uppercase">Diferencia</th>
            <th class="px-md py-md text-label-sm text-on-surface-variant tracking-widest uppercase text-right">Acción</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-outline-variant/10">
          <tr v-for="(w, i) in history" :key="w.id" class="hover:bg-surface-container-high transition-colors">
            <td class="px-md py-md text-body-md text-on-surface">{{ formatDate(w.date) }}</td>
            <td class="px-md py-md text-body-md font-bold text-primary-fixed">{{ w.weight }} kg</td>
            <td class="px-md py-md text-body-md" :class="{
              'text-red-400': i < history.length - 1 && w.weight > history[i + 1].weight,
              'text-green-400': i < history.length - 1 && w.weight < history[i + 1].weight,
              'text-on-surface-variant': i >= history.length - 1 || w.weight === history[i + 1]?.weight
            }">
              {{ i < history.length - 1 ? (w.weight - history[i + 1].weight > 0 ? '+' : '') + (w.weight - history[i + 1].weight).toFixed(1) + ' kg' : '—' }}
            </td>
            <td class="px-md py-md text-right">
              <button @click="deleteWeight(w.id)" class="material-symbols-outlined text-on-surface-variant hover:text-error transition-colors cursor-pointer">delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
