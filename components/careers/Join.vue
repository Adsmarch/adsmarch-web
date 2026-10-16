<template>
    <div class="pt-[56px] md:pt-[120px] pb-[0] md:pb-[0]">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-[32px] lg:gap-[64px]">
            
            <div 
                v-motion
                :initial="{ opacity: 0, y: 40 }"
                :visible-once="{ opacity: 1, y: 0, transition: { duration: 800, ease: 'easeOut' } }"
                class="flex-1 flex flex-col max-w-[960px]"
            >
                <div class="flex items-start gap-3 md:gap-6 mb-[32px] md:mb-[48px] xl:mb-[64px]">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" class="shrink-0  w-[16px] h-[16px] md:w-[32px] md:h-[32px]">
                        <path d="M11.9391 17.2289L0.121826 24V19.0159L11.9391 12.2449V17.2289Z" fill="#0043FF" />
                        <path d="M11.6954 5.19165L0 12.2449V7.05325L11.6954 0V5.19165Z" fill="#0043FF" />
                        <path d="M24 5.19165L11.8173 12.2449V7.05325L24 0V5.19165Z" fill="#0043FF" />
                    </svg>
                    <h2 class="text-[40px] sm:text-[48px] md:text-[54px] lg:text-[72px] xl:text-[84px] 2xl:text-[96px] font-semibold leading-[1.2]">
                        {{ $t('careers.join.title') }}
                    </h2>
                </div>

                <p class="text-[16px] md:text-[20px] xl:text-[25px] font-semibold leading-[1.5] text-[#454C5F] mb-[24px] md:mb-[32px]">
                    {{ $t('careers.join.desc') }}
                </p>

                <div>
                    <NuxtLink :to="localePath('/jobs')"
                        class="inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:px-8 sm:py-4 bg-[#0043FF] text-white text-[14px] sm:text-[20px] font-semibold rounded hover:bg-[#103C93] transition-colors duration-200 w-auto min-w-[120px] sm:w-[240px] h-[40px] sm:h-[64px]">
                        <span>{{ $t('careers.join.button') }}</span>
                        <svg width="6" height="12" viewBox="0 0 6 12" fill="none" class="w-1.5 h-2.5 sm:w-2 sm:h-3 ml-1">
                            <path d="M5.99207 6.0069L2.54386 12L0 12L3.45219 6L0 -2.62268e-07L2.54386 -1.51073e-07L5.99207 5.9931L6 5.9931L5.99605 6L6 6.0069L5.99207 6.0069Z" fill="white"/>
                        </svg>
                    </NuxtLink>
                </div>
            </div>

            <div 
                v-motion
                :initial="{ opacity: 0, scale: 0.95, y: 30 }"
                :visible-once="{ opacity: 1, scale: 1, y: 0, transition: { duration: 800, delay: 200, ease: 'easeOut' } }"
                class="flex justify-end shrink-0"
            >
                <img :src="mascotImage" alt="Hello Mascot" class="w-[156px] sm:w-[220px] lg:w-[280px] xl:w-[363px] h-auto object-contain select-none" loading="lazy" />
            </div>

        </div>
    </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import mascotImg from '~/assets/image/hello_mascot.png'
const { locale } = useI18n()
const localePath = useLocalePath()

const mascotImage = mascotImg
</script>

<style scoped>
</style>