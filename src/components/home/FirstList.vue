<template>
  <Swiper
    ref="swiper1"
    class="swiper-container"
    :modules="modules"
    :slidesPerView="2.26"
    :slides-offset-before="swiperValue.slidesOffsetBefore"
    space-between="15"
    :freeMode="true"
    @swiper="onSwiper"
  >
    <!-- shadow -->
    <swiper-slide @click="router.push('/picture')" class="swiper-slide">
      <img src="@/assets/picture/主页3d图/5.svg" alt="" />
      <div class="picture-3d">resume</div>
      <div class="picture-3d">个人简介</div>
    </swiper-slide>
    <swiper-slide class="swiper-slide">
      <img src="@/assets/picture/主页3d图/3.svg" alt="" />
      <div class="picture-3d">honorary</div>
      <div class="picture-3d">荣誉证书</div>
    </swiper-slide>
    <swiper-slide class="swiper-slide">
      <img src="@/assets/picture/主页3d图/7.svg" alt="" />
      <div class="picture-3d">ID-design</div>
      <div class="picture-3d">产品设计</div>
    </swiper-slide>
    <swiper-slide class="swiper-slide">
      <img src="@/assets/picture/主页3d图/4.svg" alt="" />
      <div class="picture-3d">more</div>
      <div class="picture-3d">敬请期待！</div>
    </swiper-slide>
  </Swiper>
</template>

<script setup>
// import Swiper from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
// import { Autoplay, Scrollbar, FreeMode } from 'swiper/modules'
import { useRouter } from 'vue-router'
// import 'swiper/css'
// import 'swiper/css/autoplay'
import { reactive, ref } from 'vue'
// const modules = [Autoplay, Scrollbar, FreeMode]
const router = useRouter()

const swiperValue = reactive({
  slidesPerView: 2.26,
  slidesOffsetBefore: window.innerWidth * 0.05
})
const swiper = ref()
const onSwiper = (swiper) => {
  setTimeout(() => {
    swiper.slideTo(1, 1000, false)
  }, 1000)
  setTimeout(() => {
    swiper.slideTo(0, 1000, false)
  }, 2000)
}
</script>

<style scoped>
/*region轮播图模块*/
body {
  /*background: #eee;*/
  font-family:
    Helvetica Neue,
    Helvetica,
    Arial,
    sans-serif;
  font-size: 14px;
  color: #000;
  margin: 0;
  padding: 0;
}

.swiper-container {
  width: 100%;
  height: 300px;
}

.swiper-slide {
  top: 20px;
  width: 100%;
  height: 210px;
  font-size: 18px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 35px;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  box-shadow:
    inset 1px 1px 6px rgba(255, 255, 255, 0.3),
    1px 15px 15px rgba(0, 0, 0, 0.1);

  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  flex-wrap: wrap;
  align-content: start;
  /*-webkit-box-pack: center;*/
  /*-ms-flex-pack: center;*/
  /*-webkit-justify-content: center;*/
  justify-content: center;
  /*-webkit-box-align: center;*/
  /*-ms-flex-align: center;*/
  /*-webkit-align-items: center;*/
  /*align-items: center;*/
}

.swiper-slide img {
  display: block;
  width: 60%;
  height: 60%;
  margin-top: 20px;
  margin-left: 20%;
  margin-right: 20%;
  cursor: pointer;
}
.picture-3d {
  width: 100%;
  font-family: '得意黑 斜体', serif;
  font-weight: bold;
  //padding-left: 25%;
  margin-left: 20%;
  /*height: 158px;*/
}
</style>
