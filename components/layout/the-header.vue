<template>
  <div class="the-header">
    {{ loggedInUser.name }}
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from '~~/store/auth'
const { loggedInUser } = useAuthStore()
</script>

<style lang="scss" scoped>
.the-header {
  text-align: end;
  padding: 10px 5px;
  font-weight: bold;
  background: #ccc;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
}
</style>
