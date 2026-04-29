<script setup>
import VueOfficePdf from '@vue-office/pdf'
const pdf = '../../复习资料/表格(重要).pdf'
import { ref } from 'vue'

const isRendered = ref(true)

const prog = ref(0)

const renderedHandler = () => {
  prog.value = 100
  isRendered.value = false
}
const errorHandler = () => {
  console.log('渲染失败')
}

;(function loading() {
  let timer = setInterval(function () {
    if (prog.value < 95) {
      prog.value = prog.value + Math.floor(Math.random() * 5)
    } else {
      prog.value = 97
      clearInterval(timer)
    }
  }, 100)
})()
</script>

<template>
  <div>
    <el-progress v-show="isRendered" class="loading" type="circle" :percentage="prog" />
    <div v-show="isRendered" class="loadingMask"></div>
    <vue-office-pdf @rendered="renderedHandler" @error="errorHandler" :src="pdf" />
  </div>
</template>

<style scoped>
.loading {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 2;
  transform: translate(-50%, -50%);
}
.loadingMask {
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 1;
  background-color: rgba(250, 250, 250, 0.8);
}
</style>
