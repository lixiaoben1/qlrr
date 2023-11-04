<script setup>
import { useChatStore } from '@/stores/user'
const chatStore = useChatStore()

function removeChat() {
  chatStore.setChatList([
    {
      id: 1,
      type: 'SendContent',
      content: '小明你干嘛哈哈哎呦'
    },
    {
      id: 2,
      type: 'GetContent',
      content: '你好'
    }
  ])
  location.reload()
}
</script>

<template>
  <div class="container">
    <div class="logo">QLRR</div>
    <div @click="removeChat" class="button">清空</div>
  </div>
</template>

<style scoped>
.container {
  position: fixed;
  z-index: 2;
  width: 100vw;
  height: 60px;
  backdrop-filter: blur(4px);
  background-color: rgba(255, 255, 255, 0.8);
}
.button {
  width: 40px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 5vw;
  background-color: rgba(140, 139, 139, 0.19);
  border-radius: 50%;
  box-shadow: inset 1px 1px 2px white;
  cursor: pointer;
}
@keyframes logo {
  from {
    background-position-x: 0;
  }
  to {
    background-position-x: 101px;
  }
}
.logo {
  font-size: 25px;
  padding: 0 15px;
  font-family: 'Microsoft YaHei', 'alimama', serif;
  font-weight: bold;
  line-height: 50px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-image: linear-gradient(to right, orange, purple, orange);
  background-clip: text;
  background-position-x: 0;
  -webkit-background-clip: text;
  color: transparent;
  user-select: none;
  animation: logo 3s linear infinite;
}
</style>
