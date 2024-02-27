<template>
  <section class="w-full h-100 bg-amber-400 flex justify-center items-center">
    <div class="w-1/3 border bg-white border-gray-300 my-8 p-8 rounded">
      <h2 class="text-black font-extrabold text-3xl text-center">Login</h2>
      <p class="text-center my-4">Add Following details to get register yourself</p>

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

      <button
        class="w-full my-3 py-2 px-6 text-white font-medium bg-amber-400 rounded-lg"
        @click="login"
      >
        Login
      </button>
    </div>
  </section>
</template>
<script setup>
import { ref } from 'vue'
import axios from 'axios'

const userEmail = ref('')
const userPassword = ref('')

const loginUser = async (bodyData) => {
  await axios.post(`${import.meta.env.VITE_API_URL}/create-user`, bodyData).then((response) => {
    console.log(response.data)
  })
}

const login = () => {
  if (userPassword.value !== '' && userPassword.value !== '') {
    const body = {
      Email: userEmail.value,
      Password: userPassword.value
    }
    const response = loginUser(body)
    console.log(response)
    fullName.value = ''
    userEmail.value = ''
    userPassword.value = ''
    confirmPassword.value = ''
  }
}
</script>
<style lang=""></style>
