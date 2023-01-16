import { defineStore } from 'pinia'
import StaffService from '~~/models/staff'
import { Staff, NewStaff, SearchStaffQuerry } from '~~/types/staff'

type StaffState = {
  staffs: Staff[]
}

export const useStaffStore = defineStore('staff', {
  state: (): StaffState => ({
    staffs: []
  }),

  actions: {
    async getStaffs(query: SearchStaffQuerry): Promise<void> {
      Object.keys(query).forEach((key: string) =>
        !query[key as keyof SearchStaffQuerry]
          ? delete query[key as keyof SearchStaffQuerry]
          : {}
      )
      const staffs: Staff[] = await StaffService.getStaffs(query).catch(
        () => false
      )
      if (!!staffs) this.staffs = staffs
      else this.staffs = []
    },
    async createStaff(staff: NewStaff): Promise<Boolean> {
      const createResult = await StaffService.createStaff(staff).catch(
        () => false
      )
      return !!createResult
    },
    async deleteStaff(staffId: number): Promise<Boolean> {
      const deleteResult = await StaffService.deleteStaff(staffId).catch(
        () => false
      )
      return !!deleteResult
    },
    async editStaff(staff: Staff): Promise<Boolean> {
      const editResult = await StaffService.editStaff(staff).catch(() => false)
      return !!editResult
    }
  }
})
