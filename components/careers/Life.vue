<template>
    <div class="pt-[56px] md:pt-[120px] pb-[0] md:pb-[0] text-[#131416]">
        <div 
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible-once="{ opacity: 1, y: 0, transition: { duration: 700, ease: 'easeOut' } }"
            class="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-8 pt-[0] md:pt-[120px] mb-[32px] opacity-0"
        >
            <div class="flex items-start gap-3 xl:gap-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" class="shrink-0 mt-2">
                    <path d="M11.9391 17.2289L0.121826 24V19.0159L11.9391 12.2449V17.2289Z" fill="#0043FF" />
                    <path d="M11.6954 5.19165L0 12.2449V7.05325L11.6954 0V5.19165Z" fill="#0043FF" />
                    <path d="M24 5.19165L11.8173 12.2449V7.05325L24 0V5.19165Z" fill="#0043FF" />
                </svg>
                <h2 class="text-[40px] sm:text-[48px] md:text-[54px] lg:text-[72px] xl:text-[84px] 2xl:text-[96px] font-semibold leading-[1.2]">
                    {{ $t('careers.worklife.title') }}
                </h2>
            </div>
            <p class="text-[16px] md:text-[20px] xl:text-[25px] font-[400] md:font-semibold leading-[1.5] text-[#454C5F] xl:max-w-[640px]">
                {{ $t('careers.worklife.desc') }}
            </p>
        </div>

        <div v-if="loading" class="hidden md:block relative overflow-hidden pt-[32px] md:pt-[64px]">
            <div class="w-full flex gap-6 px-[10%]">
                <div class="w-full aspect-[16/10] bg-[#E5E7EB] rounded-[8px] animate-pulse relative overflow-hidden">
                    <div class="absolute top-6 left-6 w-24 h-16 bg-[#D1D5DB] rounded animate-pulse"></div>
                    <div class="absolute left-0 bottom-16 w-[560px] h-32 bg-[#D1D5DB]/80 animate-pulse"></div>
                </div>
            </div>
            <div class="flex justify-center gap-3 mt-[64px]">
                <div v-for="i in 3" :key="i" class="w-3 h-3 bg-[#E5E7EB] rounded-[2px]"></div>
            </div>
        </div>

        <div 
            v-else
            v-motion
            :initial="{ opacity: 0, y: 40 }"
            :visible-once="{ opacity: 1, y: 0, transition: { duration: 800, delay: 200, ease: 'easeOut' } }"
            class="hidden md:block relative overflow-hidden pt-[32px] md:pt-[64px] opacity-0"
        >
            <Swiper
                :modules="[SwiperNavigation, SwiperPagination, SwiperAutoplay]"
                :slides-per-view="1.4"
                :centered-slides="true"
                :space-between="24"
                :loop="true"
                :speed="600"
                :autoplay="{
                    delay: 5000,
                    disableOnInteraction: false
                }"
                :observer="true"
                :observe-parents="true"
                :watch-slides-progress="true"
                :pagination="{
                    el: '#worklife-swiper-pagination',
                    clickable: true,
                    type: 'custom',
                    renderCustom: renderPagination
                }"
                :navigation="{
                    prevEl: '#worklife-swiper-prev',
                    nextEl: '#worklife-swiper-next'
                }"
                :breakpoints="{
                    768: { slidesPerView: 1.2, spaceBetween: 24 },
                    1024: { slidesPerView: 1.3, spaceBetween: 24 },
                    1280: { slidesPerView: 1.4, spaceBetween: 24 }
                }"
                class="worklife-swiper w-full"
            >
                <SwiperSlide v-for="(item, index) in loopSlides" :key="index">
                    <div class="slide-card relative rounded-[8px] overflow-hidden aspect-[16/10]">
                        <img :src="item.image" :alt="item.title" class="w-full h-full object-cover select-none" draggable="false" />
                        
                        <div class="absolute top-6 left-6 text-[40px] sm:text-[48px] md:text-[54px] lg:text-[72px] xl:text-[84px] 2xl:text-[96px] font-[300] leading-[1.2] text-[#0043FF] select-none z-10">
                            {{ item.number }}
                        </div>

                        <div class="absolute left-0 max-w-[560px] bg-[#0043FF] xl:px-12 xl:py-8 xl:bottom-16 lg:px-10 lg:py-6 lg:bottom-14 md:px-8 md:py-4 md:bottom-12 text-white flex flex-col justify-center z-10">
                            <h3 class="text-[24px] sm:text-[32px] md:text-[32px] lg:text-[48px] font-semibold leading-[1.2] mb-2">{{ item.title }}</h3>
                            <p class="text-[16px] md:text-[16px] lg:text-[24px] text-[#F2F4F7] leading-[1.5] letter-spacing-[-1%]">{{ item.subtitle }}</p>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>

            <button id="worklife-swiper-next"
                class="hidden md:flex px-[10px] py-[10px] absolute md:right-[6.5%] lg:right-[10%] xl:right-[12.8%] top-1/2 -translate-y-1/2 z-20 lg:w-[64px] lg:h-[64px] md:w-[48px] md:h-[48px] rounded-lg bg-[#0043FF] text-white items-center justify-center hover:bg-[#103C93] transition shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="16" viewBox="0 0 32 16" fill="none">
                    <path d="M27.7321 6.76219H0L0.0353947 9.20206H27.7649L20.9676 16H24.0088L32 8.01745L23.9735 0H21.003L27.7321 6.76219Z" fill="white" />
                </svg>
            </button>
        </div>

        <div id="worklife-swiper-pagination" class="hidden md:flex !relative justify-center gap-3 lg:mt-[64px] mt-[56px]"></div>

        <div v-if="loading" class="md:hidden w-full relative pt-2">
            <div class="rounded-[4px] overflow-hidden bg-[#F2F4F7]">
                <div class="aspect-[4/3] bg-[#E5E7EB] animate-pulse"></div>
                <div class="p-4 bg-[#F2F4F7] flex items-center gap-6">
                    <div class="w-12 h-12 bg-[#D1D5DB] rounded animate-pulse"></div>
                    <div class="flex-1 space-y-2">
                        <div class="h-6 bg-[#D1D5DB] rounded w-3/4 animate-pulse"></div>
                        <div class="h-4 bg-[#D1D5DB] rounded w-full animate-pulse"></div>
                    </div>
                </div>
            </div>
            <div class="flex justify-center gap-2 mt-[32px]">
                <div v-for="i in 3" :key="i" class="w-2 h-2 bg-[#E5E7EB] rounded-full"></div>
            </div>
        </div>

        <div 
            v-else
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible-once="{ opacity: 1, y: 0, transition: { duration: 700, delay: 200, ease: 'easeOut' } }"
            class="md:hidden w-full relative pt-2 opacity-0"
        >
            <Swiper
                :modules="[SwiperNavigation, SwiperPagination, SwiperAutoplay]"
                :slides-per-view="1"
                :space-between="16"
                :loop="false"
                :speed="600"
                :autoplay="{
                    delay: 5000,
                    disableOnInteraction: false
                }"
                :watch-slides-progress="true"
                :pagination="{
                    el: '#worklife-m-swiper-pagination',
                    clickable: true,
                    type: 'custom',
                    renderCustom: renderPagination
                }"
                :navigation="{
                    nextEl: '#worklife-m-swiper-next'
                }"
                class="w-full"
            >
                <SwiperSlide v-for="(item, index) in slides" :key="index">
                    <div class="rounded-[4px] overflow-hidden bg-[#F2F4F7]">
                        <div class="aspect-[4/3] overflow-hidden">
                            <img :src="item.image" :alt="item.title" class="w-full h-full object-cover" loading="lazy" />
                        </div>
                        <div class="p-4 bg-[#F2F4F7] flex items-center gap-6">
                            <span class="text-[40px] font-[300] text-[#0043FF]">{{ item.number }}</span>
                            <div>
                                <h3 class="text-[24px] font-semibold text-[#131416] mb-3">{{ item.title }}</h3>
                                <p class="text-[16px] text-[#454C5F]">{{ item.subtitle }}</p>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>

            <button id="worklife-m-swiper-next"
                class="absolute right-[0] top-[35%] -translate-y-1/2 z-20 w-[44px] h-[44px] rounded-lg bg-[#0043FF] text-white flex items-center justify-center shadow-lg active:scale-95 transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="12" viewBox="0 0 32 16" fill="none">
                    <path d="M27.7321 6.76219H0L0.0353947 9.20206H27.7649L20.9676 16H24.0088L32 8.01745L23.9735 0H21.003L27.7321 6.76219Z" fill="white" />
                </svg>
            </button>

            <div id="worklife-m-swiper-pagination" class="flex justify-center gap-2 mt-[32px]"></div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation as SwiperNavigation, Pagination as SwiperPagination, Autoplay as SwiperAutoplay } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const { t, locale } = useI18n()
