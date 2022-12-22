import { defineStore } from 'pinia'
import { navigateToDefaultRouter } from '@/middlewares/redirect'
import { getLoggedInUser, login } from '@/models/auth'
import { User, LoginRequest } from '@/types/User'

type Auth = {
  loggedInUser: User
}

export const useAuth = defineStore('auth', {
  state: (): Auth => ({
    loggedInUser: {
      id: 0,
      name: 'abo-admin',
      token: 'abo',
      role: 0
    }
  }),

  actions: {
    getUserInfo() {
      return getLoggedInUser()
    },
    async login(account: LoginRequest) {
      const user: User = await login(account).catch(() => false)
      if (!user) return false
      this.loggedInUser = user
      navigateToDefaultRouter()
    }
  }
})
