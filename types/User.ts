interface User {
  id: number
  name: string
  token: string
  role: number
}

interface LoginRequest {
  username: string
  password: string
}

export { LoginRequest, User }
