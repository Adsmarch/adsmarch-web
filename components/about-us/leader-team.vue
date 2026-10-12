<template>
    <div class="pb-[28px] md:pb-[120px] px-[15px] md:px-[40px] xl:px-[120px] m-auto">
        <!-- 桌面端 -->
        <div class="hidden md:grid xl:grid-cols-4 md:grid-cols-3 gap-[24px]">
            <div class="col-span-2 md:col-span-1 xl:col-span-2 pr-10 md:pr-4">
                <div class="flex items-start gap-3 ">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none">
                        <path d="M11.9391 17.2289L0.121826 24V19.0159L11.9391 12.2449V17.2289Z" fill="#0043FF" />
                        <path d="M11.6954 5.19165L0 12.2449V7.05325L11.6954 0V5.19165Z" fill="#0043FF" />
                        <path d="M24 5.19165L11.8173 12.2449V7.05325L24 0V5.19165Z" fill="#0043FF" />
                    </svg>
                    <h2 class="text-[40px] sm:text-[48px] lg:text-[64px] xl:text-[96px] font-semibold leading-[1.2] mb-[20px] md:mb-[24px]">
                        {{ $t('about.leaderTeam.title') }}
                    </h2>
                </div>
                <p class="text-[16px] md:text-[20px] lg:text-[24px] leading-[1.5] text-[#fff]">
                    {{ $t('about.leaderTeam.desc') }}
                </p>
            </div>

            <template v-for="(member, index) in members" :key="index">
                <div class="team-card bg-[#131416] border border-transparent transition-colors duration-300">
                    <div class="aspect-[1/1] overflow-hidden">
                        <img :src="member.photo" :alt="member.name" class="w-full h-full object-cover"
                            loading="lazy" />
                    </div>
                    <div class="px-[16px] py-[24px] md:py-[32px]">
                        <div class="member-name text-[28px] md:text-[34px] lg:text-[40px] leading-[1.2] font-[600] text-white mb-[4px] md:mb-[8px] transition-colors duration-300">
                            {{ member.name }}
                        </div>
                        <div class="md:text-[20px] text-[16px] leading-[1.2] font-[600] text-[#0043FF] mb-[16px] md:mb-[24px]">
                            {{ member.role }}
                        </div>
                        <!-- 修复：将 mmd 改为 md -->
                        <p class="md:text-[20px] text-[16px] leading-[1.5] text-[#FFFFFF]">
                            {{ member.desc }}
                        </p>
                    </div>
                </div>
            </template>
        </div>

        <!-- 移动端 -->
        <div class="md:hidden py-[28px]">
            <div class="flex items-start gap-3 mb-[20px]">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M11.9391 17.2289L0.121826 24V19.0159L11.9391 12.2449V17.2289Z" fill="#0043FF" />
                    <path d="M11.6954 5.19165L0 12.2449V7.05325L11.6954 0V5.19165Z" fill="#0043FF" />
                    <path d="M24 5.19165L11.8173 12.2449V7.05325L24 0V5.19165Z" fill="#0043FF" />
                </svg>
                <h2 class="text-[40px] font-[600] leading-none">
                    {{ $t('about.leaderTeam.title') }}
                </h2>
            </div>
            <p class="text-[16px] leading-[1.6] text-[#7D86A1] mb-[32px]">
                {{ $t('about.leaderTeam.desc') }}
            </p>

            <!-- 恢复移动端切换按钮 -->
            <div class="flex items-center justify-end gap-[20px] mb-[32px]">
                <button id="team-swiper-prev"
                    class="w-[40px] h-[40px] rounded bg-[#131416] flex items-center justify-center transition hover:bg-[#103C93] group"
                    :aria-label="$t('about.leaderTeam.prev')">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-[40px] h-[40px]" viewBox="0 0 40 40" fill="none">
                        <path d="M12.6675 19.2264H30L29.9779 20.7513H12.647L16.8952 25H14.9945L10 20.0109L15.0166 15H16.8731L12.6675 19.2264Z" fill="#7D86A1" class="group-hover:fill-white" />
                    </svg>
                </button>
                <button id="team-swiper-next"
                    class="w-[40px] h-[40px] rounded bg-[#0043FF] flex items-center justify-center transition hover:bg-[#103C93]"
                    :aria-label="$t('about.leaderTeam.next')">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 64 64" fill="none">
                        <path d="M44.7321 30.7622H17L17.0354 33.2021H44.7649L37.9676 40H41.0088L49 32.0174L40.9735 24H38.003L44.7321 30.7622Z" fill="white" />
                    </svg>
                </button>
            </div>

            <Swiper :modules="[SwiperNavigation]" :slides-per-view="1.2" :space-between="12" :loop="false" :speed="600"
                :watch-slides-progress="true" :navigation="{
                    prevEl: '#team-swiper-prev',
                    nextEl: '#team-swiper-next'
                }" class="w-full" @swiper="onSwiper" @slide-change="onSlideChange">

                <SwiperSlide v-for="(member, index) in members" :key="index">
                    <div class="team-card bg-[#131416]">
                        <div class="aspect-[1/1] overflow-hidden">
                            <img :src="member.photo" :alt="member.name" class="w-full h-full object-cover"
                                loading="lazy" />
                        </div>
                        <div class="p-4">
                            <div class="member-name text-[20px] font-[600] text-white mb-1">
                                {{ member.name }}
                            </div>
                            <div class="text-[14px] font-[500] text-[#0043FF] mb-2">
                                {{ member.role }}
                            </div>
                            <p class="text-[12px] leading-[1.6] text-[#7D86A1]">
                                {{ member.desc }}
                            </p>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>

            <div class="mt-[32px] h-[4px] bg-gray-800 rounded-full overflow-hidden">
                <div class="h-full bg-blue-600 rounded-full" :style="{
                    width: `${swiperProgress}%`,
                    transition: 'width 0.6s ease'
                }"></div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, nextTick, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation as SwiperNavigation } from 'swiper/modules'

