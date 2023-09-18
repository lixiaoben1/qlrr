import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/user',
      component: () => import('@/views/UserProfile.vue')
    },
    {
      path: '/introduction',
      component: () => import('@/views/introduction.vue')
    },
    {
      path: '/login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/Login.vue')
    },
    {
      path: '/picture',
      component: () => import('@/views/Pictrue.vue')
    }
    // {
    //   path: '/konva',
    //   component: () => import('@/views/Konva.vue')
    // },
  ]
})

export default router
