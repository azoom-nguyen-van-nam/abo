import { createVuetify, ThemeDefinition } from 'vuetify'
import { VTextarea } from 'vuetify/components'
import '@mdi/font/css/materialdesignicons.css'

const defaultTheme: ThemeDefinition = {
  dark: false,
  colors: {
    primary: '#284E68',
    background: '#f9f9f7'
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    // @ts-ignore
    icons: {
      defaultSet: 'mdi'
    },
    theme: {
      defaultTheme: 'defaultTheme',
      themes: {
        defaultTheme
      }
    },
    components: {
      VTextarea
    },
    defaults: {
      VBtn: {
        color: 'primary',
        minWidth: 40,
        minHeight: 32
      },
      VTextField: {
        hideDetails: 'auto',
        color: 'primary'
      },
      VSelect: {
        hideDetails: 'auto',
        clearable: true,
        color: 'primary'
      },
      VRadioGroup: {
        hideDetails: 'auto',
        color: 'primary'
      },
      VAutocomplete: {
        hideDetails: 'auto',
        color: 'primary',
        clearable: true
      },
      VRadio: {
        hideDetails: 'auto',
        color: 'primary'
      },
      VCheckbox: {
        hideDetails: 'auto',
        color: 'primary'
      },
      VRow: {
        justify: 'center',
        align: 'center',
        dense: true
      },
      VCard: {
        color: 'background'
      },
      VTextarea: {
        hideDetails: 'auto'
      }
    }
  })

  nuxtApp.vueApp.use(vuetify)
})
