import { useApi } from '~~/plugins/api'
import { GetCustomersRequest, UpdateCustomerRequest } from '~~/types/customer'

export default class RoomService {
  static getCustomers = (searchParams?: GetCustomersRequest) => {
    return useApi.aboApi.get(`customers`, { searchParams }).json()
  }

  static createCustomer = (customer: GetCustomersRequest) => {
    return useApi.aboApi.post(`customers`, { json: customer }).json()
  }

  static getCustomer = (customerId: number) => {
    return useApi.aboApi.get(`customers/${customerId}`).json()
  }

  static getCustomerBookings = (customerId: number) => {
    return useApi.aboApi.get(`customers/${customerId}/bookings`).json()
  }

  static updateCustomer = (customerId: number, customer: UpdateCustomerRequest) => {
    return useApi.aboApi.patch(`customers/${customerId}`, { json: customer }).json()
  }

  static deleteCustomer = (customerId: number) => {
    return useApi.aboApi.delete(`customers/${customerId}`).json()
  }
}
