<script setup>
const modelValue = defineModel({ type: String })

const props = defineProps({
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String
  }
})
</script>

<template>
  <input
    :type="type"
    :placeholder="placeholder"
    v-model="modelValue"
    class="p-2 mt-2 w-full text-lg border border-gray-300 rounded-lg outline-1 outline-amber-300"
  />
</template>
