import ky from 'ky-universal'
import { navigateToDefaultRouter } from '@/middlewares/redirect'
import { useAuth } from '@/store/auth'

export const useApi: any = {}

export default defineNuxtPlugin(({ $config, $pinia, $route }) => {
  if (process.client) {
    useApi.aboApi = createAPI($config.public.API_BASE_URL, $pinia)
  }
})

const createAPI = (baseURL: string, $pinia: any) => {
  const { loggedInUser } = useAuth($pinia)

  return ky.create({
    prefixUrl: baseURL,
    timeout: 30000,
    credentials: 'include',
    hooks: {
      beforeRequest: [
        (req) => {
          req.headers.set('Authorization', loggedInUser?.token)
        }
      ],
      afterResponse: [
        (req, options, res) => {
          if ([401, 403].includes(res.status) && process.client) {
            navigateToDefaultRouter()
          }
        }
      ]
    }
  })
}
