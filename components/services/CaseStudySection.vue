<template>
  <section class="relative w-full bg-black text-white pb-[56px] md:pb-[120px] overflow-hidden select-none">
    <div class="flex items-start gap-3 xl:gap-6 shrink-0 mb-8 md:mb-[64px] justify-center">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="text-[#0043FF]">
        <path d="M9.84772 14.3575L0.101523 20V15.8466L9.84772 10.2041V14.3575Z" fill="currentColor"/>
        <path d="M9.74619 4.32637L0 10.2041V5.87771L9.74619 0V4.32637Z" fill="currentColor"/>
        <path d="M20 4.32637L9.84772 10.2041V5.87771L20 0V4.32637Z" fill="currentColor"/>
      </svg>
      <h2 class="text-[40px] sm:text-[48px] md:text-[54px] lg:text-[72px] xl:text-[96px] font-semibold leading-[1.2]">
        {{ $t('classicCases.title') }}
      </h2>
    </div>

    <div class="relative w-full">
      <Swiper
        :modules="[SwiperNavigation]"
        :slides-per-view="'auto'"
        :space-between="16"
        :centered-slides="true"
        :initial-slide="1"
        :loop="false"
        :breakpoints="{
          '640': { spaceBetween: 20 },
          '1024': { spaceBetween: 24 },
          '1400': { spaceBetween: 32 }
        }"
        @swiper="onSwiper"
        class="case-swiper w-full !overflow-visible"
      >
        <SwiperSlide 
          v-for="item in caseList" 
          :key="item.id" 
          class="h-auto !w-[84%] sm:!w-[80%] lg:!w-[75%] xl:!w-[65%]"
        >
          <div class="bg-[#131416] rounded-[4px] overflow-hidden flex flex-col h-full border border-[#131416] transition-colors">
            
            <div 
              class="relative w-full aspect-[16/9] overflow-hidden bg-black/40 group"
              :class="{ 'cursor-pointer': item.type === 'video' }"
              @click="handleMediaClick(item)"
            >
              <img 
                :src="item.coverImage" 
                :alt="$t(`classicCases.items.${item.key}.title`)" 
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
              
              <div 
                v-if="item.type === 'video'" 
                class="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center"
              >
                <div class="w-10 h-10 md:w-16 md:h-16 rounded-full bg-black/50 backdrop-blur-sm border border-white/30 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" class="w-6 h-6 md:w-8 md:h-8 text-white fill-current translate-x-0.5">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>

            <div class="px-4 py-6 md:px-8 md:py-12 flex flex-col md:flex-row md:justify-between">
              <div class="mb-2 md:mb-4">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" class="text-[#7D86A1] mb-8 w-2 h-2 md:w-5 md:h-5">
                  <path d="M9.84772 14.3575L0.101523 20V15.8466L9.84772 10.2041V14.3575Z" fill="currentColor"/>
                  <path d="M9.74619 4.32637L0 10.2041V5.87771L9.74619 0V4.32637Z" fill="currentColor"/>
                  <path d="M20 4.32637L9.84772 10.2041V5.87771L20 0V4.32637Z" fill="currentColor"/>
                </svg>
                <h3 class="text-[28px] sm:text-[38px] md:text-[42px] lg:text-[48px] xl:text-[56px] font-semibold leading-[1.2] text-white">
                {{ $t(`classicCases.items.${item.key}.title`) }}
              </h3>
              </div>
              <div class="w-[100%] mb-4 md:w-[70%] md:mb-0">
                <h4 class="text-[18px] sm:text-[20px] md:text-[24px] lg:text-[28px] xl:text-[32px] font-semibold text-white mb-4 leading-snug">
                  {{ $t(`classicCases.items.${item.key}.subtitle`) }}
                </h4>
                <p class="text-[16px] sm:text-[20px] text-[#7D86A1] leading-[1.5] mt-auto">
                  {{ $t(`classicCases.items.${item.key}.description`) }}
                </p>
              </div>
            </div>

          </div>
        </SwiperSlide>
      </Swiper>

      <div class="flex items-center justify-center space-x-4 mt-8 md:mt-16">
        <button 
          @click="slidePrev" 
          class="flex items-center justify-center rounded-xs group transition cursor-pointer focus:outline-none"
          aria-label="Previous"
        >
          <svg width="56" height="56" viewBox="0 0 64 64" fill="none" class="w-10 h-10 md:w-16 md:h-16">
            <rect 
              width="64" 
              height="64" 
              rx="4" 
              class="fill-[#131416] group-hover:fill-[#103C93] transition-colors duration-200"
            />
            <path 
              d="M20.2679 30.7622H48L47.9646 33.2021H20.2351L27.0324 40H23.9912L16 32.0174L24.0265 24H26.997L20.2679 30.7622Z" 
              fill="#7D86A1"
              class="group-hover:fill-white transition-colors duration-200"
            />
          </svg>
        </button>
        
        <button 
          @click="slideNext" 
          class="flex items-center justify-center rounded-xs group transition cursor-pointer focus:outline-none"
          aria-label="Next"
        >
          <svg width="56" height="56" viewBox="0 0 64 64" fill="none" class="w-10 h-10 md:w-16 md:h-16">
            <rect 
              width="64" 
              height="64" 
              rx="4" 
              class="fill-[#0043FF] group-hover:fill-[#103C93] transition-colors duration-200"
            />
            <path 
              d="M44.7321 30.7622H17L17.0354 33.2021H44.7649L37.9676 40H41.0088L49 32.0174L40.9735 24H38.003L44.7321 30.7622Z" 
              fill="white"
            />
          </svg>
        </button>
      </div>
    </div>

    <Teleport to="body">
      <Transition name="fade">
        <div 
          v-if="isVideoModalOpen" 
          class="fixed inset-0 z-[9999] flex items-center justify-center bg-[#00000099] backdrop-blur-md p-4 md:p-10"
          @click.self="closeVideoModal"
        >
          <div class="relative w-full max-w-7xl bg-[#131416]">
            <button 
              @click="closeVideoModal"
              class="absolute top-[-32px] right-[0]  md:top-[0] md:right-[-64px] z-20 w-8 h-8 md:w-16 md:h-16 bg-[#0043FF] hover:bg-[#103C93] flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close"
            >
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 md:w-8 md:h-8">
                <path d="M32 1.65061L17.6506 16L32 30.3494L30.3494 32L16 17.6506L1.65061 32L0 30.3494L14.3494 16L0 1.65061L1.65061 0L16 14.3494L30.3494 0L32 1.65061Z" fill="white"/>
              </svg>
            </button>

            <div class="relative w-full aspect-video bg-black flex items-center justify-center">
              <video 
                ref="videoRef"
                :src="currentVideoUrl" 
                controls 
                autoplay
                class="w-full h-full object-contain"
              ></video>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

  </section>
</template>

<script setup>
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation as SwiperNavigation } from 'swiper/modules'

