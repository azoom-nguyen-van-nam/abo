<script lang="ts" setup>
import { useSlots, ref, reactive, computed, watch } from 'vue'
import { DataTableHeader, DataTableItem, ItemPerPage } from '~/types/app'

const props = defineProps({
  headers: {
    type: Array<DataTableHeader>,
    required: true
  },
  items: {
    type: Array<DataTableItem>,
    required: true
  },
  page: {
    type: Number,
    default: 1
  },
  itemsPerPageText: {
    type: String,
    default: 'Rows per page'
  },
  itemsPerPage: {
    type: Number,
    default: 10
  },
  stickyHeight: {
    type: [String, Number],
    validator(value: string | number) {
      return /^\d+(px|em|rem|%|vw|vh)?$/.test(value.toString())
    }
  },
  noDataText: {
    type: String,
    default: 'No data'
  },
  actionsText: {
    type: String,
    default: ''
  },
  hideDefaultFooter: Boolean
})
const emit = defineEmits(['click:row', 'dblclick:row', 'onChangePagination'])
const slots = useSlots()

const itemsPerPageOptions: { [key: string]: ItemPerPage } = {
  '5': { title: 5, value: 5 },
  '10': { title: 10, value: 10 },
  '15': { title: 15, value: 15 },
  '-1': { title: 'All', value: -1 }
}
const currentPage = ref<number>(props.page)
const currentItemsPerPage = reactive<ItemPerPage>({
  title: 5,
  value: props.itemsPerPage
})
const itemsCount = computed<number>(() => props.items.length)
const itemsDisplay = computed<Array<DataTableItem>>(() => {
  const { value: ipp } = currentItemsPerPage
  if (ipp === -1) return props.items

  const startNum = (currentPage.value - 1) * ipp
  return props.items.slice(startNum, startNum + ipp)
})
const itemsDisplayCount = computed<number>(() => itemsDisplay.value.length)
const paginationText = computed<string>(() => {
  if (currentPage.value === 1) {
    return `1 - ${itemsDisplayCount.value} of ${itemsCount.value}`
  }

  const { value: ipp } = currentItemsPerPage
  const start = ipp * (currentPage.value - 1) + 1
  return `${start} - ${Math.min(
    ipp * currentPage.value,
    itemsCount.value
  )} of ${itemsCount.value}`
})
const pageCount = computed<number>(() =>
  calculateTotalPage(itemsCount.value, currentItemsPerPage.value)
)
const stickyLength = computed<string>(() => {
  const height = props.stickyHeight
  if (!height) return ''
  return Number(height) ? `${height}px` : `${height}`
})

function changeItemsPerPage({ title, value }: ItemPerPage): void {
  currentPage.value = 1
  currentItemsPerPage.title = title
  currentItemsPerPage.value = value
}
function prevPage(): void {
  currentPage.value = Math.max(1, currentPage.value - 1)
}
function nextPage(): void {
  currentPage.value = Math.min(pageCount.value, currentPage.value + 1)
}

function randomKey(): string {
  return Math.random().toString().substr(2, 6)
}
function calculateTotalPage(itemsCount: number, itemsPerPage: number): number {
  if (itemsPerPage === -1) return 1

  return Math.max(1, Math.ceil(itemsCount / itemsPerPage))
}

watch(
  () => [currentPage, currentItemsPerPage],
  ([newPage, newItemsPerPage]) => {
    emit('onChangePagination', {
      page: newPage.value,
      itemsPerPage: newItemsPerPage.value
    })
  },
  { deep: true }
)
</script>

<template>
  <div class="abo-table-wrap">
    <table :class="['abo-table', { 'sticky-header': !!stickyHeight }]">
      <thead class="thead">
        <tr class="row">
          <th
            v-for="header in headers"
            :key="header.value"
            :class="[
              'col',
              header.class,
              header.align && `text-${header.align}`,
              { divider: !!header.divider }
            ]"
            :style="{
              width: Number(header.width) ? `${header.width}px` : header.width
            }"
          >
            {{ header.text }}
          </th>
          <th v-if="!!slots.actions" class="col">{{ actionsText }}</th>
        </tr>
      </thead>
      <tbody class="tbody">
        <template v-if="itemsCount">
          <tr
            v-for="(item, index) in itemsDisplay"
            :key="index + randomKey()"
            class="row"
            @click="emit('click:row', item)"
            @dblclick="emit('dblclick:row', item)"
          >
            <td
              v-for="header in headers"
              :key="header.value"
              :class="[
                'col',
                { divider: !!header.divider },
                header.align && `text-${header.align}`
              ]"
            >
              <slot
                v-if="!!slots[`item.${[header.value]}`]"
                :name="`item.${[header.value]}`"
                :item="item"
              ></slot>
              <template v-else>
                {{ item[header.value] }}
              </template>
            </td>
            <td v-if="!!slots.actions" class="col">
              <slot name="actions" :item="item"></slot>
            </td>
          </tr>
        </template>
        <tr v-else class="row">
          <th :colspan="headers.length" class="col text-center py-5">
            {{ noDataText }}
          </th>
        </tr>
      </tbody>
    </table>
    <div
      v-if="!hideDefaultFooter && itemsCount"
      class="abo-table-footer d-flex justify-end align-center"
    >
      <div class="d-flex align-center ml-auto">
        {{ itemsPerPageText }}:
        <v-select
          :items="Object.values(itemsPerPageOptions)"
          :model-value="currentItemsPerPage"
          item-title="title"
          item-value="value"
          return-object
          hide-details
          :clearable="false"
          variant="underlined"
          density="compact"
          class="select ml-5"
          @update:model-value="changeItemsPerPage"
        ></v-select>
      </div>
      <span class="pagination ml-5 mr-3">
        {{ paginationText }}
      </span>
      <div class="controls">
        <v-btn
          variant="text"
          size="small"
          icon="mdi-chevron-left"
          :disabled="currentPage === 1"
          @click="prevPage"
        ></v-btn>
        <v-btn
          variant="text"
          size="small"
          icon="mdi-chevron-right"
          :disabled="currentPage === pageCount"
          @click="nextPage"
        ></v-btn>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$borderColor: #0000001f;
$stickyLength: v-bind(stickyLength);
.abo-table {
  width: 100%;
  border-spacing: 0;
  > &-wrap {
    background-color: #fff;
    color: #000000de;
  }
  &.sticky-header {
    > .thead,
    > .tbody > .row {
      display: table;
      width: 100%;
      table-layout: fixed;
    }
    > .tbody {
      display: block;
      max-height: $stickyLength;
      overflow-y: scroll;
    }
  }
  > .thead {
    height: 48px;
    text-align: left;
  }
  > .thead > .row > th.col {
    padding: 0 16px;
    font-size: 0.75rem;
    color: #00000099;
    border-bottom: thin solid $borderColor;
  }
  > .tbody > .row {
    height: 48px;
    &:hover {
      background-color: #eee;
    }
    &:not(:last-child) > .col {
      border-bottom: thin solid $borderColor;
    }
  }
  > .tbody > .row > .col {
    padding: 0 16px;
    font-size: 0.875rem;
  }
}
.abo-table-footer {
  font-size: 0.75rem;
  border-top: thin solid $borderColor;
  :deep(.select) {
    .v-field {
      font-size: 0.75rem !important;
      &__input {
        padding-top: 3px;
        min-height: 25px;
      }
      &__append-inner {
        padding-top: 2px;
      }
    }
  }
}
.divider {
  border-right: thin solid $borderColor;
}
</style>
