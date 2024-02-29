import { ref } from 'vue'
import { defineStore } from 'pinia'

export const userStore = defineStore('user', () => {
  const userData = ref(null)

  const updateUser = (payload: any) => {
    console.log('Pinia Payload', payload)
    userData.value = payload
    console.log('Pinia UserData', userData.value)
  }

  const getUser = () => userData.value

  return {
    userData,
    updateUser,
    getUser
  }
})
