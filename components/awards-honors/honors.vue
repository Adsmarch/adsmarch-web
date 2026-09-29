<template>
    <div class=" pt-[56px] md:pt-[120px] pb-[29px] md:pb-[0px]">

        <!-- 标题 -->
        <div class="flex items-start gap-3 mb-[32px] md:mb-[64px]">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" md:width="32" md:height="32"
                viewBox="0 0 24 24" fill="none" class="w-[24px] h-[24px] md:w-[32px] md:h-[32px] shrink-0">
                <path d="M11.9391 17.2289L0.121826 24V19.0159L11.9391 12.2449V17.2289Z" fill="#0043FF" />
                <path d="M11.6954 5.19165L0 12.2449V7.05325L11.6954 0V5.19165Z" fill="#0043FF" />
                <path d="M24 5.19165L11.8173 12.2449V7.05325L24 0V5.19165Z" fill="#0043FF" />
            </svg>
            <h2 class="text-[40px] md:text-[96px] font-[600] leading-none text-white">
                奖项与荣誉
            </h2>
        </div>

        <!-- ========== PC：左图 + 右侧两列网格 ========== -->
        <div class="hidden md:flex items-start gap-[24px] lg:gap-[80px]">
            <!-- 左侧奖杯图片 -->
            <div class="w-[42%] lg:w-[45%] shrink-0 rounded-[4px] md:rounded-[8px] overflow-hidden">
                <img :src="honorImage" alt="奖项与荣誉" class="w-full object-cover" loading="lazy" />
            </div>

            <!-- 右侧奖项网格 -->
            <div class="flex-1 grid grid-cols-2 md:gap-[24px] border-[#26282C]">
                <div v-for="(item, index) in awards" :key="index"
                    class="year-card group  md:h-[250px]  border-t  border-[#454C5F] px-[20px] py-[24px]  flex flex-col justify-between  transition-colors duration-300 hover:items-start hover:justify-center hover:bg-[#0043FF] hover:border-[#0043FF]">
                    <!-- 顶部：小图标 + 序号 -->
                    <div class="flex items-start justify-between group-hover:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                            class="w-[16px] h-[16px] shrink-0 text-[#0043FF] group-hover:text-white transition-colors duration-300">
                            <path d="M11.9391 17.2289L0.121826 24V19.0159L11.9391 12.2449V17.2289Z"
                                fill="currentColor" />
                            <path d="M11.6954 5.19165L0 12.2449V7.05325L11.6954 0V5.19165Z" fill="currentColor" />
                            <path d="M24 5.19165L11.8173 12.2449V7.05325L24 0V5.19165Z" fill="currentColor" />
                        </svg>
                        <span
                            class="md:text-[16px] leading-none text-[#454C5F] group-hover:text-white/70 transition-colors duration-300">
                            {{ String(index + 1).padStart(2, '0') }}
                        </span>
                    </div>
                   
                     <div class="flex flex-col md:group-hover:gap-[20px]  gap-[8px]">
                    <!-- 年份 -->
                    <LaurelYear :year="item.year" pc />
                    <!-- 奖项名称 -->
                    <p
                        class="md:group-hover:text-[24px] text-[16px] md:text-[20px] leading-[1.6] text-white/85 group-hover:text-white transition-colors duration-300">
                        {{ item.name }}
                    </p>
                    </div>
                </div>
            </div>
        </div>

        <!-- ========== 手机端：图片 + 横向轮播 ========== -->
        <div class="md:hidden">
            <div class="rounded-[8px] overflow-hidden mb-[32px]">
                <img :src="honorImage" alt="奖项与荣誉" class="w-full object-cover" loading="lazy" />
            </div>
            <!-- 奖项轮播 -->
            <Swiper :modules="[SwiperScrollbar]" :slides-per-view="1.2" :space-between="12" :loop="false" :speed="600"
                :scrollbar="{ el: '.honors-scrollbar', draggable: true }" @slide-change="onSlideChange" class="w-full">
                <SwiperSlide v-for="(item, index) in awards" :key="index">
                    <div class="border-t py-[20px] px-[16px] h-[200px] flex flex-col gap-[10px] transition-colors duration-300"
                        :class="index === activeIndex ? 'bg-[#0043FF] border-[#0043FF] items-start justify-center' : 'border-[#454C5F] justify-between'">
                        <!-- 顶部：小图标 + 序号（活动卡片时隐藏，同 PC hover） -->
                        <div :class="index === activeIndex ? 'hidden' : 'flex items-start justify-between'">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                                fill="none" class="w-[16px] h-[16px] shrink-0 text-[#0043FF]">
                                <path d="M11.9391 17.2289L0.121826 24V19.0159L11.9391 12.2449V17.2289Z"
                                    fill="currentColor" />
                                <path d="M11.6954 5.19165L0 12.2449V7.05325L11.6954 0V5.19165Z" fill="currentColor" />
                                <path d="M24 5.19165L11.8173 12.2449V7.05325L24 0V5.19165Z" fill="currentColor" />
                            </svg>
                            <span class="text-[12px] leading-none text-[#7D86A1]">
                                {{ String(index + 1).padStart(2, '0') }}
                            </span>
                        </div>
                         <div class="">

                        <!-- 年份 -->
                        <LaurelYear :year="item.year" :active="index === activeIndex" />
                        <!-- 奖项名称 -->
                        <p class="text-[16px] leading-[1.6] mt-[8px]"
                            :class="index === activeIndex ? 'text-white text-[20px]': 'text-white/85'">
                            {{ item.name }}
                        </p>
                    </div>
                    </div>
                </SwiperSlide>
            </Swiper>

            <!-- 轮播进度条 -->
            <div class="honors-scrollbar mt-[32px]"></div>
        </div>
    </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Scrollbar as SwiperScrollbar } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/scrollbar'

