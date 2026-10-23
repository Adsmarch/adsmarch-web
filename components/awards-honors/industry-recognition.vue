<template>
    <div class="pt-[28px] md:pt-[120px]">
        <div 
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible-once="{ opacity: 1, y: 0, transition: { duration: 700, ease: 'easeOut' } }"
            class="flex items-center justify-between mb-[32px] md:mb-[48px] xl:mb-[64px]"
        >
            <div class="flex items-start md:gap-[24px] gap-[12px]">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" class="w-[24px] h-[24px] md:w-[32px] md:h-[32px] shrink-0">
                    <path d="M15.7563 22.9719L0.162437 32V25.3546L15.7563 16.3265V22.9719Z" fill="#0043FF"/>
                    <path d="M15.5939 6.92219L0 16.3265V9.40434L15.5939 0V6.92219Z" fill="#0043FF"/>
                    <path d="M32 6.92219L15.7563 16.3265V9.40434L32 0V6.92219Z" fill="#0043FF"/>
                </svg>

                <h2 class="text-[40px] sm:text-[48px] md:text-[54px] lg:text-[72px] xl:text-[96px] font-semibold leading-[1.2]">
                    {{ $t('awards.industry.title') }}
                </h2>
            </div>

            <div class="flex items-center gap-[8px] md:gap-[12px]">
                <button type="button" :aria-label="$t('awards.industry.prev')" @click="slidePrev"
                    class="w-[40px] h-[40px] md:w-[64px] md:h-[64px] rounded-[4px] bg-[#26282C] flex items-center justify-center text-[#7D86A1] hover:bg-[#33363B] transition-colors duration-300 group">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none">
                        <rect width="64" height="64" rx="4" class="fill-[#131416] group-hover:fill-[#103C93] transition-colors duration-200"/>
                        <path
                            d="M20.2679 30.7622H48L47.9646 33.2021H20.2351L27.0324 40H23.9912L16 32.0174L24.0265 24H26.997L20.2679 30.7622Z"
                            fill="#7D86A1" />
                    </svg>
                </button>
                <button type="button" :aria-label="$t('awards.industry.next')" @click="slideNext"
                    class="w-[40px] h-[40px] md:w-[64px] md:h-[64px] rounded-[4px] bg-[#0043FF] flex items-center justify-center text-white hover:bg-[#103C93] transition-colors duration-300 group">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none">
                        <rect width="64" height="64" rx="4" class="fill-[#0043FF] group-hover:fill-[#103C93] transition-colors duration-200"/>
                        <path
                            d="M44.7321 30.7622H17L17.0354 33.2021H44.7649L37.9676 40H41.0088L49 32.0174L40.9735 24H38.003L44.7321 30.7622Z"
                            fill="white" />
                    </svg>
                </button>
            </div>
        </div>

        <div v-if="isLoading" class="w-full">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
                <div v-for="i in 2" :key="i" class="rounded-[4px] bg-[#1A1B1E] p-[20px] md:p-[32px] animate-pulse">
                    <div class="w-full aspect-[16/9] bg-[#26282C] rounded-[4px] mb-[20px]"></div>
                    <div class="w-8 h-4 bg-[#26282C] rounded mb-[24px]"></div>
                    <div class="w-3/4 h-8 bg-[#26282C] rounded"></div>
                </div>
            </div>
        </div>

        <div 
            v-else
            v-motion
            :initial="{ opacity: 0, y: 40 }"
            :visible-once="{ opacity: 1, y: 0, transition: { duration: 800, delay: 200, ease: 'easeOut' } }"
            class="w-full"
        >
            <Swiper 
                :modules="[SwiperPagination, SwiperAutoplay]" 
                :space-between="12" 
                :loop="true" 
                :speed="600"
                :autoplay="{
                    delay: 5000,
                    disableOnInteraction: false
                }"
                :pagination="{
                    el: '.industry-pagination',
                    clickable: true
                }"
                :breakpoints="{ 0: { slidesPerView: 1, spaceBetween: 24 }, 768: { slidesPerView: 2.1, spaceBetween: 16 } }"
                @swiper="onSwiper" 
                class="w-full"
            >
                <SwiperSlide v-for="(item, index) in recognitions" :key="item.id || index">
                    <div class="h-full rounded-[4px] overflow-hidden bg-[#1A1B1E] flex flex-col">
                        <img :src="item.image" :alt="item.desc" class="w-full aspect-[16/9] object-cover" loading="lazy" />
                        <div class="px-[16px] py-[20px] md:px-[24px] md:py-[30px] xl:px-[32px] xl:py-[40px] flex flex-col">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.87817 11.486L0.0812183 16V12.6773L7.87817 8.16327V11.486Z" fill="white"/>
                                <path d="M7.79695 3.4611L0 8.16327V4.70217L7.79695 0V3.4611Z" fill="white"/>
                                <path d="M16 3.4611L7.87817 8.16327V4.70217L16 0V3.4611Z" fill="white"/>
                            </svg>
                            <span class="text-[#0043FF] text-[24px] md:text-[32px] xl:text-[40px] font-[600] leading-[1.2] mt-[24px] md:mb-[12px] mb-[8px]">
                                {{ item.year }}
                            </span>
                            <p class="text-white text-[18px] md:text-[24px] xl:text-[32px] font-[600] leading-[1.2]">
                                {{ item.desc }}
                            </p>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>

        <div class="industry-pagination flex items-center justify-center gap-[8px] md:gap-[12px] mt-[32px] md:mt-[64px]"></div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from '#imports'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination as SwiperPagination, Autoplay as SwiperAutoplay } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/scrollbar'