import 'swiper/css'

// 统一使用 Nuxt 插件注入的 $pb
const { $pb } = useNuxtApp()
const { locale } = useI18n()

const rawMembers = ref([])

onMounted(async () => {
    try {
        const records = await $pb.collection('leaders').getFullList({
            sort: 'sort_order',
            filter: 'is_active = true'
        })
        rawMembers.value = records
    } catch (e) {
        console.error('Failed to fetch leaders:', e)
    }
})

const members = computed(() => {
    const isEn = locale.value === 'en'
    return rawMembers.value.map(r => ({
        name: isEn && r.name_en ? r.name_en : r.name,
        role: isEn && r.position_en ? r.position_en : r.position,
        desc: isEn && r.short_desc_en ? r.short_desc_en : r.short_desc,
        photo: r.avatar ? `https://api.adsmarch.bot.cd/api/files/${r.collectionId}/${r.id}/${r.avatar}` : ''
    }))
})

const swiperProgress = ref(0)
function onSwiper(swiper) {
    updateProgress(swiper)
    nextTick(() => { updateProgress(swiper) })
}
function onSlideChange(swiper) {
    updateProgress(swiper)
}
function updateProgress(swiper) {
    const total = members.value.length
    if (!total) { swiperProgress.value = 0; return }
    const slidesPerView = Number(swiper.params.slidesPerView)
    if (slidesPerView >= total) { swiperProgress.value = 100; return }
    const initialProgress = slidesPerView / total
    const maxMove = total - slidesPerView
    const currentMove = Math.min(swiper.activeIndex, maxMove)
    const moveProgress = maxMove > 0 ? currentMove / maxMove : 1
    const progress = initialProgress + moveProgress * (1 - initialProgress)
    swiperProgress.value = Math.min(100, Math.max(0, progress * 100))
}
</script>

<style scoped>
</style>