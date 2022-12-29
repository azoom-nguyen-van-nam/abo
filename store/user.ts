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
    },
    setUsers(users: User[]): void {
      this.users = users
    },
    addUser(user: User): void {
      this.users = [...this.users, user]
    },
    updateUser(id: number, user: User): void {
      const index = this.users.findIndex((u) => u.id === id)
      if (index !== -1) {
        this.users[index] = user
      }
    },
    deleteUser(id: number): void {
      this.users = this.users.filter((user) => user.id !== id)
    }
  }
})
