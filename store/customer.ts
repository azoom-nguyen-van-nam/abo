import { defineStore } from 'pinia'
import CustomerService from '@/models/customer'
import { Customer, CustomerRequest } from '@/types/Customer'

type CustomerState = {
  customers: Customer[]
}

export const useCustomerStore = defineStore('customer', {
  state: (): CustomerState => ({
    customers: []
  }),

  actions: {
    async getCustomers(searchParams?: CustomerRequest) {
      const customers: Customer[] = await CustomerService.getCustomers(searchParams)
      this.customers = customers
    },
  }
})
