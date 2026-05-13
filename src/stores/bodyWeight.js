import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { supabase } from '../lib/supabase'

const GOAL_WEIGHT = 75

export const useBodyWeightStore = defineStore('bodyWeight', () => {
  const weights = ref([])
  const loaded = ref(false)

  async function loadAll() {
    const { data } = await supabase
      .from('body_weights')
      .select('*')
      .order('date', { ascending: false })

    weights.value = (data || []).map(w => ({
      ...w,
      createdAt: new Date(w.created_at).getTime()
    }))

    loaded.value = true
  }

  async function addWeight(weight, date) {
    const { data, error } = await supabase.from('body_weights').insert({
      weight,
      date: date || new Date().toISOString().split('T')[0]
    }).select().single()

    if (error) throw error
    weights.value.unshift({ ...data, createdAt: Date.now() })
  }

  async function deleteWeight(id) {
    await supabase.from('body_weights').delete().eq('id', id)
    weights.value = weights.value.filter(w => w.id !== id)
  }

  const currentWeight = computed(() => weights.value[0]?.weight ?? null)

  const goalProgress = computed(() => {
    if (weights.value.length < 2) return { pct: 0, startWeight: null, latestWeight: null, goalWeight: GOAL_WEIGHT }
    const latest = weights.value[0].weight
    const start = weights.value[weights.value.length - 1].weight
    const totalChange = start - GOAL_WEIGHT
    const currentChange = start - latest
    const pct = totalChange > 0 ? Math.min(100, Math.max(0, (currentChange / totalChange) * 100)) : 0
    return { pct: Math.round(pct), startWeight: start, latestWeight: latest, goalWeight: GOAL_WEIGHT }
  })

  const trend = computed(() => {
    if (weights.value.length < 2) return { label: 'Sin datos', direction: 'flat', diff: 0 }
    const diff = weights.value[0].weight - weights.value[weights.value.length - 1].weight
    if (Math.abs(diff) < 0.1) return { label: 'Estable', direction: 'flat', diff: 0 }
    return {
      label: `${diff > 0 ? '+' : ''}${diff.toFixed(1)} kg`,
      direction: diff > 0 ? 'up' : 'down',
      diff
    }
  })

  return {
    weights, loaded, currentWeight, goalProgress, trend,
    loadAll, addWeight, deleteWeight
  }
})
