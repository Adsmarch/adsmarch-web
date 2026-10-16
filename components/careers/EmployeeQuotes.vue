<template>
    <div class="pt-[56px] md:pt-[0] pb-[0px] text-[#131416]">
        <div 
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible-once="{ opacity: 1, y: 0, transition: { duration: 700, ease: 'easeOut' } }"
            class="flex flex-col items-center text-center pt-[0] md:pt-[120px]"
        >
            <div class="flex items-start justify-center gap-3 mb-8 md:mb-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" class="shrink-0">
                    <path d="M11.9391 17.2289L0.121826 24V19.0159L11.9391 12.2449V17.2289Z" fill="#0043FF" />
                    <path d="M11.6954 5.19165L0 12.2449L7.05325L11.6954 0V5.19165Z" fill="#0043FF" />
                    <path d="M24 5.19165L11.8173 12.2449L7.05325L24 0V5.19165Z" fill="#0043FF" />
                </svg>
                <h2 class="text-[40px] sm:text-[48px] md:text-[54px] lg:text-[72px] xl:text-[84px] 2xl:text-[96px] font-semibold leading-[1.2]">
                    {{ $t('careers.employeeQuotes.title') }}
                </h2>
            </div>
        </div>

        <div 
            v-motion
            :initial="{ opacity: 0, y: 40 }"
            :visible-once="{ opacity: 1, y: 0, transition: { duration: 800, delay: 200, ease: 'easeOut' } }"
            class="hidden md:block relative pt-[32px] md:pt-[64px]"
        >
            <Swiper
                :modules="[SwiperNavigation, SwiperPagination, SwiperAutoplay]"
                :slides-per-view="'auto'"
                :centered-slides="true"
                :space-between="32"
                :loop="true"
                :speed="600"
                :autoplay="{
                    delay: 5000,
                    disableOnInteraction: false
                }"
                :observer="true"
                :observe-parents="true"
                :watch-slides-progress="true"
                :pagination="{ clickable: true }"
                class="quote-swiper w-full !overflow-visible pb-[48px]"
            >
                <SwiperSlide v-for="(item, index) in loopQuotes" :key="index" class="!w-[680px] lg:!w-[780px] xl:!w-[1140px]">
                    <div class="quote-box-wrap">
                        <div class="quote-content relative bg-white rounded-[12px] p-8 md:p-[52px] lg:p-[72px] flex flex-col justify-between z-10 shadow-sm">
                            <div class="absolute top-[52px] left-[72px] text-[#E5E9F2] select-none pointer-events-none z-10">
                                <svg width="84" height="56" viewBox="0 0 84 56" fill="currentColor">
                                    <path d="M42.3433 56C43.564 45.3333 46.0055 35.2 49.6676 25.6C53.4823 16 58.2888 7.46667 64.0872 0H84C80.3379 7.31429 77.3624 16.2286 75.0736 26.7429C72.9373 37.1048 71.8692 46.8571 71.8692 56H42.3433ZM0 56C1.22071 45.6381 3.66213 35.6571 7.32425 26.0571C10.9864 16.3048 15.7166 7.61905 21.515 0H41.6567C37.9945 7.16191 35.0191 16 32.7302 26.5143C30.594 37.0286 29.5259 46.8571 29.5259 56H0Z" fill="#D9DDE8"/>
                                </svg>
                            </div>
                            <p class="relative z-10 text-[24px] md:text-[32px] xl:text-[48px] font-semibold leading-[1.5] text-[#454C5F] mb-[32px]">
                                {{ item.content }}
                            </p>
                            <div class="relative z-10 flex items-center justify-end">
                                <div class="text-right">
                                    <div class="text-[20px] md:text-[28px] xl:text-[40px] font-semibold text-[#0043FF]">—— {{ item.name }}</div>
                                    <div class="text-[16px] md:text-[24px] xl:text-[32px] text-[#7D86A1] font-semibold">{{ item.role }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>

        <div 
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible-once="{ opacity: 1, y: 0, transition: { duration: 700, delay: 200, ease: 'easeOut' } }"
            class="md:hidden w-full pb-8 pt-4"
        >
            <Swiper
                :modules="[SwiperNavigation, SwiperPagination, SwiperAutoplay]"
                :slides-per-view="1"
                :space-between="16"
                :loop="true"
                :speed="600"
                :autoplay="{
                    delay: 5000,
                    disableOnInteraction: false
                }"
                :watch-slides-progress="true"
                :pagination="{ clickable: true }"
                class="quote-swiper-mobile w-full !overflow-visible"
            >
                <SwiperSlide v-for="(item, index) in quotes" :key="index">
                    <div class="quote-box-wrap relative rounded-[4px] bg-white quote-box-wrap-mobile">
                        <div class="quote-content relative bg-white rounded-[4px] p-6 flex flex-col justify-between h-full z-10 quote-content-mobile shadow-sm">
                            <div class="absolute top-[24px] left-[24px] text-[#E5E9F2] select-none pointer-events-none">
                                <svg width="54" height="54" viewBox="0 0 84 56" fill="currentColor">
                                    <path d="M42.3433 56C43.564 45.3333 46.0055 35.2 49.6676 25.6C53.4823 16 58.2888 7.46667 64.0872 0H84C80.3379 7.31429 77.3624 16.2286 75.0736 26.7429C72.9373 37.1048 71.8692 46.8571 71.8692 56H42.3433ZM0 56C1.22071 45.6381 3.66213 35.6571 7.32425 26.0571C10.9864 16.3048 15.7166 7.61905 21.515 0H41.6567C37.9945 7.16191 35.0191 16 32.7302 26.5143C30.594 37.0286 29.5259 46.8571 29.5259 56H0Z" fill="#D9DDE8"/>
                                </svg>
                            </div>
                            <p class="relative z-10 text-[24px] font-semibold leading-[1.5] mt-[24px] text-[#454C5F] min-h-[200px]">
                                {{ item.content }}
                            </p>
                            <div class="relative z-10 flex items-center justify-end">
                                <div class="text-right">
                                    <div class="text-[20px] font-semibold text-[#0043FF] mb-1">—— {{ item.name }}</div>
                                    <div class="text-[16px] text-[#7D86A1] font-[400]">{{ item.role }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>

    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation as SwiperNavigation, Pagination as SwiperPagination, Autoplay as SwiperAutoplay } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const { t, locale } = useI18n()

