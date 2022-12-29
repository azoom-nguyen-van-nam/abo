<template>
  <div class="user-list pa-3">
    <div class="heading mb-3">
      <v-btn
        color="success"
        icon="mdi-plus"
        @click="openUserDialog({})"
      ></v-btn>
      <v-spacer></v-spacer>
      <v-autocomplete
        v-model="userSearch"
        :items="userStore.users"
        item-title="name"
        return-object
        label="Search..."
        clearable
        open-on-clear
        variant="underlined"
        prepend-inner-icon="mdi-magnify"
        no-data-text="Not found"
        class="search"
      >
      </v-autocomplete>
    </div>
    <v-table :hover="true" class="table">
      <thead class="thead text-left">
        <tr class="row">
          <th class="col">ID</th>
          <th class="col">Name</th>
          <th class="col">Email</th>
          <th class="col">Role</th>
        </tr>
      </thead>
      <tbody class="tbody">
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
      </tbody>
    </v-table>
    <label class="count float-right mt-3">Count: {{ userCount }}</label>
    <UserDialog
      v-if="isShowDialog"
      :user="selectedUser"
      @addUser="addUser"
      @saveUser="saveUser"
      @deleteUser="deleteUser"
      @cancel="closeUserDialog"
    />
  </div>
</template>

<script lang="ts" setup>
import UserDialog from './-@user-dialog.vue'
import { useUserStore } from '~/store/user'
import { User } from '~/types/User'

const userStore = useUserStore()
await userStore.getUsers({})

const userCount = computed<number>(() => userStore.users.length)
const isShowDialog = ref(false)
const selectedUser = ref({})

const userSearch = ref(null)
watch(userSearch, (newVal) => {
  if (!newVal) return
  openUserDialog(newVal)
})

function openUserDialog(user: User | object) {
  selectedUser.value = user
  isShowDialog.value = true
}
function closeUserDialog() {
  isShowDialog.value = false
}

function addUser(user: User) {
  try {
    userStore.addUser(user)
    closeUserDialog()
    useSnackbar()
  } catch (error) {
    useSnackbar({
      status: false,
      message: getErrorMessage(error)
    })
  }
}
function saveUser(user: User) {
  try {
    userStore.updateUser(user.id, user)
    closeUserDialog()
    useSnackbar()
  } catch (error) {
    useSnackbar({
      status: false,
      message: getErrorMessage(error)
    })
  }
}
function deleteUser(userId: number) {
  try {
    userStore.deleteUser(userId)
    closeUserDialog()
    useSnackbar()
  } catch (error) {
    useSnackbar({
      status: false,
      message: getErrorMessage(error)
    })
  }
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }
  return String(error)
}
</script>

<style scoped lang="scss">
.user-list {
  position: relative;
  > .heading {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  > .heading > .search {
    max-width: 25rem;
  }
  > .heading > .count {
    font-size: 15px;
  }
  > .table > .v-table__wrapper > table > .tbody > .row {
    cursor: pointer;
    &:nth-child(odd) {
      background-color: rgba(0, 0, 0, 0.04);
    }
  }
}
</style>
