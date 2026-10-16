<template>
    <div class="pt-[56px] md:pt-[120px] pb-[0] md:pb-[0]">
        <div 
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible-once="{ opacity: 1, y: 0, transition: { duration: 700, ease: 'easeOut' } }"
            class="flex flex-col md:flex-row md:items-end md:justify-between gap-4 pt-[0] mb-[32px] md:mb-[48px]"
        >
            <div class="flex items-start gap-3 xl:gap-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" class="shrink-0 mt-1 md:mt-2">
                    <path d="M11.9391 17.2289L0.121826 24V19.0159L11.9391 12.2449V17.2289Z" fill="#0043FF" />
                    <path d="M11.6954 5.19165L0 12.2449V7.05325L11.6954 0V5.19165Z" fill="#0043FF" />
                    <path d="M24 5.19165L11.8173 12.2449V7.05325L24 0V5.19165Z" fill="#0043FF" />
                </svg>
                <h2 class="text-[40px] sm:text-[48px] md:text-[54px] lg:text-[72px] xl:text-[84px] 2xl:text-[96px] font-semibold leading-[1.2]">
                    {{ $t('careers.contact.title') }}
                </h2>
            </div>
        </div>
        <div 
            v-motion
            :initial="{ opacity: 0, y: 40 }"
            :visible-once="{ opacity: 1, y: 0, transition: { duration: 800, delay: 200, ease: 'easeOut' } }"
            class="bg-[#F2F4F7] rounded-[4px] md:rounded-[8px] py-8 px-5 md:p-12 xl:p-16 flex flex-col lg:flex-row items-start justify-between gap-8 md:gap-12 xl:gap-16"
        >
            <div class="w-full md:w-1/2 flex flex-col justify-center">
                <span class="text-[24px] md:text-[32px] xl:text-[40px] text-[#131416] font-semibold mb-3 md:mb-6">
                    {{ $t('careers.contact.emailLabel') }}
                </span>
                <a 
                    href="mailto:hr@adsmarch.com" 
                    class="text-[32px] md:text-[36px] xl:text-[42px] 2xl:text-[64px] font-semibold text-[#0043FF] underline"
                >
                    hr@adsmarch.com
                </a>
            </div>
            
            <div class="w-full h-[1px] lg:w-[1px] lg:h-[270px] bg-[#E5E9F2]"></div>

            <div class="w-full md:w-1/2 flex items-center justify-start gap-8 md:gap-20">
                <div class="flex flex-col items-start">
                    <span class="text-[24px] md:text-[32px] xl:text-[40px] text-[#131416] font-semibold mb-3 md:mb-6">
                        {{ $t('careers.contact.wechatLabel') }}
                    </span>
                    <div class="w-[100px] h-[100px] md:w-[160px] md:h-[160px] xl:w-[200px] xl:h-[200px] bg-white rounded-[4px] md:rounded-[8px] flex items-center justify-center">
                        <img :src="wechatQr" :alt="$t('careers.contact.wechatLabel')" class="w-full h-full object-contain select-none" draggable="false" />
                    </div>
                </div>
                
                <div class="flex flex-col items-start">
                    <span class="text-[24px] md:text-[32px] xl:text-[40px] text-[#131416] font-semibold mb-3 md:mb-6">
                        {{ $t('careers.contact.xiaohongshuLabel') }}
                    </span>
                    <div class="w-[100px] h-[100px] md:w-[160px] md:h-[160px] xl:w-[200px] xl:h-[200px] bg-white rounded-[4px] md:rounded-[8px] flex items-center justify-center">
                        <img :src="xiaohongshuQr" :alt="$t('careers.contact.xiaohongshuLabel')" class="w-full h-full object-contain select-none" draggable="false" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

import wechatQr from '~/assets/image/wechatLabel.png'
import xiaohongshuQr from '~/assets/image/xiaohongshuLabel.png'

const { t } = useI18n()
</script>

<style scoped>
</style>