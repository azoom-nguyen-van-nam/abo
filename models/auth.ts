import { useApi } from '~~/plugins/api'
import { LoginRequest, RegisterRequest } from '@/types/Auth'
export default class AuthService {
  static getLoggedInUser = () => {
    return useApi.aboApi.get(`users/info`).json()
  }

  static login = (account: LoginRequest) => {
    return useApi.aboApi.post(`users/login`, { json: account }).json()
  }

  static register = (account: RegisterRequest) => {
    return useApi.aboApi.post(`users/login`, { json: account }).json()
  }
}
