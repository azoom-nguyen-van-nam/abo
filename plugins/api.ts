import ky from 'ky-universal'

export const useApi: any = {}

export default defineNuxtPlugin(({ $config }) => {
  useApi.aboApi = createAPI($config.public.API_BASE_URL)
})

const createAPI = (baseURL: string) => {
  return ky.create({
    prefixUrl: baseURL,
    timeout: 30000,
    credentials: 'include'
  })
}
