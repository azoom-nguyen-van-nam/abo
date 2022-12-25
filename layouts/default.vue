<template>
  <div class="main-layout">
    <layout-the-sidebar />
    <layout-the-header />
    <div class="content">
      <NuxtPage />
    </div>
    <layout-the-footer />
  </div>
</template>

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
