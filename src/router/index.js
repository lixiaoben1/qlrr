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
      path: '/login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/Login.vue')
    },
    {
      path: '/picture',
      component: () => import('@/views/Pictrue.vue')
    },
    // {
    //   path: '/konva',
    //   component: () => import('@/views/Konva.vue')
    // },
    {
      path: '/me',
      component: () => import('@/views/MyIntroduction.vue')
    },
    {
      path: '/chat',
      component: () => import('@/views/ChatAI.vue')
    },
    {
      path: '/ppt',
      component: () => import('@/views/PPT.vue')
    },
    {
      path: '/study',
      component: () => import('@/views/StudyAssets.vue')
    }
    // {
    //   path: '/demo',
    //   component: () => import('@/views/demo.vue')
    // }
    // {
    //   path: '/konva',
    //   component: () => import('@/views/Konva.vue')
    // },
  ]
})

export default router
