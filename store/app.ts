import { defineStore } from 'pinia'
import { MetaObject } from '#app'

type AppState = {
  meta: any
}

export const useAppStore = defineStore('app', {
  state: (): AppState => ({
    meta: {
      title: 'Home'
    }
  })
})


