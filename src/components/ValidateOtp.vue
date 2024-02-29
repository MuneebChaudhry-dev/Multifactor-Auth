<template>
  <section class="w-full h-screen bg-amber-400 flex justify-center items-center">
    <div class="bg-white rounded w-1/4 border border-gray-300 my-8 p-8">
      <h2 class="text-black font-extrabold text-3xl text-center">Two-Factor Authentication</h2>
      <p class="text-center my-4">
        Open the two-step verification app from your mobile and get your verification code
      </p>
      <input
        type="text"
        class="p-2 w-full text-lg border border-gray-300 rounded-lg outline-1 outline-amber-300"
        placeholder="Authentication Code"
        v-model="otp"
      />
      <button
        class="w-full my-3 py-2 px-6 text-white font-medium bg-amber-400 rounded-lg"
        @click="validate2FA"
      >
        Authenticate
      </button>
    </div>
  </section>
</template>
<script setup>
import { ref } from 'vue'
import { useAxios } from '../composable/axios'
import { useRouter } from 'vue-router'
import { userStore } from '@/stores/user'

const { getUser } = userStore()
const otp = ref(null)
const router = useRouter()

const validate2FA = async () => {
  const user = getUser()
  const payload = { user_id: user.id, token: otp.value }
  const { data, error } = await useAxios(
    `${import.meta.env.VITE_API_URL}/otp/validate`,
    'POST',
    payload
  )
  if (data && data.value.otp_valid) {
    router.push('/profile')
  } else {
    alert(error.value)
  }
}
</script>
<style lang=""></style>
