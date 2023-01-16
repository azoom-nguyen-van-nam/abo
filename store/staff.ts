import { defineStore } from 'pinia'
import StaffService from '~~/models/staff'
import { Staff, GetStaffsRequest } from '~~/types/staff'

type StaffState = {
  staffs: Staff[]
}

export const useStaffStore = defineStore('Staff', {
  state: (): StaffState => ({
    staffs: []
  }),

  actions: {
    async getStaffs(searchParams?: GetStaffsRequest): Promise<void> {
      const staffs: Staff[] = await StaffService.getStaffs(searchParams)
      this.staffs = staffs
    }
  }
})
