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
      {
        label: '当日業務',
        icon: 'mdi-home-city-outline',
        children: [
          {
            label: '予約登録',
            router: '/coming-soon',
          },
          {
            label: '予約照会',
            router: '/coming-soon'
          },
          {
            label: 'ロビー売上登録',
            router: '/coming-soon'
          },
          {
            label: '精算',
            router: '/coming-soon'
          }
        ]
      },
      {
        label: 'マスター登録',
        icon: 'mdi-account-cog-outline',
        children: [
          {
            label: '予約一覧',
            router: '/bookings'
          },
          {
            label: '売上一覧',
            router: '/coming-soon'
          },
          {
            label: '帳票一覧',
            router: '/coming-soon'
          },
          {
            label: '顧客一覧',
            router: '/customers'
          },
          {
            label: '商品一覧',
            router: '/fittings'
          },
          {
            label: '会議室一覧',
            router: '/rooms'
          },
          {
            label: '予約登録',
            router: '/staffs'
          },
        ]
      },
    ]
  })
