<script lang="ts" setup>
import CustomerForm from './-form-create.vue'
import { customerTypes } from '~~/constants/customer'
import { DataTableHeader } from '~~/types/app'
import { CreateCustomerRequest, GetCustomersRequest } from '~~/types/customer'
import { useCustomerStore } from '~~/store/customer'
import { useStaffStore } from '~~/store/staff'

useRefHead({
  title: '顧客一覧'
})

const headers: DataTableHeader[] = [
  { text: 'ID', value: 'id', align: 'center' },
  { text: '顧客名', value: 'fullName', align: 'center' },
  { text: 'カナ名', value: 'fullNameKana', align: 'center' },
  { text: '区分', value: 'type', align: 'center' },
  { text: '住所', value: 'address' },
  { text: '電話番号', value: 'tel' },
  { text: '紐付け予約', value: 'bookingIds' }
]

const isCreate = ref(false)
const toogleDialog = () => (isCreate.value = !isCreate.value)

const generateBookingLink = (bookingId: number) => `/bookings/${bookingId}`
const generateCustomerLink = (customerId: number) => `/customers/${customerId}`
const getCustomerTypeText = (type: number) =>
  customerTypes.find(({ value }) => type === value)?.title

const customerStore = useCustomerStore()
const searchParams = reactive<GetCustomersRequest>({})
const searchCustomers = async () => {
  const queries: GetCustomersRequest = {
    ...searchParams,
    type: !searchParams.type ? '' : searchParams.type
  }
  await customerStore.getCustomers({ ...queries })
}
const insertCustomer = async (customer: CreateCustomerRequest) => {
  const isCreated = await customerStore
    .createCustomer(customer)
    .catch(() => false)
  useSnackbar({
    status: !!isCreated,
    message: isCreated
      ? '顧客者の情報を登録しました。'
      : '顧客者の情報を登録できませんでした。'
  })
  await searchCustomers()
  toogleDialog()
}

const staffStore = useStaffStore()
await staffStore.getStaffs({})
await searchCustomers()
</script>

<template>
  <p class="heading text-h6 font-weight-bold pl-3 pb-1 my-2">顧客一覧</p>
  <div class="wrapper ml-2 py-4">
    <v-text-field v-model="searchParams.id" label="ID"> </v-text-field>
    <v-text-field v-model="searchParams.fullName" label="顧客名">
    </v-text-field>
    <v-text-field v-model="searchParams.fullNameKana" label="カナ名">
    </v-text-field>
    <v-autocomplete
      v-model="searchParams.type"
      label="区分"
      :items="customerTypes"
      class="select"
    ></v-autocomplete>
    <v-text-field v-model="searchParams.address" label="住所"> </v-text-field>
    <v-text-field v-model="searchParams.tel" label="電話番号"> </v-text-field>
    <v-text-field v-model="searchParams.bookingId" label="紐付け予約ID">
    </v-text-field>
    <v-btn @click="searchCustomers"> 検索 </v-btn>
  </div>
  <div class="d-flex justify-end my-6 mr-4">
    <v-btn class="my-btn" @click="toogleDialog"> 新規登録 </v-btn>
  </div>

  <v-card>
    <data-table
      :headers="headers"
      :items="customerStore.customers"
      :items-per-page="500"
      no-data-text="登録されている顧客情報はありません"
    >
      <template #item[type]="{ item }">
        {{ getCustomerTypeText(item.type) }}
      </template>
      <template #actions="{ item }">
        <NuxtLink
          class="text-success text-decoration-underline"
          :to="generateCustomerLink(item.id)"
        >
          詳細を見る
        </NuxtLink>
      </template>
      <template #[`item.bookingIds`]="{ item }">
        <NuxtLink
          v-if="item.bookingIds && item.bookingIds.length > 0"
          v-for="bookingId in item.bookingIds.slice(0, 3)"
          :key="bookingId"
          class="text-success text-decoration-underline mx-1"
          :to="generateBookingLink(bookingId)"
        >
          {{ bookingId }}
        </NuxtLink>
      </template>
    </data-table>
  </v-card>

  <v-dialog
    v-model="isCreate"
    fullscreen
    :scrim="false"
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-toolbar color="primary">
        <v-toolbar-title class="text-white">顧客新規登録</v-toolbar-title>
        <v-btn icon dark @click="toogleDialog">
          <v-icon class="text-white">mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <div class="my-6 py-6 px-12 mx-4 bg-white rounded-lg">
        <CustomerForm @submit="insertCustomer" />
      </div>
    </v-card>
  </v-dialog>
</template>

<style lang="scss" scoped>
.heading {
  border-left: 3px solid rgba(var(--v-theme-primary));
  border-bottom: 1px solid rgba(var(--v-theme-primary));
}
.wrapper {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 15px;
  border-radius: 4px;
  box-shadow: 0 3px 14px 0 #00000014;

  > .select {
    @include clearable-icon(8px);
    width: 70px !important;
    &:deep(.v-autocomplete__selection) {
      white-space: nowrap;
      overflow: hidden;
    }
  }

  @include xs {
    color: black;
  }
}
</style>
