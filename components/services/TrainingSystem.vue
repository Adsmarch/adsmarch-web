<template>
  <section class="relative w-full bg-black text-white px-[15px] md:px-[40px] xl:px-[120px] py-[56px] md:py-[120px] overflow-hidden">
    
    <div v-if="loading" class="mx-auto w-[300px] md:w-[450px] h-[48px] md:h-[80px] bg-[#2A2F3D] rounded animate-pulse mb-8 md:mb-[64px]"></div>
    <div v-else 
      v-motion
      :initial="{ opacity: 0, y: 30 }"
      :visible-once="{ opacity: 1, y: 0, transition: { duration: 700, ease: 'easeOut' } }"
      class="flex flex-col items-center justify-center text-center gap-3 xl:gap-4 shrink-0 mb-8 md:mb-[64px]"
    >
      <div class="flex items-center justify-center gap-3 xl:gap-6 shrink-0">
        <svg width="24" height="24" viewBox="0 0 32 32" fill="none" class="w-6 h-6 shrink-0 text-[#0043FF]">
          <path d="M15.7563 22.9719L0.162437 32V25.3546L15.7563 16.3265V22.9719Z" fill="currentColor"/>
          <path d="M15.5939 6.92219L0 16.3265V9.40434L15.5939 0V6.92219Z" fill="currentColor"/>
          <path d="M32 6.92219L15.7563 16.3265V9.40434L32 0V6.92219Z" fill="currentColor"/>
        </svg>
        <h2 class="text-[40px] sm:text-[48px] md:text-[54px] lg:text-[72px] xl:text-[96px] font-semibold leading-[1.2] whitespace-nowrap">
          {{ $t('training.title', '培训课程体系介绍') }}
        </h2>
      </div>
    </div>

    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
      <div v-for="i in 3" :key="i" class="h-[380px] bg-[#131416]/50 border-l border-[#454C5F] p-6 flex flex-col justify-between">
        <div class="w-5 h-5 bg-[#2A2F3D] rounded"></div>
        <div class="space-y-4">
          <div class="w-1/2 h-8 bg-[#2A2F3D] rounded"></div>
          <div class="w-full h-20 bg-[#2A2F3D] rounded"></div>
        </div>
      </div>
    </div>

    <div v-else class="relative w-full">
      
      <div class="block md:hidden w-full">
        <Swiper
          :modules="[SwiperPagination]"
          :slides-per-view="1.2"
          :space-between="16"
          :pagination="{ el: '.training-pagination-m', clickable: true }"
          class="w-full !overflow-visible"
        >
          <SwiperSlide v-for="item in items" :key="item.id" class="h-auto box-border shrink-0">
            <div class="training-card flex flex-col min-h-[380px] p-6 bg-black border-l border-[#454C5F] transition-colors duration-300">
              <div class="mb-6">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" class="text-[#0043FF] w-4 h-4">
                  <path d="M9.84772 14.3575L0.101523 20V15.8466L9.84772 10.2041V14.3575Z" fill="currentColor"/>
                  <path d="M9.74619 4.32637L0 10.2041V5.87771L9.74619 0V4.32637Z" fill="currentColor"/>
                  <path d="M20 4.32637L9.84772 10.2041V5.87771L20 0V4.32637Z" fill="currentColor"/>
                </svg>
              </div>

              <div>
                <h3 class="md:text-[28px] lg:text-[32px] xl:text-[40px] font-bold mb-3 leading-tight transition-colors duration-300 text-white">
                  {{ displayTitle(item) }}
                </h3>
                <ul class="space-y-2 md:text-[16px] lg:text-[18px] xl:text-[24px] text-[#7D86A1] group-hover:text-white transition-colors duration-300">
                  <template v-for="n in 5" :key="n">
                    <li v-if="getPoint(item, n)">{{ getPoint(item, n) }}</li>
                  </template>
                </ul>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
        <div class="training-pagination-m flex items-center justify-center gap-[8px] mt-6"></div>
      </div>

      <div class="hidden md:block w-full">
        
        <div v-if="items.length <= 3" class="grid grid-cols-1 md:grid-cols-3 gap-[24px]">
          <div v-for="item in items" :key="item.id" class="training-card flex flex-col h-full min-h-[420px] p-8 bg-black border-l border-[#454C5F] transition-colors duration-300">
            <div class="mb-8">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" class="text-[#0043FF] w-5 h-5">
                <path d="M9.84772 14.3575L0.101523 20V15.8466L9.84772 10.2041V14.3575Z" fill="currentColor"/>
                <path d="M9.74619 4.32637L0 10.2041V5.87771L9.74619 0V4.32637Z" fill="currentColor"/>
                <path d="M20 4.32637L9.84772 10.2041V5.87771L20 0V4.32637Z" fill="currentColor"/>
              </svg>
            </div>
            <div>
              <h3 class="md:text-[28px] lg:text-[32px] xl:text-[40px] font-bold mb-3 leading-tight transition-colors duration-300 text-white">
                {{ displayTitle(item) }}
              </h3>
              <ul class="space-y-3 md:text-[16px] lg:text-[18px] xl:text-[24px] text-[#7D86A1] group-hover:text-white transition-colors duration-300">
                <template v-for="n in 5" :key="n">
                  <li v-if="getPoint(item, n)">{{ getPoint(item, n) }}</li>
                </template>
              </ul>
            </div>
          </div>
        </div>

        <template v-else>
          <Swiper
            :modules="[SwiperNavigation, SwiperPagination]"
            :slides-per-view="3"
            :space-between="24"
            :pagination="{ el: '.training-pagination-pc', clickable: true }"
            class="w-full !overflow-visible"
          >
            <SwiperSlide v-for="item in items" :key="item.id" class="h-auto box-border shrink-0">
              <div class="training-card flex flex-col h-full min-h-[420px] p-8 bg-black border-l border-[#454C5F] transition-colors duration-300">
                <div class="mb-8">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" class="text-[#0043FF] w-5 h-5">
                    <path d="M9.84772 14.3575L0.101523 20V15.8466L9.84772 10.2041V14.3575Z" fill="currentColor"/>
                    <path d="M9.74619 4.32637L0 10.2041V5.87771L9.74619 0V4.32637Z" fill="currentColor"/>
                    <path d="M20 4.32637L9.84772 10.2041V5.87771L20 0V4.32637Z" fill="currentColor"/>
                  </svg>
                </div>
                <div>
                  <h3 class="text-[28px] lg:text-[32px] font-semibold text-white mb-6 leading-tight">
                    {{ displayTitle(item) }}
                  </h3>
                  <ul class="space-y-3 text-[16px] lg:text-[18px] text-[#A0A5B5] leading-relaxed">
                    <template v-for="n in 5" :key="n">
                      <li v-if="getPoint(item, n)">{{ getPoint(item, n) }}</li>
                    </template>
                  </ul>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
          <div class="training-pagination-pc flex items-center gap-[12px] mt-8"></div>
        </template>

      </div>

    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination as SwiperPagination, Navigation as SwiperNavigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const props = defineProps({
  items: { type: Array, default: () => [] },
  loading: { type: Boolean, default: false }
})

const { locale } = useI18n()
const isEn = computed(() => locale.value?.startsWith('en'))

const displayTitle = (item) => isEn.value ? (item.title_en || item.title) : item.title

const getPoint = (item, index) => {
  const paddedIndex = String(index).padStart(2, '0')
  const field = isEn.value ? `point_${paddedIndex}_en` : `point_${paddedIndex}`
  return item[field] || item[`point_${paddedIndex}`] || ''
}
</script>

<style scoped>
/* PC端悬停（Hover）背景变灰色 */
@media (min-width: 1024px) {
  .training-card:hover {
    background-color: #131416 !important;
  }
}

/* 移动端（M端）swiper active 状态下背景变灰色 */
@media (max-width: 1023px) {
  :deep(.swiper-slide-active) .training-card {
    background-color: #131416 !important;
  }
}

:deep(.training-pagination-pc .swiper-pagination-bullet),
:deep(.training-pagination-m .swiper-pagination-bullet) {
  width: 12px;
  height: 12px;
  background-color: #454C5F;
  border-radius: 2px;
  opacity: 1;
  transition: all 0.3s ease;
  cursor: pointer;
  margin: 0 !important;
}

:deep(.training-pagination-pc .swiper-pagination-bullet-active),
:deep(.training-pagination-m .swiper-pagination-bullet-active) {
  background-color: #0043FF;
}

@media (max-width: 768px) {
  :deep(.training-pagination-m .swiper-pagination-bullet) {
    width: 6px;
    height: 6px;
    border-radius: 1px;
  }
}
</style>