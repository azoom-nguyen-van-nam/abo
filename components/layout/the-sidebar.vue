<script setup>
const menus = ref([{ label: 'User', to: '/user' }])
</script>

<template>
  <nav class="the-sidebar">
    <nuxt-link to="/">
      <img class="the-logo" src="/logo.jpeg" alt="abo-logo" width="50" />
    </nuxt-link>
    <nuxt-link
      class="route"
      v-for="menu in menus"
      :key="new Date().getTime()"
      :to="menu.to"
    >
      {{ menu.label }}
    </nuxt-link>
  </nav>
</template>

<style scoped lang="scss">
.the-sidebar {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ccc;
  > .route {
    width: 100%;
    text-align: center;
    text-decoration: none;
    padding: 10px;
    &:hover {
      color: #2c2cc8;
      background-color: #f3e2e2;
    }
  }
}
</style>
