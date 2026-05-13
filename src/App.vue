<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useWorkoutStore } from './stores/workouts'
import { useTemplateStore } from './stores/templates'
import { useBodyWeightStore } from './stores/bodyWeight'
import Sidebar from './components/layout/Sidebar.vue'
import BottomNav from './components/layout/BottomNav.vue'
import TopBar from './components/layout/TopBar.vue'
import QuickLogModal from './components/workouts/QuickLogModal.vue'

const route = useRoute()
const showQuickLog = ref(false)
const loading = ref(true)

const workoutStore = useWorkoutStore()
const templateStore = useTemplateStore()
const bodyStore = useBodyWeightStore()

const pageTitle = computed(() => route.meta?.title || '')

onMounted(async () => {
  await Promise.all([
    workoutStore.loadAll(),
    templateStore.loadAll(),
    bodyStore.loadAll()
  ])
  loading.value = false
})
</script>

<template>
  <div class="flex min-h-screen bg-[#131313]">
    <Sidebar @quick-log="showQuickLog = true" />

    <main class="flex-1 lg:ml-64 pb-32 lg:pb-0">
      <TopBar :title="pageTitle" @quick-log="showQuickLog = true" />

      <div class="max-w-7xl mx-auto px-container-margin py-lg">
        <div v-if="loading" class="flex items-center justify-center py-24">
          <span class="material-symbols-outlined text-primary-fixed text-4xl animate-spin">sync</span>
        </div>
        <router-view v-else v-slot="{ Component, route: r }">
          <component :is="Component" :key="r.fullPath" />
        </router-view>
      </div>
    </main>

    <BottomNav @quick-log="showQuickLog = true" />

    <QuickLogModal v-if="showQuickLog" @close="showQuickLog = false" />
  </div>
</template>


