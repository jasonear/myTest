import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/research',
    name: 'Research',
    component: () => import('../views/ResearchView.vue')
  },
  {
    path: '/planning',
    name: 'Planning',
    component: () => import('../views/PlanningView.vue')
  },
  {
    path: '/review',
    name: 'Review',
    component: () => import('../views/ReviewView.vue')
  },
  {
    path: '/evaluation',
    name: 'Evaluation',
    component: () => import('../views/EvaluationView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
