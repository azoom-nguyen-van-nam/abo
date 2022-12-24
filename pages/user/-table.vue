<template>
  <div class="user-list">
    <div class="heading">
      <button class="button -add" @click="openUserDialog({})">Add</button>
      <label class="count">Count: {{ userCount }}</label>
    </div>
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
        @click="openUserDialog(user)"
      >
        <td class="col">{{ user.id }}</td>
        <td class="col">{{ user.name }}</td>
        <td class="col">{{ user.email }}</td>
        <td class="col">{{ formatRole(user.role) }}</td>
      </tr>
    </table>
    <UserDialog
      v-if="isShow"
      :is-show="isShow"
      :user="selectedUser"
      @addUser="addUser"
      @saveUser="saveUser"
      @deleteUser="deleteUser"
      @cancel="closeUserDialog"
    />
  </div>
</template>

<script setup>
import UserDialog from './-@user-dialog.vue'
import { useUserStore } from '~/store/user'
const userStore = useUserStore()
await userStore.getUsers({})

const userCount = computed(() => userStore.users.length)
const isShow = ref(false)
const selectedUser = ref({})

function openUserDialog(user) {
  selectedUser.value = user
  isShow.value = true
}
function closeUserDialog() {
  isShow.value = false
}

function addUser(user) {
  userStore.users = [...userStore.users, user]
  closeUserDialog()
}
function saveUser(user) {
  const index = userStore.users.findIndex((u) => u.id === user.id)
  if (index !== -1) {
    userStore.users[index] = user
    closeUserDialog()
  }
}
function deleteUser(userId) {
  userStore.users = userStore.users.filter((user) => user.id !== userId)
  closeUserDialog()
}
</script>

<style scoped lang="scss">
.user-list {
  > .heading {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  > .heading > .button {
    padding: 0.5rem 1.5rem;
    border-radius: 3px;
    border: none;
    outline: none;
    color: #fff;
    cursor: pointer;
    &.-add {
      background-color: #008000;
    }
  }
  > .heading > .count {
    font-size: 15px;
  }
  > .table {
    width: 100%;
    border: solid 1px rgba(0, 0, 0, 0.12);
    border-collapse: collapse;
    margin-top: 1rem;
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
}
</style>
