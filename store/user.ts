import { defineStore } from 'pinia'
import UserService from '@/models/user'
import { User, GetUsersRequest } from '@/types/User'

type UserState = {
  users: User[]
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    users: []
  }),

  actions: {
    async getUsers(searchParams: GetUsersRequest) {
      const users: User[] = await UserService.getUsers(searchParams)
      this.users = users
    }
  }
})
