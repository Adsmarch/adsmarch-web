<template>
  <section class="relative w-full bg-black text-white py-[56px] md:pt-[120px] md:pb-[120px] overflow-hidden select-none max-w-site mx-auto px-[15px] md:px-[40px] xl:px-[120px]">
    <div v-if="loading" class="w-[300px] md:w-[450px] h-[48px] md:h-[80px] bg-[#2A2F3D] rounded animate-pulse mb-8 md:mb-[64px]"></div>
    <div v-else 
    v-motion
    :initial="{ opacity: 0, y: 50 }"
    :visible-once="{ opacity: 1, y: 0, transition: { duration: 300, ease: 'easeOut' } }"
     class="flex items-start gap-3 xl:gap-6 shrink-0 mb-8 md:mb-[64px] justify-center opacity-0">
      <h2 class="text-[40px] sm:text-[48px] md:text-[54px] lg:text-[72px] xl:text-[96px] font-semibold leading-[1.2]">
        {{ $t('classicCases.title') }}
      </h2>
    </div>

    <div v-if="loading" class="w-full max-w-5xl mx-auto px-4 animate-pulse">
      <div class="bg-[#131416]/50 rounded h-[450px] flex flex-col justify-between p-8 border border-[#454C5F]">
        <div class="w-full aspect-[16/9] bg-[#2A2F3D] rounded"></div>
        <div class="space-y-4">
          <div class="w-1/2 h-8 bg-[#2A2F3D] rounded"></div>
          <div class="w-full h-12 bg-[#2A2F3D] rounded"></div>
        </div>
      </div>
    </div>

    <div 
      v-else 
      v-motion
      :initial="{ opacity: 0, y: 30 }"
      :visible-once="{ opacity: 1, y: 0, transition: { duration: 600, ease: 'easeOut' } }"
      class="relative w-full opacity-0"
    >
      <Swiper
        :modules="[SwiperPagination, SwiperAutoplay]"
        :slides-per-view="'auto'"
        :space-between="16"
        :centered-slides="true"
        :initial-slide="1"
        :speed="600"
        :autoplay="{ delay: 5000, disableOnInteraction: false }"
        :pagination="{ el: '.classic-pagination', clickable: true }"
        :breakpoints="{ '640': { spaceBetween: 20 }, '1024': { spaceBetween: 24 }, '1400': { spaceBetween: 32 } }"
        @swiper="onSwiper"
        class="case-swiper w-full !overflow-visible"
      >
        <SwiperSlide v-for="item in cases" :key="item.id" class="h-auto !w-[84%] sm:!w-[80%] lg:!w-[65%] xl:!w-[45%]">
          <div class="bg-[#131416] rounded-[4px] overflow-hidden flex flex-col h-full border border-[#131416] group">
            
            <div 
              class="relative w-full aspect-[16/9] overflow-hidden bg-black/40 group/img"
              :class="{ 'cursor-pointer': item.has_video && item.videoUrl }"
              @click="handleMediaClick(item)"
            >
              <img :src="item.coverImage" :alt="displayTitle(item)" class="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-[1.02]" />
              
              <div v-if="item.has_video && item.videoUrl" class="absolute inset-0 bg-black/20 group-hover/img:bg-black/40 transition-colors flex items-center justify-center">
                <div class="w-10 h-10 md:w-16 md:h-16 rounded-full bg-black/50 backdrop-blur-sm border border-white/30 flex items-center justify-center transition-transform duration-300 group-hover/img:scale-110">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" class="w-6 h-6 md:w-8 md:h-8 text-white fill-current translate-x-0.5"><path d="M8 5v14l11-7z" /></svg>
                </div>
              </div>
            </div>

            <div class="px-4 py-6 md:px-8 md:py-12 flex flex-col md:flex-row md:justify-between items-center md:items-center relative flex-1 md:gap-4"
                :class="{ 'text-area-container': displaySubtitle(item) || displayDescription(item) }"
            >
              
              <div class="mb-2 md:mb-0 w-full md:w-auto">
                <img v-if="item.titleLogo" :src="item.titleLogo" :alt="displayTitle(item)"
                  class="h-[86px] w-auto object-contain m-auto" />
                <template v-else>
                  <h3
                    class="block md:hidden text-[28px] font-semibold leading-[1.2] text-white"
                  >
                    {{ formatMobileTitle(item) }}
                  </h3>

                  <h3
                    class="hidden md:block md:text-[56px]  font-semibold leading-[1.2] text-white"
                    :class="{ 'md:max-w-[320px]': displaySubtitle(item) || displayDescription(item) }"
                    v-html="formatPcTitle(item)"
                  />
                </template>
              </div>

              <div 
                v-if="displaySubtitle(item) || displayDescription(item)" 
                class="w-[100%] md:w-[60%] flex flex-col justify-start moving-content min-h-[78px]"
              >
                <h4 
                  v-if="displaySubtitle(item)" 
                  class="text-[18px] sm:text-[18px] md:text-[20px] lg:text-[24px] xl:text-[28px] font-semibold text-white leading-snug"
                  v-html="formatSubtitle(item)"
                />
                
                <p 
                  v-if="displayDescription(item)" 
                  class="case-desc text-[14px] sm:text-[18px] text-[#7D86A1] leading-[1.5]"
                >
                  {{ displayDescription(item) }}
                </p>
              </div>

            </div>

          </div>
        </SwiperSlide>
      </Swiper>

      <div class="classic-pagination flex items-center justify-center gap-[8px] md:gap-[12px] mt-[32px] md:mt-[64px]"></div>
    </div>

    <Teleport to="body">
      <Transition name="fade">
        <div v-if="isVideoModalOpen" class="fixed inset-0 z-[9999] flex items-center justify-center bg-[#00000099] backdrop-blur-md p-4 md:p-10" @click.self="closeVideoModal">
          <div class="relative w-full max-w-7xl bg-[#131416]">
            <button @click="closeVideoModal" class="absolute top-[-32px] right-[0] md:top-[0] md:right-[-64px] z-20 w-8 h-8 md:w-16 md:h-16 bg-[#0043FF] hover:bg-[#103C93] flex items-center justify-center transition-colors cursor-pointer">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" class="w-5 h-5 md:w-8 md:h-8"><path d="M32 1.65061L17.6506 16L32 30.3494L30.3494 32L16 17.6506L1.65061 32L0 30.3494L14.3494 16L0 1.65061L1.65061 0L16 14.3494L30.3494 0L32 1.65061Z" fill="white"/></svg>
            </button>
            <div class="relative w-full aspect-video bg-black flex items-center justify-center">
              <video :src="currentVideoUrl" controls autoplay class="w-full h-full object-contain"></video>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination as SwiperPagination, Autoplay as SwiperAutoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const props = defineProps({
  cases: { type: Array, default: () => [] },
  loading: { type: Boolean, default: false }
})

