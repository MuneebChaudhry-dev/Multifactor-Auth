<script setup>
const props = defineProps({
  type: String
})
</script>

<template lang="">
  <button
    class="w-full my-3 py-2 px-6 text-white font-medium bg-amber-400 rounded-lg"
    @click="$emit('btn-click')"
  >
    <slot> Click Me! </slot>
  </button>
</template>
<style lang=""></style>
