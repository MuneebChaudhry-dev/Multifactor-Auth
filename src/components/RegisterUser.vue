<template>
  <section class="w-full min-h-screen bg-amber-400 flex justify-center items-center">
    <div class="w-1/3 border bg-white border-gray-300 my-8 p-8 rounded">
      <h2 class="text-black font-extrabold text-3xl text-center">Register</h2>
      <p class="text-center my-4">Add Following details to get register yourself</p>
      <input
        type="text"
        class="p-2 mt-2 w-full text-lg border border-gray-300 rounded-lg outline-1 outline-amber-300"
        placeholder="Full Name"
        v-model="user.fullname"
      />
      <input
        type="email"
        class="p-2 mt-2 w-full text-lg border border-gray-300 rounded-lg outline-1 outline-amber-300"
        placeholder="Email"
        v-model="user.email"
      />
      <input
        type="password"
        class="p-2 mt-2 w-full text-lg border border-gray-300 rounded-lg outline-1 outline-amber-300"
        placeholder="Password"
        v-model="user.password"
      />
      <input
        type="password"
        class="p-2 mt-2 w-full text-lg border border-gray-300 rounded-lg outline-1 outline-amber-300"
        placeholder="Confirm Password"
        v-model="user.confirmPass"
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
import { useAxios } from '../composable/axios'
import { useRouter } from 'vue-router'

const router = useRouter()

const defaultUser = {
  fullname: '',
  email: '',
  password: '',
  confirmPass: ''
}

const user = ref(defaultUser)

const signup = async () => {
  if (user.value.password === user.value.confirmPass) {
    const payload = {
      Name: user.value.fullname,
      Email: user.value.email,
      Password: user.value.password
    }
    const { data, error } = await useAxios(`/register`, 'POST', payload)
    console.log(data.value)
    if (data.value.status === 'success') {
      router.push('/login')
    } else {
      alert('Error', error.value)
    }
    user.value = defaultUser
  } else {
    alert("Password Doesn't Match")
  }
}
</script>
<style lang=""></style>
