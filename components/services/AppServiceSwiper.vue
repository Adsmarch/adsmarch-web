<template>
  <section class="relative w-full bg-black text-white px-[15px] md:px-[40px] xl:px-[120px] pb-[56px] md:pb-[120px] overflow-hidden">
    
    <div v-if="loading" class="w-[300px] md:w-[450px] h-[48px] md:h-[80px] bg-[#2A2F3D] rounded animate-pulse mb-8 md:mb-[64px]"></div>
    <div v-else 
    v-motion
    :initial="{ opacity: 0, y: 50 }"
    :visible-once="{ opacity: 1, y: 0, transition: { duration: 300, ease: 'easeOut' } }"
    class="flex items-start gap-3 xl:gap-6 shrink-0 mb-8 md:mb-[64px] opacity-0">
      <svg width="24" height="24" viewBox="0 0 32 32" fill="none" class="w-6 h-6 shrink-0">
        <path d="M15.7563 22.9719L0.162437 32V25.3546L15.7563 16.3265V22.9719Z" fill="#0043FF"/>
        <path d="M15.5939 6.92219L0 16.3265V9.40434L15.5939 0V6.92219Z" fill="#0043FF"/>
        <path d="M32 6.92219L15.7563 16.3265V9.40434L32 0V6.92219Z" fill="#0043FF"/>
      </svg>
      <h2 class="text-[40px] sm:text-[48px] md:text-[54px] lg:text-[72px] xl:text-[96px] font-semibold leading-[1.2] whitespace-nowrap">
        {{ $t('appService.title', '我们的服务') }}
      </h2>
    </div>

    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
      <div v-for="i in 3" :key="i" class="h-[420px] bg-[#131416]/50 border-l border-[#454C5F] p-6 flex flex-col justify-between">
        <div class="w-6 h-6 bg-[#2A2F3D] rounded"></div>
        <div class="space-y-3">
          <div class="w-3/4 h-8 bg-[#2A2F3D] rounded"></div>
          <div class="w-full h-16 bg-[#2A2F3D] rounded"></div>
        </div>
      </div>
    </div>

    <div 
      v-else 
      v-motion
      :initial="{ opacity: 0, y: 40 }"
      :visible-once="{ opacity: 1, y: 0, transition: { duration: 700, ease: 'easeOut' } }"
      class="relative w-full"
    >
      <Swiper
        :modules="[SwiperNavigation, SwiperPagination, SwiperAutoplay]"
        :slides-per-view="1.2"
        :space-between="16"
        :loop="true"
        :speed="600"
        :autoplay="{ delay: 5000, disableOnInteraction: false }"
        :pagination="{ el: '.service-pagination', clickable: true }"
        :breakpoints="{
          '640': { slidesPerView: 2, spaceBetween: 20 },
          '1024': { slidesPerView: 2.8, spaceBetween: 24 },
          '1280': { slidesPerView: 3, spaceBetween: 24 },
          '1600': { slidesPerView: 3.8, spaceBetween: 24 },
        }"
        @swiper="onSwiper"
        class="w-full !overflow-visible"
      >
        <SwiperSlide v-for="(item, index) in items" :key="item.id" class="h-auto box-border shrink-0">
          <div class="service-card group relative flex flex-col justify-between h-[420px] xl:h-[480px] p-6 overflow-hidden transition-all duration-300 w-full">
            <div class="card-bg-wrap absolute inset-0 z-0 transition-opacity duration-300">
              <img :src="item.image" :alt="displayItemTitle(item)" class="w-full h-full object-cover" />
              <div class="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/80"></div>
            </div>

            <div class="card-icon relative z-10 flex items-center justify-between">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" class="text-[#7D86A1] group-hover:text-white transition-colors duration-300 w-2 h-2 xl:w-5 xl:h-5">
                <path d="M9.84772 14.3575L0.101523 20V15.8466L9.84772 10.2041V14.3575Z" fill="currentColor"/>
                <path d="M9.74619 4.32637L0 10.2041V5.87771L9.74619 0V4.32637Z" fill="currentColor"/>
                <path d="M20 4.32637L9.84772 10.2041V5.87771L20 0V4.32637Z" fill="currentColor"/>
              </svg>
              <span class="card-index text-[14px] md:text-[20px] text-[#7D86A1] font-semibold tracking-wider group-hover:text-white transition-colors duration-300">
                {{ String(index + 1).padStart(2, '0') }}
              </span>
            </div>

            <div class="relative z-10 mt-auto">
              <h3 class="card-title text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] xl:text-[40px] font-bold mb-4 leading-tight transition-colors duration-300 text-white">
                {{ displayItemTitle(item) }}
              </h3>

              <ul class="card-points space-y-2 text-[16px] md:text-[16px] lg:text-[18px] xl:text-[24px] text-[#7D86A1] group-hover:text-white transition-colors duration-300">
                <li v-if="getPoint(item, 1)">{{ getPoint(item, 1) }}</li>
                <li v-if="getPoint(item, 2)">{{ getPoint(item, 2) }}</li>
                <li v-if="getPoint(item, 3)">{{ getPoint(item, 3) }}</li>
                <li v-if="getPoint(item, 4)">{{ getPoint(item, 4) }}</li>
              </ul>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      <div class="flex items-end justify-between mt-8 md:mt-[64px]">
        <div class="service-pagination flex items-center gap-[8px] md:gap-[12px]"></div>
        <div class="flex items-center space-x-3">
          <button @click="slidePrev" class="w-10 h-10 xl:w-16 xl:h-16 flex items-center justify-center rounded-xs group transition cursor-pointer">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none"><rect width="64" height="64" rx="4" class="fill-[#131416] group-hover:fill-[#103C93]" /><path d="M20.2679 30.7622H48L47.9646 33.2021H20.2351L27.0324 40H23.9912L16 32.0174L24.0265 24H26.997L20.2679 30.7622Z" fill="#7D86A1"/></svg>
          </button>
          <button @click="slideNext" class="w-10 h-10 xl:w-16 xl:h-16 flex items-center justify-center rounded-xs group transition cursor-pointer">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none"><rect width="64" height="64" rx="4" class="fill-[#0043FF] group-hover:fill-[#103C93]" /><path d="M44.7321 30.7622H17L17.0354 33.2021H44.7649L37.9676 40H41.0088L49 32.0174L40.9735 24H38.003L44.7321 30.7622Z" fill="white"/></svg>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation as SwiperNavigation, Pagination as SwiperPagination, Autoplay as SwiperAutoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const props = defineProps({
  items: { type: Array, default: () => [] },
  loading: { type: Boolean, default: false }
})

const { locale } = useI18n()
const isEn = computed(() => locale.value?.startsWith('en'))

const displayItemTitle = (item) => isEn.value ? (item.title_en || item.title) : item.title

const getPoint = (item, index) => {
  const field = isEn.value ? `point${index}_en` : `point${index}`
  return item[field] || item[`point${index}`] || ''
}

const swiperRef = ref(null)
const onSwiper = (swiper) => { swiperRef.value = swiper }
const slidePrev = () => { swiperRef.value?.slidePrev() }
const slideNext = () => { swiperRef.value?.slideNext() }
</script>

<style scoped>
:deep(.swiper-slide) { flex-shrink: 0; box-sizing: border-box; width: 440px; }
.service-card { background-color: transparent !important; border-left: 1px solid #454C5F; }
.service-card .card-bg-wrap { opacity: 1 !important; }
@media (max-width: 1023px) {
  :deep(.swiper-slide-active) .service-card { background-color: #131416 !important; border-left: 1px solid !important; border-image-source: linear-gradient(180deg, #0043FF 0%, #131416 100%) !important; border-image-slice: 1 !important; }
  :deep(.swiper-slide-active) .service-card .card-bg-wrap { opacity: 0 !important; }
  :deep(.swiper-slide-active) .service-card .card-title { color: #0043FF !important; }
  :deep(.swiper-slide-active) .service-card .card-points,:deep(.swiper-slide-active) .service-card .card-index,:deep(.swiper-slide-active) .service-card .card-icon svg { color: #ffffff !important; }
}
@media (min-width: 1024px) {
  .service-card:hover { background-color: #131416 !important; border-left: 1px solid !important; border-image-source: linear-gradient(180deg, #0043FF 0%, #131416 100%) !important; border-image-slice: 1 !important; }
  .service-card:hover .card-bg-wrap { opacity: 0 !important; }
  .service-card:hover .card-title { color: #0043FF !important; }
}
:deep(.service-pagination .swiper-pagination-bullet) { width: 12px; height: 12px; background-color: #454C5F; border-radius: 2px; opacity: 1; transition: all 0.3s ease; cursor: pointer; margin: 0 !important; }
:deep(.service-pagination .swiper-pagination-bullet-active) { background-color: #0043FF; }
@media (max-width: 768px) { :deep(.service-pagination .swiper-pagination-bullet) { width: 6px; height: 6px; border-radius: 1px; } }
</style>