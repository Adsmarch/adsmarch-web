<template>
    <div class="px-[15px] md:px-[40px] xl:px-[120px] pb-[64px] md:pb-[120px] m-auto">
      <div
        class="flex flex-col md:flex-row md:items-start md:justify-between gap-8 mb-[32px] md:mb-[64px] pt-[56px] md:pt-[120px]">
        <div
        v-motion
        :initial="{ opacity: 0, y: 50 }"
        :visible-once="{ opacity: 1, y: 0, transition: { duration: 200, ease: 'easeOut' } }" 
        class="flex flex-col opacity-0">
          <h2 class="text-[40px] sm:text-[48px] md:text-[54px] lg:text-[72px] xl:text-[96px] font-semibold leading-[1.2]">
            <template v-for="(line, i) in titleLines" :key="i">
              {{ line }}<br v-if="i < titleLines.length - 1" />
            </template>
          </h2>
        </div>
      </div>
      <div class="flex items-end md:justify-between md:gap-8 gap-[10px]">
        <div
        v-motion
        :initial="{ opacity: 0, y: 50 }"
        :visible-once="{ opacity: 1, y: 0, transition: { duration: 300, ease: 'easeOut' } }" 
        class="order-2 md:order-1 title-icon opacity-0">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M15.7563 22.9719L0.162437 32V25.3546L15.7563 16.3265V22.9719Z" fill="#0043FF" />
            <path d="M15.5939 6.92219L0 16.3265V9.40434L15.5939 0V6.92219Z" fill="#0043FF" />
            <path d="M32 6.92219L15.7563 16.3265V9.40434L32 0V6.92219Z" fill="#0043FF" />
          </svg>
        </div>
        <div class="md:order-2 order-1 text-sm md:text-base flex flex-col gap-[12px] md:gap-[14px] xl:gap-[24px]">
          <p v-for="(item, i) in values" :key="i"
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :visible-once="{ 
            opacity: 1, 
            y: 0, 
            transition: { 
              duration: 600, 
              delay: i * 300,
              ease: 'easeOut' 
            } 
          }" class="opacity-0">
            <span class=" block md:inline text-[20px] sm:text-[22px] md:text-[24px] lg:text-[28px] xl:text-[32px] font-semibold leading-[1.2]">{{ item.label }}</span>
            <span class="text-[16px] sm:text-[20px] md:text-[24px] lg:text-[28px] xl:text-[32px] font-[400] leading-[150%]">{{ item.text }}</span>
          </p>
        </div>
      </div>
    </div>

     <div class="w-full">
    <div class="relative">
     <Swiper
        :modules="[SwiperNavigation, SwiperPagination, SwiperAutoplay]"
        :slides-per-view="1.4"
        :centered-slides="true"
        :space-between="16"
        :loop="true"
        :speed="600"
        :observer="true"
        :observe-parents="true"
        :autoplay="{
          delay: 5000,
          disableOnInteraction: false
        }"
        :watch-slides-progress="true",
        :pagination="{
          el: '#about-swiper-pagination',
          clickable: true,
          type: 'custom',
          renderCustom: renderPagination
        }"
        :navigation="{
          prevEl: '#about-swiper-prev',
          nextEl: '#about-swiper-next'
        }"
        :breakpoints="{
          768: {
            slidesPerView: 2,
            spaceBetween: 24
          }
        }"
        class="about-swiper w-full"
      >
        <SwiperSlide
          v-for="(img, index) in loopImages"
          :key="index"
        >
          <div class="overflow-hidden rounded-[4px] md:rounded-xl">
            <img
              :src="img"
              class="w-full md:h-auto object-cover select-none"
              alt=""
              draggable="false"
              loading="lazy"
            />
          </div>
        </SwiperSlide>
      </Swiper>

      <button id="about-swiper-prev"
        class="hidden md:flex px-[10px] py-[10px] absolute left-[7.5%] top-1/2 -translate-y-1/2 z-10 lg:w-[64px] lg:h-[64px] md:w-[48px] md:h-[48px] rounded-lg bg-blue-600 text-white items-center justify-center hover:bg-blue-700 transition"
        :aria-label="$t('about.top.prev')">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="16" viewBox="0 0 32 16" fill="none">
          <path
            d="M4.26793 6.76219H32L31.9646 9.20206H4.23513L11.0324 16H7.99115L0 8.01745L8.02654 0H10.997L4.26793 6.76219Z"
            fill="#7D86A1" />
        </svg>
      </button>
      <button id="about-swiper-next"
        class="hidden md:flex px-[10px] py-[10px] absolute right-[7.5%] top-1/2 -translate-y-1/2 z-10 lg:w-[64px] lg:h-[64px] md:w-[48px] md:h-[48px] rounded-lg bg-blue-600 text-white items-center justify-center hover:bg-blue-700 transition"
        :aria-label="$t('about.top.next')">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="16" viewBox="0 0 32 16" fill="none">
          <path
            d="M27.7321 6.76219H0L0.0353947 9.20206H27.7649L20.9676 16H24.0088L32 8.01745L23.9735 0H21.003L27.7321 6.76219Z"
            fill="white" />
        </svg>
      </button>
    </div>
    <div id="about-swiper-pagination" class="!relative flex justify-center gap-2 lg:mt-[64px] md:mt-[48px] mt-[32px]"></div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation as SwiperNavigation, Pagination as SwiperPagination, Autoplay as SwiperAutoplay } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import aboutImage01 from '@/assets/image/about-01.png'
