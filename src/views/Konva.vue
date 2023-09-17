<script setup>
import { ref, onMounted, reactive } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { LazyImg, Waterfall } from 'vue-waterfall-plugin-next'
import 'vue-waterfall-plugin-next/dist/style.css'
import { Swiper, SwiperSlide } from 'swiper/vue'

import 'swiper/css'
import 'swiper/css/autoplay'

gsap.registerPlugin(ScrollTrigger)

const configKonva = {
  width: 800,
  height: 500
}
const configCircle = ref({
  x: 100,
  y: 100,
  radius: 80,
  fill: 'red',
  stroke: 'black',
  strokeWidth: 4,
  draggable: true,
  shadowColor: 'black',
  shadowBlur: 10
})
const demo = ref(null)
function move(e) {
  demo.value.focus()
  if (e.key === 'ArrowUp') {
    configCircle.value.x = configCircle.value.x + 10
  }
  console.log(e)
  console.log(demo.value)
}

const image = new Image()
image.src = 'https://konvajs.org/assets/yoda.jpg'

const imgSrc = [
  { src: '/src/assets/picture/我的渲染图/1.png' },
  { src: '/src/assets/picture/我的渲染图/2.png' },
  { src: '/src/assets/picture/我的渲染图/3.png' },
  { src: '/src/assets/picture/我的渲染图/4.png' },
  { src: '/src/assets/picture/我的渲染图/5.png' },
  { src: '/src/assets/picture/我的渲染图/6.png' },
  { src: '/src/assets/picture/我的渲染图/7.png' },
  { src: '/src/assets/picture/我的渲染图/9.png' },
  { src: '/src/assets/picture/我的渲染图/10.png' },
  { src: '/src/assets/picture/我的渲染图/11.png' }
]

const swiperValue = reactive({
  slidesPerView: 2.26,
  slidesOffsetBefore: window.innerWidth * 0.05
})
const onSwiper = (swiper) => {
  setTimeout(() => {
    swiper.translateTo(-500, 1000, true, false)
  }, 5000)
}
// onMounted(() => {
//   const st = ScrollTrigger.create({
//     trigger: '.circleb',
//     start: '0 0',
//     end: '+=800',
//     scrub: true,
//     markers: true,
//     pin: true
//   })
//   // console.log(st.scroll(100))
//   // window.addEventListener('scroll', () => console.log(st.scroll.v))
//   // setInterval(() => {
//   //   console.log(st.scroll())
//   // }, 50)
// })
</script>

<template>
  <Swiper
    ref="swiper1"
    class="swiper-container"
    :modules="modules"
    :slidesPerView="1"
    space-between="0"
    loop="true"
    @swiper="onSwiper"
  >
    <!-- shadow -->
    <swiper-slide class="swiper-slide">
      <img src="@/assets/picture/懒人图云.png" alt="" />
    </swiper-slide>
    <swiper-slide class="swiper-slide">
      <img src="@/assets/picture/懒人图云%20(3).png" alt="" />
    </swiper-slide>
  </Swiper>
  <!--  <div class="m-gallery">-->
  <!--    <div v-for="(item, index) in imgSrc" class="item" :key="index">-->
  <!--      <img :src="item.src" alt="555" />-->
  <!--    </div>-->
  <!--  </div>-->
  <input style="background-color: #0a45a8" class="circleb" @keyup="move" ref="demo" type="text" />
  <v-stage :config="configKonva">
    <v-layer>
      <v-circle @click="move" :config="configCircle"></v-circle>
      <v-image
        :config="{
          x: 100,
          y: 100,
          image: image
        }"
      ></v-image>
    </v-layer>
  </v-stage>
</template>

<style scoped>
.swiper-container {
  width: 100%;
  height: 100%;
}
.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  margin-top: 20px;
}
</style>
