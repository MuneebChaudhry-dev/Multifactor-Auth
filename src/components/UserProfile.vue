<template>
  <div class="w-full bg-amber-400 p-8">
    <div class="bg-white rounded p-16 flex justify-between gap-44" v-show="!showQR">
      <div v-if="userInfo">
        <h3 class="font-semibold text-2xl capitalize">personal page</h3>
        <ul class="list-none mt-4 space-y-2">
          <li class="text-wrap break-words">ID: {{ userInfo.id }}</li>
          <li>Name: {{ userInfo.name }}</li>
          <li>Email: {{ userInfo.email }}</li>
        </ul>
      </div>
      <div>
        <h3 class="font-semibold text-2xl capitalize">mobile app authenticaiton (2FA)</h3>
        <p class="mt-2">Secure your account with TOTP two factor authentication</p>
        <div class="mt-2">
          <button
            class="px-4 py-2 rounded-lg bg-amber-300 hover:bg-amber-400 font-medium"
            @click="toggle2FA"
          >
            {{ userInfo.otp_enabled ? 'Disable 2FA' : 'Setup 2FA' }}
          </button>
        </div>
      </div>
    </div>
    <!---Show QR here-->
    <div class="bg-white rounded flex justify-center mt-8" v-show="showQR">
      <div class="w-1/2 border border-gray-300 my-8">
        <div class="p-4 border-b border-gray-300">
          <h3 class="font-semibold text-2xl">Two-Factor Authentication (2FA)</h3>
        </div>
        <div class="p-4">
          <div class="mt-4">
            <h4 class="font-semibold text-lg text-amber-400 border-b border-gray-300">
              Configure Google Authenticator or Authy
            </h4>
            <ol class="list-decimal mt-4 space-y-3 pl-6">
              <li>Install google Authenticator (IOS - Android) or Authy (IOS - Android)</li>
              <li>In Authenticator app select "+" icon</li>
              <li>
                Select "Scan barcode (or QR code) and use the phone's camera to scan this barcode"
              </li>
            </ol>
          </div>
          <div class="mt-4">
            <h4 class="font-semibold text-lg text-amber-400 border-b border-gray-300">
              Scan QR Code
            </h4>
            <div class="flex justify-center py-4">
              <img :src="qrImageData" />
            </div>
          </div>
          <div class="mt-4">
            <h4 class="font-semibold text-lg text-amber-400 border-b border-gray-300">
              Or Enter Code Into Your App
            </h4>
            <p class="py-3">SecretKey: {{ otpInfo?.base32 }}</p>
          </div>
          <div class="mt-4 border-b border-gray-300 pb-2">
            <h4 class="font-semibold text-lg text-amber-400 border-b border-gray-300">
              Verify Code
            </h4>
            <p class="py-3">For changing the setting, please verify the authentication code:</p>

            <input
              type="text"
              class="p-2 text-lg border border-gray-300 rounded-lg outline-1 outline-amber-300"
              placeholder="Authentication Code"
              v-model="otp"
            />
          </div>
          <div class="my-4 flex justify-start gap-4">
            <button class="py-2 px-6 text-gray-500 font-medium border border-slate-200 rounded-lg">
              Close
            </button>
            <button
              class="py-2 px-6 text-white font-medium bg-amber-400 rounded-lg"
              @click="verify2FA"
            >
              Verify & Activate
            </button>
            <button></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="">
import { ref, watch, watchEffect } from 'vue'
import axios from 'axios'
import QRCode from 'qrcode'

import { userStore } from '@/stores/user'

const user = userStore()

const userInfo = ref(null)
const otpInfo = ref(null)
const qrImageData = ref('')
const otp = ref(null)
const is2FA = ref(false)
const showQR = ref(false)

const toggle2FA = () => {
  if (userInfo.value.otp_enabled) {
    disable2FA()
  } else {
    setup2FA()
  }
}

const setup2FA = async () => {
  is2FA.value = true

  const userId = { user_id: userInfo.value.id }
  await axios.post(`${import.meta.env.VITE_API_URL}/otp/generate`, userId).then((response) => {
    otpInfo.value = response.data
    QRCode.toDataURL(otpInfo.value.otpauth_url).then((response) => {
      qrImageData.value = response
      showQR.value = true
    })
  })
}
const verify2FA = async () => {
  const payload = { user_id: userInfo.value.id, token: otp.value }
  await axios.post(`${import.meta.env.VITE_API_URL}/otp/verify`, payload).then((response) => {
    console.log(response.data)
    if (response.data.otp_verified) {
      alert('OTP Verified')
      showQR.value = false
    }
  })
}
const disable2FA = async () => {
  const payload = { user_id: userInfo.value.id }
  await axios.post(`${import.meta.env.VITE_API_URL}/otp/disable`, payload).then((response) => {
    console.log(response.data)
    if (response.data.otp_disabled) {
      alert('OTP Disabled')
      user.userData = response.data.user
    }
  })
}

watchEffect(() => {
  userInfo.value = user.userData
})
</script>
<style></style>
