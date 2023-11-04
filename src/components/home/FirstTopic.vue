<template>
  <div>
    <div class="topic">
      <div class="topic-item">
        <div class="topic-item-round">
          <img
            style="opacity: 0.5; cursor: pointer"
            src="@/assets/picture/图标/bx-shopping-bag.svg"
            alt=""
          />
        </div>
        <div
          data-id="1"
          style="
            vertical-align: middle;
            margin-left: 10px;
            font-family: '得意黑 斜体', serif;
            cursor: pointer;
          "
        >
          Shopping store
        </div>
      </div>
      <hr />
      <div @click="router.push('/chat')" class="topic-item">
        <div class="topic-item-round">
          <img
            style="opacity: 0.5; cursor: pointer"
            src="@/assets/picture/图标/bx-message-square-dots.svg"
            alt=""
          />
        </div>
        <div
          data-id="2"
          style="
            vertical-align: middle;
            margin-left: 10px;
            font-family: '得意黑 斜体', serif;
            cursor: pointer;
          "
        >
          Chat-gpt
        </div>
      </div>
      <hr />
      <div @click="router.push('/ppt')" class="topic-item">
        <div class="topic-item-round">
          <img
            style="opacity: 0.5; cursor: pointer"
            src="@/assets/picture/图标/bx-popsicle.svg"
            alt=""
          />
        </div>
        <div
          data-id="3"
          style="
            vertical-align: middle;
            margin-left: 10px;
            font-family: '得意黑 斜体', serif;
            cursor: pointer;
          "
        >
          Entertainment-PPT
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
//使用路由
const router = useRouter()
</script>

<style scoped>
/*region主题*/

.topic {
  width: 90%;
  height: 200px;
  display: flex;
  box-sizing: border-box;
  padding: 0 20px;
  flex-direction: column;
  justify-content: space-evenly;
  margin: 0 auto;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 30px;
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  box-shadow:
    inset 1px 1px 6px rgba(255, 255, 255, 0.3),
    1px 15px 15px rgba(0, 0, 0, 0.1);
}
.topic-item {
  width: 100%;
  font-size: 16px;
  font-weight: 700;
  line-height: 30px;
  display: flex;
  /*background-color: #628bd7;*/
  height: 30px;
  /*border-radius: 50%;*/
}
.topic-item-round {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  box-shadow:
    inset 1px 1px 6px rgba(255, 255, 255, 0.3),
    1px 15px 15px rgba(0, 0, 0, 0.1);
}
img {
  width: 20px;
  height: 20px;
  margin-top: 5px;
  margin-left: 5px;
}
hr {
  border: #888888 solid 1px;
}
/*endregion主题*/
</style>
