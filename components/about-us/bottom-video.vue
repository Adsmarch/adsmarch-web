<template>
    <div class="pb-12 lg:pb-20 px-[15px] lg:px-[120px] m-auto">

        <!-- ========== 标题 ========== -->
        <div class="flex items-start justify-end gap-3 mb-[32px] lg:mb-[64px]">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M11.9391 17.2289L0.121826 24V19.0159L11.9391 12.2449V17.2289Z" fill="#0043FF" />
                <path d="M11.6954 5.19165L0 12.2449V7.05325L11.6954 0V5.19165Z" fill="#0043FF" />
                <path d="M24 5.19165L11.8173 12.2449V7.05325L24 0V5.19165Z" fill="#0043FF" />
            </svg>
            <h2 class="text-[40px] lg:text-[96px] font-[600] text-right">
                与我们在此相遇
            </h2>
        </div>

        <!-- ========== 视频区 ========== -->
        <div class="relative w-full aspect-[16/9] lg:aspect-[21/9] bg-gray-900 rounded-lg overflow-hidden">

            <!-- 视频封面 / 视频 -->
            <img v-if="!cities[activeIndex].videoUrl" :src="cities[activeIndex].cover"
                :alt="cities[activeIndex].name"
                class="absolute inset-0 w-full h-full object-cover" />

            <video v-else :key="cities[activeIndex].videoUrl" ref="videoRef"
                :src="cities[activeIndex].videoUrl"
                playsinline preload="metadata"
                class="absolute inset-0 w-full h-full object-cover"
                @timeupdate="onVideoTimeUpdate"
                @play="isPlaying = true"
                @pause="isPlaying = false"
                @ended="isPlaying = false"
                @waiting="console.warn('[video] waiting 等待数据')"></video>

            <!-- 暗化遮罩 -->
            <div class="absolute inset-0 bg-black/20"></div>

            <!-- 播放按钮（仅有视频时显示） -->
            <button v-if="cities[activeIndex].videoUrl" @click="togglePlay"
                class="absolute inset-0 flex items-center justify-center group"
                aria-label="播放视频">
                <span v-if="!isPlaying"
                    class="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center group-hover:bg-black/60 transition">
                    <svg class="w-8 h-8 lg:w-10 lg:h-10 text-white translate-x-0.5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                    </svg>
                </span>
            </button>

            <!-- 底部进度条 -->
            <div class="absolute bottom-0 left-0 right-0 h-[3px] bg-gray-800/60">
                <div class="h-full bg-blue-600" :style="{ width: videoProgress + '%' }"></div>
            </div>
        </div>

        <!-- ========== 城市列表（PC：横向排列） ========== -->
        <div class="hidden lg:grid grid-cols-5 gap-3 mt-[40px]">
            <div v-for="(city, index) in cities" :key="index"
                @click="selectCity(index)"
                class="city-card cursor-pointer p-5 transition-all border-t-2"
                :class="{ 'active': activeIndex === index }">
                <div class="flex items-start justify-between mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path class="card-mark" d="M11.9391 17.2289L0.121826 24V19.0159L11.9391 12.2449V17.2289Z" />
                        <path class="card-mark" d="M11.6954 5.19165L0 12.2449V7.05325L11.6954 0V5.19165Z" />
                        <path class="card-mark" d="M24 5.19165L11.8173 12.2449V7.05325L24 0V5.19165Z" />
                    </svg>
                    <span class="card-num text-[20px] font-[600]">
                        0{{ index + 1 }}
                    </span>
                </div>
                <div class="card-name text-[32px] font-[600] mb-2">
                    {{ city.name }}
                </div>
                <p class="card-addr text-[20px] font-[400]">
                    {{ city.address }}
                </p>
            </div>
        </div>

        <!-- ========== 城市详情（手机端：上方显示当前城市） ========== -->
        <div class="lg:hidden mt-[32px] mb-[24px]">
            <h3 class="text-[32px]  font-[600] mb-[8px] text-white">
                {{ cities[activeIndex].name }}
            </h3>
            <p class="text-[16px] font-[400] text-[#7D86A1]">
                {{ cities[activeIndex].address }}
            </p>
        </div>

        <!-- ========== 城市切换（手机端：横向滚动） ========== -->
        <div class="lg:hidden mt-4">
            <Swiper :modules="[SwiperNavigation]" :slides-per-view="2.5" :space-between="8" :loop="false"
           
                class="w-full" @swiper="onSwiperInit" @slide-change="onSlideChange">

                <SwiperSlide v-for="(city, index) in cities" :key="index">
                    <div @click="selectCity(index)"
                        class="cursor-pointer px-[8px] py-[16px] transition-all"
                        :class="activeIndex === index
                             ? 'border-t-[#0043FF] border-t-[2px] bg-[#131416]'
                             : 'border-t-[#454C5F] border-t-[2px] bg-[#000] '">
                        <div class="flex items-center justify-between mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" fill="none" class="w-[10px] h-[10px] ">
                                <path d="M11.9391 17.2289L0.121826 24V19.0159L11.9391 12.2449V17.2289Z" :fill="activeIndex === index ? '#fff' : '#0043FF'" />
                                <path d="M11.6954 5.19165L0 12.2449V7.05325L11.6954 0V5.19165Z" :fill="activeIndex === index ? '#fff' : '#0043FF'" />
                                <path d="M24 5.19165L11.8173 12.2449V7.05325L24 0V5.19165Z" :fill="activeIndex === index ? '#fff' : '#0043FF'" />
                            </svg>
                            <span class="text-[14px]" :class="activeIndex === index ? 'text-[#fff]' : 'text-[#454C5F]'">
                                0{{ index + 1 }}
                            </span>
                        </div>
                        <div class="text-[20px] font-[600]" :class="activeIndex === index ? 'text-[#0043FF]' : 'text-[#fff]'">
                            {{ city.name }}
                        </div>
                    </div>
                </SwiperSlide>

            </Swiper>

            <!-- 底部进度条 -->
            <div class="mt-4 h-[3px] bg-gray-800 rounded-full overflow-hidden">
                <div class="h-full bg-blue-600 rounded-full transition-all duration-300"
                    :style="{ width: swiperProgress + '%' }"></div>
            </div>
        </div>

    </div>
