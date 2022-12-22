<template></template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useAuth } from '~/store/auth'

onMounted(async () => {
  definePageMeta({
    layout: 'default'
  })

  const authStore = useAuth()
  await authStore.login({ username: '', password: '' })
})
</script>
