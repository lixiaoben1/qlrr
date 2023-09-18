<script setup>
import { onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

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
  gsap.fromTo(
    ['#canvas'],
    {
      opacity: 0,
      scale: 1
    },
    {
      delay: 0,
      duration: 1,
      scale: devicePixelRatio,
      opacity: 1,
      stagger: 0.5
    }
  )
  gsap.fromTo(
    ['.hello'],
    {
      opacity: 0,
      scale: 0.5
    },
    {
      delay: 0,
      duration: 1,
      scale: 1,
      opacity: 1,
      stagger: 0.5,
      onStart: () => {
        gsap.set('.apple', {
          opacity: 0
        })
        gsap.set('.fan', {
          opacity: 0
        })
        gsap.set('.appleName', {
          opacity: 0
        })
      },

      onComplete: () => {
        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: '.firstPage',
            start: 'top top',
            end: '+=5500',
            scrub: true,
            markers: true,
            pin: true
          }
        })

        tl.addLabel('start').fromTo(
          ['.hello'],
          {
            opacity: 1,
            scale: 1
          },
          {
            scale: 1.5,
            opacity: 0
          }
        )
        tl.addLabel('startCanvas').fromTo(
          ['#canvas'],
          {
            opacity: 1,
            scale: devicePixelRatio
          },
          {
            scale: devicePixelRatio * 2,
            opacity: 0
          },
          '<'
        )
        tl.addLabel('appleName').fromTo(
          ['.appleName'],
          {
            opacity: 0,
            y: 500
          },
          {
            y: 0,
            opacity: 1
          },
          '<0.3'
        )
        tl.addLabel('appleCome').fromTo(
          ['.apple'],
          {
            opacity: 0,
            y: 500
          },
          {
            y: 0,
            opacity: 1
          },
          '<0.15'
        )

        tl.addLabel('appleLeave').fromTo(
          ['.apple'],
          {
            y: 0
          },
          {
            y: -200,
            opacity: 0
          },
          '>0.1'
        )
        tl.addLabel('fanCome').fromTo(
          ['.fan'],
          { opacity: 0.8, left: -100, y: 300 },
          {
            stagger: 0.6,
            ease: 'power1.out',
            duration: 2,
            y: -300,
            left: 580,
            opacity: 1
          },
          '<0.1'
        )
      }
    }
  )
})
onMounted(() => {
  console.log(window.devicePixelRatio)
})
// region的canvas部分
onMounted(() => {
  let canvas = document.getElementById('canvas'),
    $ = canvas.getContext('2d'),
    w = (canvas.width = window.innerWidth * devicePixelRatio),
    h = (canvas.height = window.innerHeight * devicePixelRatio),
    t = 0,
    num = 450,
    u = 0,
    _u,
    s,
    a,
    b,
    x,
    y,
    _x,
    _y,
    _t = 1 / 1000

  let anim = function () {
    $.globalCompositeOperation = 'source-over'
    $.fillStyle = 'hsla(0,0%,0%,0.75)'
    $.fillRect(0, 0, w, h)
    $.globalCompositeOperation = 'lighter'
    for (let i = 0; i < 2; i++) {
      x = 0
      _u = u / 4 + i
      $.beginPath()
      for (let j = 0; j < num; j++) {
        x -= 0.72 * Math.sin(4)
        y = (x * Math.sin(i + 3.0 * t + x / 20)) / 2
        _x = x * Math.cos(b) - y * Math.sin(b)
        _y = x * Math.sin(b) + y * Math.cos(b)
        b = (j * 3 * Math.PI) / 6.8
        $.lineWidth = 0.18
        $.arc(w / 2 - _x, h / 2 - _y, 0.5, 0, 2 * Math.PI)
      }
      // 设置线性渐变
      let g = $.createLinearGradient(w / 2 + _x, h / 2 + _y, 0, w / 2 + _x, h / 2 + _y)
      g.addColorStop(0.5, `hsla(${u}, 20%, 40%, 0.8)`)
      g.addColorStop(1, `hsla( ${_u},10%, 30%, 1)`)
      $.strokeStyle = g
      $.stroke()
    }
    t += _t
    u -= 0.2
    window.requestAnimationFrame(anim)
  }
  anim()
})
// endregion的canvas部分
</script>

<template>
  <div>
    <div class="firstPage">
      <canvas style="width: 100%; height: 100%" id="canvas"></canvas>
      <div class="card"><div class="mask"></div></div>
      <div class="hello">产品设计</div>
      <div
        class="appleName"
        style="
          margin-bottom: 50px;
          color: white;
          font-size: 40px;
          position: absolute;
          top: 25%;
          left: 10%;
        "
      ></div>
      <div class="apple">
        <img
          style="width: 180%; transform: translateX(-11%)"
          src="@/assets/picture/我的渲染图/33.jpg"
          alt=""
        />
      </div>
      <div class="fan">
        <img
          style="width: 190%; transform: translateX(-18%)"
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
          style="width: 210%; transform: translate(-25%)"
          src="@/assets/picture/我的渲染图/qxlarge-dsc-913EC4B95A2C9C0582CA19630C1635F8.jpg"
          alt=""
        />
      </div>
    </div>
    <div style="background-color: black; width: 100%; height: 500px"></div>
    <div class="pictureBox secondPage">
      <div>更多</div>
      <img class="picture" src="@/assets/picture/产品展示.jpg" alt="" />
    </div>
    <div style="background-color: black; width: 100%; height: 350px"></div>
  </div>
</template>

<style scoped>
.firstPage {
  height: 100vh;
  position: relative;
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
  width: 50%;
  height: 27%;
  top: 50vh;
  left: 30vw;
  overflow: hidden;
  border-radius: 10px;
  transform: translate(-50%, -50%);
  position: absolute;
}
/*region魔法方块盒子部分*/

@property --rotate {
  syntax: '<angle>';
  initial-value: 132deg;
  inherits: false;
}

.card {
  opacity: 0;
  width: 200px;
  height: 300px;
  padding: 3px;
  position: absolute;
  left: 50vw;
  top: 50vh;
  transform: translate(-50%, -50%);
  cursor: pointer;
}
.mask {
  width: 200px;
  height: 300px;
  position: absolute;
  border-radius: 6px;
  z-index: 3;
  background-color: black;
}
.card::before {
  content: '';
  width: 104%;
  height: 102%;
  border-radius: 8px;
  background-image: linear-gradient(var(--rotate), #5ddcff, #3c67e3 43%, #4e00c2);
  position: absolute;
  z-index: 2;
  top: -1%;
  left: -2%;
  animation: spin 2.5s linear infinite;
}

.card::after {
  position: absolute;
  content: '';
  top: 50px;
  left: 0;
  right: 0;
  z-index: 1;
  height: 100%;
  width: 100%;
  margin: 0 auto;
  transform: scale(0.8);
  filter: blur(80px);
  background-image: linear-gradient(var(--rotate), #5ddcff, #3c67e3 43%, #4e00c2);
  opacity: 1;
  transition: opacity 0.5s;
  animation: spin 2.5s linear infinite;
}

@keyframes spin {
  0% {
    --rotate: 0deg;
  }
  100% {
    --rotate: 360deg;
  }
}
/*endregion魔法方块盒子部分*/

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
