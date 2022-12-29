import { useAppStore } from '@/store/app'
import { MetaObject } from '#app'
import { Snackbar } from '~/types/App'

export const useRefHead = (meta: MetaObject) => {
  const appStore = useAppStore()
  useHead(meta)
  appStore.meta = meta
}

export const useSnackbar = (snackbar?: Snackbar) => {
  const appStore = useAppStore()
  const {
    isShow = true,
    status = true,
    message = 'Success',
    color
  } = snackbar ?? {}
  appStore.snackbar = { isShow, status, message, ...(color && { color }) }
}
