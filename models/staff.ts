import { useApi } from '~~/plugins/api'
import { NewStaff, Staff, SearchStaffQuerry } from '~~/types/staff'

export default class StaffService {
  static getStaffs = async (searchParams: SearchStaffQuerry) => {
    return useApi.aboApi.get(`staffs`, { searchParams }).json()
  }
  static createStaff = (staff: NewStaff) => {
    return useApi.aboApi.post(`staffs`, { json: staff }).json()
  }
  static deleteStaff = (staffId: number) => {
    return useApi.aboApi.delete(`staffs/${staffId}`).json()
  }
  static editStaff = (staff: Staff) => {
    const { id: staffId, ...modifidedStaffInfo } = staff
    return useApi.aboApi
      .patch(`staffs/${staffId}`, { json: modifidedStaffInfo })
      .json()
  }
}