import 'swiper/css'

import case01 from '@/assets/image/case-01.png'
import case02 from '@/assets/image/case-02.png'
import case03 from '@/assets/image/case-03.png'
import testVideo from '@/assets/image/home-bg-pc.mp4'

const swiperRef = ref(null)
const isVideoModalOpen = ref(false)
const currentVideoUrl = ref('')
const videoRef = ref(null)

const getScrollbarWidth = () => {
  return window.innerWidth - document.documentElement.clientWidth
}

watch(isVideoModalOpen, (isOpen) => {
  if (typeof document === 'undefined') return

  const body = document.body

  if (isOpen) {
    const scrollbarWidth = getScrollbarWidth()
    
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`
    }

    body.style.overflow = 'hidden'
    body.style.touchAction = 'none'
  } else {
    body.style.overflow = ''
    body.style.touchAction = ''
    body.style.paddingRight = ''
  }
})

onUnmounted(() => {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = ''
    document.body.style.touchAction = ''
    document.body.style.paddingRight = ''
  }
})

const onSwiper = (swiper) => {
  swiperRef.value = swiper
}

const slidePrev = () => {
  swiperRef.value?.slidePrev()
}

const slideNext = () => {
  swiperRef.value?.slideNext()
}

const handleMediaClick = (item) => {
  if (item.type === 'video') {
    currentVideoUrl.value = item.videoUrl || testVideo
    isVideoModalOpen.value = true
  }
}

const closeVideoModal = () => {
  isVideoModalOpen.value = false
  currentVideoUrl.value = ''
}

const caseList = [
  {
    id: 1,
    key: 'editor',
    type: 'video',
    coverImage: case01,
    videoUrl: testVideo
  },
  {
    id: 2,
    key: 'imageGen',
    type: 'video',
    coverImage: case02,
    videoUrl: testVideo
  },
  {
    id: 3,
    key: 'companion',
    type: 'image',
    coverImage: case03,
    videoUrl: ''
  }
]
</script>

<style scoped>
:deep(.swiper-slide) {
  height: auto;
  flex-shrink: 0;
  box-sizing: border-box;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>