<script setup>
import { gsap } from 'gsap'
import { ref, onMounted } from 'vue'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
// const scroll = ScrollTrigger()
const circle = ref(null)

// gsap.to('.circleb li', {
//   scrollTrigger: '.circleb li', // start the animation when ".box" enters the viewport (once)
//   scale: 0.5
// })
onMounted(() => {
  ScrollTrigger.create({
    trigger: '.circleb li',
    start: 'top top',
    end: '+=300',
    scrub: true,
    animation: gsap.from('.circleb li', {
      duration: 1,
      scale: 0.5,
      y: -40,
      ease: 'power3.inOut',
      stagger: 0.05,
      opacity: 0
      // repeat: 100
    })
  })
})
onMounted(() => {
  ScrollTrigger.create({
    trigger: '.videobox',
    start: 'top top',
    end: '+=5000',
    scrub: true,
    pin: true,
    onUpdate(self) {
      const video = document.querySelector('.video')
      try {
        video.currentTime = self.progress * video.duration
      } catch (e) {
        console.log(e)
      }
    }
  })
})

onMounted(() => {
  ScrollTrigger.create({
    trigger: '.demoPictrue img',
    start: '0',
    markers: true,
    end: '800',
    scrub: true,
    animation: gsap.fromTo(
      '.demoPictrue img',
      { rotate: -5, y: 0 },
      {
        duration: 1,
        rotate: 100,
        skewY: -5,
        x: 500,
        y: -150,
        ease: 'power3.inOut',
        stagger: 0.05,
        opacity: 1
        // repeat: 100
      }
    )
  })
})
// onMounted(() => {
//   gsap.from('.circleb li', {
//     duration: 1,
//     scale: 0.5,
//     y: -40,
//     ease: 'power3.inOut',
//     stagger: 0.05,
//     opacity: 0
//     // repeat: 100
//   })
// })

// const start = (e) => {
//   console.log(e.target.id)
//   gsap.to(`.circleb li:nth-child(${e.target.id})`, {
//     duration: 1,
//     y: -40,
//     ease: 'power3.inOut',
//     stagger: 0.01,
//     opacity: 0
//     // repeat: 100
//   })
// }
</script>

<template>
  <div style="height: 844px"></div>
  <div class="demoPictrue">
    <img class="pictrue" src="@/assets/picture/slider01.jpg" alt="" />
    <img class="pictrue" src="@/assets/picture/slider02.jpg" alt="" />
    <img class="pictrue" src="@/assets/picture/slider03.jpg" alt="" />
  </div>
  <hr />
  <ul style="display: flex; flex-wrap: wrap" class="circleb" ref="circle">
    <li v-for="(item, index) in 72" class="circle" :ref="index"></li>
  </ul>
  <br />
  <el-button @click="start">222</el-button>
  <hr />
  <div class="videobox" style="width: 100%">
    <video
      style="width: 100%"
      preload
      src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4 "
      class="video"
      muted
    ></video>
  </div>
</template>

<style scoped>
body {
  width: 100%;
}

button {
  width: 50px;
}
.pictrue {
  width: 60%;
}
.circle {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: skyblue;
  margin-top: 20px;
  margin-right: 5px;
}
</style>
