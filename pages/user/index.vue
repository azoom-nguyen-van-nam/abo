<template>
  <Suspense>
    <UserTable />
    <template #fallback>
      <global-the-oading text="Fetching users..." />
    </template>
  </Suspense>
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
