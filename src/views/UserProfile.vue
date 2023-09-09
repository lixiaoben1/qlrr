<script setup>
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { gsap } from 'gsap'
import { onMounted } from 'vue'

const useStore = useUserStore()
const router = useRouter()

onMounted(() => {
  gsap.from('.avatar div', {
    duration: 1,
    y: -80,
    ease: 'power3.out',
    opacity: 0,
    // delay: 0.2,
    stagger: 0.1
  })
})
const removeLogin = () => {
  useStore.removeToken()
  router.push('/')
}
</script>

<template>
  <div class="avatar">
    <div style="margin-left: 50%; transform: translate(-50%, 50%); text-align: center">
      <el-avatar
        :size="200"
        src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/1455840/8c10a476093ee953800c50d3252dfa07ca77cbdf.jpg"
      />
      <div style="font-size: 25px; margin-top: 40px">用户：{{ useStore.token.username }}</div>
      <div
        @click="removeLogin"
        style="
          /*width: 150px;*/
          height: 50px;
          line-height: 50px;
          font-size: 25px;
          margin-top: 40px;
          cursor: pointer;
          border-radius: 15px;
          background-color: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(2px);
        "
      >
        退出登陆
      </div>
    </div>
  </div>
</template>

<style scoped>
.avatar {
  width: 100%;
  height: 900px;
  background-image: url('@/assets/picture/hero-bg.jpg');
  background-size: cover;
  position: relative;
  animation: background 8s infinite alternate linear;
}
</style>
