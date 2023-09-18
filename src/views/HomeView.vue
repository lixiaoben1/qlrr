<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <FirstHeader></FirstHeader>
      <FirstList></FirstList>
      <div class="topic-nav">web-nav</div>
      <FirstTopic></FirstTopic>
      <div class="wisdom">wisdom</div>

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
import { onMounted, watch } from 'vue'
import { gsap } from 'gsap'
import { useRoute } from 'vue-router'
const route = useRoute()

// import FirstFooter from './components/FirstFooter'
//   components: { FirstTopic, FirstHeader, FirstList, SecondList }
onMounted(() => {
  gsap.from('.todo-wrap>*', {
    duration: 1,
    y: -40,
    ease: 'power3.inOut',
    opacity: 0,
    stagger: 0.05
    // repeat: 100
  })
})
</script>

<style scoped>
.todo-container {
  width: 100%;
  height: 100%;
  background-image: url('@/assets/picture/background.jpg');
  background-size: cover;
  position: relative;
}
.topic-nav {
  position: absolute;
  width: 20%;
  font-family: '得意黑 斜体', serif;
  background-image: linear-gradient(to right, #002b79, #216cc4);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  top: 310px;
  left: 20px;
  font-size: 20px;
  font-weight: bold;
}
.wisdom {
  position: absolute;
  font-family: '得意黑 斜体', serif;
  background-image: linear-gradient(to right, #4e139b, #6813e7);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  top: 580px;
  left: 20px;
  font-size: 20px;
  font-weight: bold;
}
</style>
