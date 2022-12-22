import { useAuth } from '~~/store/auth'
import { roles } from '@/constants/roles'

const defaultEndpoint = {
  admin: '/',
  staff: '/',
  notLogin: '/login'
}

const navigateToDefaultRouter = () => {
  const { loggedInUser } = useAuth()
  switch (loggedInUser.role) {
    case roles.admin: {
      navigateTo(defaultEndpoint.admin)
      break
    }
    case roles.staff: {
      navigateTo(defaultEndpoint.staff)
      break
    }
    default: {
      navigateTo(defaultEndpoint.notLogin)
      break
    }
  }
}

export { navigateToDefaultRouter }
