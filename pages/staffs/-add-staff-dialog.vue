<script lang="ts" setup>
import { positions, departments } from '~~/constants/staff'
import { useStaffStore } from '~~/store/staff'
import { useValidator } from '~~/utils/validator'
import { VNodeRef } from 'vue'

const staffStore = useStaffStore()
const { required, isKanaCharacters } = useValidator()
const props = defineProps(['isShow'])
const isShow = ref(props.isShow)
const loading = ref(false)
const emit = defineEmits(['close', 'success'])
const staffForm = ref<VNodeRef | null>(null)

const staff = reactive({
  name: '',
  nameKana: '',
  position: undefined,
  department: undefined
})

async function addStaff() {
  const { valid } = await staffForm.value.validate()
  if (!valid) return

  loading.value = true
  const isCreateSuccess = await staffStore.createStaff(staff)
  loading.value = false

  if (isCreateSuccess) {
    useSnackbar({ message: '担当者を登録しました。' })
    emit('success')
  } else {
    useSnackbar({
      message: '担当者を登録出来ませんでした。',
      status: false
    })
  }
}
</script>

<template>
  <v-row justify="center">
    <v-dialog
      class="addstaff-dialog"
      v-model="isShow"
      fullscreen
      @update:modelValue="emit('close')"
    >
      <v-card class="dialog">
        <v-toolbar class="header" color="primary">
          <v-toolbar-title class="text">担当者情報新規登録</v-toolbar-title>
          <v-btn class="button" icon color="white" @click="emit('close')">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="dialog-content">
          <v-form class="form" ref="staffForm">
            <v-container class="container">
              <v-row class="line" justify="space-between">
                <v-col class="column" cols="12" sm="5">
                  <v-text-field
                    variant="outlined"
                    density="compact"
                    class="input -name"
                    :hide-details="false"
                    :rules="[required]"
                    v-model="staff.name"
                  >
                    <template #prepend>
                      <label class="label">担当者名</label>
                    </template>
                  </v-text-field>
                </v-col>
                <v-col class="column" cols="12" sm="5">
                  <v-text-field
                    variant="outlined"
                    density="compact"
                    class="input -namekana"
                    :hide-details="false"
                    :rules="[required, isKanaCharacters]"
                    v-model="staff.nameKana"
                  >
                    <template #prepend>
                      <label class="label">カナ名</label>
                    </template>
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row class="line" justify="start">
                <v-col class="column" cols="6" sm="5">
                  <v-select
                    class="input -department"
                    variant="outlined"
                    density="compact"
                    :items="departments"
                    v-model="staff.department"
                    :hide-details="false"
                    item-title="label"
                    item-value="value"
                  >
                    <template #prepend>
                      <label class="label">所属部(任意）</label>
                    </template>
                  </v-select>
                </v-col>
              </v-row>
              <v-row class="line" justify="start">
                <v-col class="column" cols="6" sm="5">
                  <v-select
                    class="input -position"
                    variant="outlined"
                    density="compact"
                    :items="positions"
                    v-model="staff.position"
                    :hide-details="false"
                    item-title="label"
                    item-value="value"
                  >
                    <template #prepend>
                      <label class="label">役職名(任意）</label>
                    </template>
                  </v-select>
                </v-col>
              </v-row>
              <v-row class="line -action" justify="center">
                <v-btn @click="addStaff()" :loading="loading">新規登録</v-btn>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<style scoped lang="scss">
.dialog-content {
  > .form > .container > .line {
    margin-top: 20px;
    &.-action {
      margin-top: 30px;
    }
  }

  > .form > .container > .line > .column > .input .label {
    width: 110px;
  }
}
</style>
