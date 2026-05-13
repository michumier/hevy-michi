import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import TrainingView from '../views/TrainingView.vue'
import InsightsView from '../views/InsightsView.vue'
import BodyWeightView from '../views/BodyWeightView.vue'

const routes = [
  { path: '/', name: 'dashboard', component: DashboardView, meta: { title: 'Dashboard', icon: 'grid_view' } },
  { path: '/training', name: 'training', component: TrainingView, meta: { title: 'Training', icon: 'exercise' } },
  { path: '/insights', name: 'insights', component: InsightsView, meta: { title: 'Insights', icon: 'bar_chart' } },
  { path: '/body', name: 'body', component: BodyWeightView, meta: { title: 'Body', icon: 'monitor_weight' } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
