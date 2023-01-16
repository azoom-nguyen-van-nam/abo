import { useApi } from '~~/plugins/api'
import { GetStaffsRequest } from '~~/types/staff'

export default class StaffService {
  static getStaffs = (searchParams?: GetStaffsRequest) => {
    return useApi.aboApi.get(`staffs`, { searchParams }).json()
  }
}
