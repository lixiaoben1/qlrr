<script setup>
import { onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ref } from 'vue'
import { PixiPlugin } from 'gsap/PixiPlugin'

import * as PIXI from 'pixi.js'

gsap.registerPlugin(PixiPlugin, ScrollTrigger)
PixiPlugin.registerPIXI(PIXI)

gsap.registerPlugin(ScrollTrigger)

const isShowHello = ref(true)

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
  div.appendChild(app.view)

  const centerX = window.innerWidth / 2
  const centerY = window.innerHeight / 2
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

  //get a sprite
  const myIntroduction = new PIXI.Container()
  myIntroduction.pivot.set(0.5)
  myIntroduction.position.set(centerX - 100, 100)
  app.stage.addChild(myIntroduction)

  //create a roundrect
  const roundRect = new PIXI.Graphics()
  roundRect.beginFill(0x66ccff)
  roundRect.drawRoundedRect(0, 0, 200, 200, 10)
  myIntroduction.addChild(roundRect)

  const myPicture = PIXI.Sprite.from('/src/assets/picture/slider01.jpg')
  myPicture.mask = roundRect
  myPicture.x = -60
  myIntroduction.addChild(myPicture)

  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.canvas',
      start: 'top top',
      end: '+=500',
      scrub: true,
      markers: true,
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
      y: 2000,
      onComplete: () => {
        starBox.renderable = false
      },
      onReverseComplete: () => {
        app.renderer.backgroundColor = new PIXI.Color('hsl(0, 100%, 50%, 50%)').toArray()
        starBox.renderable = true
      }
    },
    '<'
  )
  tl.addLabel('myIntroduction').fromTo(
    myIntroduction,
    {
      pixi: { scale: 1, alpha: 0 }
    },
    {
      pixi: { scale: 1, alpha: 1 },
      onStart: () => {
        app.renderer.backgroundColor = new PIXI.Color('hsl(0,0%,100%)').toArray()
        starBox.renderable = false
        isShowHello.value = false
        console.log(555)
      },
      onReverseComplete: () => {
        app.renderer.backgroundColor = 'black'
        starBox.renderable = true
        isShowHello.value = true
        console.log(55486)
      }
    },
    '>'
  )
})
</script>

<template>
  <div class="canvas">
    <div v-show="isShowHello" class="hello">自我介绍</div>
    <div class="name">姓名：李奇</div>
  </div>
</template>

<style scoped>
.hello {
  color: white;
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
.name {
  color: white;
  position: absolute;
  overflow: hidden;
  top: 50vh;
  left: 50vw;
  transform: translate(-50%, -50%);
  font-size: 16px;
  text-align: center;
}
</style>
