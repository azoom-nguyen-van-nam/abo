<script lang="ts" setup>
import { useCustomerStore } from '~/store/customer'
useRefHead({
  title: 'Customer',
  meta: [
    {
      name: 'description',
      content: 'Customer page'
    }
  ]
})

const customerStore = useCustomerStore()
await customerStore.getCustomers()
</script>

<template>
  <div>Page: Customer</div>
</template>

<style scoped></style>
