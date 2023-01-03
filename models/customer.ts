import { useApi } from '~/plugins/api'
import { CustomerRequest } from '@/types/Customer'

export default class CustomerService {
  static getCustomers = (searchParams: CustomerRequest = {}) => {
    return useApi.aboApi.get('customer', { searchParams }).json()
  }
}
