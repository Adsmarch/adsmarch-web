<template>
    <div class="pt-[56px] md:pt-[120px] pb-[28px] md:pb-[0px]">
        <div 
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible-once="{ opacity: 1, y: 0, transition: { duration: 700, ease: 'easeOut' } }"
            class="flex items-start md:gap-[24px] gap-[12px] mb-[32px] md:mb-[64px]"
        >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" class="w-[24px] h-[24px] md:w-[32px] md:h-[32px] shrink-0">
                <path d="M15.7563 22.9719L0.162437 32V25.3546L15.7563 16.3265V22.9719Z" fill="#0043FF"/>
                <path d="M15.5939 6.92219L0 16.3265V9.40434L15.5939 0V6.92219Z" fill="#0043FF"/>
                <path d="M32 6.92219L15.7563 16.3265V9.40434L32 0V6.92219Z" fill="#0043FF"/>
            </svg>


            <h2 class="text-[40px] sm:text-[48px] md:text-[54px] lg:text-[72px] xl:text-[96px] font-semibold leading-[1.2]">
                {{ $t('awards.honors.title') }}
            </h2>
        </div>
        <div v-if="isLoading" class="w-full">
            <div class="hidden md:flex flex-col md:flex-row md:items-start gap-[24px] lg:gap-[80px]">
                <div class="w-[42%] lg:w-[45%] shrink-0 h-[450px] bg-[#1f2229] rounded-[8px] animate-pulse"></div>
                <div class="flex-1 grid md:grid-cols-1 xl:grid-cols-2 md:gap-[24px]">
                    <div v-for="i in 4" :key="i" class="h-[250px] bg-[#1f2229] border-t border-[#26282C] p-[24px] flex flex-col justify-between animate-pulse rounded-[4px]">
                        <div class="w-8 h-4 bg-[#2a2e39] rounded"></div>
                        <div class="space-y-3">
                            <div class="w-16 h-6 bg-[#2a2e39] rounded"></div>
                            <div class="w-full h-5 bg-[#2a2e39] rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="md:hidden">
                <div class="w-full h-[220px] bg-[#1f2229] rounded-[8px] mb-[32px] animate-pulse"></div>
                <div class="h-[200px] bg-[#1f2229] rounded-[8px] animate-pulse p-[20px] flex flex-col justify-between">
                    <div class="w-8 h-4 bg-[#2a2e39] rounded"></div>
                    <div class="space-y-3">
                        <div class="w-16 h-6 bg-[#2a2e39] rounded"></div>
                        <div class="w-full h-5 bg-[#2a2e39] rounded"></div>
                    </div>
                </div>
            </div>
        </div>

        <template v-else>
            <div 
                v-motion
                :initial="{ opacity: 0, y: 40 }"
                :visible-once="{ opacity: 1, y: 0, transition: { duration: 800, delay: 150, ease: 'easeOut' } }"
                class="hidden md:flex flex-col md:flex-row md:items-start gap-[24px] lg:gap-[80px] relative"
            >
               <div class="w-[42%] lg:w-[45%] shrink-0 sticky top-[120px] rounded-[4px] md:rounded-[8px] overflow-hidden bg-[#131416]">
                    <div class="relative w-full">
                        <img 
                            v-for="(item, index) in awards" 
                            v-show="index === hoverIndex"
                            :key="item.id"
                            :src="item.image" 
                            :alt="item.name" 
                            class="w-full h-auto object-cover transition-opacity duration-300 ease-in-out"
                            :class="index === hoverIndex ? 'relative opacity-100 z-10' : 'absolute inset-0 opacity-0 z-0'"
                        />
                    </div>
                </div>

                <div class="flex-1 grid md:grid-cols-1 xl:grid-cols-2 md:gap-[24px] border-[#26282C]">
                    <div v-for="(item, index) in awards" :key="item.id"
                        @mouseenter="hoverIndex = index"
                        class="year-card group md:h-[250px] border-t border-[#454C5F] px-[20px] py-[24px] flex flex-col justify-between transition-colors duration-300 hover:items-start hover:justify-center hover:bg-[#0043FF] hover:border-[#0043FF]">
                        <div class="flex items-start justify-between group-hover:hidden">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"  class="w-[16px] h-[16px] shrink-0 text-white transition-colors duration-300">>
                                <path d="M7.87817 11.486L0.0812183 16V12.6773L7.87817 8.16327V11.486Z" fill="currentColor"/>
                                <path d="M7.79695 3.4611L0 8.16327V4.70217L7.79695 0V3.4611Z" fill="currentColor"/>
                                <path d="M16 3.4611L7.87817 8.16327V4.70217L16 0V3.4611Z" fill="currentColor"/>
                            </svg>

                            <span class="md:text-[16px] leading-none text-[#454C5F] group-hover:text-white/70 transition-colors duration-300">
                                {{ String(index + 1).padStart(2, '0') }}
                            </span>
                        </div>
                       
                        <div class="flex flex-col md:group-hover:gap-[20px] gap-[8px]">
                            <LaurelYear :year="item.year" pc />
                            <p class="md:group-hover:text-[24px] text-[16px] md:text-[20px] leading-[1.6] text-white/85 group-hover:text-white transition-colors duration-300">
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
                <div class="rounded-[8px] overflow-hidden mb-[32px] bg-[#131416]">
                    <div class="relative w-full">
                        <img 
                            v-for="(item, index) in awards" 
                            v-show="index === activeIndex"
                            :key="item.id"
                            :src="item.image" 
                            :alt="item.name" 
                            class="w-full h-auto object-cover transition-opacity duration-300 ease-in-out"
                            :class="index === activeIndex ? 'relative opacity-100 z-10' : 'absolute inset-0 opacity-0 z-0'"
                        />
                    </div>
                </div>
                
                <Swiper 
                    :modules="[SwiperPagination, SwiperAutoplay]" 
                    :slides-per-view="1.2" 
                    :space-between="12" 
                    :loop="true" 
                    :speed="600"
                    :observer="true"
                    :observe-parents="true"
                    :autoplay="{
                        delay: 5000,
                        disableOnInteraction: false
                    }"
                    :pagination="{ el: '.honors-m-pagination', clickable: true }" 
                    @slide-change="onSlideChange" 
                    class="w-full"
                >
                    <SwiperSlide v-for="(item, index) in awards" :key="item.id">
                        <div class="border-t py-[20px] px-[16px] h-[200px] flex flex-col gap-[10px] transition-colors duration-300"
                            :class="index === activeIndex ? 'bg-[#0043FF] border-[#0043FF] items-start justify-center' : 'border-[#454C5F] justify-between'">
                            <div :class="index === activeIndex ? 'hidden' : 'flex items-start justify-between'">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" class="w-[16px] h-[16px] shrink-0">
                                    <path d="M7.87817 11.486L0.0812183 16V12.6773L7.87817 8.16327V11.486Z" fill="white"/>
                                    <path d="M7.79695 3.4611L0 8.16327V4.70217L7.79695 0V3.4611Z" fill="white"/>
                                    <path d="M16 3.4611L7.87817 8.16327V4.70217L16 0V3.4611Z" fill="currentColor"/>
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
        </template>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from '#imports'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination as SwiperPagination, Autoplay as SwiperAutoplay } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'

