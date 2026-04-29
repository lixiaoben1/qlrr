import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'login',
  () => {
    //存储数据用ref
    const token = ref('')
    //想要修改数据用函数
    const setToken = (newToken) => {
      token.value = newToken
    }
    const removeToken = () => {
      token.value = ''
    }
    return { token, setToken, removeToken }
  },
  {
    persist: true
  }
)

export const useChatStore = defineStore(
  'chat',
  () => {
    const chatList = ref()
    const setChatList = (newChatList) => {
      chatList.value = newChatList
    }
    const addChat = (newChat) => {
      chatList.value.push(newChat)
    }
    return { chatList, setChatList, addChat }
  },
  {
    persist: true
  }
)
