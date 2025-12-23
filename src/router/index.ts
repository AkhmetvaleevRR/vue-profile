import { createRouter, createWebHistory } from 'vue-router'
import DndResume from '../views/DndResume.vue'
import VirtualKeyboardAuth from '../views/VirtualKeyboardAuth.vue'
import ProductPage from '../views/ProductPage.vue'
import Bestiary from '../views/Bestiary.vue'
import Holocard from '../views/HoloCard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: DndResume,
    },
    {
      path: '/auth',
      name: 'auth',
      component: VirtualKeyboardAuth,
    },
    {
      path: '/product',
      name: 'product',
      component: ProductPage,
    },
    {
      path: '/bestiary',
      name: 'bestiary',
      component: Bestiary,
    },
    {
      path: '/holocard',
      name: 'holoCard',
      component: Holocard,
    },
  ],
})

export default router
