<template>
  <div class="top-banner">
    <img
      v-show="!unflipMenu"
      @click="unflipMenu = !unflipMenu"
      style="opacity: 0.5; margin-left: 15px; width: 50px; cursor: pointer"
      src="@/assets/picture/图标/bx-x.svg"
      alt=""
    />
    <img
      v-show="unflipMenu"
      @click="unflipMenu = !unflipMenu"
      style="opacity: 0.5; margin-left: 15px; width: 50px; cursor: pointer"
      src="@/assets/picture/图标/bx-menu.svg"
      alt=""
    />
    <div class="logo">QLRR</div>
    <div class="topbar-nav">
      <div class="search">
        <div :class="{ serchAnimate: !unflip, searchInput: unflip }">
          <input
            v-show="!unflip"
            ref="autoFocus"
            class="search-demo"
            @blur="todoBlur()"
            type="text"
          />
        </div>
        <a @click="flip" href="#">
          <img
            style="
              opacity: 0.5;
              position: absolute;
              top: 42%;
              left: 50%;
              transform: translate(-50%, -50%);
              cursor: pointer;
            "
            src="@/assets/picture/图标/bx-search.svg"
            alt=""
          />
        </a>
      </div>
      <div @click="toLogin" class="login-top">
        <el-avatar
          :size="30"
          style="margin: 5px"
          src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/1455840/8c10a476093ee953800c50d3252dfa07ca77cbdf.jpg"
        />
      </div>
    </div>
  </div>
  <div :class="{ menuPopUp: !unflipMenu, menu: unflipMenu }">
    <ul class="menu-item">
      <li @click="router.push('/me')">
        个人简介<img class="right-arrow" src="@/assets/picture/图标/bx-chevron-right.svg" alt="" />
      </li>
      <li @click="router.push('/picture')">
        产品渲染<img class="right-arrow" src="@/assets/picture/图标/bx-chevron-right.svg" alt="" />
      </li>
      <li @click="router.push('/me')">
        荣誉证书<img class="right-arrow" src="@/assets/picture/图标/bx-chevron-right.svg" alt="" />
      </li>
      <li @click="router.push('/picture')">
        我的作品<img class="right-arrow" src="@/assets/picture/图标/bx-chevron-right.svg" alt="" />
      </li>
      <li @click="router.push('/chat')">
        智能聊天机器人<img
          class="right-arrow"
          src="@/assets/picture/图标/bx-chevron-right.svg"
          alt=""
        />
      </li>
      <li @click="router.push('/ppt')">
        PPT<img class="right-arrow" src="@/assets/picture/图标/bx-chevron-right.svg" alt="" />
      </li>
      <hr />
      <li @click="router.push('/me')">
        与我联系<img class="right-arrow" src="@/assets/picture/图标/bx-chevron-right.svg" alt="" />
      </li>
    </ul>
  </div>
  <Transition name="masked">
    <div @click="mask" class="mask" v-show="!unflipMenu"></div>
  </Transition>
</template>

