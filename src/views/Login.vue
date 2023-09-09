<template>
  <div class="container">
    <div class="bg">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <!--    登陆页-->
    <div>
      <div v-if="isLogin" class="glass">
        <div class="text">login</div>
        <el-form
          class="el-input"
          :model="formModel"
          :rules="rules"
          ref="form"
          size="large"
          autocomplete="off"
        >
          <el-form-item class="el-input3" prop="username">
            <el-input
              v-model="formModel.username"
              :prefix-icon="User"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item class="el-input2" prop="password">
            <el-input
              v-model="formModel.password"
              :prefix-icon="User"
              placeholder="请输入密码"
              type="password"
            ></el-input>
          </el-form-item>
        </el-form>
        <!--      <input type="text" name="user" placeholder="&nbsp;User" autocomplete="off" />-->
        <!--      <div class="caution caution1"></div>-->
        <!--      <input type="password" name="password" placeholder="&nbsp;Password" autocomplete="off" />-->
        <!--      <div class="caution caution2"></div>-->
        <button @click.prevent="login" class="button" name="login">
          <box-icon style="margin-top: 5px" size="25px" name="chevron-right"></box-icon>
        </button>
        <div class="toggleLogin">
          <a style="cursor: pointer" @click="isLogin = false">没有账号?去注册</a>
        </div>
      </div>
      <!--注册页-->
      <div class="glass" v-else>
        <div class="text">register</div>
        <el-form
          class="el-input"
          :model="formModel"
          :rules="rules"
          ref="form"
          size="large"
          autocomplete="off"
        >
          <el-form-item class="el-input3" prop="username">
            <el-input
              v-model="formModel.username"
              :prefix-icon="User"
              placeholder="请输入注册用户名"
            ></el-input>
          </el-form-item>
          <el-form-item class="el-input2" prop="password">
            <el-input
              v-model="formModel.password"
              :prefix-icon="Lock"
              placeholder="请输入密码"
              type="password"
            ></el-input>
          </el-form-item>
        </el-form>
        <!--      <input type="text" name="user" placeholder="&nbsp;User" autocomplete="off" />-->
        <!--      <div class="caution caution1"></div>-->
        <!--      <input type="password" name="password" placeholder="&nbsp;Password" autocomplete="off" />-->
        <!--      <div class="caution caution2"></div>-->
        <button @click.prevent="register" class="button" name="login">
          <box-icon style="margin-top: 5px" size="25px" name="chevron-right"></box-icon>
        </button>
        <div class="toggleLogin">
          <a style="cursor: pointer" @click="isLogin = true">已有账户?去登陆</a>
        </div>
      </div>
    </div>
  </div>
  <!--  注册页-->
</template>
<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { ref, watch } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'

const useStore = useUserStore()
const isLogin = ref(true)
const router = useRouter()

const formModel = ref({
  username: '',
  password: '',
  repassword: ''
})

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 5, max: 12, message: '请输入5-12位', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { pattern: /^\S{6,12}$/, message: '请输入5-12位', trigger: 'blur' }
  ]
}

const form = ref()
// 注册
const register = async () => {
  await form.value.validate()
  isLogin.value = true
  useStore.setToken(formModel.value)
  ElMessage({
    message: '注册成功',
    type: 'success'
  })
}
const login = async () => {
  await form.value.validate()
  // console.log(useStore.token.username) //调用pinia里面的存储的数据
  // console.log(formModel.value) 可以看见登陆输入框里面的账户密码
  if (
    formModel.value.username === useStore.token.username &&
    formModel.value.password === useStore.token.password
  ) {
    ElMessage({
      message: `欢迎回来,${useStore.token.username}`,
      type: 'success'
    })
    return router.push('/')
  }

  ElMessage({
    message: '账号或密码错误',
    type: 'warning'
  })

  formModel.value = {
    username: '',
    password: '',
    repassword: ''
  }
}

watch(isLogin, () => {
  formModel.value = {
    username: '',
    password: '',
    repassword: ''
  }
})
</script>

