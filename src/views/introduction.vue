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

//region渐渐显出动画

// onMounted(() => {
//   ScrollTrigger.create({
//     trigger: '.circleb li',
//     start: 'top top',
//     end: '+=300',
//     scrub: true,
//     animation: gsap.from('.circleb li', {
//       duration: 1,
//       scale: 0.5,
//       y: -40,
//       ease: 'power3.inOut',
//       stagger: 0.05,
//       opacity: 0
//       // repeat: 100
//     })
//   })
// })
//endregion渐渐显出动画
//region动画随着滚动播放
// onMounted(() => {
//   ScrollTrigger.create({
//     trigger: '.videobox',
//     start: '300 center',
//     end: '+=5000',
//     scrub: true,
//     markers: true,
//     pin: true,
//     onUpdate(self) {
//       const video = document.querySelector('.video')
//       try {
//         video.currentTime = self.progress * video.duration
//       } catch (e) {
//         console.log(e)
//       }
//     }
//   })
// })
//endregion动画随着滚动播放
//region图片抛弃动画
// onMounted(() => {
//   ScrollTrigger.create({
//     trigger: '.demoPictrue img',
//     start: '50 600',
//     end: '+=800',
//     scrub: true,
//     animation: gsap.fromTo(
//       '.demoPictrue img',
//       { rotate: -5, y: 0 },
//       {
//         duration: 0.1,
//         rotate: 100,
//         skewY: -5,
//         x: 500,
//         y: -150,
//         ease: 'power3.inOut',
//         stagger: 0.01,
//         opacity: 1
//         // repeat: 100
//       }
//     )
//   })
// })
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
//endregion图片抛弃动画
//region点击元素消失

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
//endregion点击元素消失
</script>

<template>
  <div class="welcome"></div>
</template>

<style scoped>
.welcome {
  width: 100%;
  height: 844px;
  background-color: black;
}
body {
  width: 800px;
  scroll-behavior: smooth;
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
