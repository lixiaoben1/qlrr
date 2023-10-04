<script setup>
import { onMounted, reactive } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ref, watch } from 'vue'
import { PixiPlugin } from 'gsap/PixiPlugin'

import Swiper, { Navigation, Pagination, EffectCoverflow } from 'swiper'

// import { Swiper, SwiperSlide } from 'swiper/vue'
import { useRouter } from 'vue-router'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import * as PIXI from 'pixi.js'

gsap.registerPlugin(PixiPlugin, ScrollTrigger)
PixiPlugin.registerPIXI(PIXI)

gsap.registerPlugin(ScrollTrigger)

const isShowHello = ref(true)

const router = useRouter()

const swiperChangeSpeed = ref(0)

onMounted(() => {
  const app = new PIXI.Application({
    backgroundColor: 'black',
    width: window.innerWidth,
    height: window.innerHeight,
    antialias: true,
    autoDensity: true,
    resolution: window.devicePixelRatio || 1
  })
  app.renderer.view.style.touchAction = 'auto'
  const div = document.querySelector('.canvas')
  const helloNode = document.querySelector('.hello')
  div.insertBefore(app.view, helloNode)

  const centerX = app.screen.width / 2
  const centerY = app.screen.height / 2
  // setTimeout(() => {
  //
  // }, 2000)
  //region星空
  const starBox = new PIXI.Container()
  app.stage.addChild(starBox)

  const starTexture = PIXI.Texture.from('/src/assets/picture/star.png')

  const starAmount = 1000
  let cameraZ = 0
  const fov = 20
  const baseSpeed = 0.025
  let speed = 0
  let warpSpeed = ref(0)
  const starStretch = 5
  const starBaseSize = 0.05

  // Create the stars
  const stars = []

  for (let i = 0; i < starAmount; i++) {
    const star = {
      sprite: new PIXI.Sprite(starTexture),
      z: 0,
      x: 0,
      y: 0
    }

    star.sprite.anchor.x = 0.5
    star.sprite.anchor.y = 0.7
    randomizeStar(star, true)
    starBox.addChild(star.sprite)
    stars.push(star)
  }

  function randomizeStar(star, initial) {
    star.z = initial ? Math.random() * 2000 : cameraZ + Math.random() * 1000 + 2000

    // Calculate star positions with radial random coordinate so no star hits the camera.
    const deg = Math.random() * Math.PI * 2
    const distance = Math.random() * 50 + 1

    star.x = Math.cos(deg) * distance
    star.y = Math.sin(deg) * distance
  }

  function animation(delta) {
    // Simple easing. This should be changed to proper easing function when used for real.
    speed += (warpSpeed.value - speed) / 20
    cameraZ += delta * 10 * (speed + baseSpeed)
    for (let i = 0; i < starAmount; i++) {
      const star = stars[i]

      if (star.z < cameraZ) randomizeStar(star)

      // Map star 3d position to 2d with really simple projection
      const z = star.z - cameraZ

      star.sprite.x = star.x * (fov / z) * app.renderer.screen.width + app.renderer.screen.width / 2
      star.sprite.y =
        star.y * (fov / z) * app.renderer.screen.width + app.renderer.screen.height / 2

      // Calculate star scale & rotation.
      const dxCenter = star.sprite.x - app.renderer.screen.width / 2
      const dyCenter = star.sprite.y - app.renderer.screen.height / 2
      const distanceCenter = Math.sqrt(dxCenter * dxCenter + dyCenter * dyCenter)
      const distanceScale = Math.max(0, (2000 - z) / 2000)

      star.sprite.scale.x = distanceScale * starBaseSize
      // Star is looking towards center so that y axis is towards center.
      // Scale the star depending on how fast we are moving, what the stretchfactor is
      // and depending on how far away it is from the center.
      star.sprite.scale.y =
        distanceScale * starBaseSize +
        (distanceScale * speed * starStretch * distanceCenter) / app.renderer.screen.width
      star.sprite.rotation = Math.atan2(dyCenter, dxCenter) + Math.PI / 2
    }
  }

  app.ticker.add((delta) => {
    animation(delta)
  })

  // setTimeout(() => {
  //   starBox.renderable = false
  // }, 2000)
  //endregion星空

  //swiper区域
  const swiper = new Swiper('.swiper', {
    modules: [EffectCoverflow],
    effect: 'coverflow',
    grabCursor: true,
    initialSlide: 1,
    centeredSlides: true,
    slidesPerView: 'auto',
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true
    }
  })
  watch(swiperChangeSpeed, (newVal) => {
    swiper.setTranslate(newVal)
  })
  // setTimeout(() => {
  //   swiper.setTranslate(100)
  // }, 5000)

  // setInterval(() => {
  //   swiper.setTranslate(swiperChangeSpeed.value)
  //   console.log(swiperChangeSpeed.value)
  // }, 1000)
  //gsap区域
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.canvas',
      start: 'top top',
      end: '+=500',
      scrub: true,
      // markers: true,
      pin: true
    }
  })

  tl.addLabel('addSpeed').fromTo(
    warpSpeed,
    {
      value: 0
    },
    {
      duration: 0.02,
      value: 1.2
    }
  )
  tl.addLabel('hello').fromTo(
    '.hello',
    {
      scale: 1,
      x: 0,
      y: 0
    },
    {
      ease: 'power1.in',
      scale: 200,
      x: 2900,
      y: 2000
    },
    '<'
  )
  tl.addLabel('divider').fromTo(
    '.divider',
    {},
    {
      onStart: () => {
        app.renderer.backgroundColor = new PIXI.Color('hsl(0,0%,92%)').toArray()
        starBox.renderable = false
        isShowHello.value = false
        console.log('我已经隐藏hello，并将背景颜色改为白色')
      },
      onReverseComplete: () => {
        app.renderer.backgroundColor = 'black'
        starBox.renderable = true
        isShowHello.value = true
        console.log('我已经恢复hello')
      }
    },
    '>'
  )

  let tl2 = gsap.timeline({
    scrollTrigger: {
      trigger: '.firstPage',
      start: 'top top',
      end: '+=500',
      scrub: true,
      // markers: true,
      pin: true
    }
  })

  tl2.addLabel('personalInfoAppleGo').fromTo(
    '.apple',
    {
      scale: 1
    },
    {
      duration: 4,
      ease: 'power1.in',
      scale: 0.5,
      left: 110,
      y: -80
    },
    '<'
  )
  tl2.addLabel('personalInfoName').fromTo(
    '.text',
    {
      opacity: 0
    },
    {
      opacity: 1,
      stagger: 0.2,
      ease: 'power1.in'
    },
    '>0.5'
  )

  let tl3 = gsap.timeline({
    scrollTrigger: {
      trigger: '.secondPage',
      start: 'top top',
      end: '+=800',
      scrub: true,
      // markers: true,
      pin: true
    }
  })

  tl3.addLabel('praiseChange').fromTo(
    swiperChangeSpeed,
    {
      value: -centerX * 0.6
    },
    {
      value: -1800,
      duration: 5
    },
    '>'
  )
})
</script>

