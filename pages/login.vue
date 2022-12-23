<script setup lang="ts">
useRefHead({
  title: 'Login',
  meta: [
    {
      name: 'description',
      content: 'Login'
    }
  ]
})
definePageMeta({
  middleware: 'redirect'
})
</script>
<template>
  <div>Login page</div>
</template>
