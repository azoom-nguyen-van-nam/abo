<template>
  <UserTable />
</template>

<script setup>
import UserTable from './-table.vue'
useRefHead({
  title: 'User management',
  meta: [
    {
      name: 'description',
      content: 'User management page'
    }
  ]
})
</script>