import LaurelYear from './laurel-year.vue'

import awardImg from '@/assets/image/award-img.png'

const honorImage = awardImg

// 手机端轮播当前活动卡片（应用 PC hover 高亮效果）
const activeIndex = ref(0)
function onSlideChange(swiper) {
    activeIndex.value = swiper.activeIndex
}

// 奖项列表
const awards = [
    { id:1,year: '2021', name: '中关村高新技术企业' },
    { id:2,year: '2023', name: '澳创时代孵化器生态合作伙伴及认证 出海服务商' },
    { id:3,year: '2023', name: '鲸鸣奖“年度跨境电商卓越服务奖”' },
    { id:4,year: '2023', name: '虎啸奖代运营&跨境电商双优秀奖' },
    { id:5,year: '2023', name: 'PAGC2026第七届金帆奖“2026H1 出海热度品牌奖”' },
    { id:6,year: '2024', name: '入围谷歌“最佳政策捍卫者”大奖' },
    { id:7,year: '2024', name: '入围谷歌“最佳新锐协作"代理大奖' },
    { id:8,year: '2024', name: '谷歌大中华区“卓越突破奖”' },
    { id:9,year: '2025', name: 'Golden Sail Award H1"出海人气奖”' },
    { id:10,year: '2025', name: '入围YouTube Works Awards (China)“最佳全链路营销”' },
    { id:11, year: '2025', name: '第六届TBI杰出品牌创新奖“中国AI出海增长领域最具突破力的服务商”' },
    { id:12,year: '2025', name: '年度作业帮突出贡献奖' },
    { id:13,year: '2025', name: '活动行年度卓越主办方评选中荣获"年度科技与商业先锋主办方"' }
]
</script>

<style  scoped>
/* 手机端轮播进度条 */
.honors-scrollbar {
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

:deep(.honors-scrollbar .swiper-scrollbar-drag) {
    background: #0043FF;
    border-radius: 2px;
}
</style>
