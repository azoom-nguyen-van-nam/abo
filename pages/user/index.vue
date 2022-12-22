<template>
  <h2 class="title">User Management</h2>
  <Suspense>
    <UserTable />
    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
</template>

<script setup>
import UserTable from './-table.vue'
</script>
