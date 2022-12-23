<template>
  <table class="table">
    <tr class="headers">
      <th class="col">ID</th>
      <th class="col">Name</th>
      <th class="col">Email</th>
      <th class="col">Role</th>
    </tr>
    <tr
      class="row"
      v-for="user in userStore.users"
      :key="user.id"
      @click="openUserDialog"
    >
      <td class="col">{{ user.id }}</td>
      <td class="col">{{ user.name }}</td>
      <td class="col">{{ user.email }}</td>
      <td class="col">{{ formatRole(user.role) }}</td>
    </tr>
  </table>
</template>

<script setup>
import { useUserStore } from '~/store/user'
const userStore = useUserStore()
await userStore.getUsers({})

const openUserDialog = async () => {}
</script>

<style scoped lang="scss">
.table {
  width: 100%;
  border: solid 1px rgba(0, 0, 0, 0.12);
  border-collapse: collapse;
  > .headers {
    border-radius: 5px;
    background-color: #7fcaff;
    > .col {
      border: 1px solid #a5a2a2;
    }
  }
  > .row {
    &:hover {
      background-color: #d0caca;
      cursor: pointer;
    }
    > .col {
      border: 1px solid #ccc;
      text-align: center;
      padding: 5px;
    }
  }
}
</style>