<script setup>
import { ref, nextTick, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { gsap } from 'gsap'

const unflip = ref(true)
const autoFocus = ref(null)
const router = useRouter()
const useStore = useUserStore()
const flip = () => {
  unflip.value = !unflip.value
  nextTick(() => {
    autoFocus.value.focus()
  })
  // setTimeout(() => this.$refs.autoFocus.focus(), 200)
}
const todoBlur = () => {
  unflip.value = !unflip.value
}

const toLogin = () => {
  console.log(useStore.token)
  if (useStore.token) {
    return router.push('/user')
  }
  router.push('/login')
}

const unflipMenu = ref(true)

let tween
onMounted(() => {
  tween = gsap.to('.login-top', {
    duration: 1,
    rotationY: 360,
    delay: 1
  })
})
onMounted(() => {
  gsap.set('.menu-item>*', { x: -200, opacity: 0 })
})
const mask = () => {
  unflipMenu.value = !unflipMenu.value
}

watch(unflipMenu, () => {
  if (unflipMenu.value) {
    gsap.to('.menu-item>*', { x: -200, opacity: 0 })
  } else {
    gsap.fromTo(
      '.menu-item>*',
      { x: -200, opacity: 0 },
      {
        duration: 0.8,
        x: 0,
        ease: 'power3.out',
        opacity: 1,
        delay: 0.1,
        stagger: 0.1
      }
    )
    tween.restart()
  }

  // gsap.fromTo(
  //   '.menu-item>*',
  //   {
  //     duration: 0
  //   },
  //   { opacity: 0, x: -10 }
  // )
})
</script>

<style scoped>
.mask {
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: black;
  z-index: 1000;
  opacity: 0.5;
  transition: 0.2s all ease-in-out;
}
.masked-enter-active,
.masked-leave-active {
  transition: opacity 0.5s ease;
}
.masked-enter-from,
.masked-leave-to {
  opacity: 0;
}

.menu {
  width: 100%;
  position: fixed;
  left: -100vw;
  z-index: 2000;
  height: 100%;
  background-color: rgba(255, 255, 255, 0);
  transition: 0.3s all ease-in-out;
}
.menuPopUp {
  width: 80%;
  position: fixed;
  left: 0;
  z-index: 2000;
  height: 100%;
  transition: 0.3s all ease-in-out;
  backdrop-filter: blur(4px);
  background-color: rgba(255, 255, 255, 0.8);
}
.menu-item {
  font-size: 20px;
  padding: 0 10%;
  margin: 30px 0;
}
.menu-item li {
  margin: 15px 0;
}
.menu-item li:hover {
  color: mediumpurple;
}
.right-arrow {
  opacity: 0.5;
  cursor: pointer;
  float: right;
  margin-right: 10px;
  margin-top: 3px;
}

.top-banner {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.topbar-nav {
  width: 60%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 15px;
  font-size: 12px;
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
  background-image: linear-gradient(to right, orange, purple, orange);
  background-clip: text;
  background-position-x: 0;
  -webkit-background-clip: text;
  color: transparent;
  user-select: none;
  animation: logo 3s linear infinite;
}

.search {
  width: 150px;
  //margin-top: 13px;
  box-sizing: border-box;
  margin-right: 15px;
  /*background-color: #0ac2f3;*/
  height: 36px;
  position: relative;
}
.search-demo {
  width: 100px;
  height: 25px;
  position: absolute;
  box-sizing: border-box;
  font-size: 16px;
  z-index: 3;
  top: 50%;
  transform: translateY(-50%);
  left: 8px;
  background: transparent;
}
.search a {
  position: absolute;
  right: 18px;
  top: 18px;
}
.searchInput {
  width: 36px;
  height: 36px;
  background-color: red;
  position: absolute;
  right: 0;
  transition: all 0.4s;
  border-radius: 18px;
  backdrop-filter: blur(4px);
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow:
    inset 1px 1px 5px rgba(255, 255, 255, 0.5),
    0 20px 20px rgba(0, 0, 0, 0.15);
}
.serchAnimate {
  width: 150px;
  height: 36px;
  background-color: red;
  position: absolute;
  right: 0;
  transition: all 0.4s;
  border-radius: 18px;
  backdrop-filter: blur(4px);
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow:
    inset 1px 1px 5px rgba(255, 255, 255, 0.5),
    0 20px 20px rgba(0, 0, 0, 0.15);
}
.login-top {
  width: 40px;
  font-size: 18px;
  /*box-sizing: border-box;*/
  /*padding: 10px;*/
  height: 40px;
  font-family: 'alimama', serif;
  font-weight: 700;
  backdrop-filter: blur(4px);
  border-radius: 45%;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow:
    inset 1px 1px 5px rgba(255, 255, 255, 0.5),
    0 20px 20px rgba(0, 0, 0, 0.15);
}
</style>
