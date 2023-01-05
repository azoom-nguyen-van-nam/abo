export interface Staff {
  id: number
  name: string
  email: string
  phone: string
  address: string
}

export interface StaffRequest {
  id?: number
  name?: string
  email?: string
  phone?: string
  address?: string
}
