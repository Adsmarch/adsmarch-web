// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/i18n', '@nuxtjs/tailwindcss', '@vueuse/motion/nuxt'],
  css: ['~/assets/css/main.css'],
  i18n: {
    locales: [
      { code: 'zh', iso: 'zh-CN', file: 'zh.json', name: '简体中文' },
      { code: 'en', iso: 'en-US', file: 'en.json', name: 'English' }
    ],
    // @ts-ignore
    lazy: true,
    langDir: 'locales',
    defaultLocale: 'zh',
    strategy: 'prefix_except_default' 
  },
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' }
      ]
    }
  },
  // routeRules: {
  //   '/': { swr: 3600 },
  //   '/contact': { swr: 3600 },
  //   '/about': { swr: 3600 },
  //   '/awards': { swr: 3600 },

  //   '/careers': { swr: 300 },
  //   '/jobs': { swr: 300 },
  //   '/insights': { swr: 300 },
  //   '/insights/**': { swr: 300 },
  //   '/jobs/**': { swr: 300 },
  //   '/services/**': { swr: 300 }
  // }
})