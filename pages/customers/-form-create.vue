<script lang="ts" setup>
import { customerTypes, targetCancelTypes } from '~~/constants/customer'
import { CreateCustomerRequest } from '~~/types/customer'
import { useStaffStore } from '~~/store/staff'

const emitFactory = defineEmits(['submit'])
const customer: CreateCustomerRequest = reactive({
  fullName: '',
  name: '',
  fullNameKana: '',
  type: null,
  address: '',
  subAddress: '',
  contactStaffName: '',
  postal: '',
  fax: '',
  targetCancelType: null,
  staffId: null,
  tel: '',
  memo: ''
})

const staffStore = useStaffStore()
const validator = useValidator()
const form = ref(null)
const submit = async () => {
  await nextTick()
  //@ts-ignore
  const { valid } = await form.value?.validate()
  if (valid) emitFactory('submit', customer)
}
</script>

<template>
  <v-form ref="form" validate-on="blur" @submit.prevent="submit">
    <v-row class="justify-space-between mb-1">
      <v-col cols="5">
        <v-row class="justify-start">
          <v-col class="mb-6 label">顧客名1</v-col>
          <v-col>
            <v-text-field
              v-model="customer.fullName"
              :hide-details="false"
              class="input"
              variant="outlined"
              :rules="[validator.required]"
              required
            ></v-text-field>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="5">
        <v-row class="justify-start">
          <v-col class="mb-6 label">カナ名</v-col>
          <v-col>
            <v-text-field
              v-model="customer.fullNameKana"
              :hide-details="false"
              class="input"
              variant="outlined"
              :rules="[validator.isKanaCharacters]"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row class="justify-space-between mb-1">
      <v-col cols="5">
        <v-row class="justify-start">
          <v-col class="mb-6 label">顧客名2</v-col>
          <v-col>
            <v-text-field
              v-model="customer.name"
              :hide-details="false"
              class="input"
              variant="outlined"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="5">
        <v-row class="justify-start">
          <v-col class="mb-6 label">担当者</v-col>
          <v-col>
            <v-text-field
              v-model="customer.contactStaffName"
              :hide-details="false"
              :rules="[validator.required]"
              class="input"
              variant="outlined"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row class="justify-space-between mb-1">
      <v-col cols="5">
        <v-row class="justify-start">
          <v-col class="mb-6 label">住所1</v-col>
          <v-col>
            <v-text-field
              v-model="customer.address"
              :rules="[validator.required]"
              :hide-details="false"
              class="input"
              variant="outlined"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="5">
        <v-row class="justify-start">
          <v-col class="mb-6 label">住所2</v-col>
          <v-col>
            <v-text-field
              v-model="customer.subAddress"
              :hide-details="false"
              class="input"
              variant="outlined"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row class="justify-space-between mb-1 postalcode">
      <v-col class="label mb-6">郵便番号</v-col>
      <v-col class="align-center form">
        <v-text-field
          v-model="customer.postal"
          :rules="[validator.isNumber, validator.isMax(7)]"
          :hide-details="false"
          class="input"
          variant="outlined"
        ></v-text-field>
      </v-col>
      <v-col class="mb-5">
        <NuxtLink
          to="https://www.post.japanpost.jp/zipcode"
          target="_blank"
          class="text-lime-darken-2 ml-4"
        >
          郵便番号が分からない場合
        </NuxtLink>
      </v-col>
    </v-row>
    <v-row class="justify-space-between mb-1">
      <v-col cols="5">
        <v-row class="justify-start">
          <v-col class="label">区分</v-col>
          <v-col>
            <v-radio-group
              :rules="[validator.required, validator.isNumber]"
              v-model="customer.type"
              inline
            >
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
        </v-row>
      </v-col>
      <v-col cols="5">
        <v-row class="justify-start">
          <v-col class="label">キャンセル区分</v-col>
          <v-col>
            <v-radio-group
              :rules="[validator.required, validator.isNumber]"
              v-model="customer.targetCancelType"
              inline
              requried
            >
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
      </v-col>
    </v-row>
    <v-row class="justify-space-between mb-1">
      <v-col cols="5">
        <v-row class="justify-start">
          <v-col class="mb-6 label">電話番号</v-col>
          <v-col>
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
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="5">
        <v-row class="justify-start">
          <v-col class="mb-6 label">FAX</v-col>
          <v-col>
            <v-text-field
              v-model="customer.fax"
              :hide-details="false"
              class="input"
              variant="outlined"
              :rules="[validator.isNumber]"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row class="justify-space-between mb-1">
      <v-col cols="5">
        <v-row class="justify-start">
          <v-col class="mb-6 label">営業担当者</v-col>
          <v-col>
            <v-autocomplete
              v-model="customer.staffId"
              :items="staffStore.staffs"
              item-title="name"
              item-value="id"
              variant="outlined"
              class="select"
              :hide-details="false"
              :rules="[validator.required]"
            ></v-autocomplete>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row class="justify-space-between mb-1 memo" align="start">
      <v-col class="label">備考</v-col>
      <v-col>
        <v-textarea v-model="customer.memo" variant="outlined"></v-textarea>
      </v-col>
    </v-row>
    <v-row class="justify-center mt-8">
      <v-btn class="text-white" height="40" type="submit"> 新規登録 </v-btn>
    </v-row>
  </v-form>
</template>

<style lang="scss" scoped>
.input {
  @include abo-input;
}

.select {
  @include abo-select;
}
.label {
  flex: 0 0 17.5%;
  max-width: 17.5%;
}
.memo > .label,
.postalcode > .label {
  flex: 0 0 7.292%;
  max-width: 7.292%;
}

.postalcode > .form {
  flex: 0 0 34.375%;
  max-width: 34.375%;
}
</style>
