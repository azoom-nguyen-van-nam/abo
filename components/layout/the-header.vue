<template>
  <div class="the-header w-100">
    <p class="title">{{ appStore.meta.title }}</p>
    <v-menu transition="scale-transition">
      <template #activator="{ props }">
        <div class="account d-flex align-center" v-bind="props">
          <v-avatar></v-avatar>
          <span class="name">Abo admin</span>
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
import { useAppStore } from '@/store/app'

const appStore = useAppStore()

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
  padding: 0 10px;
  > .title {
    font-weight: bold;
  }
  > .account {
    gap: 0.5rem;
  }
  > .account > .name:hover {
    opacity: 0.7;
    cursor: pointer;
  }
}
</style>
