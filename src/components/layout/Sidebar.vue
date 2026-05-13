<script setup>
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const navItems = [
  { path: '/', name: 'dashboard', label: 'Dashboard', icon: 'grid_view' },
  { path: '/training', name: 'training', label: 'Training', icon: 'exercise' },
  { path: '/insights', name: 'insights', label: 'Insights', icon: 'bar_chart' },
  { path: '/body', name: 'body', label: 'Body', icon: 'monitor_weight' },
]

const emit = defineEmits(['quickLog'])

function isActive(path) {
  return route.path === path
}
</script>

<template>
  <aside class="hidden lg:flex flex-col h-screen fixed left-0 w-64 bg-surface-container-low border-r border-outline-variant/10 py-md px-base z-50">
    <div class="mb-xl px-sm">
      <h1 class="text-display-lg font-black text-primary-fixed tracking-tight">Hevy Michi</h1>
      <p class="text-label-sm text-on-surface-variant opacity-70 tracking-widest uppercase">Fitness Tracker</p>
    </div>

    <nav class="flex-1 space-y-xs">
      <router-link
        v-for="item in navItems"
        :key="item.name"
        :to="item.path"
        class="flex items-center gap-md px-md py-sm rounded-xl transition-all"
        :class="isActive(item.path)
          ? 'text-primary-fixed font-bold border-r-2 border-primary-fixed bg-primary-container/5'
          : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'"
      >
        <span class="material-symbols-outlined">{{ item.icon }}</span>
        <span class="text-body-md">{{ item.label }}</span>
      </router-link>
    </nav>

    <div class="mt-auto px-sm pb-md">
      <button
        @click="emit('quickLog')"
        class="w-full bg-primary-container text-on-primary-container font-bold py-md rounded-xl flex items-center justify-center gap-base active:scale-95 duration-100 cursor-pointer"
      >
        <span class="material-symbols-outlined">add</span>
        <span>Quick Log</span>
      </button>
    </div>
  </aside>
</template>
