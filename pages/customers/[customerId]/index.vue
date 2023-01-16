<script lang="ts" setup>
import { Ref } from 'vue'
import CustomerEditForm from './-form-edit.vue'
import { useCustomerStore } from '~~/store/customer'
import { useStaffStore } from '~~/store/staff'
import { customerTypes, targetCancelTypes } from '~~/constants/customer'
import { bookingStatus, bookingStatusText } from '~~/constants/booking'
import { roomLayouts } from '~~/constants/room'
import { DataTableHeader } from '~~/types/app'
import { Customer } from '~~/types/customer'
import { Booking } from '~~/types/booking'

definePageMeta({
  middleware: async (to) => {
    const customerStore = useCustomerStore()
    const customerId = +to.params.customerId
    const customer = await customerStore
      .getCustomer(customerId)
      .catch(() => false)
    if (!customer) return '/customers'
  }
})

useRefHead({ title: '旭電化工業株式会社' })

const route = useRoute()
const customerId = +route.params.customerId

const customerStore = useCustomerStore()
const customer = ref(await customerStore.getCustomer(customerId))

const staffStore = useStaffStore()
await staffStore.getStaffs()

const headers: DataTableHeader[] = [
  { text: '予約番号', value: 'formatedId', align: 'center' },
  { text: '予約状況', value: 'status', align: 'center' },
  { text: '利用日', value: 'date', align: 'center' },
  { text: '利用時間', value: 'time', align: 'center' },
  { text: '会場名', value: 'roomBookingNumber', align: 'center' },
  { text: 'タイプ', value: 'roomLayout', align: 'center' },
  { text: '利用人数', value: 'numberOfPeople', align: 'center' },
  { text: '申込者名', value: 'contactPerson', align: 'center' }
]

const isEdit = ref(false)
const toogleEditDialog = () => (isEdit.value = !isEdit.value)

const isDelete = ref(false)
const toogleDeleteDialog = () => (isDelete.value = !isDelete.value)

const generateBookingLink = (bookingId: number) => `/bookings/${bookingId}`
const getCustomerTypeText = (type: number) =>
  customerTypes.find(({ value }) => type === value)?.title
const getTargetCancelTypeText = (type: number) =>
  targetCancelTypes.find(({ value }) => type === value)?.title
const getBookingStatusText = (type: number) =>
  bookingStatusText.find(({ value }) => type === value)?.title
const getBackgroudClassStatus = (status: number): string | void => {
  if (status === 1) return 'bg-red-lighten-1'
  if (status === 2) return 'bg-success'
  if (status === 3) return 'bg-blue-darken-4'
  if (status === 4) return 'bg-success'
  if (status === 5) return 'bg-red-lighten-1'
  if (status === 6) return 'bg-grey-lighten-1'
}

const editCustomer = async (editedCustomer: Customer) => {
  const {
    fullName,
    fullNameKana,
    address,
    postal,
    type,
    fax,
    tel,
    staffId,
    memo
  } = editedCustomer
  const customerData = {
    fullName,
    fullNameKana,
    address,
    postal,
    tel,
    type,
    fax,
    staffId,
    memo
  }

  const isSuccess = await customerStore
    .updateCustomer(customerId, customerData)
    .catch(() => false)
  useSnackbar({
    status: isSuccess,
    message: isSuccess
      ? '顧客者の情報を更新しました。'
      : '顧客者の情報を更新できませんでした。'
  })

  if (isSuccess) await refreshData()
  toogleEditDialog()
}

await customerStore.getCustomerBookings(customerId)

const getCustomerRoomBookings = (): Booking[] => {
  return customerStore.customerBookings.map((roomBooking) => {
    const spreadedStartTime = spreadDatetime(roomBooking.startTime)
    const spreadedEndTime = spreadDatetime(roomBooking.endTime)

    return {
      ...roomBooking,
      formatedId: `${roomBooking.bookingId}-${roomBooking.roomBookingNumber}`,
      date: spreadedStartTime[1].replaceAll('-', '/'),
      time: `${spreadedStartTime[2]}~${spreadedEndTime[2]}`
    }
  })
}

const removeCustomer = async () => {
  const isSuccess = await customerStore.deleteCustomer(customerId)
  useSnackbar({
    status: isSuccess,
    message: isSuccess
      ? '顧客者情報を削除しました。'
      : '顧客者情報を削除できませんでした。'
  })

  if (isSuccess) navigateTo('/customers')
  toogleDeleteDialog()
}

const filterStatus = reactive({
  success: false,
  cancel: false,
  tentative: false,
  paid: false,
  pending: false,
  checkedIn: false
})

const customerBookingsStore = computed(() => getCustomerRoomBookings())
const filterRoomBookingsByStatus = (): Booking[] => {
  if (
    Object.values(filterStatus).every((status) => status) ||
    Object.values(filterStatus).every((status) => !status)
  )
    return customerBookingsStore.value

  return customerBookingsStore.value.filter(
    ({ status }) =>
      (status === bookingStatus.success && filterStatus.success) ||
      (status === bookingStatus.cancel && filterStatus.cancel) ||
      (status === bookingStatus.tentative && filterStatus.tentative) ||
      (status === bookingStatus.pending && filterStatus.pending) ||
      (status === bookingStatus.paid && filterStatus.paid) ||
      (status === bookingStatus.checkedIn && filterStatus.checkedIn)
  )
}

const customerBookings: Ref<Booking[]> = ref(filterRoomBookingsByStatus())
watch(filterStatus, () => {
  customerBookings.value = filterRoomBookingsByStatus()
  scrollTo({ top: 700, behavior: 'smooth' })
})

const refreshData = async () => {
  customer.value = await customerStore.getCustomer(customerId)
  customerBookings.value = filterRoomBookingsByStatus()
}
</script>

