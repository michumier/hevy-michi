import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '../lib/supabase'

export const useTemplateStore = defineStore('templates', () => {
  const templates = ref([])
  const loaded = ref(false)

  async function loadAll() {
    const { data } = await supabase
      .from('workout_templates')
      .select('*, template_exercises(*)')
      .order('created_at', { ascending: false })
      .order('sort_order', { foreignTable: 'template_exercises' })

    templates.value = (data || []).map(t => ({
      id: t.id,
      name: t.name,
      notes: t.notes || '',
      createdAt: new Date(t.created_at).getTime(),
      exercises: (t.template_exercises || [])
        .sort((a, b) => a.sort_order - b.sort_order)
        .map(te => ({
          exerciseId: te.exercise_id
        }))
    }))

    loaded.value = true
  }

  async function addTemplate(template) {
    const { data, error } = await supabase.from('workout_templates').insert({
      name: template.name,
      notes: template.notes || '',
      template_exercises: (template.exercises || []).map((ex, i) => ({
        exercise_id: ex.exerciseId,
        sort_order: i
      }))
    }).select('*, template_exercises(*)')

    if (error) throw error
    await loadAll()
  }

  async function deleteTemplate(id) {
    await supabase.from('workout_templates').delete().eq('id', id)
    templates.value = templates.value.filter(t => t.id !== id)
  }

  function getTemplateById(id) {
    return templates.value.find(t => t.id === id)
  }

  return { templates, loaded, loadAll, addTemplate, deleteTemplate, getTemplateById }
})
