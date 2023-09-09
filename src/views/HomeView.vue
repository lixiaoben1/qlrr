<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <FirstHeader></FirstHeader>
      <FirstList></FirstList>
      <FirstTopic></FirstTopic>
      <SecondList></SecondList>
      <!--        <FirstFooter></FirstFooter>-->
    </div>
  </div>
</template>

<script setup>
import FirstHeader from '@/components/home/FirstHeader.vue'
import FirstList from '@/components/home/FirstList.vue'
import FirstTopic from '@/components/home/FirstTopic.vue'
import SecondList from '@/components/home/SecondList.vue'
import { onMounted } from 'vue'
import { gsap } from 'gsap'

// import FirstFooter from './components/FirstFooter'
//   components: { FirstTopic, FirstHeader, FirstList, SecondList }
onMounted(() => {
  gsap.from('.todo-wrap', {
    duration: 1,
    scale: 0.8,
    y: -40,
    ease: 'power3.inOut',
    opacity: 0
    // repeat: 100
  })
})
</script>

<style>
.todo-container {
  width: 100%;
  height: 900px;
  background-image: url('@/assets/picture/background.jpg');
  background-size: cover;
  position: relative;
}
</style>
