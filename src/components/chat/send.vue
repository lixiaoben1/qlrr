<script setup>
import { ref } from 'vue'
import { useChatStore } from '@/stores/user'
import axios from 'axios'

const formModel = ref()

const useStore = useChatStore()

let textGet = ref()

//限制发消息时间
const sendOnce = ref(true)
const addItems = () => {
  sendOnce.value = false
  if (!formModel.value) {
    ElMessage({
      showClose: true,
      message: '你老几不能发空消息啊',
      type: 'warning'
    })
    sendOnce.value = true
    return
  }

  useStore.addChat({
    id: new Date(),
    type: 'SendContent',
    content: formModel.value
  })

  textGet.value = encodeURIComponent(formModel.value)

  //清空输入框
  formModel.value = ''

  axios({
    method: 'get',
    url: 'https://qlrrnode.azurewebsites.net/users',
    // url: 'https://qlrrnode.azurewebsites.net/users',
    params: {
      key: 'free',
      appid: 0,
      msg: textGet.value
    }
  }).then(
    (res) => {
      console.log(res.data)
      sendOnce.value = true
      useStore.addChat({
        id: new Date(),
        type: 'GetContent',
        content: res.data.content
      })
    },
    (err) => {
      console.log(err)
      ElMessage({
        showClose: true,
        message: '出错了',
        type: 'warning'
      })
    }
  )
}

// const GetItems = () => {
//   useStore.addChat({
//     id: new Date(),
//     type: 'GetContent',
//     content: formModel.value
//   })
// }

// const sends = () => {
//   textGet.value = encodeURIComponent(formModel.value)
//   axios({
//     method: 'get',
//     url: 'https://qlrrnode.azurewebsites.net/users'
//     // params: {
//     //   key: 'free',
//     //   appid: 0,
//     //   msg: textGet.value
//     // }
//   }).then(
//     (res) => {
//       text.value = res.data.content
//       // console.log(res.data)
//       // useStore.addChat({
//       //   id: new Date(),
//       //   type: 'GetContent',
//       //   content: res.data.content
//       // })
//     },
//     (err) => {
//       console.log(err)
//     }
//   )
// }

// const sends = () => {
//   //创建script标签
//   const img = new Image()
//   img.src = 'http://localhost:5173/api'
//   // const script = document.createElement('script')
//   //给script标签添加src属性
//   // script.src = `http://api.qingyunke.com/api.php?key=free&appid=0&msg=%E4%BD%A0%E6%98%AF%E8%B0%81`
//   //将script标签添加到body中
//   // document.body.appendChild(script)
// }
</script>

<template>
  <div class="sendBox">
    <div class="el-input">
      <el-input @keyup.enter="addItems" v-model="formModel" placeholder="按回车键发送"></el-input>
    </div>
    <el-button :loading="!sendOnce" style="margin-left: 10px" @click="addItems" type="info"
      >发送</el-button
    >
  </div>
  <!--  <div style="display: flex">-->
  <!--    <input-->
  <!--      v-model="text"-->
  <!--      style="width: 200px; height: 50px; background-color: skyblue"-->
  <!--      type="text"-->
  <!--    />-->
  <!--    <button @click="sends" style="width: 50px; height: 50px; cursor: pointer; margin-left: 10px">-->
  <!--      点击发送-->
  <!--    </button>-->
  <!--    <input-->
  <!--      v-model="text2"-->
  <!--      style="width: 200px; height: 50px; background-color: skyblue; margin-top: 10px"-->
  <!--      type="text"-->
  <!--    />-->
  <!--  </div>-->
</template>

<style scoped>
.sendBox {
  display: flex;
  width: 55vw;
  margin-left: 50vw;
  height: 50px;
  align-items: center;
  transform: translate(-50%);
  --el-input-bg-color: rgba(25, 103, 180, 1);
  --el-color-primary: rgba(25, 103, 180, 1);
  /*--el-color-primary: transparent;*/
  --el-input-border-color: transparent;
  --el-text-color-placeholder: #c5c5c5;
  --el-input-focus-border-color: black;
  --el-input-hover-border-color: black;
  --el-input-border-radius: 10px;
  font-size: 18px;
}
.el-input {
  height: 35px;
  width: 50vw;
}
</style>
