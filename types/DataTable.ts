export interface DataTableHeader<T extends any = any> {
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
