<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { userStore } from '@/stores/user'
import { useAxios } from '../composable/axios'
import BaseButton from './common/BaseButton.vue'

const { updateUser } = userStore()
const userEmail = ref('')
const userPassword = ref('')
const router = useRouter()

const login = async () => {
  if (userPassword.value !== '' && userPassword.value !== '') {
    const payload = {
      Email: userEmail.value,
      Password: userPassword.value
    }
    const { data: userData, error } = await useAxios(`/login`, 'POST', payload)

    if (userData.value.status === 'success') {
      updateUser(userData.value.user)
      if (userData.value.user.otp_enabled) {
        router.push('/validate')
      } else {
        router.push('/profile')
      }
    } else {
      alert(error.value)
    }
    console.log('Login REs', userData.value)
    userEmail.value = ''
    userPassword.value = ''
  }
}
</script>
<template>
  <section class="w-full h-screen bg-amber-400 flex justify-center items-center">
    <div class="w-1/3 border bg-white border-gray-300 my-8 p-8 rounded">
      <h2 class="text-black font-extrabold text-3xl text-center">Login</h2>
      <p class="text-center my-4">Add the following credentials</p>

      <input
        type="email"
        class="p-2 mt-2 w-full text-lg border border-gray-300 rounded-lg outline-1 outline-amber-300"
        placeholder="Email"
        v-model="userEmail"
      />
      <input
        type="password"
        class="p-2 mt-2 w-full text-lg border border-gray-300 rounded-lg outline-1 outline-amber-300"
        placeholder="Password"
        v-model="userPassword"
      />

      <BaseButton type="primary" size="large" @btn-click="login"> Login </BaseButton>
    </div>
  </section>
</template>

<style lang=""></style>
