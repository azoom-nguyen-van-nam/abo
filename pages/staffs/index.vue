<script lang="ts" setup>
import AddStaffDialog from './-add-staff-dialog.vue'
import EditStaffDialog from './-edit-staff-dialog.vue'
import { positions, departments } from '~~/constants/staff'
import { useStaffStore } from '~~/store/staff'

const shorthandPositions = positions.reduce(
  (shorthandPosition, { value, label }) => {
    return { ...shorthandPosition, [value as number]: label }
  },
  {} as any
)

const shorthandDepartments = departments.reduce(
  (shorthandDepartment, { value, label }) => {
    return { ...shorthandDepartment, [value as number]: label }
  },
  {} as any
)

const searchStaffQuery = reactive({
  id: undefined,
  name: undefined,
  nameKana: undefined,
  position: undefined,
  department: undefined
})

const staffStore = useStaffStore()
await staffStore.getStaffs({})

const headers = [
  {
    text: 'ID',
    value: 'id',
    width: '7%',
    class: 'header'
  },
  {
    text: '担当者名',
    value: 'name',
    width: '25%',
    class: 'header'
  },
  {
    text: 'カナ名',
    value: 'nameKana',
    width: '25%',
    class: 'header'
  },
  {
    text: '所属部',
    value: 'department',
    width: '15%',
    class: 'header'
  },
  {
    text: '役職名',
    value: 'position',
    width: '15%',
    class: 'header'
  }
]

const showAddStaffDialog = ref(false)
const showDeleteStaffDialog = ref(false)
const showEditStaffDialog = ref(false)
const loading = ref(false)
const selectedStaff = ref({ id: 0 })

function editStaff(staff: any) {
  selectedStaff.value = staff
  showEditStaffDialog.value = true
}
function deleteStaff(staff: any) {
  selectedStaff.value = staff
  showDeleteStaffDialog.value = true
}
async function searchStaff() {
  loading.value = true
  await staffStore.getStaffs(searchStaffQuery)
  loading.value = false
}
function addStaff() {
  showAddStaffDialog.value = true
}
function closeAddStaffDialog() {
  showAddStaffDialog.value = false
}
function closeDeleteStaffDialog() {
  showDeleteStaffDialog.value = false
}
function closeEditStaffDialog() {
  showEditStaffDialog.value = false
}
async function reloadStaffs() {
  showAddStaffDialog.value = false
  showDeleteStaffDialog.value = false
  showEditStaffDialog.value = false
  await staffStore.getStaffs(searchStaffQuery)
}
async function confirmDeleteStaff() {
  const isDeleteSuccess = await staffStore.deleteStaff(selectedStaff.value.id)

  if (isDeleteSuccess) {
    useSnackbar({ message: '担当者を削除しました。' })
    reloadStaffs()
  } else {
    useSnackbar({
      message: '担当者を削除出来ませんでした。',
      status: false
    })
  }
}
</script>

<template>
  <div class="staff-page">
    <div class="title">
      <p class="text">担当者一覧</p>
    </div>
    <div class="search-inputs">
      <v-text-field
        class="input -id"
        v-model="searchStaffQuery.id"
        label="ID"
      />
      <v-text-field
        class="input -name"
        v-model="searchStaffQuery.name"
        label="担当者名"
      />
      <v-text-field
        class="input -namekana"
        v-model="searchStaffQuery.nameKana"
        label="カナ名"
      />
      <v-select
        class="select -department"
        :items="departments"
        v-model="searchStaffQuery.department"
        item-title="label"
        item-value="value"
        label="所属部"
      />
      <v-select
        class="select -position"
        :items="positions"
        v-model="searchStaffQuery.position"
        item-title="label"
        item-value="value"
        label="役職名"
      />
      <v-btn class="button -search" @click="searchStaff()" :loading="loading">
        検索
      </v-btn>
    </div>
    <div class="actions">
      <v-btn class="button -addstaff" @click="addStaff()">新規登録</v-btn>
    </div>
    <data-table
      v-if="!!staffStore.staffs.length"
      class="staff-table"
      :headers="headers"
      :items="staffStore.staffs"
      :hideDefaultFooter="true"
      stickyHeight="calc(100vh - 350px)"
      :itemsPerPage="100"
    >
      <template v-slot:item.name="{ item }">
        <p class="text -name">{{ item.name }}</p>
      </template>
      <template v-slot:item.nameKana="{ item }">
        <p class="text -namekana">{{ item.nameKana }}</p>
      </template>
      <template v-slot:item.department="{ item }">
        {{ shorthandDepartments[item.department] }}
      </template>
      <template v-slot:item.position="{ item }">
        {{ shorthandPositions[item.position] }}
      </template>
      <template v-slot:actions="{ item }">
        <div class="text-right">
          <v-icon small class="mr-2" @click.stop="editStaff(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click.stop="deleteStaff(item)"> mdi-delete </v-icon>
        </div>
      </template>
    </data-table>
    <div class="empty" v-else>
      <p class="text">登録されている担当者情報はありません</p>
    </div>

    <AddStaffDialog
      v-if="showAddStaffDialog"
      :isShow="showAddStaffDialog"
      @close="closeAddStaffDialog()"
      @success="reloadStaffs()"
    />
    <DeleteDialog
      v-model="showDeleteStaffDialog"
      @on-delete="confirmDeleteStaff()"
      title="担当者情報を削除しますか？"
      message="この操作は取り消せません。"
    />
    <EditStaffDialog
      v-if="showEditStaffDialog"
      :isShow="showEditStaffDialog"
      :selectedStaff="selectedStaff"
      @close="closeEditStaffDialog()"
      @success="reloadStaffs()"
    />
  </div>
</template>

<style scoped lang="scss">
.staff-page {
  > .staff-table {
    margin-top: 20px;
  }
  > .search-inputs {
    margin-top: 13px;
  }
  > .title > .text {
    padding: 8px;
    padding-left: 15px;
    font-weight: 700;
    font-size: 24px;
    line-height: 30px;
    border-left: solid 3px #284e68;
    border-bottom: solid 1px #284e68;
  }
  > .actions {
    margin-top: 20px;
    display: flex;
    justify-content: right;
    > .button {
      padding: 6px 18px;
    }
  }
  > .empty {
    margin-top: 20px;
    padding: 45px 0;
    text-align: center;
    border-radius: 20px;
    background-color: white;
  }
}
.staff-table {
  border-radius: 20px;
  > .abo-table > .thead > .row > .header {
    font-size: 20px;
  }
  > .abo-table > .tbody > .row > .col > .text {
    &.-name,
    &.-namekana {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
.search-inputs {
  display: flex;
  align-items: center;
  > .input,
  > .select {
    display: inline-block;
    margin-right: 10px;
    &.-id {
      max-width: 7%;
    }
    &.-name {
      max-width: 20%;
    }
    &.-namekana {
      max-width: 20%;
    }
    &.-department {
      max-width: 15%;
    }
    &.-position {
      max-width: 15%;
    }
  }
  > .button {
    padding: 6px 18px;
  }
}
</style>
