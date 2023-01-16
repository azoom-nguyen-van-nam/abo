<script lang="ts" setup>
import { VNodeRef } from 'vue'
import { Room } from '~/types/room'
import { useRoomStore } from '~~/store/room'

const props = defineProps({
  closeDialog: {
    type: Function,
    required: true
  }
})

const roomStore = useRoomStore()
const room = ref<Room>({
  roomNumber: 0,
  name: '',
  basicPrice: 0,
  overPrice: 0,
  fullDayPrice: 0,
  isWithoutTax: 0,
  sShapeCapacity: 0,
  mouthShapeCapacity: 0,
  theaterShapeCapacity: 0
})
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
  const res = await roomStore.addRoom(room.value)
  if (res) {
    await roomStore.getRooms()
    props.closeDialog()
  }
  isLoading.value = false
}
</script>

<template>
  <v-form v-model="validForm" ref="formAddRef" class="add-room-form">
    <v-card class="h-screen pb-5">
      <v-toolbar title="会議室情報新規登録" color="primary" height="50">
        <v-btn
          icon="mdi-close"
          size="x-small"
          variant="flat"
          color="transparent"
          class="px-1"
          @click="closeDialog"
        >
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <v-container fluid class="py-0">
          <v-row justify="start" class="group my-0 pa-2 bg-white -room">
            <v-col class="field" cols="12" sm="5">
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
            <v-col class="field" cols="12" sm="5">
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
          <v-row justify="start" class="group my-0 pa-2 bg-white">
            <v-col class="field" cols="12" sm="5">
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
            <v-col class="field" cols="12" sm="5">
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
            <v-col class="field" cols="12" sm="5">
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
            <v-col class="field" cols="12">
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
          <v-row justify="start" class="group my-0 pa-2 bg-white">
            <v-col class="field" cols="12" sm="5">
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
            <v-col class="field align-center" cols="12" sm="5">
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
            </v-col>
            <v-col class="field" cols="12" sm="5">
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
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions class="actions d-flex justify-center pb-3">
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
          新規登録
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<style scoped lang="scss">
.add-room-form {
  > .v-card > .v-card-title {
    border-left: 3px solid rgba(var(--v-theme-primary));
    border-bottom: 1px solid rgba(var(--v-theme-primary));
  }
  > .v-card > .v-card-text > .v-container > .group {
    border-radius: 10px;
    column-gap: 5rem;
    > .field > .input > :deep(.v-input__prepend) {
      width: 5rem;
      > .label {
        font-size: 14px;
      }
    }
    > .field > .input.-gender > :deep(.v-input__prepend) {
      padding-top: 0;
    }
    &.-room > .field > .input :deep(.v-input__control) {
      width: calc(100% - 32px);
    }
  }
}
</style>
