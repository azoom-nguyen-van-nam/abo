import { useApi } from '~/plugins/api'
import { StaffRequest } from '@/types/Staff'

export default class StaffService {
  static getStaffs = (searchParams: StaffRequest = {}) => {
    return useApi.aboApi.get('staff', { searchParams }).json()
  }
}
