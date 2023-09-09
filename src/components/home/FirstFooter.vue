<template>
  <div class="todo-footer">
    <label>
      <input type="checkbox" :checked="allCheck()" @click="checkAll" />
    </label>
    <span>
      <span>已完成{{ allDone }}</span> / 全部{{ todos.length }}
    </span>
    <button class="btn btn-danger" @click="clear()">清除已完成任务</button>
  </div>
</template>

<script>
export default {
  name: 'FirstFooter',
  props: ['todos'],
  computed: {
    allDone() {
      return this.todos.reduce((pre, current) => {
        return pre + (current.done ? 1 : 0)
      }, 0)
    }
  },
  methods: {
    allCheck() {
      return this.allDone === this.todos.length && this.todos.length > 0
    },
    checkAll(e) {
      this.$emit('checkAlltodo', e.target.checked)
    },
    clear() {
      this.$emit('clearAll', true)
    }
  }
}
</script>

<style scoped>
/*footer*/
.todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}

.todo-footer label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}

.todo-footer label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
  margin-right: 5px;
}

.todo-footer button {
  float: right;
  margin-top: 5px;
}
</style>
