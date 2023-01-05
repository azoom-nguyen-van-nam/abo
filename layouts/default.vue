<script lang="ts" setup>
import { useAppStore } from '@/store/app'
import { Snackbar } from '~/types/App'

const appStore = useAppStore()
const snackbar = computed<Snackbar>(() => appStore.snackbar)
</script>

<template>
  <v-app>
    <v-navigation-drawer expand-on-hover rail permanent>
      <layout-the-sidebar />
    </v-navigation-drawer>
    <v-app-bar density="compact">
      <layout-the-header />
    </v-app-bar>
    <v-main>
      <NuxtPage />
    </v-main>
    <v-app-bar location="bottom" height="50" elevation="0">
      <layout-the-footer />
    </v-app-bar>

    <v-snackbar
      v-model="snackbar.isShow"
      :color="snackbar.status ? 'green' : 'red'"
      timeout="2000"
    >
      {{ snackbar.message || snackbar.status ? 'Success' : 'Failed' }}
      <template v-slot:actions>
        <v-btn
          color="white"
          icon="mdi-close-circle-outline"
          @click="appStore.snackbar.isShow = false"
        ></v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<style scoped lang="scss"></style>