<template>
  <p class="heading text-h6 font-weight-bold pl-3 pb-1 mt-2 mb-6">
    <NuxtLink to="/customers" class="text-success">顧客一覧</NuxtLink>
     > 旭電化工業株式会社
  </p>
  <v-row class="justify-space-between mt-2">
    <h2 class="subtitle">顧客情報</h2>
    <v-spacer></v-spacer>
    <v-btn
      variant="outlined"
      color="success"
      class="mx-2"
      @click="toogleEditDialog"
      >編集</v-btn
    >
    <v-btn
      variant="outlined"
      color="error"
      class="mx-2"
      @click="toogleDeleteDialog"
      >顧客情報を取り下げる</v-btn
    >
  </v-row>
  <v-card
    color="white"
    class="mt-4 mb-8 px-6 pt-10 pb-7 rounded-lg customer-info"
  >
    <v-row class="justify-space-between mb-3">
      <v-col cols="5">
        <data-text label="顧客名1" :text="customer.fullName" />
      </v-col>
      <v-col cols="6">
        <data-text label="顧客名2" :text="customer?.name" />
      </v-col>
    </v-row>
    <v-row class="justify-space-between mb-3">
      <v-col cols="5">
        <data-text label="カナ名" :text="customer.fullNameKana" />
      </v-col>
      <v-col cols="6">
        <data-text label="担当者" :text="customer.contactStaffName" />
      </v-col>
    </v-row>
    <v-row class="justify-space-between mb-3">
      <v-col cols="5">
        <data-text label="住所 1" :text="customer.address" />
      </v-col>
      <v-col cols="6">
        <data-text label="住所 2" :text="customer.subAddress" />
      </v-col>
    </v-row>
    <v-row class="justify-space-between mb-3">
      <v-col cols="5">
        <data-text label="郵便番号" :text="customer.postal" />
      </v-col>
      <v-col cols="6">
        <v-row>
          <v-col cols="6">
            <data-text
              label="区分"
              :text="getCustomerTypeText(customer.type)"
            />
          </v-col>
          <v-col cols="6">
            <data-text
              label="キャンセル区分"
              :text="getTargetCancelTypeText(customer.targetCancelType)"
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row class="justify-space-between mb-3">
      <v-col cols="5">
        <data-text label="電話番号" :text="customer.tel" />
      </v-col>
      <v-col cols="6">
        <data-text label="FAX" :text="customer.fax" />
      </v-col>
    </v-row>
    <v-row justify="start" class="mb-3">
      <v-col cols="5">
        <data-text
          type="input"
          label="営業担当者"
          :text="customer.staff?.name"
        />
      </v-col>
    </v-row>
    <v-row justify="start">
      <v-col cols="12">
        <data-text type="textarea" label="備考" :text="customer.memo" />
      </v-col>
    </v-row>
  </v-card>
  <h2 ref="dataTable" class="subtitle">予約履歴照会</h2>
  <div class="d-flex justify-space-between">
    <div class="d-flex">
      <label
        v-for="bookingStatusItem in bookingStatusText"
        :key="bookingStatusItem.value"
        class="checkbox d-flex justify-center align-center mr-2 ml-3"
      >
        <v-checkbox
          v-model="
            //@ts-ignore
            filterStatus[bookingStatusItem.prop]
          "
        ></v-checkbox>
        <span
          class="rounded-xl text-white px-3"
          :class="getBackgroudClassStatus(bookingStatusItem.value)"
          >{{ bookingStatusItem.title }}</span
        >
      </label>
    </div>
    <div class="d-flex align-center">
      <v-btn class="rounded-lg mr-3">予約参照</v-btn>
      <v-btn class="rounded-lg mr-3">精算参照</v-btn>
    </div>
  </div>
  <v-card>
    <data-table
      :headers="headers"
      :items="customerBookings"
      hide-default-footer
    >
      <template #item.formatedId="{ item: booking }">
        <NuxtLink
          class="text-success text-decoration-underline mx-1"
          :to="generateBookingLink(booking.id)"
        >
          {{ booking.formatedId }}
        </NuxtLink>
      </template>
      <template #item.status="{ item: booking }">
        <span
          class="rounded-xl text-white px-3 py-1"
          :class="getBackgroudClassStatus(booking.status)"
        >
          {{ getBookingStatusText(booking.status) }}
        </span>
      </template>
      <template #item.roomLayout="{ item: booking }">
        <span>
          {{
            // @ts-ignore
            roomLayouts[booking.roomLayout]
          }}
        </span>
      </template>
    </data-table>
  </v-card>
  <v-dialog v-model="isEdit" width="700" class="create-dialog">
    <v-card>
      <v-toolbar>
        <v-toolbar-title class="text-primary">顧客情報の編集</v-toolbar-title>
        <v-btn icon dark @click="toogleEditDialog">
          <v-icon color="primary">mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <div class="my-6 px-6 mx-4 py-4 bg-white rounded-lg">
        <CustomerEditForm :customer="customer" @submit="editCustomer" />
      </div>
    </v-card>
  </v-dialog>
  <delete-dialog
    v-model="isDelete"
    @on-delete="removeCustomer"
    title="顧客情報を削除しますか？"
    message="この操作は取り消せません。"
  ></delete-dialog>
</template>

<style lang="scss" scoped>
.heading {
  border-left: 3px solid rgba(var(--v-theme-primary));
  border-bottom: 1px solid rgba(var(--v-theme-primary));
}
.customer-info {
  font-size: 0.825rem;

  &:deep(.v-field__input) {
    font-size: 0.9rem;
  }
}

.checkbox {
  cursor: pointer;
}

.create-dialog {
  @include sticky-toolbar;
}

.v-row {
  align-items: end !important;
}
</style>
