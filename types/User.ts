export interface User {
  id: number
  name: string
  email: string
  token: string
  role: 0 | 1
}

export interface GetUsersRequest {
  name?: string
  role?: 0 | 1
}

export interface CreateUserRequest {
  name: string
  password: string
  role: 0 | 1
}

export interface UpdateUserRequest {
  name: string
  email: string
  password: string
}
