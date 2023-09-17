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
    ['.hello', '#canvas'],
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
        gsap.set('.appleName', {
          opacity: 0
        })
      },

      onComplete: () => {
        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: '.firstPage',
            start: 'top top',
            end: '+=1500',
            scrub: true,
            pin: true
          }
        })

        tl.addLabel('start').fromTo(
          ['.hello', '#canvas'],
          {
            opacity: 1,
            scale: 1
          },
          {
            scale: 1.5,
            opacity: 0
          }
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
        tl.addLabel('apple').fromTo(
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
      }
    }
  )
})
onMounted(() => {})
// region的canvas部分
onMounted(() => {
  let canvas = document.getElementById('canvas'),
    $ = canvas.getContext('2d'),
    w = (canvas.width = window.innerWidth),
    h = (canvas.height = window.innerHeight),
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
  <div class="firstPage">
    <canvas id="canvas"></canvas>
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
    >
      苹果全家桶
    </div>
    <div class="apple">
      <img
        style="width: 180%; transform: translateX(-11%)"
        src="@/assets/picture/我的渲染图/33.jpg"
        alt=""
      />
    </div>
  </div>
  <div style="background-color: black; width: 100%; height: 500px"></div>
  <div class="pictureBox secondPage">
    <img class="picture" src="@/assets/picture/产品展示1.jpg" alt="" />
    <img class="picture" src="@/assets/picture/产品展示2.jpg" alt="" />
    <img class="picture" src="@/assets/picture/产品展示1.jpg" alt="" />
  </div>
  <div style="background-color: black; width: 100%; height: 350px"></div>
</template>

<style scoped>
canvas {
  position: absolute;
}
.firstPage {
  height: 100vh;
  position: relative;
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
  width: 180%;
  background-color: skyblue;
  transform: translateX(0);
  animation: infinity 20s infinite linear;
}
@keyframes infinity {
  from {
    transform: translateX(-0);
  }
  to {
    transform: translateX(-200%);
  }
}
</style>