const { $pb } = useNuxtApp()

const loading = ref(true)
const rawData = ref([])

const fetchCareerLifeData = async () => {
    try {
        loading.value = true
        const records = await $pb.collection('career_life').getList(1, 50, {
            requestKey: null
        })
        rawData.value = records.items || []
    } catch (e) {
        console.error('获取 career_life 失败:', e)
        rawData.value = []
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    fetchCareerLifeData()
})

const slides = computed(() => {
    const isEn = locale.value === 'en'
    if (!rawData.value || rawData.value.length === 0) {
        return []
    }
    return rawData.value.map((item, index) => ({
        number: String(index + 1).padStart(2, '0'),
        title: isEn ? (item.title_en || item.title) : item.title,
        subtitle: isEn ? (item.description_en || item.description) : item.description,
        image: item.image ? $pb.files.getUrl(item, item.image) : ''
    }))
})

const loopSlides = computed(() => slides.value.length > 0 ? [...slides.value, ...slides.value] : [])

function renderPagination(swiper) {
    const real = slides.value.length
    if (real === 0) return ''
    const active = swiper.realIndex % real
    let html = ''
    for (let i = 0; i < real; i++) {
        html += `<span class="swiper-pagination-bullet${i === active ? ' swiper-pagination-bullet-active' : ''}"></span>`
    }
    return html
}
</script>

<style scoped>
.worklife-swiper {
    overflow: visible;
}

:deep(.worklife-swiper .swiper-slide) {
    transition: transform 0.4s ease, opacity 0.4s ease;
    transform: scale(0.95);
}

:deep(.worklife-swiper .swiper-slide-active) {
    transform: scale(1.05);
}

:deep(.swiper-pagination-bullet) {
    width: 12px;
    height: 12px;
    background: #D9DDE8;
    border-radius: 2px;
    transition: all 0.3s;
    opacity: 1;
}

:deep(.swiper-pagination-bullet-active) {
    background: #0043FF;
}

@media screen and (max-width: 768px) {
    :deep(.swiper-pagination-bullet) {
        width: 6px;
        height: 6px; 
        transition: all 0.3s;
        opacity: 1;
    }
}
</style>