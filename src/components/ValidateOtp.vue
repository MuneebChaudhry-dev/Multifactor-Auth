<script setup>
import { ref } from 'vue'
import { useAxios } from '../composable/axios'
import { useRouter } from 'vue-router'
import { userStore } from '@/stores/user'
import BaseButton from './common/BaseButton.vue'
import BaseInput from './common/BaseInput.vue'

const { getUser } = userStore()
const otp = ref(null)
const router = useRouter()

const validate2FA = async () => {
  const user = getUser()
  const payload = { user_id: user.id, token: otp.value }
  const { data: authorizedUserData, error } = await useAxios(`/otp/validate`, 'post', payload)
  if (authorizedUserData.value && authorizedUserData.value.otp_valid) {
    router.push('/profile')
  } else {
    alert(error.value)
  }
}
</script>

<template>
  <section class="w-full h-screen bg-amber-400 flex justify-center items-center">
    <div class="bg-white rounded w-1/4 border border-gray-300 my-8 p-8">
      <h2 class="text-black font-extrabold text-3xl text-center">Two-Factor Authentication</h2>
      <p class="text-center my-4">
        Open the two-step verification app from your mobile and get your verification code
      </p>
      <BaseInput type="text" placeholder="Authentication Code" v-model="otp" />

      <BaseButton type="primary" size="large" @click="validate2FA"> Authenticate </BaseButton>
    </div>
  </section>
</template>

<style lang=""></style>
