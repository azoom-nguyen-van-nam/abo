<script lang="ts" setup>
import { VNodeRef } from 'vue'
import type { PropType } from 'vue'
import { Room } from '~/types/room'
import { useRoomStore } from '~~/store/room'

const roomStore = useRoomStore()

const props = defineProps({
  closeDialog: {
    type: Function,
    required: true
  },
  room: {
    type: Object as PropType<Room>,
    required: true
  }
})
const room = ref<Room>(props.room)
const formAddRef = ref<VNodeRef | null>(null)
const rules = {
  roomNumber: [(v: number | string) => !!v || 'Room number is required'],
  basicPrice: [(v: number) => !!v || 'Basic price is required'],
  overPrice: [(v: number) => !!v || 'Over price is required'],
  fullDayPrice: [(v: number) => !!v || 'Full day price is required'],
  isWithoutTax: [
    (v: boolean) => typeof v === 'boolean' || 'Is without tax is required'
  ]
}
const validForm = ref<boolean>(true)
const isLoading = ref<boolean>(false)
async function saveRoom() {
  const { valid } = await formAddRef.value.validate()
  if (!valid) return

  isLoading.value = true
  const res = await roomStore.editRoom(room.value.id as number, room.value)
  if (res) {
    await roomStore.getRooms()
    props.closeDialog()
  }
  isLoading.value = false
}
</script>

<template>
  <v-form v-model="validForm" ref="formAddRef" class="edit-room-form">
    <v-card class="pb-3 rounded-xl">
      <v-toolbar title="会議室情報の編集" color="primary" height="50">
        <v-btn
          icon="mdi-close"
          size="x-small"
          variant="flat"
          color="transparent"
          @click="closeDialog"
        >
        </v-btn>
      </v-toolbar>
      <v-card-text class="pb-5">
        <v-row justify="start" class="field -room-number">
          <v-col>
            <v-text-field
              v-model="room.roomNumber"
              :rules="rules.roomNumber"
              :hide-details="false"
              variant="outlined"
              density="comfortable"
              class="input"
            >
              <template #prepend>
                <label class="label">部屋名</label>
              </template>
            </v-text-field>
          </v-col>
        </v-row>
        <v-row justify="start" class="field -name">
          <v-col>
            <v-text-field
              v-model="room.name"
              :hide-details="false"
              variant="outlined"
              density="comfortable"
              class="input"
            >
              <template #prepend>
                <label class="label text-center mt-n2">
                  印刷名称
                  <small class="d-block text-grey-darken-2">(任意）</small>
                </label>
              </template>
            </v-text-field>
          </v-col>
        </v-row>
        <h3 class="title my-3">部屋料金</h3>
        <v-row justify="start" class="field">
          <v-col>
            <v-text-field
              v-model.number="room.basicPrice"
              :rules="rules.basicPrice"
              :hide-details="false"
              variant="outlined"
              density="comfortable"
              class="input"
            >
              <template #prepend>
                <label class="label">基本料金</label>
              </template>
              <template #append> 円 </template>
            </v-text-field>
          </v-col>
        </v-row>
        <v-row justify="start" class="field">
          <v-col>
            <v-text-field
              v-model.number="room.overPrice"
              :rules="rules.overPrice"
              :hide-details="false"
              variant="outlined"
              density="comfortable"
              class="input"
            >
              <template #prepend>
                <label class="label">延長料金</label>
              </template>
              <template #append> 円 </template>
            </v-text-field>
          </v-col>
        </v-row>
        <v-row justify="start" class="field">
          <v-col>
            <v-text-field
              v-model.number="room.fullDayPrice"
              :rules="rules.fullDayPrice"
              :hide-details="false"
              variant="outlined"
              density="comfortable"
              class="input"
            >
              <template #prepend>
                <label class="label">全日料金</label>
              </template>
              <template #append> 円 </template>
            </v-text-field>
          </v-col>
        </v-row>
        <v-row justify="start" class="field">
          <v-col>
            <v-radio-group
              v-model="room.isWithoutTax"
              :rules="rules.isWithoutTax"
              inline
              hide-details="auto"
              color="primary"
              class="input align-center -gender"
            >
              <template #prepend>
                <label class="label">税区分</label>
              </template>
              <v-radio label="内税" :value="true"></v-radio>
              <v-radio label="外税" :value="false"></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>
        <h3 class="title my-3">利用人数限定</h3>
        <v-row justify="start" class="field">
          <v-col>
            <v-text-field
              v-model.number="room.sShapeCapacity"
              :hide-details="false"
              variant="outlined"
              density="comfortable"
              class="input"
            >
              <template #prepend>
                <label class="label">S型</label>
              </template>
              <template #append> 名 </template>
            </v-text-field>
          </v-col>
        </v-row>
        <v-row justify="start" class="field">
          <v-col class="align-center">
            <v-text-field
              v-model.number="room.mouthShapeCapacity"
              :hide-details="false"
              variant="outlined"
              density="comfortable"
              class="input"
            >
              <template #prepend>
                <label class="label">シアター型</label>
              </template>
              <template #append> 名 </template>
            </v-text-field>
          </v-col></v-row
        >
        <v-row justify="start" class="field"
          ><v-col>
            <v-text-field
              v-model.number="room.theaterShapeCapacity"
              :hide-details="false"
              variant="outlined"
              density="comfortable"
              class="input"
            >
              <template #prepend>
                <label class="label">口型</label>
              </template>
              <template #append> 名 </template>
            </v-text-field>
          </v-col></v-row
        >
      </v-card-text>
      <v-card-actions class="d-flex justify-center pb-3">
        <v-btn
          size="large"
          color="primary"
          variant="elevated"
          rounded="lg"
          class="button -submit"
          :disabled="isLoading"
          :loading="isLoading"
          @click="saveRoom"
        >
          更新する
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<style scoped lang="scss">
.edit-room-form {
  > .v-card > .v-card-text {
    max-height: 70vh;
    overflow-y: auto;
  }
  > .v-card > .v-card-text > .field {
    > .v-col > .input > :deep(.v-input__prepend) {
      width: 5rem;
      > .label {
        font-size: 14px;
      }
    }
    > .v-col > .input.-gender > :deep(.v-input__prepend) {
      padding-top: 0;
    }
    &.-room-number,
    &.-name {
      > .v-col > .input :deep(.v-input__control) {
        width: calc(100% - 32px);
      }
    }
  }
}
</style>
