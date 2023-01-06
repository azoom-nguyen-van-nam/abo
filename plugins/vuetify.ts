import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    // @ts-ignore
    icons: {
      defaultSet: 'mdi'
    }
  })

  nuxtApp.vueApp.use(vuetify)
})
