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
// onMounted(() => {
//   gsap.fromTo(
//     ['.hello', '#canvas'],
//     {
//       opacity: 0,
//       scale: 0.5
//     },
//     {
//       delay: 0,
//       duration: 1,
//       scale: 1,
//       opacity: 1,
//       stagger: 0.5
//     }
//   )
// })

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
  const div = document.querySelector('.firstPage')
  div.appendChild(app.view)
  const centerX = app.screen.width / 2
  const centerY = app.screen.height / 2
  //加载资源https://s1.imagehub.cc/images/2023/10/02/5.png

  PIXI.Assets.add('straw1', '/我的渲染图/2.jpg')
  PIXI.Assets.add('straw2', '/我的渲染图/3.jpg')
  PIXI.Assets.add('straw3', '/我的渲染图/4.jpg')
  PIXI.Assets.add('straw4', '/我的渲染图/5.jpg')
  PIXI.Assets.add('straw5', '/我的渲染图/6.jpg')

  //region的firstFlower
  const firstFlower = new PIXI.Container()
  app.stage.addChild(firstFlower)

  function createGradTexture2() {
    // adjust it if somehow you need better quality for very very big images
    const quality = 120
    const canvas = document.createElement('canvas')

    canvas.width = quality
    canvas.height = 1
    const ctx = canvas.getContext('2d')
    // use canvas2d API to create gradient
    const grd = ctx.createLinearGradient(0, 0, 200, 0)

    grd.addColorStop(0.2, `hsl(166,41%,53%)`)
    grd.addColorStop(0.5, 'rgba(219,107,226)')

    ctx.fillStyle = grd
    ctx.fillRect(0, 0, quality, 1)
    return PIXI.Texture.from(canvas)
  }

  const gradTexture2 = createGradTexture2()

  const gradient1 = new PIXI.Sprite(gradTexture2)
  gradient1.x = 0
  gradient1.y = 0
  gradient1.width = window.innerWidth
  gradient1.height = window.innerHeight
  app.stage.addChild(gradient1)

  const flower = new PIXI.Graphics()
  let t = 0,
    w = window.innerWidth,
    h = window.innerHeight,
    num = 311,
    u = 0,
    _u,
    s,
    a,
    b,
    x,
    y,
    _x,
    _y,
    becomeBig = 0,
    _t = 1 / 800
  // flower

  function anim(becomeBig) {
    flower.clear()
    t += _t
    // flower.x = 100 * Math.sin(t * 100)
    for (let i = 0; i < 2; i++) {
      x = 0
      _u = u / 2 + i
      for (let j = 0; j < num; j++) {
        x -= (1.01 - Math.exp(-becomeBig)) * 0.5
        y = (x * Math.sin(i + 3.0 * t + x / 20)) / 2
        _x = x * Math.cos(b) - y * Math.sin(b)
        _y = x * Math.sin(b) + y * Math.cos(b)
        b = (j * 3 * Math.PI) / 6.8
        flower.lineStyle(1, 'red', 1)
        flower.arc(w / 2 - _x, h / 2 - _y, 0.5, 0, 2 * Math.PI)
        gradient1.mask = flower
        // flower.blendMode = PIXI.BLEND_MODES.MULTIPLY
      }
    }
    u += 0.5
  }
  function flowerAnimation(delta) {
    becomeBig += 0.009
    anim(becomeBig)
    firstFlower.rotation -= 0.001 * delta
  }
  app.ticker.add(flowerAnimation)

  firstFlower.x = app.screen.width / 2
  firstFlower.y = app.screen.height / 2

  firstFlower.pivot.x = window.innerWidth / 2
  firstFlower.pivot.y = window.innerHeight / 2

  firstFlower.addChild(flower)
  // setTimeout(() => {
  //   app.ticker.remove(flowerAnimation)
  //   console.log(555)
  // }, 5000)
  // setTimeout(() => {
  //   app.ticker.add(flowerAnimation)
  //   console.log(555)
  // }, 8000)
  //endregion的firstFlower

  //region的crossBox
  const crossBox = new PIXI.Container()
  app.stage.addChild(crossBox)
  function createcrossBoxGradTexture() {
    // adjust it if somehow you need better quality for very very big images
    const quality = 120
    const canvas = document.createElement('canvas')

    canvas.width = quality
    canvas.height = 1

    const ctx = canvas.getContext('2d')

    // use canvas2d API to create gradient
    const grd = ctx.createLinearGradient(0, 0, 200, 0)

    grd.addColorStop(0.2, '#49bcb2')
    grd.addColorStop(0.4, '#49bcb2')
    grd.addColorStop(0.5, '#49def6')

    ctx.fillStyle = grd
    ctx.fillRect(0, 0, quality, 1)

    return PIXI.Texture.from(canvas)
  }

  const gradTexture = createcrossBoxGradTexture()

  //新建一个模糊滤镜
  const crossBoxBlur = new PIXI.BlurFilter()
  crossBoxBlur.blur = 1
  crossBoxBlur.quality = 50
  //
  // const crossBoxSpriteShadow = new PIXI.Sprite(gradTexture)
  //
  // crossBoxSpriteShadow.anchor.set(0.5)
  // crossBoxSpriteShadow.width = 180
  // crossBoxSpriteShadow.height = 280
  // // app.ticker.add(() => {
  // //   // just for fun, let's rotate mr rabbit a little
  // //   crossBoxSpriteShadow.rotation += 0.02
  // // })
  // crossBoxSpriteShadow.filters = [crossBoxBlur]
  // crossBox.addChild(crossBoxSpriteShadow)

  const crossBoxSprite = new PIXI.Sprite(gradTexture)

  crossBoxSprite.anchor.set(0.5)
  crossBoxSprite.rotation = 0.5
  crossBoxSprite.width = 400
  crossBoxSprite.height = 400
  app.ticker.add(() => {
    // just for fun, let's rotate mr rabbit a little
    crossBoxSprite.rotation += 0.02
  })
  crossBox.addChild(crossBoxSprite)
  //直接绘制圆角矩形实现

  const rectMask = new PIXI.Graphics()
  // rectMask.beginFill('black')
  rectMask.lineStyle(10, 'red', 1)
  rectMask.drawRoundedRect(-90, -140, 180, 280, 20)
  crossBoxSprite.mask = rectMask
  crossBox.pivot.set(0.5)
  crossBox.position.set(centerX, centerY)
  crossBox.addChild(rectMask)

  //region second box
  const crossBox2 = new PIXI.Container()
  app.stage.addChild(crossBox2)
  const crossBoxSprite2 = new PIXI.Sprite(gradTexture)

  crossBoxSprite2.anchor.set(0.5)
  crossBoxSprite2.rotation = 0.5
  crossBoxSprite2.width = 400
  crossBoxSprite2.height = 400
  app.ticker.add(() => {
    // just for fun, let's rotate mr rabbit a little
    crossBoxSprite2.rotation += 0.02
  })
  crossBox2.addChild(crossBoxSprite2)

  const rectMask2 = new PIXI.Graphics()
  // rectMask.beginFill('black')
  rectMask2.lineStyle(10, 'red', 1)
  rectMask2.drawRoundedRect(-90, -140, 180, 280, 20)
  crossBoxSprite2.mask = rectMask2
  crossBox2.pivot.set(0.5)
  crossBox2.position.set(centerX, centerY)
  crossBox2.addChild(rectMask2)
  //endregion second box

  // region third box
  const crossBox3 = new PIXI.Container()
  app.stage.addChild(crossBox3)
  const crossBoxSprite3 = new PIXI.Sprite(gradTexture)

  crossBoxSprite3.anchor.set(0.5)
  crossBoxSprite3.rotation = 0.5
  crossBoxSprite3.width = 400
  crossBoxSprite3.height = 400
  app.ticker.add(() => {
    // just for fun, let's rotate mr rabbit a little
    crossBoxSprite3.rotation += 0.02
  })
  crossBox3.addChild(crossBoxSprite3)
  const rectMask3 = new PIXI.Graphics()
  // rectMask.beginFill('black')
  rectMask3.lineStyle(10, 'red', 1)
  rectMask3.drawRoundedRect(-90, -140, 180, 280, 20)
  crossBoxSprite3.mask = rectMask3
  crossBox3.pivot.set(0.5)
  crossBox3.position.set(centerX, centerY)
  crossBox3.addChild(rectMask3)
  //endregion third box

  // region fourth box
  const crossBox4 = new PIXI.Container()
  app.stage.addChild(crossBox4)
  const crossBoxSprite4 = new PIXI.Sprite(gradTexture)

  crossBoxSprite4.anchor.set(0.5)
  crossBoxSprite4.rotation = 0.5
  crossBoxSprite4.width = 400
  crossBoxSprite4.height = 400
  app.ticker.add(() => {
    // just for fun, let's rotate mr rabbit a little
    crossBoxSprite4.rotation += 0.02
  })
  crossBox4.addChild(crossBoxSprite4)
  const rectMask4 = new PIXI.Graphics()
  // rectMask.beginFill('black')
  rectMask4.lineStyle(10, 'red', 1)
  rectMask4.drawRoundedRect(-90, -140, 180, 280, 20)
  crossBoxSprite4.mask = rectMask4
  crossBox4.pivot.set(0.5)
  crossBox4.position.set(centerX, centerY)
  crossBox4.addChild(rectMask4)
  //endregion fourth box

  // region fifth box
  const crossBox5 = new PIXI.Container()
  app.stage.addChild(crossBox5)
  const crossBoxSprite5 = new PIXI.Sprite(gradTexture)

  crossBoxSprite5.anchor.set(0.5)
  crossBoxSprite5.rotation = 0.5
  crossBoxSprite5.width = 400
  crossBoxSprite5.height = 400
  app.ticker.add(() => {
    // just for fun, let's rotate mr rabbit a little
    crossBoxSprite5.rotation += 0.02
  })
  crossBox5.addChild(crossBoxSprite5)
  const rectMask5 = new PIXI.Graphics()
  // rectMask.beginFill('black')
  rectMask5.lineStyle(10, 'red', 1)
  rectMask5.drawRoundedRect(-90, -140, 180, 280, 20)
  crossBoxSprite5.mask = rectMask5
  crossBox5.pivot.set(0.5)
  crossBox5.position.set(centerX, centerY)
  crossBox5.addChild(rectMask5)
  //endregion fifth box

  //region straw
  const straw = new PIXI.Container()
  app.stage.addChild(straw)

  const straw2 = new PIXI.Container()
  app.stage.addChild(straw2)

  const straw3 = new PIXI.Container()
  app.stage.addChild(straw3)

  const straw4 = new PIXI.Container()
  app.stage.addChild(straw4)

  const straw5 = new PIXI.Container()
  app.stage.addChild(straw5)

  const straw1 = PIXI.Assets.load(['straw1', 'straw2', 'straw3', 'straw4', 'straw5']) // => Promise<{flowerTop: Texture, eggHead: Texture}>
  straw1.then((texture) => {
    const rectMask = new PIXI.Graphics()
    rectMask.beginFill('black')
    rectMask.drawRoundedRect(-90, -140, 180, 280, 22)
    straw.addChild(rectMask)

    const flowerTop = PIXI.Sprite.from(texture.straw1)
    flowerTop.anchor.set(0.5)
    flowerTop.scale.set(0.3)
    flowerTop.mask = rectMask
    straw.pivot.set(0.5)
    straw.position.set(centerX, centerY)
    straw.addChild(flowerTop)

    //第二个
    const rectMask2 = new PIXI.Graphics()
    rectMask2.beginFill('black')
    rectMask2.drawRoundedRect(-90, -140, 180, 280, 22)
    straw2.addChild(rectMask2)

    const flowerTop2 = PIXI.Sprite.from(texture.straw2)
    flowerTop2.anchor.set(0.5)
    flowerTop2.scale.set(0.3)
    flowerTop2.mask = rectMask2
    straw2.pivot.set(0.5)
    straw2.position.set(centerX + centerX * 2, centerY)
    straw2.addChild(flowerTop2)
    //第三个
    const rectMask3 = new PIXI.Graphics()
    rectMask3.beginFill('black')
    rectMask3.drawRoundedRect(-90, -140, 180, 280, 22)
    straw3.addChild(rectMask3)

    const flowerTop3 = PIXI.Sprite.from(texture.straw3)
    flowerTop3.anchor.set(0.5)
    flowerTop3.scale.set(0.3)
    flowerTop3.mask = rectMask3
    straw3.pivot.set(0.5)
    straw3.position.set(centerX + centerX * 2, centerY)
    straw3.addChild(flowerTop3)

    //第四个
    const rectMask4 = new PIXI.Graphics()
    rectMask4.beginFill('black')
    rectMask4.drawRoundedRect(-90, -140, 180, 280, 22)
    straw4.addChild(rectMask4)

    const flowerTop4 = PIXI.Sprite.from(texture.straw4)
    flowerTop4.anchor.set(0.5)
    flowerTop4.scale.set(0.33)
    flowerTop4.position.set(-20, 0)
    flowerTop4.mask = rectMask4
    straw4.pivot.set(0.5)
    straw4.position.set(centerX + centerX * 2, centerY)
    straw4.addChild(flowerTop4)

    //第五个
    const rectMask5 = new PIXI.Graphics()
    rectMask5.beginFill('black')
    rectMask5.drawRoundedRect(-90, -140, 180, 280, 22)
    straw5.addChild(rectMask5)

    const flowerTop5 = PIXI.Sprite.from(texture.straw5)
    flowerTop5.anchor.set(0.5)
    flowerTop5.scale.set(0.39)
    flowerTop5.position.set(0, 0)
    flowerTop5.mask = rectMask5
    straw5.pivot.set(0.5)
    straw5.position.set(centerX + centerX * 2, centerY)
    straw5.addChild(flowerTop5)
  })
  //endregion straw

  // endregion的firstName
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.firstPage',
      start: 'top top',
      end: '+=6500',
      scrub: true,
      // markers: true,
      pin: true
    }
  })

  tl.addLabel('hello').fromTo(
    '.hello',
    {
      scale: 1
    },
    {
      duration: 1.8,
      scale: 2,
      opacity: 0
    }
  )

  tl.addLabel('flower').fromTo(
    [firstFlower],
    {
      pixi: { scale: 1 }
    },
    {
      duration: 1,
      pixi: { alpha: 0, scale: 1.2 },
      onComplete: () => {
        app.ticker.remove(flowerAnimation)
        console.log(555)
      },
      onReverseComplete: () => {
        app.ticker.add(flowerAnimation)

        console.log(55486)
      }
    },
    '<0.1'
  )

  tl.addLabel('appleCome').fromTo(
    ['.apple'],
    {
      opacity: 1,
      y: 800,
      onStart: () => {
        console.log(333333)
        // hello.value = false
      }
    },
    {
      y: 0,
      opacity: 1
    },
    '>0.15'
  )
  tl.addLabel('appleName').fromTo(
    ['.appleName'],
    {
      opacity: 0,
      y: 80
    },
    {
      y: 0,
      opacity: 1
    },
    '>0.3'
  )

  tl.addLabel('appleNameGo').fromTo(
    ['.appleName'],
    {
      y: 0
    },
    {
      y: -80,
      opacity: 0
    },
    '<1'
  )
  tl.addLabel('appleImg').fromTo(
    ['.appleImg'],
    {
      x: -50
    },
    {
      duration: 5,
      x: -350
    },
    '<'
  )
  tl.addLabel('appleName2').fromTo(
    ['.appleName2'],
    {
      opacity: 0,
      y: 80
    },
    {
      y: 0,
      opacity: 1
    },
    '<0.3'
  )

  tl.addLabel('appleName2Go').fromTo(
    ['.appleName2'],
    {
      y: 0
    },
    {
      y: -80,
      opacity: 0
    },
    '<0.8'
  )

  tl.addLabel('appleLeave').fromTo(
    ['.apple'],
    {
      y: 0
    },
    {
      duration: 0.5,
      y: -200,
      opacity: 0
    },
    '<0.3'
  )
  tl.addLabel('fanCome').fromTo(
    ['.fan'],
    { opacity: 0, left: -400, y: 100 },
    {
      stagger: 0.7,
      ease: 'none',
      duration: 2,
      y: -300,
      left: 600,
      opacity: 1.5
    },
    '>0.1'
  )
  tl.addLabel('fan2Come').fromTo(
    ['.fan2'],
    { opacity: 0, left: 800, y: 250 },
    {
      stagger: 0.7,
      ease: 'none',
      duration: 2,
      y: -100,
      left: -200,
      opacity: 1.8
    },
    '<1.8'
  )
  tl.addLabel('strawHelloCome').fromTo(
    ['.strawHello'],
    { opacity: 0, scale: 1 },
    {
      ease: 'power1.out',
      scale: 1,
      opacity: 1
    },
    '>0.1'
  )

  tl.addLabel('strawHelloGo').fromTo(
    ['.strawHello'],
    { scale: 1 },
    {
      ease: 'power1.out',
      scale: 2,
      opacity: 0
    },
    '>0.2'
  )

  tl.addLabel('crossBoxCome').fromTo(
    [crossBox, crossBox2, crossBox3, crossBox4, crossBox5],
    {
      pixi: { scale: 0.5, alpha: 0 }
    },
    {
      pixi: { scale: 0.5, alpha: 0 }
    },
    '<'
  )
  tl.addLabel('crossBoxGo').fromTo(
    [crossBox, crossBox2, crossBox3, crossBox4, crossBox5],
    {
      pixi: { scale: 0.5, alpha: 0 }
    },
    {
      stagger: 0.1,
      ease: 'none',
      pixi: { scale: 5, alpha: 15 }
    },
    '>'
  )

  tl.addLabel('strawCome').fromTo(
    [straw],
    {
      pixi: {
        scale: 0.2,
        alpha: 0
      }
    },
    {
      pixi: {
        scale: 1.6,
        alpha: 1
      }
    },
    '<0.35'
  )
  tl.addLabel('strawCome2').fromTo(
    [straw2],
    {
      pixi: {
        scale: 1.6,
        x: centerX + centerX * 2
      }
    },
    {
      pixi: {
        x: centerX
      }
    },
    '>0.35'
  )
  tl.addLabel('strawGo1').fromTo(
    [straw],
    {
      pixi: {
        x: centerX
      }
    },
    {
      pixi: {
        x: centerX - centerX * 2
      }
    },
    '<'
  )
  tl.addLabel('strawGo2').fromTo(
    [straw2],
    {
      pixi: {
        scale: 1.6,
        x: centerX
      }
    },
    {
      pixi: {
        x: centerX - centerX * 2
      }
    },
    '>0.35'
  )
  tl.addLabel('strawCome3').fromTo(
    [straw3],
    {
      pixi: {
        scale: 1.6,
        x: centerX + centerX * 2
      }
    },
    {
      pixi: {
        x: centerX
      }
    },
    '<'
  )
  tl.addLabel('strawGo3').fromTo(
    [straw3],
    {
      pixi: {
        scale: 1.6,
        x: centerX
      }
    },
    {
      pixi: {
        x: centerX - centerX * 2
      }
    },
    '>0.35'
  )
  tl.addLabel('strawCome4').fromTo(
    [straw4],
    {
      pixi: {
        scale: 1.6,
        x: centerX + centerX * 2
      }
    },
    {
      pixi: {
        x: centerX
      }
    },
    '<'
  )
  tl.addLabel('strawGo4').fromTo(
    [straw4],
    {
      pixi: {
        scale: 1.6,
        x: centerX
      }
    },
    {
      pixi: {
        x: centerX - centerX * 2
      }
    },
    '>0.35'
  )
  tl.addLabel('strawCome5').fromTo(
    [straw5],
    {
      pixi: {
        scale: 1.6,
        x: centerX + centerX * 2
      }
    },
    {
      pixi: {
        x: centerX
      }
    },
    '<'
  )
})
// regioncanvas部分
// onMounted(() => {
//   let canvas = document.getElementById('canvas'),
//     $ = canvas.getContext('2d'),
//     w = (canvas.width = window.innerWidth * devicePixelRatio),
//     h = (canvas.height = window.innerHeight * 0.55 * devicePixelRatio),
//     t = 0,
//     num = 400,
//     u = 0,
//     _u,
//     s,
//     a,
//     b,
//     x,
//     y,
//     _x,
//     _y,
//     _t = 1 / 800
//
//   let anim = function () {
//     $.globalCompositeOperation = 'source-over'
//     $.fillStyle = 'hsla(0,0%,0%,0.75)'
//     $.fillRect(0, 0, w, h)
//     $.globalCompositeOperation = 'lighter'
//     for (let i = 0; i < 2; i++) {
//       x = 0
//       _u = u / 2 + i
//       $.beginPath()
//       for (let j = 0; j < num; j++) {
//         x -= 2 * Math.sin(4)
//         y = (x * Math.sin(i + 3.0 * t + x / 20)) / 2
//         _x = x * Math.cos(b) - y * Math.sin(b)
//         _y = x * Math.sin(b) + y * Math.cos(b)
//         b = (j * 3 * Math.PI) / 6.8
//         $.lineWidth = 0.78
//         $.arc(w / 2 - _x, h / 2 - _y, 0.5, 0, 2 * Math.PI)
//       }
//       // 设置线性渐变
//       let g = $.createLinearGradient(w / 2 + _x, h / 2 + _y, 0, w / 2 + _x, h / 2 + _y)
//       g.addColorStop(0.0, `hsla(${u}, 40%, 40%, 0.4)`)
//       g.addColorStop(0.5, `hsla(${_u},40%, 40%, 0.4)`)
//       $.strokeStyle = g
//       $.stroke()
//     }
//     t += _t
//     u += 0.5
//     window.requestAnimationFrame(anim)
//   }
//   anim()
// })
// endregion的canvas部分
</script>

