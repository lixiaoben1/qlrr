<script setup>
import firstHeader from '@/components/home/FirstHeader.vue'
import content from '@/components/chat/content.vue'
import send from '@/components/chat/send.vue'
import { ref, watch } from 'vue'
import axios from 'axios'

const text = ref()
let textGet = ref()
const text2 = ref()
// const login = async () => {
//   const res = await getData()
//   console.log('结果是：', res.data)
// }
const sends = () => {
  axios({
    method: 'get',
    url: 'http://localhost:5173/api',
    params: {
      key: 'free',
      appid: 0,
      msg: textGet.value
    }
  }).then(
    (res) => {
      console.log(res.data)
      text2.value = res.data.content
      text.value = ''
    },
    (err) => {
      console.log(err)
    }
  )
}

watch(text, (newVal) => {
  textGet.value = encodeURIComponent(newVal)
  console.log(textGet.value)
})
</script>

<template>
  <div>
    <firstHeader style="position: fixed"></firstHeader>
    <content />
    <send style="position: fixed; bottom: 2vh" />
  </div>
  <!--      <div style="display: flex">-->
  <!--        <input-->
  <!--          v-model="text"-->
  <!--          style="width: 200px; height: 50px; background-color: skyblue"-->
  <!--          type="text"-->
  <!--        />-->

  <!--        <button @click="send" style="width: 50px; height: 50px; cursor: pointer; margin-left: 10px">-->
  <!--          点击发送-->
  <!--        </button>-->
  <!--      </div>-->
  <!--      <input-->
  <!--        v-model="text2"-->
  <!--        style="width: 200px; height: 50px; background-color: skyblue; margin-top: 10px"-->
  <!--        type="text"-->
  <!--      />-->
  <!--    </div>-->
</template>

<style scoped>
body {
  width: 100vw;
  height: 100vh;
}
</style>
