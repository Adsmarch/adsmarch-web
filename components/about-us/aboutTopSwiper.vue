<template>
  <div class="px-[15px] md:px-[40px] xl:px-[120px] pb-[64px] md:pb-[120px] m-auto">
    <div v-if="loading" class="pt-[56px] md:pt-[120px] animate-pulse space-y-6">
      <div class="h-16 md:h-24 bg-[#2A2F3D] rounded w-3/4"></div>
      <div class="h-32 bg-[#131416] rounded w-full"></div>
      <div class="w-full aspect-[16/9] md:aspect-[21/9] bg-[#131416] rounded-[4px] md:rounded-xl mt-8"></div>
    </div>

    <template v-else>
      <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-8 mb-[32px] md:mb-[64px] pt-[56px] md:pt-[120px]">
        <div
        v-motion
        :initial="{ opacity: 0, y: 50 }"
        :visible-once="{ opacity: 1, y: 0, transition: { duration: 200, ease: 'easeOut' } }" 
         class="flex flex-col opacity-0">
          <h2 class="text-[40px] sm:text-[48px] md:text-[54px] lg:text-[72px] xl:text-[96px] font-semibold leading-[1.2] whitespace-pre-line" v-html="displayTitle">
          </h2>
        </div>
      </div>
      <div class="flex items-end md:justify-between md:gap-8 gap-[10px]">
        <div
        v-motion
        :initial="{ opacity: 0, y: 50 }"
        :visible-once="{ opacity: 1, y: 0, transition: { duration: 200, ease: 'easeOut' } }" 
         class="order-2 md:order-1 title-icon opacity-0">
          <svg class="md:w-[32px] md:h-[32px] w-[16px] h-[16px]" viewBox="0 0 32 32" fill="none">
            <path d="M15.7563 22.9719L0.162437 32V25.3546L15.7563 16.3265V22.9719Z" fill="#0043FF" />
            <path d="M15.5939 6.92219L0 16.3265V9.40434L15.5939 0V6.92219Z" fill="#0043FF" />
            <path d="M32 6.92219L15.7563 16.3265V9.40434L32 0V6.92219Z" fill="#0043FF" />
          </svg>
        </div>
        <div
        v-motion
        :initial="{ opacity: 0, y: 50 }"
        :visible-once="{ opacity: 1, y: 0, transition: { duration: 200, ease: 'easeOut' } }" 
         class="md:order-2 order-1 text-sm md:text-base flex flex-col gap-[12px] md:gap-[14px] xl:gap-[24px] opacity-0">
          <div class="text-[16px] sm:text-[20px] md:text-[24px] lg:text-[28px] xl:text-[32px] font-[400] leading-[150%] text-white" v-html="displayDescription"></div>
        </div>
      </div>
    </template>
  </div>

  <div class="w-full">
    <div class="relative" v-if="!loading && images.length > 0">
      <Swiper
        :modules="[SwiperNavigation, SwiperPagination, SwiperAutoplay]"
        :slides-per-view="1.4"
        :centered-slides="true"
        :space-between="16"
        :loop="true"
        :speed="600"
        :autoplay="{ delay: 5000, disableOnInteraction: false }"
        :pagination="{ el: '#about-swiper-pagination', clickable: true, type: 'custom', renderCustom: renderPagination }"
        :navigation="{ prevEl: '#about-swiper-prev', nextEl: '#about-swiper-next' }"
        :breakpoints="{ 768: { slidesPerView: 2, spaceBetween: 24 } }"
        class="about-swiper w-full"
      >
        <SwiperSlide v-for="(img, index) in loopImages" :key="index">
          <div class="overflow-hidden rounded-[4px] md:rounded-xl  aspect-[3/2] bg-[#131416]">
            <img :src="img" class="w-full md:h-auto object-cover select-none" alt="" loading="lazy" />
          </div>
        </SwiperSlide>
      </Swiper>
      <button id="about-swiper-next" class="hidden md:flex px-[10px] py-[10px] absolute right-[7.5%] top-1/2 -translate-y-1/2 z-10 lg:w-[64px] lg:h-[64px] md:w-[48px] md:h-[48px] rounded-[4px] bg-[#0043FF] text-white items-center justify-center hover:bg-[#103C93] transition">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="16" viewBox="0 0 32 16" fill="none"><path d="M27.7321 6.76219H0L0.0353947 9.20206H27.7649L20.9676 16H24.0088L32 8.01745L23.9735 0H21.003L27.7321 6.76219Z" fill="white" /></svg>
      </button>
    </div>
    <div id="about-swiper-pagination" class="!relative flex justify-center gap-2 lg:mt-[64px] md:mt-[48px] mt-[32px]"></div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation as SwiperNavigation, Pagination as SwiperPagination, Autoplay as SwiperAutoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const props = defineProps({
  data: { type: Object, default: () => ({}) },
  loading: { type: Boolean, default: false }
})

const { $pb } = useNuxtApp()
const { locale } = useI18n()
const isEn = computed(() => locale.value?.startsWith('en'))

const displayTitle = computed(() => isEn.value ? (props.data.title_en || props.data.title) : props.data.title)
const displayDescription = computed(() => isEn.value ? (props.data.description_en || props.data.description) : props.data.description)

const images = computed(() => {
  if (!props.data?.file_url) return []
  const fileUrls = Array.isArray(props.data.file_url) ? props.data.file_url : [props.data.file_url]
  return fileUrls.map(f => $pb.files.getUrl(props.data, f))
})

const loopImages = computed(() => images.value.length ? [...images.value, ...images.value] : [])

function renderPagination(swiper) {
  const real = images.value.length || 1
  const active = swiper.realIndex % real
  let html = ''
  for (let i = 0; i < real; i++) {
    html += `<span class="swiper-pagination-bullet${i === active ? ' swiper-pagination-bullet-active' : ''}"></span>`
  }
  return html
}
</script>
<style scoped>
.about-swiper { overflow: hidden; }
:deep(.about-swiper .swiper-wrapper) { align-items: stretch; }
:deep(.about-swiper .swiper-slide) { height: auto; }
:deep(.swiper-pagination-bullet) { width: 12px; height: 12px; background: #454C5F; opacity: 1; border-radius: 2px; transition: all 0.3s; }
:deep(.swiper-pagination-bullet-active) { background: #0043FF; }
:deep(strong) {
  font-weight: 600;
  color: #fff;
}
:deep(p) {
  margin-bottom: 8px;
}
@media screen and (max-width: 768px) {
  :deep(strong) {
    font-size: 20px;
    display: block;
    margin-bottom: 4px;
  }
  :deep(p) {
    font-size: 16px;
    margin-bottom: 12px;
  }
  :deep(p):last-child{
    margin-bottom: 0;
  }
  :deep(.swiper-pagination-bullet) { width: 6px; height: 6px; background: #454C5F; opacity: 1; border-radius: 1px; transition: all 0.3s; }
}
</style>