</template>


<script setup>
import { ref, nextTick } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation as SwiperNavigation } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'


const cities = [
    {
        name: '北京',
        address: '地址信息占位 地址信息占位 地址信息占位 地址信息占位',
        cover: 'https://cdn.shopify.com/s/files/1/0702/5937/6290/files/11_5c23e45e-181d-431f-9f8d-06677bd08993.png?v=1789876538',
        videoUrl: 'https://cdn.shopify.com/videos/c/o/v/1e8f2fae04424e0f82379b10610a0da1.mp4'
    },
    {
        name: '济南',
        address: '地址信息占位 地址信息占位 地址信息占位 地址信息占位',
        cover: 'https://cdn.shopify.com/s/files/1/0827/4552/4457/files/image_298.png?v=1789637643',
        videoUrl: ''
    },
    {
        name: '上海',
        address: '地址信息占位 地址信息占位 地址信息占位 地址信息占位',
        cover: 'https://cdn.shopify.com/s/files/1/0827/4552/4457/files/image_298.png?v=1789637643',
        videoUrl: ''
    },
    {
        name: '西安',
        address: '地址信息占位 地址信息占位 地址信息占位 地址信息占位',
        cover: 'https://cdn.shopify.com/s/files/1/0827/4552/4457/files/image_298.png?v=1789637643',
        videoUrl: ''
    },
    {
        name: '南通',
        address: '地址信息占位 地址信息占位 地址信息占位 地址信息占位',
        cover: 'https://cdn.shopify.com/s/files/1/0827/4552/4457/files/image_298.png?v=1789637643',
        videoUrl: ''
    }
]


const activeIndex = ref(0)
const isPlaying = ref(false)
const videoProgress = ref(0)
const swiperProgress = ref(0)
const videoRef = ref(null)


function selectCity(index) {
    if (activeIndex.value === index) return
    activeIndex.value = index
    isPlaying.value = false
    videoProgress.value = 0
    if (videoRef.value) {
        videoRef.value.pause()
        videoRef.value.currentTime = 0
    }
}


function togglePlay() {
    const video = videoRef.value

    if (!video) return

    if (video.paused) {
        // play() 是异步的，需等 Promise 结果，失败时回滚状态
        video.play()
            .then(() => { isPlaying.value = true })
            .catch((err) => {
                isPlaying.value = false
            })
    } else {
        video.pause()
        isPlaying.value = false
    }
}


function onVideoTimeUpdate() {
    if (videoRef.value) {
        const progress = (videoRef.value.currentTime / videoRef.value.duration) * 100
        videoProgress.value = isNaN(progress) ? 0 : progress
    }
}


function updateSwiperProgress(swiper) {
    const total = cities.length
    const slidesPerView = Number(swiper.params.slidesPerView)
    const maxMove = total - slidesPerView
    if (maxMove <= 0) {
        swiperProgress.value = 100
        return
    }
    // 初始已可见部分 + 滑动进度占剩余部分的比例
    const initialProgress = slidesPerView / total
    const currentMove = Math.min(swiper.activeIndex, maxMove)
    const moveProgress = currentMove / maxMove
    swiperProgress.value = (initialProgress + moveProgress * (1 - initialProgress)) * 100
}

// 初始化时先算一次，保证未滑动时进度条也有初始进度
function onSwiperInit(swiper) {
    updateSwiperProgress(swiper)
    nextTick(() => {
        updateSwiperProgress(swiper)
    })
}

function onSlideChange(swiper) {
    activeIndex.value = swiper.realIndex
    updateSwiperProgress(swiper)
}
</script>

<style scoped>
/* PC 城市卡片：默认 / hover / 选中 */
.city-card {
    border-top-color: #454C5F;
    background: #000;
}

.city-card .card-mark {
    fill: #0043FF;
}

.city-card .card-num,
.city-card .card-name,
.city-card .card-addr {
    color: #7D86A1;
}

.city-card:hover,
.city-card.active {
    border-top-color: #0043FF;
    background: #131416;
}

.city-card:hover .card-mark,
.city-card.active .card-mark {
    fill: #fff;
}

.city-card:hover .card-num,
.city-card.active .card-num {
    color: #fff;
}

.city-card:hover .card-name,
.city-card.active .card-name {
    color: #0043FF;
}

.city-card:hover .card-addr,
.city-card.active .card-addr {
    color: #fff;
}
</style>