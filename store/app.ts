import { defineStore } from 'pinia'
import { Snackbar } from '~~/types/app'

type AppState = {
  meta: any
  snackbar: Snackbar
}

export const useAppStore = defineStore('app', {
  state: (): AppState => ({
    meta: {
      title: 'Home'
    },
    snackbar: {
      isShow: false,
      status: true,
      message: ''
    }
  })
})
