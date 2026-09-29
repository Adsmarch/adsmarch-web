<template>
    <div class="pb-[28px] md:pb-[120px] px-[15px] md:px-[120px] m-auto">

        <!-- ========== PC：网格布局 ========== -->
        <div class="hidden md:grid grid-cols-4 gap-[24px]">

            <!-- 标题区（占前两列） -->
            <div class="col-span-2 pr-10">
                <div class="flex items-start gap-3 ">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none">
                        <path d="M11.9391 17.2289L0.121826 24V19.0159L11.9391 12.2449V17.2289Z" fill="#0043FF" />
                        <path d="M11.6954 5.19165L0 12.2449V7.05325L11.6954 0V5.19165Z" fill="#0043FF" />
                        <path d="M24 5.19165L11.8173 12.2449V7.05325L24 0V5.19165Z" fill="#0043FF" />
                    </svg>
                    <h2 class="text-[40px] min-[1250px]:text-[96px]  font-[600] mb-[20px] md:mb-[24px]">
                        领导团队
                    </h2>
                </div>
                <p class="text-[16px] min-[1250px]:text-[24px] leading-[1.6] text-[#fff]">
                    截至目前，麦炽已赋能数千家企业，业务足迹覆盖全球200多个国家和地区。我们凭借平均经验5年以上的资深专家团队，帮助中国企业从"走出去"到"扎下去"，实现可持续的全球化增长。
                </p>
            </div>

            <!-- 成员卡片（第5、6张后各插入一个空格子） -->
            <template v-for="(member, index) in members" :key="index">
                <div class="team-card bg-[#131416] border border-transparent transition-colors duration-300">
                    <div class="aspect-[1/1] overflow-hidden">
                        <img :src="member.photo" :alt="member.name" class="w-full h-full object-cover"
                            loading="lazy" />
                    </div>
                    <div class="px-[16px] py-[24px] md:py-[32px]">
                        <div class="member-name min-[1120px]:text-[48px] text-[28px] leading-[1.2] font-[600] text-white mb-[4px] md:mb-[8px] transition-colors duration-300">
                            {{ member.name }}
                        </div>
                        <div class="min-[1120px]:text-[20px] text-[16px] leading-[1.2] font-[500] text-[#0043FF] mb-[16px] md:mb-[24px]">
                            {{ member.role }}
                        </div>
                        <p class="min-[1120px]:text-[20px] text-[16px] leading-[1.6] text-[#7D86A1]">
                            {{ member.desc }}
                        </p>
                    </div>
                </div>
                <div v-if="index === 4 || index === 5" class="team-empty"></div>
            </template>
        </div>

        <!-- ========== 手机端：轮播 ========== -->
        <div class="md:hidden py-[28px]">

            <!-- 标题区 -->
            <div class="flex items-start gap-3 mb-[20px]">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M11.9391 17.2289L0.121826 24V19.0159L11.9391 12.2449V17.2289Z" fill="#0043FF" />
                    <path d="M11.6954 5.19165L0 12.2449V7.05325L11.6954 0V5.19165Z" fill="#0043FF" />
                    <path d="M24 5.19165L11.8173 12.2449V7.05325L24 0V5.19165Z" fill="#0043FF" />
                </svg>
                <h2 class="text-[40px] font-[600] leading-none">
                    领导团队
                </h2>
            </div>
            <p class="text-[16px] leading-[1.6] text-[#7D86A1] mb-[32px]">
                截至目前，麦炽已赋能数千家企业，业务足迹覆盖全球200多个国家和地区。我们凭借平均经验5年以上的资深专家团队，帮助中国企业从"走出去"到"扎下去"，实现可持续的全球化增长。
            </p>

            <!-- 轮播切换按钮 -->
            <div class="flex items-center justify-end gap-[20px] mb-[32px]">
                <button id="team-swiper-prev"
                    class="w-[40px] h-[40px] rounded bg-[#131416] flex items-center justify-center transition disabled:opacity-40"
                    aria-label="上一张">
                    <svg xmlns="http://www.w3.org/2000/svg" class=" w-[40px] h-[40px] md:w-[6.4rem] md:h-[6.4rem]"
                            viewBox="0 0 40 40" fill="none">
                            <path
                                d="M12.6675 19.2264H30L29.9779 20.7513H12.647L16.8952 25H14.9945L10 20.0109L15.0166 15H16.8731L12.6675 19.2264Z"
                                fill="#7D86A1" />
                        </svg>
                </button>

                <button id="team-swiper-next"
                    class="w-[40px] h-[40px] rounded bg-blue-600 flex items-center justify-center transition disabled:opacity-40"
                    aria-label="下一张">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 64 64" fill="none">
                        <path
                            d="M44.7321 30.7622H17L17.0354 33.2021H44.7649L37.9676 40H41.0088L49 32.0174L40.9735 24H38.003L44.7321 30.7622Z"
                            fill="white" />
                    </svg>
                </button>
            </div>

            <!-- 卡片轮播：1 屏 1.2 张 -->
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

            <!-- 进度条 -->
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
import { ref, nextTick } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation as SwiperNavigation } from 'swiper/modules'

import 'swiper/css'

