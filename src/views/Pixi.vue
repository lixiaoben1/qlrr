<script setup>
// import { Application, Sprite, Graphics, Assets, Text, BlurFilter } from 'pixi.js'
import { onUpdated, onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import { PixiPlugin } from 'gsap/PixiPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as PIXI from 'pixi.js'

gsap.registerPlugin(PixiPlugin, ScrollTrigger)
PixiPlugin.registerPIXI(PIXI)

const number = ref(0)

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
  const div = document.querySelector('.canva')
  div.appendChild(app.view)

  //加载文字
  const text = new PIXI.Text('hello world', {
    fontSize: 35,
    fill: 'black'
  })
  text.x = 100
  text.y = 100
  app.stage.addChild(text)
  //加载多张图片，，，，，使其加入模糊滤镜
  const blurFilter = new PIXI.BlurFilter()
  blurFilter.blur = 5
  blurFilter.quality = 5
  PIXI.Assets.add('flowerTop', 'http://localhost:5173/requestPicture')
  PIXI.Assets.add('eggHead', 'https://pixijs.com/assets/eggHead.png')
  // Load the assets and get a resolved promise once both are loaded
  const texturesPromise = PIXI.Assets.load(['flowerTop', 'eggHead']) // => Promise<{flowerTop: Texture, eggHead: Texture}>
  texturesPromise.then((texture) => {
    const flowerTop = PIXI.Sprite.from(texture.flowerTop)
    flowerTop.x = 200
    flowerTop.y = 200
    flowerTop.filters = [blurFilter]
    app.stage.addChild(flowerTop)
  })

  const w1 = 200
  const h1 = 200
  const rectangle = new PIXI.Graphics()
  rectangle.beginFill()
  rectangle.drawRect(0, 0, w1, h1)
  rectangle.endFill()
  // rectangle.rotation = 0.8
  //设置图形绕中心旋转
  rectangle.pivot.set(w1 / 2, h1 / 2)
  rectangle.position.set(400, 500)
  rectangle.eventMode = 'static'
  rectangle.on('pointerdown', () => {
    console.log(5555)
    bunny.alpha === 1 ? (bunny.alpha = 0.5) : (bunny.alpha = 1)
  })
  app.stage.addChild(rectangle)

  app.ticker.add(() => {
    // just for fun, let's rotate mr rabbit a little
    rectangle.rotation += 0.001
  })
  //新建一个精灵图
  const bunny = PIXI.Sprite.from('/src/assets/picture/slider01.jpg')
  bunny.x = window.innerWidth / 2
  bunny.y = window.innerHeight / 2
  bunny.scale.set(0.2)
  bunny.anchor.set(0.2)
  bunny.rotation = Math.PI / 2
  // bunny.mask = rectangle
  app.stage.addChild(bunny)
  // app.ticker.add((delta) => {
  //   // just for fun, let's rotate mr rabbit a little
  //   if (bunny.scale.x > 1 && bunny.scale.y > 1) {
  //     bunny.scale.x = 0.05
  //     bunny.scale.y = 0.05
  //   }
  //   bunny.scale.x += 0.01
  //   bunny.scale.y += 0.01
  //   bunny.rotation += 0.01
  // })
  //绘制圆形
  const circle = new PIXI.Graphics()
  circle.lineStyle(2, 0xfeeb77, 1)
  circle.beginFill('red')
  circle.drawCircle(0, 0, 200)
  circle.endFill()
  circle.position.set(100, 500)
  app.stage.addChild(circle)

  //绘制圆角矩形
  const roundrect = new PIXI.Graphics()
  roundrect.lineStyle(10, 0xfeeb77, 1)
  roundrect.drawRoundedRect(0, 0, 100, 50, 15)
  roundrect.position.set(100, 50)
  app.stage.addChild(roundrect)

  //绘制渐变
  const container1 = new PIXI.Container()
  app.stage.addChild(container1)

  function createGradTexture() {
    // adjust it if somehow you need better quality for very very big images
    const quality = 120
    const canvas = document.createElement('canvas')

    canvas.width = quality
    canvas.height = 1

    const ctx = canvas.getContext('2d')

    // use canvas2d API to create gradient
    const grd = ctx.createLinearGradient(0, 0, 200, 0)

    grd.addColorStop(0, 'rgba(255, 255, 255, 0.0)')
    grd.addColorStop(0.3, 'cyan')
    grd.addColorStop(1, 'green')

    ctx.fillStyle = grd
    ctx.fillRect(0, 0, quality, 1)

    return PIXI.Texture.from(canvas)
  }

  const gradTexture = createGradTexture()

  const sprite = new PIXI.Sprite(gradTexture)

  sprite.position.set(700, 250)
  sprite.anchor.set(0.5)
  sprite.rotation = 0.5
  sprite.width = 400
  sprite.height = 400
  app.ticker.add(() => {
    // just for fun, let's rotate mr rabbit a little
    sprite.rotation += 0.05
  })
  container1.addChild(sprite)
  //直接绘制圆角矩形实现
  const rectMask = new PIXI.Graphics()
  // rectMask.beginFill('black')
  rectMask.lineStyle(10, 'black', 1)
  rectMask.drawRoundedRect(610, 110, 180, 280, 20)
  // rectMask.endFill()
  sprite.mask = rectMask
  container1.addChild(rectMask)

  // const rectM = new PIXI.Graphics()
  // rectM.beginFill('black')
  // rectM.drawRoundedRect(620, 120, 160, 260, 12)
  // rectM.endFill()
  // container1.addChild(rectM)

  function createGradTexture2(u, _u) {
    // adjust it if somehow you need better quality for very very big images
    const quality = 120
    const canvas = document.createElement('canvas')

    canvas.width = quality
    canvas.height = 1

    const ctx = canvas.getContext('2d')

    // use canvas2d API to create gradient
    const grd = ctx.createLinearGradient(0, 0, 200, 0)

    grd.addColorStop(0.2, `#86E3CE`)
    grd.addColorStop(0.5, '#DB6BE2')

    ctx.fillStyle = grd
    ctx.fillRect(0, 0, quality, 1)

    return PIXI.Texture.from(canvas)
  }

  const gradTexture2 = createGradTexture2()

  const demo = new PIXI.Sprite(gradTexture2)
  demo.x = 0
  demo.y = 0
  demo.width = window.innerWidth
  demo.height = window.innerHeight
  app.stage.addChild(demo)

  const flower = new PIXI.Graphics()
  let t = 0,
    w = window.innerWidth,
    h = window.innerHeight,
    num = 400,
    u = 0,
    _u,
    s,
    a,
    b,
    x,
    y,
    _x,
    _y,
    _t = 1 / 800
  // flower

  function anim() {
    flower.clear()
    t += _t
    // flower.x = 100 * Math.sin(t * 100)
    // console.log(flowerx)
    for (let i = 0; i < 2; i++) {
      x = 0
      _u = u / 2 + i
      for (let j = 0; j < num; j++) {
        x -= 0.8 * Math.sin(4)
        y = (x * Math.sin(i + 3.0 * t + x / 20)) / 2
        _x = x * Math.cos(b) - y * Math.sin(b)
        _y = x * Math.sin(b) + y * Math.cos(b)
        b = (j * 3 * Math.PI) / 6.8
        flower.lineStyle(0.75, 'red', 1, 1, false)
        flower.arc(w / 2 - _x, h / 2 - _y, 0.5, 0, 2 * Math.PI)
        demo.mask = flower
        // flower.blendMode = PIXI.BLEND_MODES.MULTIPLY
      }
    }
    u += 0.5
  }
  app.ticker.add((delta) => {
    // console.log(5555)
    // app.ticker.speed = 2
    // console.log(app.ticker.FPS)
    // console.log(app.ticker.lastTime)
    anim()
  })

  t += _t
  app.stage.addChild(flower)

  ScrollTrigger.create({
    trigger: '.canva',
    start: 'top top',
    end: '+=2500 top ',
    scrub: true,
    markers: true,
    pin: true,
    animation: gsap.to(circle, {
      duration: 1,

      pixi: { alpha: 0, x: 500, scale: 1.1 }
    })
  })

  gsap.to(number, { duration: 5, value: 10 })
})
</script>

<template>
  <div style="width: 100%; height: 100px">{{ number.toFixed(2) }}</div>

  <div style="position: absolute" class="canva"></div>
</template>

<style scoped></style>
