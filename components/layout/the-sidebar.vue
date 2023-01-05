<script setup>
const menus = [
  { label: 'Customer', icon: 'mdi-account-group-outline', to: '/customer' },
  { label: 'Room', icon: 'mdi-home-city-outline', to: '/room' },
  { label: 'Staff', icon: 'mdi-account-outline', to: '/staff' }
]
</script>

<template>
  <div class="the-sidebar">
    <nuxt-link to="/" class="top d-flex align-center text-decoration-none">
      <img class="logo mr-3" src="/logo.jpeg" alt="abo-logo" width="50" />
      <strong class="text-black administrator">ABO Administrator</strong>
    </nuxt-link>
    <v-list density="compact" nav class="nav">
      <v-list-item
        v-for="menu in menus"
        :key="menu.to"
        :to="menu.to"
        :title="menu.label"
        :prepend-icon="menu.icon"
        class="route"
      ></v-list-item>
    </v-list>
  </div>
</template>

<style scoped lang="scss">
.the-sidebar {
  > .top {
    padding: 3px;
  }
  > .top > .administrator {
    white-space: nowrap;
  }
  > .nav > .route.v-list-item--active {
    background-color: #dbf6ff;
  }
}
</style>
