<template>
  <section class="w-full min-h-screen bg-amber-400 flex justify-center items-center">
    <div class="w-1/3 border bg-white border-gray-300 my-8 p-8 rounded">
      <h2 class="text-black font-extrabold text-3xl text-center">Register</h2>
      <p class="text-center my-4">Add Following details to get register yourself</p>
      <input
        type="text"
        class="p-2 mt-2 w-full text-lg border border-gray-300 rounded-lg outline-1 outline-amber-300"
        placeholder="Full Name"
        v-model="fullName"
      />
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
      <input
        type="password"
        class="p-2 mt-2 w-full text-lg border border-gray-300 rounded-lg outline-1 outline-amber-300"
        placeholder="Confirm Password"
        v-model="confirmPassword"
      />
      <button
        class="w-full my-3 py-2 px-6 text-white font-medium bg-amber-400 rounded-lg"
        @click="signup"
      >
        Sign Up
      </button>
    </div>
  </section>
</template>
<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { userStore } from '@/stores/user'

const user = userStore()

const fullName = ref('')
const userEmail = ref('')
const userPassword = ref('')
const confirmPassword = ref('')

const createUser = async (bodyData) => {
  await axios.post(`${import.meta.env.VITE_API_URL}/register`, bodyData).then((response) => {
    user.userData = response.data
    console.log(response.data)
  })
}

const signup = () => {
  if (userPassword.value === confirmPassword.value) {
    const body = {
      Name: fullName.value,
      Email: userEmail.value,
      Password: userPassword.value
    }
    const response = createUser(body)
    console.log(response)
    fullName.value = ''
    userEmail.value = ''
    userPassword.value = ''
    confirmPassword.value = ''
  }
}
</script>
<style lang=""></style>
