export interface Staff {
  id: number
  name: string
  nameKana: string
  department?: number
  position?: number
}

export interface NewStaff {
  name: string
  nameKana: string
  department?: number
  position?: number
}

export interface SearchStaffQuerry {
  id?: number
  name?: string
  nameKana?: string
  department?: number
  position?: number
}