const quotes = computed(() => {
    const isEn = locale.value === 'en'
    return [
        {
            content: isEn ? 'Joined the company for over a year. There are many post-90s and 00s here, the atmosphere is super nice, and I can fully unleash my potential.' : '来公司一年多了，团队里90后、00后居多，氛围超nice，在这里，我可以尽情发挥我的优势。',
            name: 'YangYang',
            role: isEn ? 'Creative Center' : '创意中心'
        },
        {
            content: isEn ? 'The management here is flat and efficient. Every voice is heard, and we grow together with global top brands.' : '这里的管理扁平高效，每一个声音都能被听见，和全球顶尖品牌一起成长非常有成就感。',
            name: 'Aiden',
            role: isEn ? 'Marketing Dept' : '市场部'
        },
        {
            content: isEn ? 'A platform full of challenges and opportunities. Excellent partners make every day inspiring.' : '这是一个充满挑战与机遇的平台，优秀的合作伙伴让每一天都充满灵感与动力。',
            name: 'Kiki',
            role: isEn ? 'Operations Dept' : '运营中心'
        }
    ]
})

const loopQuotes = computed(() => [...quotes.value, ...quotes.value])
</script>

<style scoped>
.quote-swiper,
.quote-swiper-mobile {
    overflow: visible;
}

:deep(.quote-swiper .swiper-slide),
:deep(.quote-swiper-mobile .swiper-slide) {
    width: auto;
    height: auto;
    display: flex;
    align-items: center;
}

.quote-box-wrap {
    position: relative;
    width: 100%;
    border-radius: 8px;
    background: #fff;
    overflow: hidden;
    transition: box-shadow 0.3s ease;
    box-shadow: 0px 4px 12px 0px rgba(0, 75, 177, 0.16);
}

.quote-content {
    position: relative;
    margin: 2px;
    border-radius: 6px;
}

:deep(.swiper-slide-active) .quote-box-wrap::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 1300px;
    height: 1300px;
    transform: translate(-50%, -50%);
    z-index: 1;
    pointer-events: none;
    background-image: conic-gradient(
        from 0deg at 50% 50%,
        transparent 0deg,
        transparent 100deg,
        rgba(0, 67, 255, 1) 280deg,
        rgba(0, 67, 255, 1) 330deg,
        rgba(0, 67, 255, 1) 360deg
    );
    animation: borderRotate 3s linear infinite;
}

@keyframes borderRotate {
    0% {
        transform: translate(-50%, -50%) rotate(0deg);
    }
    100% {
        transform: translate(-50%, -50%) rotate(360deg);
    }
}

:deep(.swiper-pagination) {
    bottom: -64px !important;
    display: flex;
    justify-content: center;
    gap: 12px;
}

:deep(.swiper-pagination-bullet) {
    width: 12px;
    height: 12px;
    background: #D9DDE8;
    opacity: 1;
    border-radius: 2px;
    transition: all 0.3s ease;
}

:deep(.swiper-pagination-bullet-active) {
    background: #0043FF;
}
@media screen and (max-width: 768px) {
    :deep(.swiper-pagination) {
        bottom: -32px !important;
        gap: 8px;
    }
    :deep(.swiper-pagination-bullet) {
        width: 6px;
        height: 6px;
    }
}
</style>