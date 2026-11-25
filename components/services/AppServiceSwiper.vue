<template>
  <section class="relative w-full bg-black text-white px-[15px] md:px-[40px] xl:px-[120px] overflow-hidden max-w-site mx-auto">
    
    <div v-if="loading" class="w-[300px] md:w-[450px] h-[48px] md:h-[80px] bg-[#2A2F3D] rounded animate-pulse mb-8 md:mb-[64px]"></div>
    <div v-else 
    v-motion
    :initial="{ opacity: 0, y: 50 }"
    :visible-once="{ opacity: 1, y: 0, transition: { duration: 300, ease: 'easeOut' } }"
    class="flex items-start gap-3 xl:gap-6 shrink-0 mb-8 md:mb-[64px] opacity-0">
      <h2 class="text-[40px] sm:text-[48px] md:text-[54px] lg:text-[72px] xl:text-[96px] font-semibold leading-[1.2] whitespace-nowrap">
        {{ $t('appService.title', '我们的服务') }}
      </h2>
    </div>

    <div v-if="loading" class="w-full animate-pulse">
      <div class="h-[420px] bg-[#131416]/50 p-6"></div>
    </div>

    <div 
      v-else 
      v-motion
      :initial="{ opacity: 0, y: 40 }"
      :visible-once="{ opacity: 1, y: 0, transition: { duration: 700, ease: 'easeOut' } }"
      class="relative w-full"
    >
      <div v-if="items.length === 1" class="w-full">
        <div class="block md:hidden w-full">
          <div 
            v-for="(item, index) in items" 
            :key="item.id" 
            class="service-card single-card-m group relative flex flex-col justify-between h-[480px] p-6 overflow-hidden w-full transition-all duration-300"
          >
            <div class="card-bg-wrap absolute inset-0 z-0">
              <img :src="item.image" :alt="displayItemTitle(item)" class="w-full h-full object-cover" />
              <div class="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/80"></div>
            </div>

            <div class="card-icon relative z-10 flex items-center justify-between">
              <span></span>
              <span class="card-index text-[14px] text-[#7D86A1] font-semibold tracking-wider group-hover:text-white transition-colors duration-300">
                {{ String(index + 1).padStart(2, '0') }}
              </span>
            </div>

            <div class="relative z-10 mt-auto">
              <h3 class="card-title text-[24px] sm:text-[28px] font-bold mb-3 leading-tight transition-colors duration-300 text-white">
                {{ displayItemTitle(item) }}
              </h3>
              <div class="grid grid-rows-[1fr] opacity-100 mb-2">
                <div class="overflow-hidden">
                  <ul class="card-points space-y-2 text-[16px] text-[#7D86A1] group-hover:text-white transition-colors duration-300">
                    <li v-if="getPoint(item, 1)">{{ getPoint(item, 1) }}</li>
                    <li v-if="getPoint(item, 2)">{{ getPoint(item, 2) }}</li>
                    <li v-if="getPoint(item, 3)">{{ getPoint(item, 3) }}</li>
                    <li v-if="getPoint(item, 4)">{{ getPoint(item, 4) }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="single-card-pc hidden md:flex w-full bg-transparent overflow-hidden min-h-[500px] lg:min-h-[580px] group transition-all duration-300">
          <div class="w-1/2 relative overflow-hidden group/img">
            <img :src="items[0].image" :alt="displayItemTitle(items[0])" class="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105" />
            <div class="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
          </div>

          <div class="w-1/2 p-10 lg:p-16 xl:p-20 flex flex-col justify-between">
            <div class="flex items-center justify-between">
              <span></span>
              <span class="text-[20px] text-[#7D86A1] group-hover:text-white transition-colors duration-300 font-semibold tracking-wider">01</span>
            </div>

            <div class="my-auto py-8">
              <h3 class="text-[32px] lg:text-[40px] xl:text-[48px] font-bold mb-6 leading-tight text-white group-hover:text-[#0043FF] transition-colors duration-300">
                {{ displayItemTitle(items[0]) }}
              </h3>
              <ul class="space-y-3 text-[18px] lg:text-[20px] xl:text-[24px] text-[#7D86A1] group-hover:text-white transition-colors duration-300 leading-relaxed">
                <li v-if="getPoint(items[0], 1)">{{ getPoint(items[0], 1) }}</li>
                <li v-if="getPoint(items[0], 2)">{{ getPoint(items[0], 2) }}</li>
                <li v-if="getPoint(items[0], 3)">{{ getPoint(items[0], 3) }}</li>
                <li v-if="getPoint(items[0], 4)">{{ getPoint(items[0], 4) }}</li>
              </ul>
            </div>

          </div>
        </div>
      </div>

      <div v-else>
        <div class="block md:hidden w-full">
          <Swiper
            :modules="[SwiperNavigation, SwiperPagination, SwiperAutoplay]"
            :slides-per-view="1.2"
            :space-between="16"
            :loop="true"
            :speed="600"
            :autoplay="{ delay: 5000, disableOnInteraction: false }"
            :pagination="{ el: '.service-pagination-m', clickable: true }"
            class="w-full !overflow-visible md:pl-[40px] xl:pl-[120px]"
          >
            <SwiperSlide v-for="(item, index) in items" :key="item.id" v-slot="{ isActive }" class="h-auto box-border shrink-0">
              <div class="service-card group relative flex flex-col justify-between h-[420px] p-6 overflow-hidden transition-all duration-300 w-full">
                <div class="card-bg-wrap absolute inset-0 z-0">
                  <img :src="item.image" :alt="displayItemTitle(item)" class="w-full h-full object-cover" />
                  <div class="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/80"></div>
                </div>

                <div class="card-icon relative z-10 flex items-center justify-between">
                  <span></span>
                  <span class="card-index text-[14px] text-[#7D86A1] font-semibold tracking-wider group-hover:text-white transition-colors duration-300">
                    {{ String(index + 1).padStart(2, '0') }}
                  </span>
                </div>

                <div class="relative z-10 mt-auto">
                  <h3 class="card-title text-[20px] sm:text-[24px] font-bold mb-2 leading-tight transition-colors duration-300 text-white">
                    {{ displayItemTitle(item) }}
                  </h3>
                  <div 
                    :class="[
                      'grid transition-all duration-500 ease-in-out',
                      isActive 
                        ? 'grid-rows-[1fr] opacity-100 mb-2 md:grid-rows-[0fr] md:opacity-0 md:mb-0 md:group-hover:grid-rows-[1fr] md:group-hover:opacity-100 md:group-hover:mb-2' 
                        : 'grid-rows-[0fr] opacity-0 group-hover:grid-rows-[1fr] group-hover:opacity-100 group-hover:mb-2'
                    ]"
                  >
                    <div class="overflow-hidden">
                      <ul class="card-points space-y-2 text-[16px] text-[#7D86A1] group-hover:text-white transition-colors duration-300">
                        <li v-if="getPoint(item, 1)">{{ getPoint(item, 1) }}</li>
                        <li v-if="getPoint(item, 2)">{{ getPoint(item, 2) }}</li>
                        <li v-if="getPoint(item, 3)">{{ getPoint(item, 3) }}</li>
                        <li v-if="getPoint(item, 4)">{{ getPoint(item, 4) }}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>

          <div class="flex items-center justify-between mt-8">
            <div class="service-pagination-m flex items-center gap-[8px]"></div>
          </div>
        </div>

        <div class="hidden md:block w-full">
          <div v-if="items.length < 3" class="grid grid-cols-2 gap-[24px]">
            <div v-for="(item, index) in items" :key="item.id" class="h-auto box-border shrink-0 w-full">
              <div class="service-card group relative flex flex-col justify-between p-6 h-[520px] overflow-hidden transition-all duration-300 w-full">
                <div class="card-bg-wrap absolute inset-0 z-0">
                  <img :src="item.image" :alt="displayItemTitle(item)" class="w-full h-full object-cover" />
                  <div class="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/80"></div>
                </div>

                <div class="card-icon relative z-10 flex items-center justify-between">
                 <span></span>
                  <span class="card-index md:text-[20px] text-[#7D86A1] font-semibold tracking-wider group-hover:text-white transition-colors duration-300">
                    {{ String(index + 1).padStart(2, '0') }}
                  </span>
                </div>

                <div class="relative z-10 mt-auto">
                  <h3 class="card-title md:text-[28px] lg:text-[32px] xl:text-[40px] font-bold mb-4 leading-tight transition-colors duration-300 text-white">
                    {{ displayItemTitle(item) }}
                  </h3>
                  <div class="grid transition-all duration-500 ease-in-out grid-rows-[0fr] opacity-0 group-hover:grid-rows-[1fr] group-hover:opacity-100 group-hover:mb-4">
                    <div class="overflow-hidden">
                      <ul class="card-points space-y-2 md:text-[16px] lg:text-[18px] xl:text-[24px] text-[#7D86A1] group-hover:text-white transition-colors duration-300">
                        <li v-if="getPoint(item, 1)">{{ getPoint(item, 1) }}</li>
                        <li v-if="getPoint(item, 2)">{{ getPoint(item, 2) }}</li>
                        <li v-if="getPoint(item, 3)">{{ getPoint(item, 3) }}</li>
                        <li v-if="getPoint(item, 4)">{{ getPoint(item, 4) }}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <template v-else>
            <Swiper
              :modules="[SwiperNavigation, SwiperPagination, SwiperAutoplay]"
              :slides-per-view="2.8"
              :space-between="24"
              :loop="true"
              :speed="600"
              :autoplay="{ delay: 5000, disableOnInteraction: false }"
              :pagination="{ el: '.service-pagination-pc', clickable: true }"
              :breakpoints="{
                '1024': { slidesPerView: 2.8, spaceBetween: 24 },
                '1280': { slidesPerView: 3, spaceBetween: 24 },
                '1600': { slidesPerView: 3.8, spaceBetween: 24 },
              }"
              @swiper="onSwiper"
              class="w-full !overflow-visible"
            >
              <SwiperSlide v-for="(item, index) in items" :key="item.id" v-slot="{ isActive }" class="h-auto box-border shrink-0">
                <div class="service-card group relative flex flex-col justify-between aspect-[4.4/5.6] p-6 overflow-hidden  w-full">
                  <div class="card-bg-wrap absolute inset-0 z-0">
                    <img :src="item.image" :alt="displayItemTitle(item)" class="w-full h-full object-cover" />
                    <div class="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/80"></div>
                  </div>

                  <div class="card-icon relative z-10 flex items-center justify-between">
                    <span></span>
                    <span class="card-index md:text-[20px] text-[#7D86A1] font-semibold tracking-wider group-hover:text-white transition-colors duration-300">
                      {{ String(index + 1).padStart(2, '0') }}
                    </span>
                  </div>

                  <div class="relative z-10 mt-auto">
                    <h3 class="card-title md:text-[28px] lg:text-[32px] xl:text-[40px] font-bold mb-4 leading-tight transition-colors duration-300 text-white">
                      {{ displayItemTitle(item) }}
                    </h3>
                    <div 
                      :class="[
                        'grid transition-all duration-500 ease-in-out',
                        isActive 
                          ? 'grid-rows-[1fr] opacity-100 mb-4 md:grid-rows-[0fr] md:opacity-0 md:mb-0 md:group-hover:grid-rows-[1fr] md:group-hover:opacity-100 md:group-hover:mb-4' 
                          : 'grid-rows-[0fr] opacity-0 group-hover:grid-rows-[1fr] group-hover:opacity-100 group-hover:mb-4'
                      ]"
                    >
                      <div class="overflow-hidden">
                        <ul class="card-points space-y-2 md:text-[16px] lg:text-[18px] xl:text-[24px] text-[#7D86A1] group-hover:text-white transition-colors duration-300">
                          <li v-if="getPoint(item, 1)">{{ getPoint(item, 1) }}</li>
                          <li v-if="getPoint(item, 2)">{{ getPoint(item, 2) }}</li>
                          <li v-if="getPoint(item, 3)">{{ getPoint(item, 3) }}</li>
                          <li v-if="getPoint(item, 4)">{{ getPoint(item, 4) }}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>

            <div class="flex items-end justify-between mt-[64px]">
              <div class="service-pagination-pc flex items-center gap-[12px]"></div>
              <div class="flex items-center space-x-3">
                <button @click="slidePrev" class="w-16 h-16 flex items-center justify-center rounded-xs group transition cursor-pointer">
                  <svg width="64" height="64" viewBox="0 0 64 64" fill="none"><rect width="64" height="64" rx="4" class="fill-[#131416] group-hover:fill-[#103C93]" /><path d="M20.2679 30.7622H48L47.9646 33.2021H20.2351L27.0324 40H23.9912L16 32.0174L24.0265 24H26.997L20.2679 30.7622Z" fill="#7D86A1"/></svg>
                </button>
                <button @click="slideNext" class="w-16 h-16 flex items-center justify-center rounded-xs group transition cursor-pointer">
                  <svg width="64" height="64" viewBox="0 0 64 64" fill="none"><rect width="64" height="64" rx="4" class="fill-[#0043FF] group-hover:fill-[#103C93]" /><path d="M44.7321 30.7622H17L17.0354 33.2021H44.7649L37.9676 40H41.0088L49 32.0174L40.9735 24H38.003L44.7321 30.7622Z" fill="white"/></svg>
                </button>
              </div>
            </div>
          </template>
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
.service-card { background-color: transparent !important; 
  /* border-left: 1px solid #454C5F; */
 }
