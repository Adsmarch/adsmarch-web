// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/i18n', '@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  i18n: {
    locales: [
      { code: 'zh', iso: 'zh-CN', file: 'zh.json', name: '简体中文' },
      { code: 'en', iso: 'en-US', file: 'en.json', name: 'English' }
    ],
    langDir: 'locales',
    defaultLocale: 'zh',
    strategy: 'prefix_except_default' 
  }
})