const members = [
    { name: '韩宗良', role: '麦炽科技创始人&CEO', desc: '深耕AI出海，服务 MiniMax、美图、智谱AI等，年操盘广告预算超5000万美元', photo: 'https://cdn.shopify.com/s/files/1/0827/4552/4457/files/Frame_2117134140.png?v=1789986021' },
    { name: '韩宗良', role: '麦炽科技创始人&CEO', desc: '深耕AI出海，服务 MiniMax、美图、智谱AI等，年操盘广告预算超5000万美元', photo: 'https://cdn.shopify.com/s/files/1/0827/4552/4457/files/Frame_2117134140.png?v=1789986021' },
    { name: '韩宗良', role: '麦炽科技创始人&CEO', desc: '深耕AI出海，服务 MiniMax、美图、智谱AI等，年操盘广告预算超5000万美元', photo: 'https://cdn.shopify.com/s/files/1/0827/4552/4457/files/Frame_2117134140.png?v=1789986021' },
    { name: '韩宗良', role: '麦炽科技创始人&CEO', desc: '深耕AI出海，服务 MiniMax、美图、智谱AI等，年操盘广告预算超5000万美元', photo: 'https://cdn.shopify.com/s/files/1/0827/4552/4457/files/Frame_2117134140.png?v=1789986021' },
    { name: '韩宗良', role: '麦炽科技创始人&CEO', desc: '深耕AI出海，服务 MiniMax、美图、智谱AI等，年操盘广告预算超5000万美元', photo: 'https://cdn.shopify.com/s/files/1/0827/4552/4457/files/Frame_2117134140.png?v=1789986021' },
    { name: '韩宗良', role: '麦炽科技创始人&CEO', desc: '深耕AI出海，服务 MiniMax、美图、智谱AI等，年操盘广告预算超5000万美元', photo: 'https://cdn.shopify.com/s/files/1/0827/4552/4457/files/Frame_2117134140.png?v=1789986021' },
    { name: '韩宗良', role: '麦炽科技创始人&CEO', desc: '深耕AI出海，服务 MiniMax、美图、智谱AI等，年操盘广告预算超5000万美元', photo: 'https://cdn.shopify.com/s/files/1/0827/4552/4457/files/Frame_2117134140.png?v=1789986021' },
    { name: '韩宗良', role: '麦炽科技创始人&CEO', desc: '深耕AI出海，服务 MiniMax、美图、智谱AI等，年操盘广告预算超5000万美元', photo: 'https://cdn.shopify.com/s/files/1/0827/4552/4457/files/Frame_2117134140.png?v=1789986021' },
    { name: '韩宗良', role: '麦炽科技创始人&CEO', desc: '深耕AI出海，服务 MiniMax、美图、智谱AI等，年操盘广告预算超5000万美元', photo: 'https://cdn.shopify.com/s/files/1/0827/4552/4457/files/Frame_2117134140.png?v=1789986021' },
    { name: '韩宗良', role: '麦炽科技创始人&CEO', desc: '深耕AI出海，服务 MiniMax、美图、智谱AI等，年操盘广告预算超5000万美元', photo: 'https://cdn.shopify.com/s/files/1/0827/4552/4457/files/Frame_2117134140.png?v=1789986021' },
    { name: '韩宗良', role: '麦炽科技创始人&CEO', desc: '深耕AI出海，服务 MiniMax、美图、智谱AI等，年操盘广告预算超5000万美元', photo: 'https://cdn.shopify.com/s/files/1/0827/4552/4457/files/Frame_2117134140.png?v=1789986021' },
    { name: '韩宗良', role: '麦炽科技创始人&CEO', desc: '深耕AI出海，服务 MiniMax、美图、智谱AI等，年操盘广告预算超5000万美元', photo: 'https://cdn.shopify.com/s/files/1/0827/4552/4457/files/Frame_2117134140.png?v=1789986021' }
]

const swiperProgress = ref(0)

function onSwiper(swiper) {
    updateProgress(swiper)
    nextTick(() => {
        updateProgress(swiper)
    })
}

function onSlideChange(swiper) {
    updateProgress(swiper)
}

function updateProgress(swiper) {
    const total = members.length
    if (!total) {
        swiperProgress.value = 0
        return
    }

    const slidesPerView = Number(swiper.params.slidesPerView)
    if (slidesPerView >= total) {
        swiperProgress.value = 100
        return
    }

    // 初始已可见部分 + 滑动进度占剩余部分的比例
    const initialProgress = slidesPerView / total
    const maxMove = total - slidesPerView
    const currentMove = Math.min(swiper.activeIndex, maxMove)
    const moveProgress = maxMove > 0 ? currentMove / maxMove : 1
    const progress = initialProgress + moveProgress * (1 - initialProgress)

    swiperProgress.value = Math.min(100, Math.max(0, progress * 100))
}
</script>


<style scoped>
/* 轮播到两端时按钮置灰 */
#team-swiper-prev.swiper-button-disabled,
#team-swiper-next.swiper-button-disabled {
    opacity: 0.4;
    pointer-events: none;
}

/*@media (min-width: 768px) {
    .team-card:hover {
        border-color: #0043FF;
    }

    .team-card:hover .member-name {
        color: #0043FF;
    }
}*/
</style>