<style scoped>
.container {
  width: 100%;
  height: 900px;
  background-image: url('@/assets/picture/hero-bg.jpg');
  background-size: cover;
  position: relative;
  animation: background 8s infinite alternate linear;
}
@keyframes background {
  from {
    background-position-x: 0;
  }
  to {
    background-position-x: -400px;
  }
}
.el-input >>> {
  /*position: absolute;*/
  width: 240px;
  left: 50%;
  flex-wrap: wrap;
  height: 50px;
  transform: translate(-50%);
  --el-input-bg-color: rgba(226, 231, 236, 0.5);
  --el-color-primary: transparent;
  --el-input-border-color: transparent;
  --el-text-color-placeholder: #333333;
  --el-input-focus-border-color: black;
  --el-input-hover-border-color: black;
  --el-input-border-radius: 10px;
  font-size: 18px;
}
.el-input3 {
  height: 50px;
}
.toggleLogin {
  position: absolute;
  left: 50%;
  bottom: 50px;
  transform: translate(-50%);
}
.toggleLogin2 {
  position: absolute;
  left: 50%;
  bottom: 10px;
  transform: translate(-50%);
}
.glass {
  width: 300px;
  height: 400px;
  background-color: rgba(255, 255, 255, 0.05);
  /* background-color: red; */
  border-radius: 20px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  box-shadow:
    inset 1px 1px 6px rgba(255, 255, 255, 0.3),
    2px 2px 15px rgba(0, 0, 0, 0.5);
}

/*input {
  background: transparent;
  outline: none;
  border-bottom: 1px solid #666;
  width: 80%;
  height: 40px;
  color: #000000;
  font-size: 18px;
  margin-left: 30px;
  margin-top: 50px;
}*/
.text {
  font-size: 25px;
  margin-left: 30px;
  margin-top: 50px;
  margin-bottom: 40px;
  color: #ffffff;
  font-weight: bold;
  text-shadow: #d3ebff 0 0 10px;
}
/*input:focus {*/
/*  border-radius: 10px;*/
/*  background: #d7edf8;*/
/*  opacity: 0.5;*/
/*  box-shadow:*/
/*    inset -1px -1px 5px #8a8a8a,*/
/*    1px 1px 4px #afafaf,*/
/*    inset 1px 1px 2px white;*/
/*  !*padding-left: 10px;*!*/
/*  transition: all 0.5s;*/
/*}*/

.button {
  border: none;
  width: 50px;
  height: 50px;
  margin-left: 50%;
  margin-top: 90px;
  transform: translate(-50%);
  background-color: rgba(218, 218, 218, 0.192);
  border-radius: 50%;
  box-shadow: 0 2px 5px #111;
  cursor: pointer;
}

@keyframes first1 {
  from {
    transform: translateY(0);
  }

  to {
    transform: translateY(-30px);
  }
}

span {
  background-color: #fff;
  position: absolute;
  width: 120px;
  height: 120px;
  border-radius: 50%;
}

span:nth-child(1) {
  top: 450px;
  left: 275px;
  background-image: linear-gradient(142deg, #49bcf6, #49deb2);
  animation: first1 3s infinite ease-in-out alternate;
}

span:nth-child(2) {
  top: 110px;
  left: 320px;
  width: 40px;
  height: 40px;
  background-image: linear-gradient(#0a45a8, #09a4db);
  animation: first1 5s infinite ease-in-out alternate-reverse;
}

span:nth-child(3) {
  top: 430px;
  left: 5px;
  width: 80px;
  height: 80px;
  background-image: linear-gradient(#1c0125, #db6be2);
  animation: first1 4s infinite ease-in-out alternate;
}

span:nth-child(4) {
  top: 5px;
  left: 5px;
  width: 80px;
  height: 80px;
  background-image: linear-gradient(#ff7d58, #ffcc4b);
  animation: first1 6s infinite ease-in-out alternate-reverse;
}

@keyframes first2 {
  from {
    transform: translate(-50%, -50%) scale(0) rotatez(60deg);
  }

  to {
    transform: translate(-50%, -50%) scale(1) rotatez(0);
    visibility: visible;
  }
}

.bg {
  width: 380px;
  height: 600px;
  /* margin-top: 100px; */
  /* background-color: wheat; */
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: first2 1s ease-out 1s forwards;
  visibility: hidden;
}
.iconfont {
  font-size: 25px;
}
.caution {
  margin-left: 10%;
  font-size: 15px;
  float: left;
}
.shake {
  animation: shake 800ms ease-in-out;
}
@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }
  20%,
  80% {
    transform: translate3d(+2px, 0, 0);
  }
  30%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }
  40%,
  60% {
    transform: translate3d(+4px, 0, 0);
  }
  50% {
    transform: translate3d(-4px, 0, 0);
  }
}
</style>
