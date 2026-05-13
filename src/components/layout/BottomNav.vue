<script setup>
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const navItems = [
  { path: '/', label: 'Dashboard', icon: 'dashboard' },
  { path: '/training', label: 'Workouts', icon: 'fitness_center' },
  { path: '/insights', label: 'Analytics', icon: 'monitoring' },
  { path: '/body', label: 'Weight', icon: 'scale' },
]

const emit = defineEmits(['quickLog'])

function isActive(path) {
  return route.path === path
}
</script>

<template>
  <nav class="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-2 pb-safe bg-surface-container-low border-t border-outline-variant/10">
    <router-link
      v-for="item in navItems"
      :key="item.path"
      :to="item.path"
      class="flex flex-col items-center justify-center px-4 py-2 rounded-xl transition-all active:scale-90 duration-150"
      :class="isActive(item.path)
        ? 'text-primary-fixed bg-primary-container/10'
        : 'text-on-surface-variant hover:bg-surface-container-high'"
    >
      <span
        class="material-symbols-outlined"
        :class="{ 'icon-filled': isActive(item.path) }"
      >{{ item.icon }}</span>
      <span class="text-label-sm">{{ item.label }}</span>
    </router-link>

    <div class="w-14"></div>
  </nav>

  <button
    @click="emit('quickLog')"
    class="md:hidden fixed right-6 bottom-24 w-14 h-14 bg-primary-container text-on-primary-container rounded-full shadow-lg flex items-center justify-center active:scale-90 duration-150 z-40 cursor-pointer"
  >
    <span class="material-symbols-outlined text-3xl">add</span>
  </button>
</template>

<style scoped>
.icon-filled {
  font-variation-settings: 'FILL' 1;
}
</style>
