<template>
  <div class="the-header">
    <nuxt-link to="/" class="logo">
      <v-img src="images/logo.png" width="200" :aspect-ratio="1"></v-img>
    </nuxt-link>
    <v-menu transition="scale-transition">
      <template #activator="{ props }">
        <div class="account d-flex align-center" v-bind="props">
          <v-icon icon="mdi-account-outline"> </v-icon>
          <span class="name">Abo Admin</span>
        </div>
      </template>
      <v-list>
        <v-list-item
          v-for="(option, index) in userOptions"
          :key="index"
          active-color="primary"
        >
          <v-list-item-title>
            <v-icon :icon="option.icon" class="mr-1" />
            {{ option.title }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script lang="ts" setup>
type UserOption = {
  icon: string
  title: string
  href: string
}
const userOptions: Array<UserOption> = [
  {
    icon: 'mdi-account-circle-outline',
    title: 'Profile',
    href: '#'
  },
  {
    icon: 'mdi-logout',
    title: 'Logout',
    href: '#'
  }
]
</script>

<style lang="scss" scoped>
.the-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 10px;
  > .account {
    gap: 0.5rem;
  }
  > .account > .name:hover {
    opacity: 0.7;
    cursor: pointer;
  }
}
</style>
