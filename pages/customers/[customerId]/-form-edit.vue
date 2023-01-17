<script lang="ts" setup>
import { customerTypes, targetCancelTypes } from '~~/constants/customer'
import { useStaffStore } from '~~/store/staff'
const staffStore = useStaffStore()

const props = defineProps({
  customer: {
    type: Object,
    required: true
  }
})
const emitFactory = defineEmits(['submit'])
const customer = reactive({ ...props.customer })
const form = ref(null)
const validator = useValidator()

const submit = async () => {
  await nextTick()
  // @ts-ignore
  const { valid } = await form.value?.validate()
  if (valid) emitFactory('submit', customer)
}
</script>

<template>
  <v-form ref="form" validate-on="blur" @submit.prevent="submit">
    <div class="mb-2">
      <label>顧客名1</label>
      <v-text-field
        v-model="customer.fullName"
        :hide-details="false"
        :rules="[validator.required]"
        variant="outlined"
        class="input"
      >
      </v-text-field>
    </div>
    <div class="mb-2">
      <label>顧客名2</label>
      <v-text-field
        v-model="customer.name"
        :hide-details="false"
        class="input"
        variant="outlined"
      ></v-text-field>
    </div>
    <div class="mb-2">
      <label>カナ名</label>
      <v-text-field
        v-model="customer.fullNameKana"
        :hide-details="false"
        :rules="[validator.isKanaCharacters]"
        variant="outlined"
        class="input"
      >
      </v-text-field>
    </div>
    <div class="mb-2">
      <label>住所</label>
      <v-text-field
        v-model="customer.address"
        :rules="[validator.required]"
        :hide-details="false"
        class="input"
        variant="outlined"
      ></v-text-field>
    </div>
    <div class="mb-2">
      <label>郵便番号</label>
      <v-row>
        <v-col>
          <v-text-field
            v-model="customer.postal"
            :rules="[validator.isNumber, validator.isMax(7)]"
            :hide-details="false"
            class="input"
            variant="outlined"
          ></v-text-field>
        </v-col>
        <v-col class="pb-5">
          <NuxtLink
            to="https://www.post.japanpost.jp/zipcode"
            target="_blank"
            class="text-lime-darken-2 ml-4"
          >
            郵便番号が分からない場合
          </NuxtLink>
        </v-col>
      </v-row>
    </div>
    <v-row class="mb-2">
      <v-col>
        <label>区分</label>
        <v-radio-group v-model="customer.type" inline>
          <v-radio
            v-for="customerType in customerTypes"
            :key="customerType.value"
            :label="customerType.title"
            :value="customerType.value"
            class="mr-4"
          >
          </v-radio>
        </v-radio-group>
      </v-col>
      <v-col>
        <label>キャンセル区分</label>
        <v-radio-group v-model="customer.targetCancelType" inline>
          <v-radio
            v-for="targetCancelType in targetCancelTypes"
            :key="targetCancelType.value"
            :label="targetCancelType.title"
            :value="targetCancelType.value"
            class="mr-4"
          >
          </v-radio>
        </v-radio-group>
      </v-col>
    </v-row>
    <div class="mb-2">
      <label>電話番号</label>
      <v-text-field
        v-model="customer.tel"
        :rules="[
          validator.required,
          validator.isNumber,
          validator.isLength(10, 12)
        ]"
        :hide-details="false"
        class="input"
        variant="outlined"
      ></v-text-field>
    </div>

    <div class="mb-2">
      <label>FAX</label>
      <v-text-field
        v-model="customer.fax"
        :rules="[validator.isNumber]"
        :hide-details="false"
        class="input"
        variant="outlined"
      ></v-text-field>
    </div>
    <div class="mb-2">
      <label>営業担当者</label>
      <v-autocomplete
        :rules="[validator.required]"
        v-model="customer.staffId"
        :hide-details="false"
        :items="staffStore.staffs"
        item-title="name"
        item-value="id"
        variant="outlined"
        clearable
        class="select"
      ></v-autocomplete>
    </div>
    <div class="mb-2">
      <label class="label">備考</label>
      <v-textarea v-model="customer.memo" variant="outlined"></v-textarea>
    </div>
    <div class="text-center mt-8">
      <v-btn type="submit" class="text-white" height="40">
        新規登録
      </v-btn>
    </div>
  </v-form>
</template>

<style lang="scss" scoped>
.input {
  @include abo-input;
}

.select {
  @include abo-select;
}

.memo > .label,
.postalcode > .label {
  flex: 0 0 calc(100% / 9.6);
  max-width: calc(100% / 9.6);
}

.postalcode > .form {
  flex: 0 0 31.25%;
  max-width: 31.25%;
}
</style>
