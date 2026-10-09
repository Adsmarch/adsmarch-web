<template>
  <section class="relative w-full bg-black text-white px-[15px] md:px-[40px] xl:px-[120px] overflow-hidden select-none">
    <div class="flex items-start justify-end gap-6 my-8 md:my-[96px] xl:my-[120px]">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="shrink-0 mt-2">
        <path d="M15.7563 22.9719L0.162437 32V25.3546L15.7563 16.3265V22.9719Z" fill="#0043FF"/>
        <path d="M15.5939 6.92219L0 16.3265V9.40434L15.5939 0V6.92219Z" fill="#0043FF"/>
        <path d="M32 6.92219L15.7563 16.3265V9.40434L32 0V6.92219Z" fill="#0043FF"/>
      </svg>
      <h2 class="text-[40px] sm:text-[64px] xl:text-[96px] font-semibold leading-[1.2] tracking-tight text-left w-[240px] sm:w-[480px] md:w-[680px] xl:w-[1064px]">
        {{ $t('homeValue.title') }}
      </h2>
    </div>
    <div>
      <Swiper
        :modules="[SwiperNavigation]"
        :slides-per-view="1.2"
        :space-between="16"
        :breakpoints="{
          '640': { slidesPerView: 2.2, spaceBetween: 20 },
          '1024': { slidesPerView: 3.2, spaceBetween: 24 },
          '1280': { slidesPerView: 3.5, spaceBetween: 24 },
          '1440': { slidesPerView: 3.8, spaceBetween: 24 },
          '1600': { slidesPerView: 4.2, spaceBetween: 24 },
        }"
        @swiper="onSwiper"
        class="w-full !overflow-visible"
      >
        <SwiperSlide 
          v-for="(item, index) in cardConfigs" 
          :key="item.key" 
          v-slot="{ isActive }"
          class="h-auto"
        >
          <div :class="['transition-all duration-300', index % 2 === 1 ? 'md:mt-[80px]' : 'mt-0']">
            <NuxtLinkLocale
              :to="`/services/${item.key}`"
              :class="[
                'group relative block h-[396px] xl:h-[520px] rounded-md overflow-hidden transition-all duration-500 border border-[#232730]',
                isActive ? 'active-gradient-card md:!bg-[#101216] md:hover:active-gradient-card' : 'bg-[#101216] hover:active-gradient-card'
              ]"
            >
              <div 
                class="absolute inset-0 z-0 transition-opacity duration-500"
                :class="[
                  isActive 
                    ? 'opacity-0 md:opacity-100 md:group-hover:opacity-0' 
                    : 'opacity-100 group-hover:opacity-0'
                ]"
              >
                <img :src="item.image" :alt="$t(`homeValue.cards.${item.key}.title`)" class="w-full h-full object-cover" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
              </div>

              <div class="relative z-10 h-full px-4 py-5 xl:px-6 xl:py-8 flex flex-col justify-end">
                
                <div 
                  :class="[
                    'absolute top-6 left-6 z-20 transition-all duration-500 ease-in-out pointer-events-none',
                    isActive 
                      ? 'opacity-100 scale-100 md:opacity-0 md:scale-90 md:group-hover:opacity-100 md:group-hover:scale-100' 
                      : 'opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100'
                  ]"
                >
                  <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.7563 22.9719L0.162437 32V25.3546L15.7563 16.3265V22.9719Z" fill="#0043FF"/>
                    <path d="M15.5939 6.92219L0 16.3265V9.40434L15.5939 0V6.92219Z" fill="#0043FF"/>
                    <path d="M32 6.92219L15.7563 16.3265V9.40434L32 0V6.92219Z" fill="#0043FF"/>
                  </svg>
                </div>

                <div class="relative flex flex-col justify-end">
                  
                  <div 
                    :class="[
                      'mb-3 transition-all duration-300 ease-in-out',
                      isActive 
                        ? 'opacity-0 -translate-y-2 md:opacity-100 md:translate-y-0 md:group-hover:opacity-0 md:group-hover:-translate-y-2' 
                        : 'opacity-100 translate-y-0 group-hover:opacity-0 group-hover:-translate-y-2'
                    ]"
                  >
                    <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15.7563 22.9719L0.162437 32V25.3546L15.7563 16.3265V22.9719Z" fill="#0043FF"/>
                      <path d="M15.5939 6.92219L0 16.3265V9.40434L15.5939 0V6.92219Z" fill="#0043FF"/>
                      <path d="M32 6.92219L15.7563 16.3265V9.40434L32 0V6.92219Z" fill="#0043FF"/>
                    </svg>
                  </div>

                  <h3 class="text-[28px] xl:text-[40px] font-semibold text-white mb-2 leading-[1.2]">
                    {{ $t(`homeValue.cards.${item.key}.title`) }}
                  </h3>

                  <p class="text-[18px] xl:text-[24px] text-white font-semibold leading-[1.2] mb-4">
                    {{ $t(`homeValue.cards.${item.key}.desc`) }}
                  </p>

                  <div 
                    :class="[
                      'grid transition-all duration-500 ease-in-out',
                      isActive 
                        ? 'grid-rows-[1fr] opacity-100 mb-8 md:grid-rows-[0fr] md:opacity-0 md:mb-0 md:group-hover:grid-rows-[1fr] md:group-hover:opacity-100 md:group-hover:mb-8' 
                        : 'grid-rows-[0fr] opacity-0 group-hover:grid-rows-[1fr] group-hover:opacity-100 group-hover:mb-8'
                    ]"
                  >
                    <div class="overflow-hidden">
                      <p class="text-[16px] xl:text-[20px] text-[#7D86A1] leading-[1.5]">
                        {{ $t(`homeValue.cards.${item.key}.detail`) }}
                      </p>
                    </div>
                  </div>

                  <div 
                    :class="[
                      'grid transition-all duration-500 ease-in-out',
                      isActive 
                        ? 'grid-rows-[1fr] opacity-100 md:grid-rows-[0fr] md:opacity-0 md:group-hover:grid-rows-[1fr] md:group-hover:opacity-100' 
                        : 'grid-rows-[0fr] opacity-0 group-hover:grid-rows-[1fr] group-hover:opacity-100'
                    ]"
                  >
                    <div class="overflow-hidden">
                      <div class="text-[#0043FF] transition-transform duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M29 28.3812H27.2496V5.98803L4.23761 29L3 27.7624L26.012 4.75043H3.6188V3H28.1248L29 3.87521V28.3812Z" fill="#0043FF"/>
                        </svg>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </NuxtLinkLocale>
          </div>
        </SwiperSlide>
      </Swiper>
      
      <div class="flex justify-center items-center space-x-4 mt-12 md:mt-16 relative z-20">
        <button 
          @click="slidePrev" 
          class="group w-10 h-10 xl:w-16 xl:h-16 flex items-center justify-center transition cursor-pointer focus:outline-none"
          aria-label="Previous Slide"
        >
          <svg class="w-full h-full" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="64" height="64" rx="4" fill="#131416" class="transition-colors duration-200 group-hover:fill-[#103C93]"/>
            <path d="M20.2679 30.7622H48L47.9646 33.2021H20.2351L27.0324 40H23.9912L16 32.0174L24.0265 24H26.997L20.2679 30.7622Z" fill="#7D86A1" class="transition-colors duration-200 group-hover:fill-white"/>
          </svg>
        </button>
        
        <button 
          @click="slideNext" 
          class="group w-10 h-10 xl:w-16 xl:h-16 flex items-center justify-center transition active:scale-95 cursor-pointer focus:outline-none"
          aria-label="Next Slide"
        >
          <svg class="w-full h-full" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="64" height="64" rx="4" fill="#0043FF" class="transition-colors duration-200 group-hover:fill-[#103C93]"/>
            <path d="M44.7321 30.7622H17L17.0354 33.2021H44.7649L37.9676 40H41.0088L49 32.0174L40.9735 24H38.003L44.7321 30.7622Z" fill="white"/>
          </svg>
        </button>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation as SwiperNavigation } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'

import img1 from '@/assets/image/home-swiper-01.png'
import img2 from '@/assets/image/home-swiper-02.png'
import img3 from '@/assets/image/home-swiper-03.png'
import img4 from '@/assets/image/home-swiper-04.png'
import img5 from '@/assets/image/home-swiper-05.png'
import img6 from '@/assets/image/home-swiper-06.png'
import img7 from '@/assets/image/home-swiper-07.png'

const swiperRef = ref(null)

const onSwiper = (swiper) => {
  swiperRef.value = swiper
}

const slidePrev = () => {
  swiperRef.value?.slidePrev()
}

const slideNext = () => {
  swiperRef.value?.slideNext()
}

const cardConfigs = [
  { key: 'app', image: img1 },
  { key: 'ecommerce', image: img2 },
  { key: 'design', image: img3 },
  { key: 'kol', image: img4 },
  { key: 'marketing', image: img5 },
  { key: 'training', image: img6 },
  { key: 'seo', image: img7 }
]
</script>

<style scoped>
.active-gradient-card {
  background: 
    linear-gradient(180deg, #131416 0%, #000000 100%) padding-box,
    linear-gradient(180deg, #0043FF 0%, #131416 100%) border-box !important;
  border: 1px solid transparent !important;
}
</style>