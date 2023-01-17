<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  message: {
    type: String,
    default: ''
  }
})

const emitFactory = defineEmits(['update:modelValue', 'onDelete'])
const isDelete = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emitFactory('update:modelValue', value)
  }
})

const onCloseDeleteDialog = () => {
  emitFactory('update:modelValue', false)
}
</script>

<template>
  <v-dialog v-model="isDelete" width="400">
    <v-card class="rounded-xl">
      <v-toolbar color="transparent" class="toolbar" height="50">
        <v-spacer></v-spacer>
        <v-btn icon dark class="mx-1" @click="onCloseDeleteDialog">
          <v-icon color="primary">mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-title class="text-center py-0 my-0"> {{ title }} </v-card-title>
      <v-card-text class="text-center"> {{ message }} </v-card-text>
      <v-card-actions class="d-flex justify-center my-6">
        <v-btn class="rounded-xl px-4 mx-6" width="84" variant="flat" @click="$emit('onDelete')">削除する</v-btn>
        <v-btn class="rounded-xl px-4 mx-6" width="84" variant="flat" @click="onCloseDeleteDialog">戻る</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