.service-card .card-bg-wrap { opacity: 1 !important; }

.single-card-m {
  background-color: transparent !important;
  /* border-left: 1px solid #454C5F !important; */
}
.single-card-m:hover,
.single-card-m:active {
  background-color: #131416 !important;
  /* border-left: 1px solid #0043FF !important; */
}
.single-card-m:hover .card-bg-wrap,
.single-card-m:active .card-bg-wrap {
  opacity: 0 !important;
}
.single-card-m:hover .card-title,
.single-card-m:active .card-title {
  color: #0043FF !important;
}
.single-card-m:hover .card-index,
.single-card-m:hover .card-icon svg,
.single-card-m:active .card-index,
.single-card-m:active .card-icon svg {
  color: #ffffff !important;
}

.single-card-pc:hover {
  background-color: #131416 !important;
  /* border-left: 1px solid #0043FF !important; */
}

@media (max-width: 1023px) {
  :deep(.swiper-slide-active) .service-card { background-color: #131416 !important; border-image-source: linear-gradient(180deg, #0043FF 0%, #131416 100%) !important; border-image-slice: 1 !important; }
  :deep(.swiper-slide-active) .service-card .card-bg-wrap { opacity: 0 !important; }
  :deep(.swiper-slide-active) .service-card .card-title { color: #0043FF !important; }
  :deep(.swiper-slide-active) .service-card .card-index,:deep(.swiper-slide-active) .service-card .card-icon svg { color: #ffffff !important; }
}
@media (min-width: 1024px) {
  .service-card:hover { background-color: #131416 !important; border-image-source: linear-gradient(180deg, #0043FF 0%, #131416 100%) !important; border-image-slice: 1 !important; }
  .service-card:hover .card-bg-wrap { opacity: 0 !important; }
  .service-card:hover .card-title { color: #0043FF !important; }
}
:deep(.service-pagination-pc .swiper-pagination-bullet),
:deep(.service-pagination-m .swiper-pagination-bullet) { width: 12px; height: 12px; background-color: #454C5F; border-radius: 2px; opacity: 1; transition: all 0.3s ease; cursor: pointer; margin: 0 !important; }
:deep(.service-pagination-pc .swiper-pagination-bullet-active),
:deep(.service-pagination-m .swiper-pagination-bullet-active) { background-color: #0043FF; }
@media (max-width: 768px) { :deep(.service-pagination-m .swiper-pagination-bullet) { width: 6px; height: 6px; border-radius: 1px; } }
</style>