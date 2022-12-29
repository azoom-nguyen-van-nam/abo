<script setup>
const menus = ref([
  { label: 'Home', icon: 'mdi-home', to: '/' },
  { label: 'User', icon: 'mdi-account-outline', to: '/user' }
])
</script>

<template>
  <nav class="the-sidebar">
    <nuxt-link to="/">
      <img class="the-logo" src="/logo.jpeg" alt="abo-logo" width="50" />
    </nuxt-link>
    <nuxt-link
      v-for="menu in menus"
      :key="new Date().getTime()"
      :to="menu.to"
      class="route d-flex justify-center align-center"
    >
      <v-icon :icon="menu.icon" class="mr-2" />
      {{ menu.label }}
    </nuxt-link>
  </nav>
</template>

<style scoped lang="scss">
.the-sidebar {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  > .route {
    width: 100%;
    text-align: center;
    text-decoration: none;
    padding: 10px;
    color: #000;
    transition: 0.5s;
    &:hover,
    &.router-link-active {
      color: #2c2cc8;
      background-color: #d2eaf2;
    }
  }
}
</style>
