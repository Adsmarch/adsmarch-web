<template>
  <section class="relative w-full bg-black text-white px-[15px] md:px-[40px] xl:px-[120px] pb-[56px] md:pb-[120px] overflow-hidden select-none">
    <div class="flex flex-col md:flex-row items-stretch justify-between gap-10 md:gap-12 lg:gap-20">
      
      <div class="w-full md:w-auto md:order-2 flex flex-col justify-between items-start shrink-0 xl:gap-16">
        <div class="w-full flex items-center justify-between md:justify-start gap-6">
          
          <div v-if="loading" class="w-[280px] md:w-[450px] h-[80px] md:h-[160px] bg-[#2A2F3D] rounded animate-pulse"></div>

          <div v-else
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :visible-once="{ opacity: 1, y: 0, transition: { duration: 300, ease: 'easeOut' } }"
          class="relative pt-2 opacity-0">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" class="absolute top-0 right-0 w-4 h-4 md:w-8 md:h-8 z-10">
              <path d="M16.2437 22.9719L31.8376 32V25.3546L16.2437 16.3265V22.9719Z" fill="#0043FF"/>
              <path d="M16.4061 6.92219L32 16.3265V9.40434L16.4061 0V6.92219Z" fill="#0043FF"/>
              <path d="M0 6.92219L16.2437 16.3265V9.40434L0 0V6.92219Z" fill="#0043FF"/>
            </svg>
            <h2 class="text-[40px] sm:text-[48px] md:text-[54px] lg:text-[72px] xl:text-[96px] font-semibold leading-[1.2] whitespace-pre-line tracking-tight md:mr-[32px]">
              {{ sectionTitle || $t('partner.title', '携手共迎出海') }}
            </h2>
          </div>

        </div>
      </div>

      <div v-if="loading" class="w-full md:w-[62%] md:order-1 animate-pulse">
        <div class="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 py-8 border-y border-[#454C5F]">
          <div v-for="i in 10" :key="i" class="h-20 bg-[#131416] rounded"></div>
        </div>
      </div>

      <div 
        v-else 
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visible-once="{ opacity: 1, y: 0, transition: { duration: 600, ease: 'easeOut' } }"
        class="w-full md:w-[62%] md:order-1"
      >
        <div class="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-1 md:gap-y-4 gap-x-1 md:gap-x-4 items-center justify-items-center py-4 md:py-8 border-y border-[#454C5F]">
          <div 
            v-for="(logoUrl, index) in logos" 
            :key="index"
            class="w-[112px] h-[64px] md:w-[120px] md:h-[60px] lg:w-[200px] lg:h-[100px] xl:w-[160px] xl:h-[80px] 2xl:w-[200px] 2xl:h-[100px] relative overflow-hidden flex items-center justify-center group"
          >
            <img :src="logoUrl" :alt="`Partner ${index + 1}`" class="w-full h-full object-contain object-center group-hover:scale-110 transition-transform duration-300" />
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
defineProps({
  logos: { type: Array, default: () => [] },
  loading: { type: Boolean, default: false }
})
</script>