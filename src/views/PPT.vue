<script setup>
import { ref, onMounted } from 'vue'

const src = ref([
  '/ppt/幻灯片1.JPG',
  '/ppt/幻灯片2.JPG',
  '/ppt/幻灯片3.JPG',
  '/ppt/幻灯片4.JPG',
  '/ppt/幻灯片5.JPG',
  '/ppt/幻灯片6.JPG',
  '/ppt/幻灯片7.JPG',
  '/ppt/幻灯片8.JPG',
  '/ppt/幻灯片9.JPG',
  '/ppt/幻灯片10.JPG',
  '/ppt/幻灯片11.JPG',
  '/ppt/幻灯片12.JPG',
  '/ppt/幻灯片13.JPG',
  '/ppt/幻灯片14.JPG',
  '/ppt/幻灯片14.JPG'
])

//设置播放的页数
const index = ref(0)

//设置全屏和取消全屏
const isfull = ref(false)
//切换下一页
const next = () => {
  if (index.value === src.value.length - 1) {
    exitFull()
    return
  }
  index.value++
}
//切换上一页
const prev = () => {
  if (index.value === 0) {
    return
  }
  index.value--
}
const full = () => {
  const el = document.documentElement
  const rfs =
    el.requestFullscreen ||
    el.webkitRequestFullScreen ||
    el.mozRequestFullScreen ||
    el.msRequestFullscreen
  if (typeof rfs !== 'undefined' && rfs) {
    rfs.call(el)
  }
  isfull.value = true
}
//退出全屏
function exitFull() {
  const el = document
  const cfs =
    el.cancelFullScreen || el.webkitCancelFullScreen || el.mozCancelFullScreen || el.exitFullScreen
  if (typeof cfs !== 'undefined' && cfs) {
    cfs.call(el)
  }
  isfull.value = false
}

//全局监听键盘事件
onMounted(() => {
  window.addEventListener('keydown', (e) => {
    //如果是回车则执行登录方法
    console.log(e.key)
    if (e.key === 'arrowright' || e.key === 'ArrowRight') {
      next()
    } else if (e.key === 'arrowleft' || e.key === 'ArrowLeft') {
      prev()
    }
  })
})
</script>

<template>
  <div class="container">
    <div style="width: 100%; height: 100vh; background-color: black" class="ppt">
      <img @keyup.right="next" @click="next" style="width: 100%" :src="src[index]" alt="" />
    </div>
    <button v-show="!isfull" class="start" @click="full">全屏</button>
    <button v-show="isfull" class="start" @click="exitFull">退出</button>
    <button class="reStart" @click="index = 0">重头开始</button>
    <button style="width: 28px; left: 60px" class="reStart" @click="next">›</button>
    <button style="width: 28px; left: 20px" class="reStart" @click="prev">‹</button>
  </div>
</template>

<style scoped>
.reStart {
  width: 65px;
  height: 30px;
  background-color: rgba(135, 206, 235, 0.3);
  position: fixed;
  bottom: 5vh;
  right: 80px;
  cursor: pointer;
  border-radius: 4px;
}
.start {
  width: 50px;
  height: 30px;
  background-color: rgba(135, 206, 235, 0.3);
  position: fixed;
  bottom: 5vh;
  right: 10px;
  border-radius: 4px;
  cursor: pointer;
}
</style>