<template>
  <div>
    <div style="background-color: #ebebeb" class="canvas">
      <div v-show="isShowHello" class="hello">自我介绍</div>
      <div class="divider"></div>
    </div>
    <div class="firstPage">
      <div class="firstPageBox">
        <div
          style="
            position: absolute;
            font-size: 40px;
            font-weight: bold;
            color: black;
            left: 30px;
            top: 11vh;
            font-family: '得意黑 斜体', serif;
          "
        >
          个人信息
        </div>
        <div class="apple">
          <img
            class="appleImg"
            style="width: 180%"
            src="@/assets/picture/我的渲染图/33.jpg"
            alt=""
          />
        </div>
        <div
          class="textBox"
          style="
            line-height: 50px;
            position: absolute;
            font-size: 20px;
            color: black;
            left: 30px;
            top: 40vh;
          "
        >
          <div class="text">姓名：李小笨</div>
          <div class="text">年龄：21</div>
          <div class="text">电话：15580488551</div>
          <div class="text">邮箱：2387989703@qq.com</div>
        </div>
      </div>
    </div>
    <div class="secondPage">
      <div class="secondPageBox">
        <div
          style="
            position: absolute;
            font-size: 40px;
            font-weight: bold;
            color: black;
            left: 30px;
            top: 11vh;
            font-family: '得意黑 斜体', serif;
          "
        >
          获奖情况
        </div>
        <div
          class="textBox"
          style="
            line-height: 5vh;
            position: absolute;
            font-size: 16px;
            color: black;
            left: 30px;
            top: 25vh;
            vertical-align: middle;
          "
        >
          <div class="text">● 2022 第十六届iCAN大学生创新创业大赛三等奖</div>
          <div class="text">● 2023 第六届黑龙江省大学生生命科学竞赛三等奖</div>
          <div class="text">● 2021,2022,2023 校级奖学金</div>
          <div class="text">● 2021 校学生会建党百年征文活动三等奖</div>
        </div>
        <div class="swiper">
          <!-- Additional required wrapper -->
          <div class="swiper-wrapper">
            <!-- Slides -->
            <div class="swiper-slide">
              <img
                style="width: 60%; margin-left: 40%"
                src="@/assets/picture/荣誉证书/mmexport1694480018710.jpg"
                alt=""
              />
            </div>
            <div class="swiper-slide">
              <img src="@/assets/picture/荣誉证书/IMG_20231004_092253.jpg" alt="" />
            </div>
            <div class="swiper-slide">
              <img src="@/assets/picture/荣誉证书/IMG_20231004_124839.jpg" alt="" />
            </div>
            <div class="swiper-slide">
              <img src="@/assets/picture/荣誉证书/IMG_20230808_175532.jpg" alt="" />
            </div>
            <div class="swiper-slide">
              <img src="@/assets/picture/荣誉证书/IMG_20230918_061502.jpg" alt="" />
            </div>
            <div class="swiper-slide">
              <img src="@/assets/picture/荣誉证书/IMG_20231004_125017.jpg" alt="" />
            </div>
            <div class="swiper-slide">
              <img src="@/assets/picture/荣誉证书/IMG_20230812_101231.jpg" alt="" />
            </div>
            <div class="swiper-slide">
              <img src="@/assets/picture/荣誉证书/IMG_20230812_101217.jpg" alt="" />
            </div>
            <div class="swiper-slide">
              <img src="@/assets/picture/荣誉证书/IMG_20230823_171514.jpg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="height: 400px; background-color: #ebebeb"></div>
  </div>
