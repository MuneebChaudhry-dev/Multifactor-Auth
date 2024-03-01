<script setup>
import { ref } from 'vue'
import { useAxios } from '../composable/axios'
import { useRouter } from 'vue-router'
import BaseButton from './common/BaseButton.vue'
import BaseInput from './common/BaseInput.vue'

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
    const { data: userData, error } = await useAxios(`/register`, 'post', payload)
    console.log(userData.value)
    if (userData.value.status === 'success') {
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
<template>
  <section class="w-full min-h-screen bg-amber-400 flex justify-center items-center">
    <div class="w-1/3 border bg-white border-gray-300 my-8 p-8 rounded">
      <h2 class="text-black font-extrabold text-3xl text-center">Register</h2>
      <p class="text-center my-4">Add Following details to get register yourself</p>

      <BaseInput type="text" placeholder="Full Name" v-model="user.fullname" />
      <BaseInput type="email" placeholder="Email" v-model="user.email" />
      <BaseInput type="password" placeholder="Password" v-model="user.password" />
      <BaseInput type="password" placeholder="Confirm Password" v-model="user.confirmPass" />

      <BaseButton type="primary" size="large" @btn-click="signup"> Sign Up </BaseButton>
    </div>
  </section>
</template>

<style lang=""></style>