const swiperRef = ref(null)
const onSwiper = (swiper) => { swiperRef.value = swiper }

const { locale} = useI18n()
const isEn = computed(() => locale.value?.startsWith('en'))

const formatPcTitle = (item) => {
  const raw = displayTitle(item) || ''
  return String(raw).replace(/<br\s*\/?>/gi, '<br>')
}

const formatMobileTitle = (item) => {
  const raw = displayTitle(item) || ''
  return String(raw)
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}
const formatSubtitle = (item) => {
  const raw = displaySubtitle(item) || ''
  return String(raw)
    .replace(/(\r\n|\r|\n|<br\s*\/?>)/gi, '<br>')
    .trim()
}


const displayTitle = (item) => isEn.value ? (item.title_en || item.title) : item.title
const displaySubtitle = (item) => isEn.value ? (item.subtitle_en || item.subtitle) : item.subtitle
const displayDescription = (item) => isEn.value ? (item.description_en || item.description) : item.description


const isVideoModalOpen = ref(false)
const currentVideoUrl = ref('')

const handleMediaClick = (item) => {
  if (item.has_video && item.videoUrl) {
    currentVideoUrl.value = item.videoUrl
    isVideoModalOpen.value = true
  }
}

const closeVideoModal = () => {
  isVideoModalOpen.value = false
  currentVideoUrl.value = ''
}
</script>

<style scoped>
:deep(.swiper-slide) { height: auto; flex-shrink: 0; box-sizing: border-box; }
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
:deep(.classic-pagination .swiper-pagination-bullet) { width: 12px; height: 12px; background-color: #454C5F; border-radius: 2px; opacity: 1; transition: all 0.3s ease; cursor: pointer; margin: 0 !important; }
:deep(.classic-pagination .swiper-pagination-bullet-active) { background-color: #0043FF; }

.text-area-container {
  min-height: 295px;
}

.moving-content {
  transform: translateY(16px);
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.case-desc {
  opacity: 0;
  max-height: 0;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

@media (min-width: 1024px) {
  .group:hover .moving-content {
    transform: translateY(0);
  }
  .group:hover .case-desc {
    opacity: 1;
    max-height: 200px;
    margin-top: 0.75rem;
  }
}

@media (max-width: 1023px) {
  :deep(.swiper-slide-active) .moving-content {
    transform: translateY(0);
  }
  :deep(.swiper-slide-active) .case-desc {
    opacity: 1;
    max-height: 200px;
    margin-top: 0.75rem;
  }
}
@media (max-width: 768px) { 
  :deep(.classic-pagination .swiper-pagination-bullet) { width: 6px; height: 6px; border-radius: 1px; }
  .text-area-container {
    min-height: 240px;
  }
}
</style>