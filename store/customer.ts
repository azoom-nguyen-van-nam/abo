import { defineStore } from 'pinia'
import CustomerService from '~~/models/customer'
import {
  CreateCustomerRequest,
  Customer,
  GetCustomersRequest,
  UpdateCustomerRequest
} from '~~/types/customer'
import { Pagination } from '~~/types/app'
import { Booking } from '~~/types/booking'

type CustomerState = {
  customers: Customer[]
  pagination: Pagination
  customerBookings: Booking[]
  customer?: Customer
}

export const useCustomerStore = defineStore('customerStore', {
  state: (): CustomerState => ({
    customers: [],
    customerBookings: [],
    pagination: {
      total: 0,
      page: 1,
      totalPages: 1
    }
  }),

  actions: {
    async getCustomers(searchParams?: GetCustomersRequest): Promise<void> {
      const { customers, total, currentPage, totalPage } =
        await CustomerService.getCustomers(searchParams).catch(() => ({
          customers: [],
          total: 0,
          totalPage: 1,
          page: 1
        }))
      this.customers = customers
      this.pagination.total = total
      this.pagination.page = currentPage
      this.pagination.totalPages = totalPage
    },
    getCustomer(customerId: number): Promise<Customer> {
      return CustomerService.getCustomer(customerId)
    },
    async getCustomerBookings(customerId: number): Promise<void> {
      const customerBookings = await CustomerService.getCustomerBookings(
        customerId
      )
      this.customerBookings = customerBookings
    },
    deleteCustomer(customerId: number): Promise<any> {
      return CustomerService.deleteCustomer(customerId)
    },
    updateCustomer(
      customerId: number,
      customer: UpdateCustomerRequest
    ): Promise<any> {
      return CustomerService.updateCustomer(customerId, customer)
    },
    createCustomer(customer: CreateCustomerRequest): Promise<any> {
      return CustomerService.createCustomer(customer)
    }
  }
})
