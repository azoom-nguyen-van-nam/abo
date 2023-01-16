export interface Staff {
  id: number
  name: string
  nameKana: string
  isDeleted: boolean
  department?: number | string | null
  position?: number | string | null
}

export class GetStaffsRequest {
  id?: number
  name?: string
  nameKana?: string
  isDeleted?: boolean
  department?: number | string | null
  position?: number | string | null
}
