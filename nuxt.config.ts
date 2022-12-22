export default defineNuxtConfig({
  ssr: false,
  typescript: {
    shim: false
  },
  css: ['@/assets/scss/main.scss'],
  modules: ['@pinia/nuxt'],
  runtimeConfig: {
    public: {
      BASE_URL: process.env.BASE_URL,
      API_BASE_URL: process.env.API_BASE_URL
    }
  }
})