import aboutImage02 from '@/assets/image/about-02.png'
import aboutImage03 from '@/assets/image/about-03.png'
import aboutImage04 from '@/assets/image/about-04.png'



const { t, tm } = useI18n()

const titleLines = computed(() => {
  const raw = tm('about.top.titleLines')
  const len = Array.isArray(raw) ? raw.length : 0
  return Array.from({ length: len }, (_, i) => t(`about.top.titleLines.${i}`))
})

const values = computed(() => {
  const raw = tm('about.top.values')
  const len = Array.isArray(raw) ? raw.length : 0
  return Array.from({ length: len }, (_, i) => ({
    label: t(`about.top.values.${i}.label`),
    text: t(`about.top.values.${i}.text`)
  }))
})

const images = [
  aboutImage01,
  aboutImage02,
  aboutImage03,
  aboutImage04
]

const loopImages = [...images, ...images]
function renderPagination(swiper) {
  const real = images.length
  const active = swiper.realIndex % real
  let html = ''
  for (let i = 0; i < real; i++) {
    html += `<span class="swiper-pagination-bullet${i === active ? ' swiper-pagination-bullet-active' : ''}"></span>`
  }
  return html
}
</script>

<style scoped>
.about-swiper {
  overflow: hidden ;
}

:deep(.about-swiper .swiper-wrapper) {
  align-items: stretch;
}

:deep(.about-swiper .swiper-slide) {
  height: auto;
}

@media (max-width: 768px) {
  .title-icon {
    transform: scale(-1, -1);
  }

  .title-icon svg {
    width: 16px;
    height: 16px;
  }
  :deep(.swiper-pagination-bullet) {
  width: 6px !important;
  height: 6px !important;
  border-radius: 1px !important;

}
}
@media (min-width: 769px) and (max-width: 1023px) {
  :deep(.swiper-pagination-bullet) {
  width: 8px !important;
  height: 8px !important;
  border-radius: 1px !important;

}
}

:deep(.swiper-pagination-bullet) {
  width: 12px;
  height: 12px;
  background: #454C5F;
  opacity: 1;
  border-radius: 2px;
  transition: all 0.3s;
}

:deep(.swiper-pagination-bullet-active) {
  background: #2563eb;
}

#about-swiper-prev {
  background: #EBF0FF;
}
</style>
