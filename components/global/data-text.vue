<template>
  <div class="data-text px-2 py-2">
    <p class="label">{{ label }}</p>
    <component :is="component" v-bind="{ ...attrs }" :value="text">
      {{ text }}
    </component>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  text: {
    type: [String, Number],
    default: ''
  },
  type: {
    type: String,
    default: 'input'
  }
})
const VTextarea = resolveComponent('VTextarea')
const isTextarea = props.type !== 'input'
const component = isTextarea ? VTextarea : 'p'
const textareaAttrs = {
  variant: 'outlined',
  noResize: true,
  color: 'primary',
  readOnly: true,
  class: 'text border-none mt-2'
}
const attrs = isTextarea ? textareaAttrs : { class: 'text mt-1' }
</script>

<style lang="scss" scoped>
.data-text {
  position: relative;

  > .label {
    position: absolute;
    font-weight: bold;
    font-size: 1.1rem;
    top: -16px;
  }

  > .text {
    margin-left: 50px;
    border-bottom: 1px solid $abo-secondary-color;
  }
}
</style>
