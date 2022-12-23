import { useAuthStore } from '~~/store/auth'
import { roles } from '~~/constants/user'

const defaultEndpoint = {
  admin: '/',
  staff: '/',
  notLogin: '/login'
}

export default defineNuxtRouteMiddleware(() => {
  const { loggedInUser } = useAuthStore()
  if (loggedInUser.token) {
    return navigateToDefaultRouter()
  }
})

const navigateToDefaultRouter = () => {
  const defaultEndpoint = getDefaultEndpoint()
  return navigateTo(defaultEndpoint)
}

const getDefaultEndpoint = () => {
  const { loggedInUser } = useAuthStore()
  switch (loggedInUser.role) {
    case roles.admin: {
      return defaultEndpoint.admin
    }
    case roles.staff: {
      return defaultEndpoint.staff
    }
    default: {
      return defaultEndpoint.notLogin
    }
  }
}

export { navigateToDefaultRouter }
