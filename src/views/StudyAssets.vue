<script setup>
import { ref, watch } from 'vue'
// 引入路由组件
import { useRouter } from 'vue-router'
// 引入路由

const router = useRouter()

const chapters = ref('')
watch(chapters, (newVal) => {
  if (newVal === '心衰药') {
    router.push('/study/heartFailure')
  } else if (newVal === '抗高血压药') {
    ElMessage({
      message: '敬请期待',
      type: 'success'
    })
  }
  console.log(newVal)
})
</script>

<template>
  <div>
    <div class="container">
      <ul class="items">
        <li><router-link to="/study/allFile">药品汇总</router-link></li>
        <li>
          <select v-model="chapters" name="chapters" id="ssss">
            <option value="">选择科目</option>
            <option value="心衰药">心衰药</option>
            <option value="抗高血压药">抗高血压药</option>
          </select>
        </li>
        <li>复习资料</li>
      </ul>
    </div>
    <div class="content">
      <router-view />
    </div>
  </div>
  <!--  <div>-->
  <!--    <vue-office-pdf :src="pdf" />-->
  <!--    <div style="width: 100vw; height: 500px">-->
  <!--      <img-->
  <!--        style="width: 100%"-->
  <!--        src="https://s1.imagehub.cc/images/2023/10/14/2c4529ccad4ca01729b8927716f53999.jpeg"-->
  <!--        alt="2c4529ccad4ca01729b8927716f53999.jpeg"-->
  <!--      />-->
  <!--    </div>-->
  <!--  </div>-->
</template>

<style scoped>
.container {
  position: fixed;
  z-index: 2;
  width: 100vw;
  height: 60px;
  background-color: rgba(234, 227, 227, 1);
}
.content {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 60px;
  overflow: auto;
}
.items {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
}
ul li {
  background-color: #ffffff;
  width: 100px;
  height: 30px;
  border-radius: 6px;
  text-align: center;
  line-height: 30px;
}
select {
  width: 100px;
  height: 30px;
  border-radius: 6px;
  border: none;
  text-align: center;
  background-color: white;
  outline: none;
  /*文本大小*/
  font-size: 12px;
}
</style>
