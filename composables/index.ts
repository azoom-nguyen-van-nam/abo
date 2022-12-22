import { useAppStore } from '@/store/app'
import { MetaObject } from '#app'

export const useRefHead = (meta: MetaObject) => {
  const appStore = useAppStore()
  useHead(meta)
  appStore.meta = meta
}
