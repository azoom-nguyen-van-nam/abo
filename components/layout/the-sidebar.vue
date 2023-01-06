<script setup>
const menus = useMenus()
</script>

<template>
  <nav class="the-sidebar">
    <nuxt-link to="/"> Logo </nuxt-link>
    <nuxt-link
      v-for="menu in menus"
      :key="menu.id"
      :to="menu.router"
      class="route d-flex justify-start align-start"
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
