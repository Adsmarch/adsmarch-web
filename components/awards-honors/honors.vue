<template>
    <div class="pt-[56px] md:pt-[120px] pb-[28px] md:pb-[0px]">
        <div 
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible-once="{ opacity: 1, y: 0, transition: { duration: 700, ease: 'easeOut' } }"
            class="flex items-start md:gap-[24px] gap-[12px] mb-[32px] md:mb-[64px]"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" md:width="32" md:height="32"
                viewBox="0 0 24 24" fill="none" class="w-[24px] h-[24px] md:w-[32px] md:h-[32px] shrink-0">
                <path d="M11.9391 17.2289L0.121826 24V19.0159L11.9391 12.2449V17.2289Z" fill="#0043FF" />
                <path d="M11.6954 5.19165L0 12.2449V7.05325L11.6954 0V5.19165Z" fill="#0043FF" />
                <path d="M24 5.19165L11.8173 12.2449V7.05325L24 0V5.19165Z" fill="#0043FF" />
            </svg>
            <h2 class="text-[40px] sm:text-[48px] md:text-[54px] lg:text-[72px] xl:text-[96px] font-semibold leading-[1.2]">
                {{ $t('awards.honors.title') }}
            </h2>
        </div>

        <div 
            v-motion
            :initial="{ opacity: 0, y: 40 }"
            :visible-once="{ opacity: 1, y: 0, transition: { duration: 800, delay: 150, ease: 'easeOut' } }"
            class="hidden md:flex flex-col xl:flex-row xl:items-start gap-[24px] lg:gap-[80px]"
        >
 
            <div class="w-[42%] lg:w-[45%] shrink-0 rounded-[4px] md:rounded-[8px] overflow-hidden">
                <img :src="honorImage" :alt="$t('awards.honors.title')" class="w-full object-cover" loading="lazy" />
            </div>

            <div class="flex-1 grid grid-cols-2 md:gap-[24px] border-[#26282C]">
                <div v-for="(item, index) in awards" :key="index"
                    class="year-card group md:h-[250px] border-t border-[#454C5F] px-[20px] py-[24px] flex flex-col justify-between transition-colors duration-300 hover:items-start hover:justify-center hover:bg-[#0043FF] hover:border-[#0043FF]">
                    <div class="flex items-start justify-between group-hover:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                            class="w-[16px] h-[16px] shrink-0 text-white transition-colors duration-300">
                            <path d="M11.9391 17.2289L0.121826 24V19.0159L11.9391 12.2449V17.2289Z" fill="currentColor" />
                            <path d="M11.6954 5.19165L0 12.2449V7.05325L11.6954 0V5.19165Z" fill="currentColor" />
                            <path d="M24 5.19165L11.8173 12.2449V7.05325L24 0V5.19165Z" fill="currentColor" />
                        </svg>
                        <span
                            class="md:text-[16px] leading-none text-[#454C5F] group-hover:text-white/70 transition-colors duration-300">
                            {{ String(index + 1).padStart(2, '0') }}
                        </span>
                    </div>
                   
                    <div class="flex flex-col md:group-hover:gap-[20px] gap-[8px]">
                        <LaurelYear :year="item.year" pc />
                        <p
                            class="md:group-hover:text-[24px] text-[16px] md:text-[20px] leading-[1.6] text-white/85 group-hover:text-white transition-colors duration-300">
                            {{ item.name }}
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <div 
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible-once="{ opacity: 1, y: 0, transition: { duration: 700, delay: 150, ease: 'easeOut' } }"
            class="md:hidden"
        >
            <div class="rounded-[8px] overflow-hidden mb-[32px]">
                <img :src="honorImage" :alt="$t('awards.honors.title')" class="w-full object-cover" loading="lazy" />
            </div>
            
            <Swiper 
                :modules="[SwiperPagination,SwiperAutoplay]" 
                :slides-per-view="1.2" 
                :space-between="12" 
                :loop="false" 
                :speed="600"
                :autoplay="{
                    delay: 5000,
                    disableOnInteraction: false
                }"
                :pagination="{ el: '.honors-m-pagination', clickable: true }" 
                @slide-change="onSlideChange" 
                class="w-full"
            >
                <SwiperSlide v-for="(item, index) in awards" :key="index">
                    <div class="border-t py-[20px] px-[16px] h-[200px] flex flex-col gap-[10px] transition-colors duration-300"
                        :class="index === activeIndex ? 'bg-[#0043FF] border-[#0043FF] items-start justify-center' : 'border-[#454C5F] justify-between'">
                        <div :class="index === activeIndex ? 'hidden' : 'flex items-start justify-between'">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                                fill="none" class="w-[16px] h-[16px] shrink-0 text-[#0043FF]">
                                <path d="M11.9391 17.2289L0.121826 24V19.0159L11.9391 12.2449V17.2289Z" fill="currentColor" />
                                <path d="M11.6954 5.19165L0 12.2449V7.05325L11.6954 0V5.19165Z" fill="currentColor" />
                                <path d="M24 5.19165L11.8173 12.2449V7.05325L24 0V5.19165Z" fill="currentColor" />
                            </svg>
                            <span class="text-[12px] leading-none text-[#7D86A1]">
                                {{ String(index + 1).padStart(2, '0') }}
                            </span>
                        </div>
                        <div>
                            <LaurelYear :year="item.year" :active="index === activeIndex" />
                            <p class="text-[16px] leading-[1.6] mt-[8px]"
                                :class="index === activeIndex ? 'text-white text-[20px]': 'text-white/85'">
                                {{ item.name }}
                            </p>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>

            <div class="honors-m-pagination flex items-center justify-center gap-[8px] mt-[32px]"></div>
        </div>

    </div>
</template>

<script setup>
import { computed } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination as SwiperPagination, Autoplay as SwiperAutoplay } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'

import LaurelYear from './laurel-year.vue'

import awardImg from '@/assets/image/award-img.png'

const honorImage = awardImg

const activeIndex = ref(0)
function onSlideChange(swiper) {
    activeIndex.value = swiper.activeIndex
}

const { t, tm } = useI18n()

const awards = computed(() => {
    const raw = tm('awards.honors.awards')
    const len = Array.isArray(raw) ? raw.length : 0
    return Array.from({ length: len }, (_, i) => ({
        year: t(`awards.honors.awards.${i}.year`),
        name: t(`awards.honors.awards.${i}.name`)
    }))
})
</script>

<style  scoped>

:deep(.honors-m-pagination .swiper-pagination-bullet) {
    width: 6px;
    height: 6px;
    background-color: #454C5F;
    border-radius: 2px;
    opacity: 1;
    transition: all 0.3s ease;
    cursor: pointer;
    margin: 0 !important;
}

:deep(.honors-m-pagination .swiper-pagination-bullet-active) {
    background-color: #0043FF;
}
</style>
