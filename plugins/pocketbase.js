import PocketBase from 'pocketbase'

export default defineNuxtPlugin((nuxtApp) => {
  const pb = new PocketBase('https://api.adsmarch.bot.cd')
  
  return {
    provide: {
      pb
    }
  }
})