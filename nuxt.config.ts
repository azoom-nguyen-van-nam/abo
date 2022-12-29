import vuetify from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  ssr: false,
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=500, initial-scale=1',
      title: 'Abo',
      meta: [
        { name: 'description', content: 'Abo site' } // ~ <meta name="description" content="My amazing site">
      ]
    }
  },
  typescript: {
    shim: false
  },
  css: ['@/assets/scss/main.scss', 'vuetify/styles'],
  modules: [
    '@pinia/nuxt',
    async (options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) =>
        config.plugins?.push(vuetify())
      )
    }
  ],
  runtimeConfig: {
    public: {
      BASE_URL: process.env.BASE_URL,
      API_BASE_URL: process.env.API_BASE_URL
    }
  },
  build: {
    transpile: ['vuetify']
  },
  vite: {
    ssr: {
      noExternal: ['vuetify']
    }
  }
})
