import { MetaObject } from '#app'
import { useAppStore } from '@/store/app'
import { Snackbar, Menu } from '~~/types/app'

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

export const useMenus = () =>
  useState<Menu[]>('Menus', () => {
    return [
      { id: 0, label: 'Home', icon: 'mdi-home', router: '/' },
      { id: 1, label: 'Booking', icon: 'mdi-home', router: '/booking' }
    ]
  })
