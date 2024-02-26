<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <HelloWorld msg="You did it!" />

    <nav class="p-4 w-full flex justify-end gap-5">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/">Profile</RouterLink>
      <RouterLink to="/">Logout</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped></style>
