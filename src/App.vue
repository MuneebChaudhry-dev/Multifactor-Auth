<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav class="p-4 w-full flex justify-end gap-5">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/profile">Profile</RouterLink>
      <RouterLink to="/login">Logout</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped></style>
