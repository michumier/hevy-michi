<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTemplateStore } from '../../stores/templates'
import TemplatePicker from '../templates/TemplatePicker.vue'

const router = useRouter()
const templateStore = useTemplateStore()
const emit = defineEmits(['close'])

const showTemplatePicker = ref(false)

function openTemplates() {
  showTemplatePicker.value = true
}
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/70 backdrop-blur-sm" @click.self="emit('close')">
    <div class="bg-surface-container border border-white/5 rounded-t-2xl md:rounded-2xl p-lg w-full max-w-sm mx-auto shadow-2xl shadow-black/50">
      <!-- Handle -->
      <div class="flex justify-center mb-lg -mt-xs">
        <div class="w-10 h-1 rounded-full bg-surface-container-highest"></div>
      </div>

      <div class="flex items-center justify-between mb-lg">
        <h3 class="text-display-lg font-bold text-primary-fixed tracking-tight">Quick Log</h3>
        <button @click="emit('close')" class="w-10 h-10 rounded-xl bg-surface-container-highest flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-all cursor-pointer">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>

      <p class="text-body-md text-on-surface-variant mb-lg">¿Qué quieres registrar?</p>

      <div class="space-y-sm">
        <button
          @click="openTemplates"
          class="w-full p-lg rounded-xl glass-card flex items-center gap-md hover:border-primary-fixed/40 transition-all cursor-pointer text-left group"
        >
          <div class="w-14 h-14 rounded-xl bg-surface-container-highest flex items-center justify-center text-primary-fixed group-hover:bg-primary-fixed/10 transition-colors shrink-0">
            <span class="material-symbols-outlined text-3xl">fitness_center</span>
          </div>
          <div>
            <p class="text-body-lg font-bold text-on-surface">Entreno de gym</p>
            <p class="text-label-sm text-on-surface-variant">Desde plantilla o vacío</p>
          </div>
          <span class="material-symbols-outlined text-on-surface-variant ml-auto">chevron_right</span>
        </button>

        <router-link
          to="/training"
          @click="emit('close')"
          class="w-full p-lg rounded-xl glass-card flex items-center gap-md hover:border-primary-fixed/40 transition-all cursor-pointer text-left group"
        >
          <div class="w-14 h-14 rounded-xl bg-surface-container-highest flex items-center justify-center text-primary-fixed group-hover:bg-primary-fixed/10 transition-colors shrink-0">
            <span class="material-symbols-outlined text-3xl">directions_run</span>
          </div>
          <div>
            <p class="text-body-lg font-bold text-on-surface">Carrera</p>
            <p class="text-label-sm text-on-surface-variant">Registrar running</p>
          </div>
          <span class="material-symbols-outlined text-on-surface-variant ml-auto">chevron_right</span>
        </router-link>
      </div>
    </div>
  </div>

  <TemplatePicker v-if="showTemplatePicker" @close="showTemplatePicker = false" @select="() => { emit('close'); router.push('/training') }" />
</template>
