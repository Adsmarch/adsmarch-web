<template>
    <div class="pt-[28px] md:pt-[120px] pb-[56px] md:pb-[120px]">

        <!-- 标题 + 左右切换按钮 -->
        <div class="flex items-center justify-between mb-[32px] md:mb-[64px]">
            <div class="flex items-start md:gap-[24px] gap-[12px]">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                    class="w-[20px] h-[20px] md:w-[28px] md:h-[28px] shrink-0">
                    <path d="M11.9391 17.2289L0.121826 24V19.0159L11.9391 12.2449V17.2289Z" fill="#0043FF" />
                    <path d="M11.6954 5.19165L0 12.2449V7.05325L11.6954 0V5.19165Z" fill="#0043FF" />
                    <path d="M24 5.19165L11.8173 12.2449V7.05325L24 0V5.19165Z" fill="#0043FF" />
                </svg>
                <h2 class="text-[40px] md:text-[96px] font-[600] leading-none text-white">
                    {{ $t('awards.industry.title') }}
                </h2>
            </div>

            <div class="flex items-center gap-[8px] md:gap-[12px]">
                <button type="button" :aria-label="$t('awards.industry.prev')" @click="slidePrev"
                    class="w-[40px] h-[40px] md:w-[64px] md:h-[64px] rounded-[4px] bg-[#26282C] flex items-center justify-center text-[#7D86A1] hover:bg-[#33363B] transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none">
                        <rect width="64" height="64" rx="4" fill="#131416" />
                        <path
                            d="M20.2679 30.7622H48L47.9646 33.2021H20.2351L27.0324 40H23.9912L16 32.0174L24.0265 24H26.997L20.2679 30.7622Z"
                            fill="#7D86A1" />
                    </svg>
                </button>
                <button type="button" :aria-label="$t('awards.industry.next')" @click="slideNext"
                    class="w-[40px] h-[40px] md:w-[64px] md:h-[64px] rounded-[4px] bg-[#0043FF] flex items-center justify-center text-white hover:bg-[#0037D4] transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none">
                        <rect width="64" height="64" rx="4" fill="#0043FF" />
                        <path
                            d="M44.7321 30.7622H17L17.0354 33.2021H44.7649L37.9676 40H41.0088L49 32.0174L40.9735 24H38.003L44.7321 30.7622Z"
                            fill="white" />
                    </svg>
                </button>
            </div>
        </div>

        <Swiper :modules="[SwiperScrollbar, SwiperPagination]" :space-between="12" :loop="false" :speed="600"
            :breakpoints="{ 0: { slidesPerView: 1, spaceBetween: 24 }, 768: { slidesPerView: 2.1, spaceBetween: 16 } }"
            :scrollbar="{ el: '.industry-scrollbar', draggable: true }"
            :pagination="{ el: '.industry-pagination', clickable: true }" @swiper="onSwiper" class="w-full">
            <SwiperSlide v-for="(item, index) in recognitions" :key="index">
                <div class="h-full rounded-[4px] overflow-hidden bg-[#1A1B1E] flex flex-col">
                    <img :src="item.image" :alt="item.desc" class="w-full aspect-[16/9] object-cover" loading="lazy" />
                    <div class="px-[16px] py-[20px] md:px-[32px] md:py-[40px]  flex flex-col">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                            class="w-[8px] h-[8px] md:w-[16px] md:h-[16px] shrink-0">
                            <path d="M11.9391 17.2289L0.121826 24V19.0159L11.9391 12.2449V17.2289Z" fill="#fff" />
                            <path d="M11.6954 5.19165L0 12.2449V7.05325L11.6954 0V5.19165Z" fill="#fff" />
                            <path d="M24 5.19165L11.8173 12.2449V7.05325L24 0V5.19165Z" fill="#fff" />
                        </svg>
                        <!-- 年份 -->
                        <span class="text-[#0043FF] text-[24px] md:text-[40px] font-[600] leading-none mt-[24px] md:mb-[12px] mb-[8px]">
                            {{ item.year }}
                        </span>
                        <!-- 说明文字 -->
                        <p class="text-white/90 text-[18px] md:text-[32px] font-[600]  leading-[1.5]">
                            {{ item.desc }}
                        </p>
                    </div>
                </div>
            </SwiperSlide>
        </Swiper>

        <!-- PC 轮播进度条 -->
        <div class="industry-scrollbar hidden md:block md:mt-[64px]"></div>
        <!-- 手机端分页圆点 -->
        <div class="industry-pagination mt-[32px] flex justify-center md:hidden"></div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Scrollbar as SwiperScrollbar, Pagination as SwiperPagination } from 'swiper/modules'
import img1 from '@/assets/image/recognition-1.png'
import img2 from '@/assets/image/recognition-2.png'
import img3 from '@/assets/image/recognition-3.png'
import img4 from '@/assets/image/recognition-4.png'



import 'swiper/css'
import 'swiper/css/scrollbar'
import 'swiper/css/pagination'

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
const { t, tm } = useI18n()

// 行业认可图片（按顺序与 i18n 文案 zip）
const recognitionImages = [img1, img2, img3, img4]

// 行业认可列表（图片为占位，后续可替换为真实证书/奖杯图）
const recognitions = computed(() => {
    const raw = tm('awards.industry.recognitions')
    const len = Array.isArray(raw) ? raw.length : 0
    return Array.from({ length: len }, (_, i) => ({
        year: t(`awards.industry.recognitions.${i}.year`),
        desc: t(`awards.industry.recognitions.${i}.desc`),
        image: recognitionImages[i]
    }))
})
</script>

<style scoped>
/* 轮播进度条 */
.industry-scrollbar {
    position: relative !important;
    bottom: auto !important;
    left: auto !important;
    right: auto !important;
    width: 100% !important;
    height: 4px !important;
    border-radius: 2px !important;
    background: #26282C !important;
    opacity: 1 !important;
}

:deep(.industry-scrollbar .swiper-scrollbar-drag) {
    background: #0043FF;
    border-radius: 2px;
}

/* 手机端分页圆点 */
:deep(.industry-pagination .swiper-pagination-bullet) {
    width: 8px;
    height: 8px;
    border-radius: 2px;
    background: #454C5F;
    opacity: 1;
    margin: 0 4px !important;
    transition: background 0.3s;
}

:deep(.industry-pagination .swiper-pagination-bullet-active) {
    background: #0043FF;
}
</style>
