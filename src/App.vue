<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav class="p-4 w-full flex justify-end gap-5">
      <RouterLink to="/" active-class="text-amber-400">Home</RouterLink>
      <RouterLink to="/profile" active-class="text-amber-400">Profile</RouterLink>
      <RouterLink to="/login" active-class="text-amber-400">Logout</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped></style>
