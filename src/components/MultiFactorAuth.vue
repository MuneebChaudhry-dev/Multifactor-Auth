<template>
  <div class="w-full bg-amber-400 p-8">
    <div class="bg-white rounded p-16 flex justify-between gap-44">
      <div>
        <h3 class="font-semibold text-2xl capitalize">personal page</h3>
        <ul class="list-none mt-4 space-y-2">
          <li class="text-wrap break-words">ID: ewrqwennjkn1234-c4fewre-65436-432knfsjdnfdc</li>
          <li>Name: Admin</li>
          <li>Email: admin@admin.com</li>
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
            {{ is2FA ? 'Disable 2FA' : 'Setup 2FA' }}
          </button>
        </div>
      </div>
    </div>
    <div class="bg-white rounded flex justify-center mt-8">
      <div class="w-1/2 border p-2 border-gray-300 my-8">
        <div>
          <h3 class="font-semibold text-2xl">Two-Factor Authentication (2FA)</h3>
        </div>
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
            <img src="../../qr.png" />
          </div>
        </div>
        <div class="mt-4">
          <h4 class="font-semibold text-lg text-amber-400 border-b border-gray-300">
            Or Enter Code Into Your App
          </h4>
          <p class="py-3">SecretKey: Qweywytrsty456dtr73dtrsykt79559fuy</p>
        </div>
        <div class="mt-4 border-b border-gray-300 pb-2">
          <h4 class="font-semibold text-lg text-amber-400 border-b border-gray-300">Verify Code</h4>
          <p class="py-3">For changing the setting, please verify the authentication code:</p>

          <input
            type="text"
            class="p-2 text-lg border border-gray-300 rounded-lg outline-1 outline-amber-300"
            placeholder="Authentication Code"
          />
        </div>
        <div class="my-4 flex justify-start gap-4">
          <button class="py-2 px-6 text-gray-500 font-medium border border-slate-200 rounded-lg">
            Close
          </button>
          <button class="py-2 px-6 text-white font-medium bg-amber-400 rounded-lg">
            Verify & Activate
          </button>
          <button></button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const is2FA = ref(false)

const toggle2FA = () => {
  if (is2FA.value) {
    is2FA.value = false
  } else {
    setup2FA()
  }
}

const setup2FA = () => {
  is2FA.value = true
}
</script>
<style></style>
