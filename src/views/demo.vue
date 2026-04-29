<script setup>
import { onMounted, reactive } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ref } from 'vue'
import { PixiPlugin } from 'gsap/PixiPlugin'
import * as PIXI from 'pixi.js'
PixiPlugin.registerPIXI(PIXI)

import Swiper, { Navigation, Pagination, EffectCoverflow } from 'swiper'

// import { Swiper, SwiperSlide } from 'swiper/vue'
import { useRouter } from 'vue-router'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
onMounted(() => {
  const swiper = new Swiper('.swiper', {
    modules: [Navigation, Pagination, EffectCoverflow],
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true
    },
    pagination: {
      el: '.swiper-pagination'
    }
  })

  //pixi
  const app = new PIXI.Application({
    backgroundColor: 'black',
    width: window.innerWidth,
    height: window.innerHeight,
    antialias: true,
    autoDensity: true,

    resolution: window.devicePixelRatio || 1
  })
  app.renderer.view.style.touchAction = 'auto'
  const div = document.querySelector('.container')
  //加载在div最前面
  div.insertBefore(app.view, div.firstChild)

  PIXI.Assets.add('flowerTop', 'http://localhost:5173/requestPicture')
  PIXI.Assets.add('eggHead', 'https://pixijs.com/assets/eggHead.png')
  // Load the assets and get a resolved promise once both are loaded
  const texturesPromise = PIXI.Assets.load(['flowerTop', 'eggHead'], (progress) => {
    console.log(progress)
  }) // => Promise<{flowerTop: Texture, eggHead: Texture}>
  texturesPromise.then((texture) => {
    const flowerTop = PIXI.Sprite.from(texture.flowerTop)
    flowerTop.x = 200
    flowerTop.y = 200
    app.stage.addChild(flowerTop)
  })
})
</script>

<template>
  <div class="container">
    <div class="swiper">
      <!-- Additional required wrapper -->
      <div class="swiper-wrapper">
        <!-- Slides -->
        <div class="swiper-slide">Slide 1</div>
        <div class="swiper-slide">Slide 2</div>
        <div class="swiper-slide">Slide 3</div>
      </div>
      <!-- If we need pagination -->
      <div class="swiper-pagination"></div>

      <!-- If we need navigation buttons -->
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>

      <!-- If we need scrollbar -->
      <div class="swiper-scrollbar"></div>
    </div>
    <!--    <img src="https://s1.imagehub.cc/images/2023/10/02/5.png" alt="5.png" border="0" />-->
  </div>
</template>

<style scoped>
html,
body {
  position: relative;
  height: 100%;
}

body {
  background: #eee;
  font-family:
    Helvetica Neue,
    Helvetica,
    Arial,
    sans-serif;
  font-size: 14px;
  color: #000;
  margin: 0;
  padding: 0;
}

.swiper {
  width: 100%;
  padding-top: 50px;
  padding-bottom: 50px;
}

.swiper-slide {
  background-position: center;
  background-size: cover;
  width: 300px;
  height: 300px;
  background-color: #803131;
}

.swiper-slide img {
  display: block;
  width: 100%;
}
</style>
