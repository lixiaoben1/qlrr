<script setup>
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'

const useStore = useUserStore()
const router = useRouter()

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
      <div @click="removeLogin" style="font-size: 25px; margin-top: 40px; cursor: pointer">
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
