import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomePage.vue'
import Cal from '../views/CalPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/cal',
      name: 'cal',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Cal,
    },
  ],
})

export default router
