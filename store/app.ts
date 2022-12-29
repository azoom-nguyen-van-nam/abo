import { defineStore } from 'pinia'
import { MetaObject } from '#app'
import { Snackbar } from '~/types/App'

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
