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

  const starTexture = PIXI.Texture.from('/我的渲染图/star.png')

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

  tl2.addLabel('personalInfoName').fromTo(
    ['.apple', '.text'],
    {
      opacity: 0
    },
    {
      opacity: 1,
      stagger: 0.2,
      ease: 'power1.in'
    },
    '>'
  )
  tl2.addLabel('personalInfoName2').fromTo(
    ['.toDesign'],
    {
      opacity: 0
    },
    {
      opacity: 1,
      ease: 'power1.in'
    },
    '>'
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
            style="width: 180%; transform: translateX(-50px)"
            src="data:image/jpeg;base64,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"
            alt=""
          />
        </div>
        <div
          class="textBox"
          style="
            line-height: 50px;
            position: absolute;
            width: 70vw;
            font-size: 16px;
            color: black;
            left: 30px;
            top: 20vh;
          "
        >
          <div class="text">姓名：李小笨</div>
          <div class="text">年龄：21</div>
          <div class="text">电话：15580488551</div>
          <div class="text">邮箱：2387989703@qq.com</div>
          <div style="margin-top: 20px; line-height: 25px" class="text">
            本人工作积极认真，细心负责，熟练运用办公自动化软件，善于在工作中提出问题，发现问题，
            解决问题，有较强的分析能力，勤奋好学，踏实肯干，动手能力强，认真负责，有很强的社会责任感，坚毅不拔，吃苦耐劳，善于迎接新挑战。
          </div>
          <div
            style="
              position: absolute;
              width: 50vw;
              background-color: rgba(255, 255, 255, 0.2);
              border-radius: 10px;
              backdrop-filter: blur(20px);
              -webkit-backdrop-filter: blur(20px);
              box-shadow:
                inset 4px 1px 6px rgba(255, 255, 255, 0.6),
                5px 15px 15px rgba(0, 0, 0, 0.4);
              font-size: 16px;
              color: black;
              left: 50%;
              text-align: center;
              transform: translateX(-50%);
              top: 50vh;
            "
            class="toDesign"
            @click="router.push('/')"
          >
            点此观看我的产品渲染
          </div>
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
            font-size: 15px;
            color: black;
            left: 30px;
            top: 60vh;
            vertical-align: middle;
          "
        >
          <div class="text">第十六届iCAN大学生创新创业大赛三等奖</div>
          <div class="text">第六届黑龙江省大学生生命科学竞赛三等奖</div>
          <div class="text">校级奖学金</div>
          <div class="text">校学生会建党百年征文活动三等奖</div>
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
  background-image: url('@/assets/picture/水墨风背景.jpg');
  background-size: cover;
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
  background-image: url('@/assets/picture/水墨风背景.jpg');
  background-size: cover;
  transform: translate(-50%, -50%);
  border-radius: 20px;
  overflow: hidden;
}
.apple {
  width: 30%;
  height: 15%;
  top: 22vh;
  left: 70vw;
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
  margin-top: 28vh;
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