<template>
  <div>
    <div class="firstPage">
      <div class="hello">产品设计</div>
      <div
        class="appleName"
        style="
          margin-bottom: 50px;
          color: white;
          font-size: 25px;
          position: absolute;
          top: 25%;
          left: 10%;
        "
      >
        这是苹果全家桶
      </div>
      <div
        class="appleName2"
        style="
          margin-bottom: 50px;
          color: white;
          font-size: 25px;
          position: absolute;
          top: 25%;
          left: 10%;
        "
      >
        产自山东烟台
      </div>
      <div class="apple">
        <img class="appleImg" style="width: 180%" src="@/assets/picture/我的渲染图/33.jpg" alt="" />
      </div>
      <div class="fan">
        <img
          style="width: 160%; transform: translateX(-18%)"
          src="@/assets/picture/我的渲染图/IMG_20220611_122334.jpg"
          alt=""
        />
      </div>
      <div class="fan">
        <img
          style="width: 110%; transform: translateX(-3%)"
          src="@/assets/picture/我的渲染图/望远镜-渲染原稿练习.jpg"
          alt=""
        />
      </div>
      <div class="fan">
        <img
          style="width: 110%; transform: translate(-0)"
          src="@/assets/picture/我的渲染图/IMG_20220828_160326.jpg"
          alt=""
        />
      </div>
      <div class="fan2">
        <img
          style="width: 115%; transform: translate(-15px)"
          src="@/assets/picture/我的渲染图/mmexport1661308631259.jpg"
          alt=""
        />
      </div>
      <div class="fan2">
        <img
          style="width: 130%; transform: translate(-20px)"
          src="@/assets/picture/我的渲染图/橘子冰淇淋.jpg"
          alt=""
        />
      </div>
      <div class="fan2">
        <img
          style="width: 130%; transform: translate(-12%)"
          src="@/assets/picture/我的渲染图/qxlarge-dsc-913EC4B95A2C9C0582CA19630C1635F8.jpg"
          alt=""
        />
      </div>
      <div
        class="strawHello"
        style="
          margin-bottom: 50px;
          color: white;
          font-size: 30px;
          position: absolute;
          z-index: 30;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        "
      >
        吸管项目
      </div>
    </div>
    <div
      style="width: 100vw; height: 50vh; background-color: black; font-size: 20px; color: red"
    ></div>
    <div class="pictureBox secondPage">
      <img class="picture" src="@/assets/picture/产品展示.jpg" alt="" />
    </div>
    <div
      style="width: 100vw; height: 50vh; background-color: black; font-size: 20px; color: red"
    ></div>
  </div>
