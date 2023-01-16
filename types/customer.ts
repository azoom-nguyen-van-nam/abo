export interface Customer {
  id: number
  fullName: string
  name: string
  fullNameKana: string
  contactStaffName: string
  type: 0 | 1
  address: string
  postal: number | string
  subAddress?: string
  companyName: string
  targetCancelType: number
  tel: string
  fax: number | string
  bookingIds?: Number[]
  staffId: number
  staff: any
  memo: string
}

export interface GetCustomersRequest {
  id?: number | string
  fullName?: string
  fullNameKana?: string
  type?: 0 | 1 | null | ''
  address?: string
  tel?: string
  bookingId?: number | string
}

export interface CreateCustomerRequest {
  fullName: string
  fullNameKana: string
  name: string
  type: 0 | 1 | null
  address: string
  subAddress: string
  contactStaffName: string
  postal: string
  fax: string | number
  targetCancelType: 0 | 1 | null
  staffId: number | string | null
  tel: string
  memo: string
}

export interface UpdateCustomerRequest {
  fullName: string
  fullNameKana: string
  address: string
  postal: number | string
  tel: string
  type: 0 | 1
  fax: string | number
  staffId: number
  memo: string
}