import 'swiper/css/pagination'

import defaultRecognitionImg from '@/assets/image/recognition-1.png'

let swiperInstance = null
function onSwiper(swiper) {
    swiperInstance = swiper
}
function slidePrev() {
    swiperInstance?.slidePrev()
}
function slideNext() {
    swiperInstance?.slideNext()
}

const rawList = ref([])
const isLoading = ref(true)
const { locale } = useI18n()
const { $pb } = useNuxtApp()

const fetchRecognitions = async () => {
    isLoading.value = true
    try {
        const records = await $pb.collection('industry_recognition').getFullList({
            sort: '+created',
        })
        rawList.value = records || []
    } catch (error) {
        console.error('获取行业认可数据失败:', error)
    } finally {
        isLoading.value = false
    }
}

onMounted(() => {
    fetchRecognitions()
})

const recognitions = computed(() => {
    const isEn = locale.value === 'en'
    return rawList.value.map(item => {
        const name = isEn ? (item.certificate_name_en || item.certificate_name) : item.certificate_name

        let imageUrl = defaultRecognitionImg
        if (item.image) {
            const baseUrl = $pb.baseUrl || ''
            imageUrl = `${baseUrl}/api/files/${item.collectionId || 'industry_recognition'}/${item.id}/${item.image}`
        }

        return {
            id: item.id,
            year: item.time,
            desc: name,
            image: imageUrl
        }
    })
})
</script>

<style scoped>
:deep(.industry-pagination .swiper-pagination-bullet) {
    width: 12px;
    height: 12px;
    background-color: #454C5F;
    border-radius: 4px;
    opacity: 1;
    transition: all 0.3s ease;
    cursor: pointer;
    margin: 0 !important;
}

:deep(.industry-pagination .swiper-pagination-bullet-active) {
    background-color: #0043FF;
}

@media screen and (max-width: 768px) {
    :deep(.industry-pagination .swiper-pagination-bullet) {
        width: 6px;
        height: 6px;
        border-radius: 2px;
        background: #454C5F;
        opacity: 1;
        transition: background 0.3s;
    }

    :deep(.industry-pagination .swiper-pagination-bullet-active) {
        background: #0043FF;
    }
}
</style>