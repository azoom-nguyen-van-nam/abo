export interface Room {
  id: number
  name?: string
  roomNumber: number | string
  basicPrice?: number
  overPrice?: number
  fullDayPrice?: number
  sShapeCapacity?: number
  mountShapeCapacity?: number
  theaterShapeCapacity?: number
  isWithoutTax?: boolean
}

export interface GetRoomsRequest {
  name?: string
  roomNumber?: number | string
  basicPrice?: number
  fullDayPrice?: number
}