import LaurelYear from './laurel-year.vue'
import defaultAwardImg from '@/assets/image/award-img.png'

const activeIndex = ref(0)
const hoverIndex = ref(0)
const rawList = ref([])
const isLoading = ref(true)

const { locale } = useI18n()
const { $pb } = useNuxtApp()

function onSlideChange(swiper) {
    activeIndex.value = swiper.realIndex
}

const fetchHonors = async () => {
    isLoading.value = true
    try {
        const records = await $pb.collection('awards_honors').getFullList({
            sort: '+created',
        })
        rawList.value = records || []
    } catch (error) {
        console.error('获取荣誉奖项数据失败:', error)
    } finally {
        isLoading.value = false
    }
}

onMounted(() => {
    fetchHonors()
})

const awards = computed(() => {
    const isEn = locale.value === 'en'
    return rawList.value.map(item => {
        const name = isEn ? (item.honors_name_en || item.honors_name) : item.honors_name

        let imageUrl = defaultAwardImg
        if (item.image) {
            const baseUrl = $pb.baseUrl || ''
            imageUrl = `${baseUrl}/api/files/${item.collectionId || 'awards_honors'}/${item.id}/${item.image}`
        }

        return {
            id: item.id,
            year: item.time,
            name: name,
            image: imageUrl
        }
    })
})
</script>

<style scoped>
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