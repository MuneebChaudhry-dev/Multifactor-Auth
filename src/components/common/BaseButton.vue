<script setup>
const props = defineProps({
  type: String,
  size: String
})
</script>

<template lang="">
  <button
    :class="{
      'w-full px-6': size === 'large',
      'px-4': size === 'small',
      ' text-amber-400 border border-amber-400 bg-none': type === 'secondary',
      ' text-white  bg-amber-400 ': type === 'primary',
      'my-3 py-2 rounded-lg font-medium ': true
    }"
    @click="$emit('btn-click')"
  >
    <slot> Click Me! </slot>
  </button>
</template>
<style lang=""></style>
