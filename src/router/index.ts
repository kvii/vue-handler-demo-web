import { createRouter, createWebHistory } from 'vue-router'
import PageA from '../views/PageA.vue' // “解决” _plugin-vue_export-helper.js bug

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'a',
      component: PageA
    },
    {
      path: '/b',
      name: 'b',
      component: () => import('../views/PageB.vue'),
    }
  ]
})

export default router
