<script lang="ts" setup>
import { useStaffStore } from '~~/store/staff'
import { positions, departments } from '~~/constants/staff'
import { useValidator } from '~~/utils/validator'
import { VNodeRef } from 'vue'

const staffForm = ref<VNodeRef | null>(null)
const props = defineProps(['isShow', 'selectedStaff'])
const emit = defineEmits(['close', 'success'])
const staffStore = useStaffStore()
const { required, isKanaCharacters } = useValidator()
const isShow = ref(props.isShow)
const editingStaff = reactive({ ...props.selectedStaff })
const loading = ref(false)

async function editStaff() {
  const { valid } = await staffForm.value.validate()
  if (!valid) return

  loading.value = true
  const isEditSuccess = await staffStore.editStaff(editingStaff)
  loading.value = false

  if (isEditSuccess) {
    useSnackbar({ message: '担当者を更新しました。' })
    emit('success')
  } else {
    useSnackbar({
      message: '担当者を更新出来ませんでした。',
      status: false
    })
  }
}
</script>

<template>
  <v-row justify="center">
    <v-dialog
      class="editstaff-dialog"
      v-model="isShow"
      max-width="500"
      @update:modelValue="emit('close')"
    >
      <v-card class="dialog">
        <v-toolbar class="header" color="primary">
          <v-toolbar-title class="text">担当者情報の編集</v-toolbar-title>
          <v-btn class="button" icon color="white" @click="emit('close')">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="dialog-content">
          <v-form class="form" ref="staffForm">
            <v-container class="container">
              <v-row class="line">
                <v-col class="column" cols="12" sm="12">
                  <v-text-field
                    variant="outlined"
                    density="compact"
                    class="input -name"
                    :hide-details="false"
                    :rules="[required]"
                    v-model="editingStaff.name"
                  >
                    <template #prepend>
                      <label class="label">担当者名</label>
                    </template>
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row class="line" justify="space-between">
                <v-col class="column" cols="12" sm="12">
                  <v-text-field
                    variant="outlined"
                    density="compact"
                    class="input -namekana"
                    :hide-details="false"
                    :rules="[required, isKanaCharacters]"
                    v-model="editingStaff.nameKana"
                  >
                    <template #prepend>
                      <label class="label">カナ名</label>
                    </template>
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row class="line" justify="start">
                <v-col class="column" cols="12" sm="12">
                  <v-select
                    class="input -department"
                    variant="outlined"
                    density="compact"
                    :items="departments"
                    v-model="editingStaff.department"
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
                <v-col class="column" cols="12" sm="12">
                  <v-select
                    class="input -position"
                    variant="outlined"
                    density="compact"
                    :items="positions"
                    v-model="editingStaff.position"
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
                <v-btn @click="editStaff()" :loading="loading">更新する</v-btn>
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
  > .form > .container > .line > .column > .input .label {
    width: 120px;
  }
}
</style>
