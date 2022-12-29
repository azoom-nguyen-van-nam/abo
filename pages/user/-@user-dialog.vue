<script lang="ts" setup>
import { User } from '~/types/User'

const props = defineProps(['user'])
const emit = defineEmits(['addUser', 'saveUser', 'deleteUser', 'cancel'])

const isEdit = computed<boolean>(() => !!props.user.id)
const title = computed<string>(() =>
  isEdit.value ? 'Update user' : 'Add user'
)

const userInfo = ref<User>({
  ...(props.user.id && { id: props.user.id }),
  name: props.user.name ?? '',
  email: props.user.email ?? ''
})

const rules = {
  name: [
    (v: boolean | string) => !!v || 'Name is required',
    (v: string) =>
      (v && v.length <= 50) || 'Name must be less than 50 characters'
  ],
  email: [
    (v: boolean | string) => !!v || 'E-mail is required',
    (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid'
  ]
}
const validForm = true
const formRef = ref(null)
async function saveUser() {
  const { valid } = await formRef.value.validate()
  if (!valid) return false

  const action = isEdit.value ? 'saveUser' : 'addUser'
  const id = Math.random().toString().substring(2, 8)
  emit(action, { id, ...userInfo.value })
}
function deleteUser() {
  emit('deleteUser', userInfo.value.id)
}
</script>

<template>
  <Teleport to="body">
    <transition name="fade">
      <div class="modal -overlay">
        <v-card
          class="content"
          :prepend-icon="`mdi-account-${isEdit ? 'edit' : 'plus'}-outline`"
        >
          <template v-slot:title>
            {{ title }}
          </template>
          <v-form ref="formRef" v-model="validForm">
            <v-card-text>
              <v-text-field
                v-if="isEdit"
                v-model="userInfo.id"
                label="ID"
                disabled
              ></v-text-field>
              <v-text-field
                v-model="userInfo.name"
                :counter="50"
                :rules="rules.name"
                label="Name"
                required
              ></v-text-field>
              <v-text-field
                v-model="userInfo.email"
                :rules="rules.email"
                label="E-mail"
                required
              ></v-text-field
            ></v-card-text>
            <v-divider class="mt-10"></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="emit('cancel')"> Cancel </v-btn>
              <v-btn color="error" v-if="isEdit" @click="deleteUser">
                Delete
              </v-btn>
              <v-btn color="primary" @click="saveUser">
                {{ isEdit ? 'Save' : 'Add' }}
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </div>
    </transition>
  </Teleport>
</template>

<style lang="scss" scoped>
.modal {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  &.-overlay {
    position: absolute;
    inset: 0;
    z-index: 1011;
    background-color: rgba(0, 0, 0, 0.5);
  }
  > .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-width: 25rem;
    padding: 1rem;
    background-color: white;
    border-radius: 0.5rem;
    animation: scale 0.5s;
  }
}

@keyframes scale {
  0% {
    transform: scale(0) skew(50deg, 35deg);
  }
  80% {
    transform: scale(1.3) skew(1deg, 0.5deg);
  }
  100% {
    transform: scale(1);
  }
}
</style>
