import { useApi } from '~~/plugins/api'
import { GetUsersRequest, UpdateUserRequest } from '@/types/User'

export default class UserService {
  static getUsers = (searchParams: GetUsersRequest = {}) => {
    return useApi.aboApi.get(`users`, { searchParams }).json()
  }

  static getUser = (userId: number) => {
    return useApi.aboApi.get(`users/${userId}`).json()
  }

  static deletetUser = (userId: number) => {
    return useApi.aboApi.delete(`users/${userId}`).json()
  }

  static updateUser = (userId: number, user: UpdateUserRequest) => {
    return useApi.aboApi.put(`users/${userId}`, { json: user }).json()
  }
}
