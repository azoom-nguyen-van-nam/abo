<script lang="ts" setup>
import { useRoomStore } from '~/store/room'
import { Room } from '~~/types/room'
import { DataTableHeader } from '~/types/app'
import { taxStatus } from '~/constants/room'
import FormAdd from '~~/pages/rooms/-form-add.vue'
import FormEdit from '~~/pages/rooms/[roomId]/-form-edit.vue'

type FormType = 'add' | 'edit' | 'delete'
type ShapeCapacity = 's' | 'mouth' | 'theater'

const roomStore = useRoomStore()
await roomStore.getRooms()

const headers: DataTableHeader[] = [
  { text: 'ID', value: 'id', width: 60 },
  { text: '部屋名', value: 'roomNumber', width: 100 },
  { text: '印刷名称', value: 'name' },
  { text: '基本料金', value: 'basicPrice' },
  { text: '延長料金', value: 'overPrice' },
  { text: '全日料金', value: 'fullDayPrice' },
  { text: '税区分', value: 'isWithoutTax', width: 75 },
  { text: '利用人数', value: 'sShapeCapacity', align: 'center', width: 400 }
]

const roomDefault: Room = {
  roomNumber: 0,
  name: '',
  basicPrice: 0,
  overPrice: 0,
  fullDayPrice: 0,
  isWithoutTax: false,
  sShapeCapacity: 0,
  mouthShapeCapacity: 0,
  theaterShapeCapacity: 0
}
let selectedRoom = reactive<Room>(roomDefault)
const isLoading = ref<boolean>(false)
const isShowDialog = reactive({
  add: false,
  edit: false,
  delete: false
})

function toggleDialog(type: FormType) {
  isShowDialog[type] = !isShowDialog[type]
}
function formatShapeCapacity(type: ShapeCapacity, value: number) {
  switch (type) {
    case 's':
      return `S型：${value}名`
    case 'mouth':
      return `口型：${value}名`
    case 'theater':
      return `シアター型：${value}名`
  }
}
async function deleteRoom() {
  isLoading.value = true
  const res = await roomStore.deleteRoom(selectedRoom.id as number)
  if (res) {
    await roomStore.getRooms()
    toggleDialog('delete')
  }
  isLoading.value = false
}
</script>

<template>
  <div class="rooms-page">
    <p class="heading text-h6 font-weight-bold mb-3 pl-3 pb-1">会議室一覧</p>
    <v-btn
      rounded="lg"
      class="button text-white float-right mb-3 -add"
      @click="toggleDialog('add')"
    >
      新規登録
    </v-btn>
    <data-table
      v-if="roomStore.rooms.length"
      :headers="headers"
      :items="roomStore.rooms"
      :itemsPerPage="10"
      :page="1"
      hide-default-footer
      sticky-height="66vh"
      no-data-text="登録されている会議室はありません"
      class="clear-right rounded-lg elevation-1"
    >
      <template #item.name="{ item }">
        {{ item.name || '-' }}
      </template>
      <template #item.basicPrice="{ item }">
        {{ formatYen(item.basicPrice) }}
      </template>
      <template #item.overPrice="{ item }">
        {{ formatYen(item.overPrice) }}
      </template>
      <template #item.fullDayPrice="{ item }">
        {{ formatYen(item.fullDayPrice) }}
      </template>
      <template #item.isWithoutTax="{ item }">
        {{
          // @ts-ignore
          taxStatus[+item.isWithoutTax]
        }}
      </template>
      <template #item.sShapeCapacity="{ item }">
        <span class="mr-2">{{
          formatShapeCapacity('s', item.sShapeCapacity)
        }}</span>
        |
        <span class="mx-2">{{
          formatShapeCapacity('mouth', item.mouthShapeCapacity)
        }}</span>
        |
        <span class="ml-2">
          {{ formatShapeCapacity('theater', item.theaterShapeCapacity) }}
        </span>
      </template>
      <template #actions="{ item }">
        <div class="text-right">
          <v-icon
            small
            class="mr-2"
            @click="
              toggleDialog('edit'),
                // @ts-ignore
                (selectedRoom = { ...item })
            "
          >
            mdi-pencil
          </v-icon>
          <v-icon
            small
            @click="
              toggleDialog('delete'),
                // @ts-ignore
                (selectedRoom = { ...item })
            "
          >
            mdi-delete
          </v-icon>
        </div>
      </template>
    </data-table>
    <p
      v-else
      class="clear-right text-center font-weight-bold pa-10 bg-white rounded-xl"
    >
      登録されている会議室はありません
    </p>
    <v-dialog v-model="isShowDialog.add" fullscreen class="modal-add-room">
      <FormAdd :close-dialog="toggleDialog.bind(null, 'add')" />
    </v-dialog>
    <v-dialog v-model="isShowDialog.edit" width="35rem" class="modal-add-room">
      <FormEdit
        :room="selectedRoom"
        :close-dialog="toggleDialog.bind(null, 'edit')"
      />
    </v-dialog>
    <DeleteDialog
      v-model="isShowDialog.delete"
      title="「会議室情報を削除しますか？"
      message="この操作は取り消せません。"
      @on-delete="deleteRoom"
    />
  </div>
</template>

<style scoped lang="scss">
.rooms-page {
  > .heading {
    border-left: 3px solid rgba(var(--v-theme-primary));
    border-bottom: 1px solid rgba(var(--v-theme-primary));
  }
  > :deep(.abo-table-wrap) > .abo-table {
    > .thead > .row > .col:last-child,
    > .tbody > .row > .col:last-child {
      width: 100px;
    }
  }
}
.clear-right {
  clear: right;
}
</style>
