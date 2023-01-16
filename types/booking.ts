import { Customer } from './customer'
import { Room } from './room'

export interface Booking {
  id: number
  bookingType: number
  meettingName: string
  tentativeLimit: Date | string
  staffId: number
  staff: Object
  customerId: number
  customer: Customer
  deposite: number
  depositeType: number
  contactPerson: string
  roomBookingNumber: number
  bookingId?: number
  startTime: string
  endTime: string
  status: 1 | 2 | 3 | 4 | 5 | 6
}

export interface RoomBooking {
  id: number
  status: number
  startTime: Date | string
  endTime: Date | string
  roomLayout: number
  numberOfPeople: number
  bookingId: number
  room: Room
  booking: Booking
}
