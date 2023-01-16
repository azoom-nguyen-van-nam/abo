<script setup>
const menus = useMenus()
</script>

<template>
  <v-list class="the-sidebar">
    <template v-for="menu in menus" :key="menu.router">
      <v-list-item
        v-if="!menu.children"
        :prepend-icon="menu.icon"
        :title="menu.label"
        :to="menu.router"
        class="route"
      ></v-list-item>
      <v-list-group v-else :value="menu.label">
        <template v-slot:activator="{ props }">
          <v-list-item
            v-bind="props"
            :title="menu.label"
            :prepend-icon="menu.icon"
            class="route"
          ></v-list-item>
        </template>
        <v-list-item
          v-for="m in menu.children"
          :key="m.router"
          :title="m.label"
          :to="m.router"
          class="route"
        ></v-list-item>
      </v-list-group>
    </template>
  </v-list>
</template>

<style scoped lang="scss">
.the-sidebar {
  > .v-list-group {
    > .v-list-item {
      > :deep(.v-list-item__prepend) > .v-icon {
        margin-inline-end: 15px;
      }
      > :deep(.v-list-item__append) > .v-icon {
        margin-inline-start: 10px;
      }
    }
    > .v-list-group__items > .route {
      color: #94a6b4;
      padding-inline-start: var(--indent-padding) !important;
    }
    > .v-list-item,
    > .v-list-group__items > .v-list-item {
      > :deep(.v-ripple__container) {
        @extend .rounded-e-tb;
        overflow: hidden;
      }
    }
  }
  > .route,
  > .v-list-group > .v-list-group__items > .route {
    &.v-list-item--active {
      > :deep(.v-list-item__content) > .v-list-item-title {
        color: #fff;
        font-weight: 600;
      }
      > :deep(.v-list-item__overlay) {
        background-color: #50abf9;
      }
    }
  }
  > .v-list-item,
  > .v-list-group > .v-list-item,
  > .v-list-group > .v-list-group__items > .v-list-item {
    :deep(.v-list-item__overlay) {
      @extend .rounded-e-tb;
    }
  }
}
.rounded-e-tb {
  border-top-right-radius: 3rem;
  border-bottom-right-radius: 3rem;
}
</style>
