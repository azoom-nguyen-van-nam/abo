export interface Room {
  id?: number
  isDelete?: boolean | 0 | 1
  name?: string
  roomNumber?: number | string
  basicPrice?: number
  overPrice?: number
  fullDayPrice?: number
  mouthShapeCapacity?: number
  sShapeCapacity?: number
  theaterShapeCapacity?: number
  isWithoutTax?: boolean | 0 | 1
}

export interface GetRoomsRequest {
  name?: string
  roomNumber?: number | string
  basicPrice?: number
  fullDayPrice?: number
}
