import { defineStore } from 'pinia'
import { navigateToDefaultRouter } from '@/middlewares/redirect'
import AuthService from '@/models/auth'
import { User } from '~/types/User'
import { LoginRequest } from '~/types/Auth'

type Auth = {
  loggedInUser: User
}

export const useAuthStore = defineStore('auth', {
  state: (): Auth => ({
    loggedInUser: {
      id: 0,
      name: 'abo-admin',
      email: 'admin@azoom.jp',
      token: 'abo',
      role: 0
    }
  }),

  actions: {
    async getLoggedInUser() {
      const user: User = await AuthService.getLoggedInUser()
      this.loggedInUser = user
    },
    async login(account: LoginRequest) {
      const user: User = await AuthService.login(account).catch(() => false)
      this.loggedInUser = user
      navigateToDefaultRouter()
    }
  }
})
