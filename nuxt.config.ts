import vuetify from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  ssr: false,
  app: {
    head: {
      title: 'Abo',
      meta: [{ name: 'description', content: 'Abo site' }]
    }
  },
  typescript: {
    shim: false
  },
  css: ['@/assets/scss/main.scss', 'vuetify/styles'],
  modules: [
    '@pinia/nuxt',
    async (_, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        config.plugins?.push(vuetify())
      })
    }
  ],
  build: {
    transpile: ['vuetify']
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import "@/assets/scss/utils/mixins";
          `
        }
      }
    }
  },
  runtimeConfig: {
    public: {
      BASE_URL: process.env.BASE_URL,
      API_BASE_URL: process.env.API_BASE_URL
    }
  }
})
