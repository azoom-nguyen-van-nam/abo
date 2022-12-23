import { useAuthStore } from '~~/store/auth'

export default defineNuxtRouteMiddleware((to, from) => {
  const anonymousRoutes = ['/', '/login']
  if (!anonymousRoutes.includes(to.path)) {
    const { loggedInUser } = useAuthStore()
    if (!loggedInUser.token) {
      return navigateTo('/login')
    }
  }
})
