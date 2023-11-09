import { createRouter, createWebHashHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/HomeView.vue'),
      meta: { isLoading: true }
    },
    {
      path: '/user',
      meta: { isLoading: true },
      component: () => import('@/views/UserProfile.vue')
    },

    {
      path: '/login',
      meta: { isLoading: true },
      component: () => import('@/views/Login.vue')
    },
    {
      path: '/picture',
      meta: { isLoading: true },
      component: () => import('@/views/Pictrue.vue')
    },
    // {
    //   path: '/konva',
    //   component: () => import('@/views/Konva.vue')
    // },
    {
      path: '/me',
      meta: { isLoading: true },
      component: () => import('@/views/MyIntroduction.vue')
    },
    {
      path: '/chat',
      meta: { isLoading: true },
      component: () => import('@/views/ChatAI.vue')
    },
    {
      path: '/ppt',
      meta: { isLoading: true },
      component: () => import('@/views/PPT.vue')
    },
    {
      path: '/study',
      meta: { isLoading: true },
      component: () => import('@/views/StudyAssets.vue'),
      children: [
        {
          path: 'heartFailure',
          component: () => import('@/components/study/heartFailure.vue')
        },
        {
          path: 'allFile',
          component: () => import('@/components/study/allFile.vue')
        },
        {
          path: 'iframe',
          component: () => import('@/components/study/iframe.vue')
        }
      ]
    }
  ]
})

// 添加路由守卫
router.beforeEach((to, from, next) => {
  if (to.meta.isLoading) {
    const louder = document.createElement('div')
    louder.className = 'loadingMask'
    document.body.insertBefore(louder, document.body.firstChild)
    const loaderMask = document.createElement('div')
    loaderMask.className = 'loaderMask'
    louder.appendChild(loaderMask)

    const loaders = document.createElement('span')
    loaders.className = 'loader'
    loaderMask.appendChild(loaders)
    next()
  }
})

// 路由跳转后
router.afterEach((to) => {
  if (to.meta.isLoading) {
    const louder = document.querySelector('.loadingMask')
    louder.remove()
  }
})

export default router
