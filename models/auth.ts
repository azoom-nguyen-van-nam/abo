import { useApi } from '@/plugins/api'
import { User, LoginRequest } from '@/types/User'

const getLoggedInUser = (): User => {
  return useApi.aboApi.get(`users/info`).json()
}

const login = (account: LoginRequest) => {
  return useApi.aboApi.post(`users/login`, { json: account }).json()
}

export { getLoggedInUser, login }
