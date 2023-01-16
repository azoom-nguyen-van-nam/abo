<script lang="ts" setup>
import { useAppStore } from '@/store/app'
import { Snackbar } from '~~/types/app'

const appStore = useAppStore()
const snackbar = computed<Snackbar>(() => appStore.snackbar)
</script>

<template>
  <v-app class="default-layout">
    <v-app-bar>
      <layout-the-header />
    </v-app-bar>
    <v-navigation-drawer rail rail-width="220" permanent color="primary" class="pr-3">
      <layout-the-sidebar />
    </v-navigation-drawer>
    <v-main class="main">
      <div class="content pa-5">
        <NuxtPage />
      </div>
    </v-main>

    <v-snackbar v-model="snackbar.isShow" :color="snackbar.status ? 'green' : 'red'" timeout="2000">
      {{ snackbar.message || (snackbar.status ? 'Success' : 'Failed') }}
      <template #actions>
        <v-btn color="white" icon="mdi-close-circle-outline" @click="appStore.snackbar.isShow = false"></v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<style scoped lang="scss">
.default-layout {
  > :deep(.v-application__wrap) > .v-navigation-drawer {
    box-shadow: 3px 0 10px 0 rgb(0 0 0 / 50%);
  }
}
</style>