</template>

<style scoped>
.firstPage {
  height: 100vh;
  position: relative;
  z-index: 0;
  overflow: hidden;
  background-color: #ebebeb;
}

.firstPageBox {
  width: 90vw;
  height: 95vh;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 20px;
  overflow: hidden;
  background-color: #ffffff;
}

.secondPage {
  height: 100vh;
  position: relative;
  z-index: 0;
  overflow: hidden;
  background-color: #eaeaea;
}
.secondPageBox {
  width: 90vw;
  height: 95vh;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 20px;
  overflow: hidden;
  background-color: #ffffff;
}
.apple {
  width: 85%;
  height: 35%;
  top: 25vh;
  left: 45vw;
  overflow: hidden;
  border-radius: 10px;
  transform: translate(-50%, 0);
  position: absolute;
}
.hello {
  color: #ebebeb;
  position: absolute;
  overflow: hidden;
  top: 50vh;
  left: 50vw;
  transform: translate(-50%, -50%);
  font-size: 50px;
  text-align: center;
  font-family: '得意黑 斜体', serif;
  font-weight: bold;
}
.swiper-container {
  width: 100%;
  height: 300px;
  margin-top: 500px;
}

.swiper {
  width: 100%;
  margin-top: 65vh;
  padding-bottom: 20px;
}

.swiper-slide {
  background-position: center;
  background-size: cover;
  width: 60vw;
}

.swiper-slide img {
  display: block;
  width: 100%;
}
</style>
