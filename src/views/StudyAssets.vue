<script setup>
import { onMounted, ref, watch } from 'vue'
// 引入路由组件
import { useRouter } from 'vue-router'
// 引入路由

const router = useRouter()

const chapters = ref('')

onMounted(() => {
  if (document.querySelector('.loadingMask')) {
    document.querySelector('.loadingMask').remove()
  }
})
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
        <li>
          <div style="cursor: pointer" @click="router.replace('/study/allFile')">药品汇总</div>
        </li>
        <li>
          <select v-model="chapters" name="chapters" id="ssss">
            <option value="">选择科目</option>
            <option value="心衰药">心衰药</option>
            <option value="抗高血压药">抗高血压药</option>
          </select>
        </li>
        <li>
          <div style="cursor: pointer" @click="router.replace('/study/iframe')">复习资料</div>
        </li>
      </ul>
    </div>
    <div class="content">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>
  </div>
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
