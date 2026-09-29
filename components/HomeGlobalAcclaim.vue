<template>
  <section ref="sectionRef" class="relative w-full bg-black text-white min-h-[100vh]">
    <div class="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-[15px] md:px-[40px] xl:px-[120px] pt-[28px] pb-[56px] md:pt-[60px] md:pb-[120px]">
      <div 
        class="flex flex-col items-center transition-transform duration-700 ease-out z-20 gap-3 xl:gap-6"
        :class="[
          isScrolled 
            ? '-translate-y-6 md:-translate-y-12' 
            : 'translate-y-[120px] md:translate-y-[180px]'
        ]"
      >
        <svg class="w-[25px] h-[20px] xl:w-[49px] xl:h-[40px]"  width="49" height="40" viewBox="0 0 49 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M35.3466 15.7127L49 5.97319V35.6087L42.884 40L42.8811 39.9963L42.8762 40L42.876 39.9902L32.4039 26.9848L24.5869 34.5114L16.7175 26.9861L6.17228 39.9842V40L6.16414 39.9941L6.15957 40L0 35.6087L0.00762511 35.5976V5.97319L13.7342 15.6989L24.5639 0L35.3466 15.7127ZM38.8335 20.794L42.8391 26.6309L42.8123 16.9632L38.8335 20.794ZM6.20938 26.6071L10.2285 20.7809L6.23616 16.9632L6.20938 26.6071ZM21.4433 21.1609L24.5869 23.3883L27.7124 21.1586L24.5907 17.2818L21.4433 21.1609Z" fill="#0043FF"/>
        </svg>

        <h2 class="text-[40px] sm:text-[48px] md:text-[56px] lg:text-[64px] xl:text-[96px] font-semibold text-center leading-[1.2]">
          {{ $t('homeGlobalAcclaim.title') }}
        </h2>
      </div>

      <div class="w-full mt-8 md:mt-[24px] z-10">
        <div class="hidden md:grid grid-cols-3 gap-6">
          <div 
            v-for="(item, index) in listData" 
            :key="index"
            class="p-8 border-l border-l-[#454C5F] flex flex-col justify-between h-[360px] xl:h-[460px] transition-all duration-700 ease-out hover:bg-[#131416]"
            :class="[
              isScrolled 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-20 pointer-events-none'
            ]"
            :style="{ transitionDelay: isScrolled ? `${index * 150 + 200}ms` : '0ms' }"
          >
            <div class="flex justify-between items-center text-[20px] font-semibold text-[#454C5F]">
              <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.7563 22.9719L0.162437 32V25.3546L15.7563 16.3265V22.9719Z" fill="#0043FF"/>
                <path d="M15.5939 6.92219L0 16.3265V9.40434L15.5939 0V6.92219Z" fill="#0043FF"/>
                <path d="M32 6.92219L15.7563 16.3265V9.40434L32 0V6.92219Z" fill="#0043FF"/>
              </svg>
              <span>0{{ index + 1 }}</span>
            </div>

            <div class="flex flex-col items-start gap-4 xl:gap-6">
              <div class="flex items-center gap-2">
                <img src="../assets/image/title-icon.svg" alt="Title Logo" class="h-10 xl:h-16 w-auto" />
                <span class="text-[40px] xl:text-[56px] font-bold tracking-tight text-white leading-none">
                  {{ item.year }}
                </span>
                <img src="../assets/image/title-icon.svg" alt="Title Logo" class="h-10 xl:h-16 w-auto scale-x-[-1]" />
              </div>
              <p 
                :class="[
                  'font-semibold text-[#0043FF] leading-[1.3] text-left',
                  isEn ? 'text-[14px] xl:text-[18px]' : 'text-[20px] xl:text-[28px]'
                ]"
              >
                {{ item.title }}
              </p>
            </div>
          </div>
        </div>

        <div 
          class="block md:hidden transition-all duration-1000 ease-out"
          :class="[
            isScrolled 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-16 pointer-events-none'
          ]"
        >
          <Swiper
            :modules="[SwiperPagination]"
            :slides-per-view="1.1"
            :space-between="16"
            :pagination="{ clickable: true, el: '.custom-swiper-pagination' }"
            class="w-full !overflow-visible"
          >
            <SwiperSlide v-for="(item, index) in listData" :key="index">
              <div class="border-l border-l-[#454C5F] flex flex-col justify-between h-[360px] px-[20px] py-[24px]">
                <div class="flex justify-between items-center text-base font-semibold text-[#454C5F]">
                  <svg width="8" height="8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.7563 22.9719L0.162437 32V25.3546L15.7563 16.3265V22.9719Z" fill="#0043FF"/>
                    <path d="M15.5939 6.92219L0 16.3265V9.40434L15.5939 0V6.92219Z" fill="#0043FF"/>
                    <path d="M32 6.92219L15.7563 16.3265V9.40434L32 0V6.92219Z" fill="#0043FF"/>
                  </svg>
                  <span>0{{ index + 1 }}</span>
                </div>

                <div class="flex flex-col items-start gap-3">
                  <div class="flex items-center gap-1.5">
                    <img src="../assets/image/title-icon.svg" alt="Title Logo" class="h-10 w-auto" />
                    <span class="text-[32px] font-semibold text-white leading-[1.2]">
                      {{ item.year }}
                    </span>
                    <img src="../assets/image/title-icon.svg" alt="Title Logo" class="h-10 w-auto scale-x-[-1]" />
                  </div>

                  <p 
                    :class="[
                      'font-semibold text-[#0043FF] leading-[1.2] text-left',
                      isEn ? 'text-[13px]' : 'text-[24px]'
                    ]"
                  >
                    {{ item.title }}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>

          <div class="custom-swiper-pagination flex justify-center gap-2 mt-8"></div>
        </div>

      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination as SwiperPagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'

const { t, tm, locale } = useI18n()
const isEn = computed(() => locale.value?.startsWith('en'))

const listData = computed(() => {
  const rawList = tm('homeGlobalAcclaim.list')
  const length = Array.isArray(rawList) ? rawList.length : 0

  return Array.from({ length }, (_, index) => ({
    year: t(`homeGlobalAcclaim.list.${index}.year`),
    title: t(`homeGlobalAcclaim.list.${index}.title`)
  }))
})

const sectionRef = ref(null)
const isScrolled = ref(false)

const handleScroll = () => {
  if (!sectionRef.value) return
  const rect = sectionRef.value.getBoundingClientRect()

  if (rect.top <= window.innerHeight * 0.1) {
    isScrolled.value = true
  } else {
    isScrolled.value = false
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
:deep(.custom-swiper-pagination .swiper-pagination-bullet) {
  width: 8px;
  height: 8px;
  background-color: #454C5F;
  opacity: 1;
  transition: all 0.3s ease;
  margin: 0 4px;
  border-radius: 0;
}

:deep(.custom-swiper-pagination .swiper-pagination-bullet-active) {
  background-color: #0043FF;
}
</style>