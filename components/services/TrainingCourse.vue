<template>
  <section class="relative w-full bg-black text-white px-[15px] md:px-[40px] xl:px-[120px] pt-[56px] md:pt-[120px] overflow-hidden max-w-site mx-auto">
    
    <div v-if="loading" class="mx-auto w-[300px] md:w-[450px] h-[48px] md:h-[80px] bg-[#2A2F3D] rounded animate-pulse mb-8 md:mb-[64px]"></div>
    <div v-else 
      v-motion
      :initial="{ opacity: 0, y: 30 }"
      :visible-once="{ opacity: 1, y: 0, transition: { duration: 700, ease: 'easeOut' } }"
      class="flex flex-col items-center justify-center text-center gap-3 xl:gap-4 shrink-0 mb-8 md:mb-[64px]"
    >
      <div class="flex items-center justify-center gap-3 xl:gap-6 shrink-0">
        <h2 class="text-[40px] sm:text-[48px] md:text-[54px] lg:text-[72px] xl:text-[96px] font-semibold leading-[1.2] whitespace-nowrap">
          {{ $t('training.course_title', '课程体系介绍') }}
        </h2>
      </div>
    </div>

    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-6 gap-6 animate-pulse">
      <div
        v-for="i in 5"
        :key="i"
        class="h-[380px] bg-[#131416]/50 border-l border-[#454C5F] p-6 flex flex-col justify-between"
        :class="i <= 3 ? 'md:col-span-2' : 'md:col-span-3'"
      >
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
          :modules="[SwiperPagination, SwiperAutoplay]"
          :slides-per-view="1.2"
          :space-between="16"
          :loop="true"
          :autoplay="{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }"
          :pagination="{ el: '.training-pagination-m', clickable: true }"
          class="w-full !overflow-visible"
        >
          <SwiperSlide v-for="item in items" :key="item.id" class="h-auto box-border shrink-0">
            <div class="training-card flex flex-col min-h-[250px] p-6 bg-black border-l border-[#454C5F] transition-colors duration-300">
              <div class="mb-6"></div>

              <div>
                <h3 class="md:text-[28px] lg:text-[32px] xl:text-[40px] font-bold mb-3 leading-tight transition-colors duration-300 text-white">
                  {{ displayTitle(item) }}
                </h3>
                <ul class="space-y-2 md:text-[16px] lg:text-[18px] xl:text-[24px] text-[#7D86A1] group-hover:text-white transition-colors duration-300">
                  <template v-for="n in 5" :key="n">
                    <li v-if="getPoint(item, n)" class="whitespace-pre-line">{{ getPoint(item, n) }}</li>
                  </template>
                </ul>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
        <div class="training-pagination-m flex items-center justify-center gap-[8px] mt-6"></div>
      </div>

      <div class="hidden md:grid md:grid-cols-6 gap-[24px] w-full">
        <div
          v-for="(item, index) in items"
          :key="item.id"
          class="training-card flex flex-col h-full min-h-[180px] p-8 bg-black border-l border-[#454C5F] transition-colors duration-300"
          :class="getPcCardSpanClass(index, items.length)"
        >
          <div>
            <h3 class="text-[28px] lg:text-[32px] font-semibold text-white mb-6 leading-tight">
              {{ displayTitle(item) }}
            </h3>
            <ul class="space-y-3 text-[16px] lg:text-[18px] text-[#7D86A1] leading-relaxed">
              <template v-for="n in 5" :key="n">
                <li v-if="getPoint(item, n)" class="whitespace-pre-line">{{ getPoint(item, n) }}</li>
              </template>
            </ul>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination as SwiperPagination, Autoplay as SwiperAutoplay } from 'swiper/modules'
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

const getPcCardSpanClass = (index, total) => {
  if (total === 5) {
    return index < 3 ? 'md:col-span-2' : 'md:col-span-3'
  }
  return index < 3 ? 'md:col-span-2' : 'md:col-span-2'
}
</script>

<style scoped>
@media (min-width: 1024px) {
  .training-card:hover {
    background-color: #131416 !important;
  }
}

@media (max-width: 1023px) {
  :deep(.swiper-slide-active) .training-card {
    background-color: #131416 !important;
  }
}

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