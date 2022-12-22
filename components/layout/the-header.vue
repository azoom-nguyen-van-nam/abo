<template>
  <div class="the-header">
    <p class="title">{{ appStore.meta.title }}</p>
    <p class="account">{{ authStore.loggedInUser.name }}</p>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/store/auth'
import { useAppStore } from '@/store/app'
const authStore = useAuthStore()
const appStore = useAppStore()
</script>

<style lang="scss" scoped>
.the-header {
  // position: fixed;
  // top: 0;
  // text-align: end;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #d9d6d6;
  padding: 0 10px;
  > .title {
    font-weight: bold;
  }
  > .account:hover {
    text-decoration: underline;
    cursor: pointer;
  }
}
</style>
