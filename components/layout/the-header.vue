<template>
  <div class="the-header w-100">
    <p class="title">{{ appStore.meta.title }}</p>
    <v-menu transition="scale-transition">
      <template v-slot:activator="{ props }">
        <div class="account d-flex align-center" v-bind="props">
          <v-avatar image="https://picsum.photos/50" size="35"></v-avatar>
          <span class="name">{{ authStore.loggedInUser.name }}</span>
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
import { useAuthStore } from '@/store/auth'
import { useAppStore } from '@/store/app'

const authStore = useAuthStore()
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
