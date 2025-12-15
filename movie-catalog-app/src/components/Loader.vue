<template>
  <div
      class="loader"
      :style="{
      width: size + 'px',
      height: size + 'px',
      borderWidth: size / 8 + 'px',
      borderTopColor: color
    }"
  ></div>
</template>

<script setup>
defineProps({
  size: {
    type: Number,
    default: 40
  },
  color: {
    type: String,
    default: '#3498db'
  }
});
</script>

<style scoped>
.loader {
  border: solid transparent;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  border-top-style: solid;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
