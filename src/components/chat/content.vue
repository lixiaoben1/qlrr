<script setup>
import { ref, onUpdated, onMounted } from 'vue'
import { useChatStore } from '@/stores/user'

const chatStore = useChatStore()

if (!chatStore.chatList) {
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
}
const chatData = ref(chatStore.chatList)
function scrollToBottom() {
  const chatBox = document.querySelector('.content')
  chatBox.scrollTop = chatBox.scrollHeight
}
onMounted(() => {
  scrollToBottom()
})
//设置响应后自动滚到底部
onUpdated(() => {
  scrollToBottom()
})
</script>

<template>
  <div class="container">
    <div class="content">
      <ul class="contentBox">
        <li v-for="item in chatData" :key="item.id">
          <div :class="item.type">{{ item.content }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100vw;
}

.content {
  width: 100vw;
  height: 100vh;
  border: rgba(255, 255, 255, 0) 1px solid;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: #eeeeee;
  margin: 0 auto;
}
.contentBox {
  width: 100vw;
  display: flex;
  margin-top: 80px;
  flex-direction: column;
  align-content: space-between;
}

.SendContent {
  width: fit-content;
  max-width: 50vw;
  height: fit-content;
  word-wrap: break-word;
  box-sizing: border-box;
  padding: 0 10px;
  line-height: 40px;
  float: right;
  right: 6vw;
  margin-top: 15px;
  margin-bottom: 15px;
  /*display: inline-block;*/
  background-color: skyblue;
  border-radius: 10px;
  position: relative;
}
.SendContent::after {
  content: '';

  display: block;
  border-width: 8px 8px 8px 8px;
  border-style: solid;
  border-color: transparent transparent transparent skyblue;

  /* 定位 */
  position: absolute;
  right: -16px;
  top: 50%;
  transform: translateY(-50%);
}

.GetContent {
  width: fit-content;
  max-width: 45vw;
  height: fit-content;
  word-wrap: break-word;
  box-sizing: border-box;
  padding: 0 10px;
  line-height: 40px;
  margin-top: 30px;
  margin-bottom: 15px;
  float: left;
  left: 6vw;
  /*display: inline-block;*/
  background-color: #dadada;
  border-radius: 10px;
  position: relative;
}
.GetContent::after {
  content: '';

  display: block;
  border-width: 8px 8px 8px 8px;
  border-style: solid;
  border-color: transparent #dadada transparent transparent;

  /* 定位 */
  position: absolute;
  left: -16px;
  top: 50%;
  transform: translateY(-50%);
}
</style>
