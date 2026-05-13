<script setup>
import { ref } from 'vue'
import { useTemplateStore } from '../../stores/templates'
import { DEFAULT_EXERCISES } from '../../lib/exercises'
import TemplateForm from './TemplateForm.vue'

const templateStore = useTemplateStore()
const showCreateForm = ref(false)
const emit = defineEmits(['close', 'select'])

function selectTemplate(template) {
  emit('select', template)
}

function createNew() {
  showCreateForm.value = true
}
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" @click.self="emit('close')">
    <div class="bg-surface-container border border-outline-variant/10 rounded-xl p-md w-full max-w-lg mx-4 max-h-[80vh] overflow-y-auto">
      <div class="flex items-center justify-between mb-md">
        <h3 class="text-headline-md font-semibold text-on-surface">Elegir plantilla</h3>
        <button @click="emit('close')" class="text-on-surface-variant hover:text-on-surface cursor-pointer">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>

      <div v-if="templateStore.templates.length === 0 && !showCreateForm" class="text-center py-lg">
        <p class="text-on-surface-variant text-body-md mb-md">Aún no tienes plantillas</p>
        <button @click="createNew" class="bg-primary-fixed text-on-primary-fixed px-md py-sm rounded-xl font-bold cursor-pointer">Crear primera plantilla</button>
      </div>

      <div v-if="showCreateForm">
        <TemplateForm @close="showCreateForm = false" @saved="showCreateForm = false" />
      </div>

      <div v-else-if="templateStore.templates.length > 0" class="space-y-sm">
        <button
          v-for="t in templateStore.templates"
          :key="t.id"
          @click="selectTemplate(t)"
          class="w-full text-left p-md rounded-xl bg-surface-container-low border border-white/5 hover:border-primary-fixed/40 transition-all cursor-pointer"
        >
          <div class="flex items-center gap-sm">
            <span class="material-symbols-outlined text-primary-fixed">fitness_center</span>
            <span class="text-body-md font-semibold text-on-surface">{{ t.name }}</span>
          </div>
          <p class="text-label-sm text-on-surface-variant mt-xs">{{ t.exercises?.length || 0 }} ejercicios</p>
        </button>

        <button @click="createNew" class="w-full py-md border-2 border-dashed border-white/10 rounded-xl text-on-surface-variant hover:border-primary-fixed/40 hover:text-on-surface transition-all cursor-pointer text-label-sm tracking-widest uppercase">
          + Crear nueva
        </button>
      </div>
    </div>
  </div>
</template>
