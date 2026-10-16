<template>
    <div class="pt-[56px] md:pt-[120px] pb-[0] md:pb-[0]">
        
        <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-4 pt-[0] md:pt-[120px] mb-[32px] md:mb-[48px]">
            <div class="flex items-start gap-3 xl:gap-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" class="shrink-0 mt-1 md:mt-2">
                    <path d="M11.9391 17.2289L0.121826 24V19.0159L11.9391 12.2449V17.2289Z" fill="#0043FF" />
                    <path d="M11.6954 5.19165L0 12.2449V7.05325L11.6954 0V5.19165Z" fill="#0043FF" />
                    <path d="M24 5.19165L11.8173 12.2449V7.05325L24 0V5.19165Z" fill="#0043FF" />
                </svg>
                <h2 class="text-[40px] sm:text-[48px] md:text-[54px] lg:text-[72px] xl:text-[84px] 2xl:text-[96px] font-semibold leading-[1.2]">
                    {{ $t('careers.recruitItem.title') }}
                </h2>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <div 
                v-for="(item, index) in list" 
                :key="index"
                class="group bg-[#F2F4F7] md:bg-white md:border-l md:border-[#D9DDE8] p-4 mb-3 md:px-4 md:py-6 xl:px-6 xl:py-8 flex flex-col justify-between transition cursor-pointer relative"
            >
                <div>
                    <div class="w-full aspect-[16/10] rounded-[4px] overflow-hidden mb-5 xl:mb-10">
                        <img :src="item.image" :alt="item.title" class="w-full h-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
                    </div>

                    <div class="flex items-start gap-3 flex-col">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" class="shrink-0 mt-1.5">
                            <path d="M11.9391 17.2289L0.121826 24V19.0159L11.9391 12.2449V17.2289Z" fill="#0043FF" />
                            <path d="M11.6954 5.19165L0 12.2449V7.05325L11.6954 0V5.19165Z" fill="#0043FF" />
                            <path d="M24 5.19165L11.8173 12.2449V7.05325L24 0V5.19165Z" fill="#0043FF" />
                        </svg>
                        <h3 class="text-[20px] md:text-[24px] xl:text-[32px] font-semibold leading-[1.2] text-[#131416]">
                            {{ item.title }}
                        </h3>
                    </div>
                </div>

                <div class="flex justify-start mt-8 md:mt-10 xl:mt-16">
                    <div class="rounded flex items-center justify-center transition group-hover:translate-x-2 group-hover:-translate-y-1">
                       <svg width="32" height="32" viewBox="0 0 32 32" fill="none" class="w-5 h-5 md:w-6 md:h-6 xl:w-8 xl:h-8">
                            <path d="M29 28.3812H27.2496V5.98803L4.23761 29L3 27.7624L26.012 4.75043H3.6188V3H28.1248L29 3.87521V28.3812Z" fill="#0043FF"/>
                        </svg>
                    </div>
                </div>
            </div>
        </div>

        <!-- button -->
        <!-- <div class="flex justify-center mt-12 md:mt-16">
            <button 
                @click="loadMore"
                class="w-full md:w-auto min-w-[200px] h-[48px] px-8 rounded-[8px] bg-[#0043FF] text-white text-[16px] font-medium flex items-center justify-center transition hover:bg-[#0034cc] active:scale-98 shadow-md"
            >
                {{ $t('careers.recruitItem.loadMore') }}
            </button>
        </div> -->

    </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import Img01 from '~/assets/image/life_01.png'
import Img02 from '~/assets/image/life_02.png'
import Img03 from '~/assets/image/life_03.png'

const { t, locale } = useI18n()

const list = computed(() => {
    const isEn = locale.value === 'en'
    return [
        {
            title: isEn ? 'Growth of Technical Women: Career Choices, Female Traits, and Future Development' : '技术女性的成长:职场选择、女性气质、未来发展',
            image: Img01
        },
        {
            title: isEn ? 'Both using Coding to change the world, what is the difference between "Coding Masters"? | Special Planning' : '都是用 Coding 改变世界，「爱码士」之间有什么不一样?|特别策划',
            image: Img02
        },
        {
            title: isEn ? 'Campus Recruitment "Hardest Graduation Season" is here again, how to successfully win algorithm offers?' : '校招进行时“最难毕业季”又来了，如何成功斩获算法Offer?',
            image: Img03
        }
    ]
})

function loadMore() {
    console.log('Load more clicked')
}
</script>

<style scoped>
</style>