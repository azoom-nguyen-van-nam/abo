<script lang="ts" setup>
const props = defineProps(['user'])
const emit = defineEmits(['addUser', 'saveUser', 'deleteUser', 'cancel'])

const userInfo = ref({
  ...(props.user.id && { id: props.user.id }),
  name: props.user.name ?? '',
  email: props.user.email ?? ''
})
const isEdit = computed(() => !!props.user.id)
const title = computed(() => (isEdit.value ? 'Update user' : 'Add user'))
const isValidForm = computed(() => {
  const { name, email } = userInfo.value
  return name !== '' && email !== ''
})

function saveUser() {
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
      <div class="modal">
        <div class="content">
          <h2 class="title">{{ title }}</h2>
          <form class="form">
            <div class="field" v-if="isEdit">
              <label class="label">ID:</label>
              <input
                type="text"
                class="input -readonly"
                readonly
                :value="userInfo.id"
              />
            </div>
            <div class="field">
              <label class="label">Name:</label>
              <input
                type="text"
                class="input"
                required
                v-model="userInfo.name"
              />
            </div>
            <div class="field">
              <label class="label">Email:</label>
              <input
                type="email"
                class="input"
                required
                v-model="userInfo.email"
              />
            </div>
          </form>
          <div class="action">
            <button
              :class="['button -save', { '-disabled': !isValidForm }]"
              :disabled="!isValidForm"
              @click="saveUser"
            >
              {{ isEdit ? 'Save' : 'Add' }}
            </button>
            <button class="button -delete" v-if="isEdit" @click="deleteUser">
              Delete
            </button>
            <button class="button -cancel" @click="emit('cancel')">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<style lang="scss" scoped>
.modal {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  > .content .title {
    margin-bottom: 1rem;
  }
  .content > .form {
    font-size: 2.5rem;
  }
  .content > .form > .field {
    display: flex;
    align-items: center;
    gap: 1rem;
    &:not(:last-child) {
      margin-bottom: 1rem;
    }
    > .label {
      min-width: 3.5rem;
      font-size: 1.2rem;
    }
    > .input {
      flex: 1;
      padding: 10px 5px;
      &.-readonly {
        opacity: 0.5;
        pointer-events: none;
      }
    }
  }
  .content > .action {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 1rem;
    padding: 1rem;
  }
  .content > .action > .button {
    padding: 0.5rem 1.5rem;
    border-radius: 3px;
    border: none;
    outline: none;
    color: #fff;
    cursor: pointer;
    &.-save {
      background-color: #0d6efd;
    }
    &.-delete {
      background-color: #ff0000;
    }
    &.-cancel {
      background-color: #808080;
    }
    &.-disabled {
      background-color: #c6c6c6;
    }
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
