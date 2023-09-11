<template>
  <div>
    <div class="topic">
      <div class="topic-item">
        <span class="topic-item-round">
          <box-icon
            style="
              opacity: 0.5;
              position: absolute;
              top: 42%;
              left: 50%;
              transform: translate(-50%, -50%);
            "
            name="shopping-bag"
            size="20px"
          ></box-icon>
          <!--          <img style="opacity: 0.5; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)" src="../assets/picture/图标/bx-shopping-bag.svg" alt="" />-->
        </span>
        <span
          data-id="1"
          style="vertical-align: middle; margin-left: 10px; font-family: '得意黑 斜体', serif"
          >Shopping store</span
        >
      </div>
      <hr />
      <div class="topic-item">
        <span class="topic-item-round"
          ><box-icon
            style="
              opacity: 0.5;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
            "
            name="message-dots"
            size="20px"
          ></box-icon>
        </span>
        <span
          data-id="2"
          style="vertical-align: middle; margin-left: 10px; font-family: '得意黑 斜体', serif"
          >Chat-gpt</span
        >
      </div>
      <hr />
      <div class="topic-item">
        <span class="topic-item-round"
          ><box-icon
            style="
              opacity: 0.5;
              position: absolute;
              top: 42%;
              left: 50%;
              transform: translate(-50%, -50%);
            "
            name="popsicle"
            size="20px"
          ></box-icon
        ></span>
        <span
          data-id="3"
          style="vertical-align: middle; margin-left: 10px; font-family: '得意黑 斜体', serif"
          >Entertainment</span
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import 'boxicons'
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

  /*background-color: #628bd7;*/
  height: 30px;
  /*border-radius: 50%;*/
}
.topic-item-round {
  width: 30px;
  vertical-align: middle;
  height: 30px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  box-shadow:
    inset 1px 1px 6px rgba(255, 255, 255, 0.3),
    1px 15px 15px rgba(0, 0, 0, 0.1);

  display: inline-block;
}
hr {
  border: #888888 solid 1px;
}
/*endregion主题*/
</style>
