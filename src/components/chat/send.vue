<script setup>
import { ref } from 'vue'
import { useChatStore } from '@/stores/user'
import axios from 'axios'

const formModel = ref()

const useStore = useChatStore()

let textGet = ref()
const addItems = () => {
  if (!formModel.value) {
    return ElMessage({
      showClose: true,
      message: '你老几不能发空消息啊',
      type: 'warning'
    })
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
    url: 'http://localhost:5173/api',
    params: {
      key: 'free',
      appid: 0,
      msg: textGet.value
    }
  }).then(
    (res) => {
      console.log(res.data)
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
//     url: 'http://localhost:5173/api',
//     params: {
//       key: 'free',
//       appid: 0,
//       msg: textGet.value
//     }
//   }).then(
//     (res) => {
//       console.log(res.data)
//       useStore.addChat({
//         id: new Date(),
//         type: 'GetContent',
//         content: res.data.content
//       })
//     },
//     (err) => {
//       console.log(err)
//     }
//   )
// }
</script>

<template>
  <div class="sendBox">
    <el-form class="el-input" ref="form" size="large" autocomplete="off">
      <el-form-item class="el-input3" prop="username">
        <el-input @keyup.enter="addItems" v-model="formModel" placeholder="按回车键发送"></el-input>
      </el-form-item>
    </el-form>
    <el-button @click="addItems" type="info">发送</el-button>
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
  height: 40px;
  width: 50vw;
}
</style>
