export interface Snackbar {
  isShow?: boolean
  status?: boolean
  message?: string
  color?: string
}

export interface Menu {
  id?: number
  label: string
  router?: string
  icon?: string,
  children?: Menu[]
}

export interface DataTableHeader {
  text: string
  value: string
  align?: 'left' | 'center' | 'right'
  divider?: boolean
  class?: string | any[]
  width?: string | number
}

export type DataTableItem = {
  [key: number | string]: any
}

export type ItemPerPage = {
  title: number | string
  value: number
}
