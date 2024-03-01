<script setup lang="">
import { ref, watchEffect } from 'vue'
import { useAxios } from '../composable/axios'
import BaseButton from './common/BaseButton.vue'
import QRCode from 'qrcode'

import { userStore } from '@/stores/user'

const { getUser, updateUser } = userStore()

const userInfo = ref(null)
const otpInfo = ref(null)
const qrImageData = ref('')
const otp = ref(null)
const is2FA = ref(false)
const showQR = ref(false)

const toggle2FA = () => {
  if (userInfo.value?.otp_enabled) {
    disable2FA()
  } else {
    setup2FA()
  }
}

const setup2FA = async () => {
  is2FA.value = true

  const payload = { user_id: userInfo.value?.id }
  const { data: otpData, error } = await useAxios(`/otp/generate`, 'POST', payload)
  if (otpData.value) {
    otpInfo.value = otpData.value
    QRCode.toDataURL(otpInfo.value.otpauth_url).then((response) => {
      qrImageData.value = response
      showQR.value = true
    })
  } else {
    alert(error)
  }
}
const verify2FA = async () => {
  const payload = { user_id: userInfo.value?.id, token: otp.value }
  const { data: verifiedUserData, error } = await useAxios(`/otp/verify`, 'POST', payload)
  if (verifiedUserData.value && verifiedUserData.value.otp_verified) {
    alert('OTP Verified')
    showQR.value = false
  } else {
    alert(error)
  }
}
const disable2FA = async () => {
  const payload = { user_id: userInfo.value?.id }
  const { data: userData, error } = await useAxios(`/otp/disable`, 'POST', payload)
  if (userData.value && userData.value.otp_disabled) {
    alert('OTP Disabled')
    updateUser(userData.value.user)
  } else {
    alert(error)
  }
}
const closeVerification = () => {
  showQR.value = false
}
watchEffect(() => {
  userInfo.value = getUser()
})
</script>
<template>
  <div class="w-full bg-amber-400 p-8">
    <div v-if="showQR" class="bg-white rounded flex justify-center mt-8">
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
            <BaseButton type="secondary" size="small" @btn-click="closeVerification">
              Close
            </BaseButton>
            <BaseButton type="primary" size="small" @btn-click="verify2FA">
              Verify & Activate
            </BaseButton>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="bg-white rounded p-16 flex justify-between gap-44">
      <div>
        <h3 class="font-semibold text-2xl capitalize">personal page</h3>
        <ul class="list-none mt-4 space-y-2">
          <li class="text-wrap break-words">ID: {{ userInfo?.id }}</li>
          <li>Name: {{ userInfo?.name }}</li>
          <li>Email: {{ userInfo?.email }}</li>
        </ul>
      </div>
      <div>
        <h3 class="font-semibold text-2xl capitalize">mobile app authenticaiton (2FA)</h3>
        <p class="mt-2">Secure your account with TOTP two factor authentication</p>
        <div class="mt-2">
          <BaseButton type="primary" size="small" @btn-click="toggle2FA">
            {{ userInfo?.otp_enabled ? 'Disable 2FA' : 'Setup 2FA' }}
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
