<template>
  <div class="overlay d-flex flex-column align-center justify-center">
    <v-progress-circular
      indeterminate
      size="60"
      width="5"
      color="white"
    ></v-progress-circular>
    <strong v-if="message" class="message mt-2">{{ message }}</strong>
  </div>
</template>
<script lang="ts" setup>
defineProps({
  message: {
    type: String,
    default: ''
  }
})
</script>

<style lang="scss" scoped>
.overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.35);
  z-index: 1007;
  > .message {
    font-size: 1.5rem;
    color: #fff;
    text-shadow: 2px 2px 4px #000;
  }
}
</style>