</template>

<style scoped>
.firstPage {
  height: 100vh;
  position: relative;
  z-index: 0;
  overflow: hidden;
  background-color: #000000;
}
.secondPage {
  height: 100vh;
  position: relative;
  z-index: 1;
  overflow: hidden;
  background-color: #000000;
}
.hello {
  color: white;
  position: absolute;
  top: 50vh;
  left: 50vw;
  transform: translate(-50%, -50%);
  font-size: 50px;
  text-align: center;
  font-family: '得意黑 斜体', serif;
  font-weight: bold;
}
.apple {
  width: 85%;
  height: 29%;
  top: 50vh;
  left: 50vw;
  overflow: hidden;
  border-radius: 10px;
  transform: translate(-50%, -50%);
  position: absolute;
}
.fan {
  width: 50vw;
  height: 27vh;
  top: 50vh;
  left: 30vw;
  overflow: hidden;
  border-radius: 10px;
  transform: translate(-50%, -50%);
  position: absolute;
}
.fan2 {
  width: 50vw;
  height: 27vh;
  top: 50vh;
  left: 30vw;
  overflow: hidden;
  border-radius: 10px;
  transform: translate(-50%, -50%);
  position: absolute;
}

.pictureBox {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
}
.picture {
  width: 540%;
  transform: translateX(0);
  animation: infinity 15s infinite linear;
}
@keyframes infinity {
  from {
    transform: translateX(-0);
  }
  to {
    transform: translateX(-66.65%);
  }
}
</style>
