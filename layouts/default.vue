<template>
  <div class="main-layout">
    <the-sidebar />
    <the-header />
    <div class="content">
      <NuxtPage />
    </div>
    <the-footer />
  </div>
</template>

<script setup>
import TheSidebar from '@/components/layout/the-sidebar'
import TheHeader from '@/components/layout/the-header'
import TheFooter from '@/components/layout/the-footer'
</script>

<style scoped lang="scss">
.main-layout {
  display: grid;
  grid-template-areas:
    'sidebar header'
    'sidebar content'
    'footer footer';
  > .the-sidebar {
    grid-area: sidebar;
    width: 150px;
  }
  > .the-header {
    grid-area: header;
    height: 50px;
    width: calc(100vw - 150px);
  }
  > .the-footer {
    grid-area: footer;
  }
  > .content {
    grid-area: content;
    min-height: calc(100vh - 77px);
    padding: 20px;
  }
}
</style>
