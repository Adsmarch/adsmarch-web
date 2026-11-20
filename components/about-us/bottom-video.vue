<template>
    <div class="pb-14 xl:pb-[120px] md:pb-[64px] px-[15px] lg:px-[120px] m-auto">
        <div 
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible-once="{ opacity: 1, y: 0, transition: { duration: 700, ease: 'easeOut' } }"
            class="flex items-start justify-end gap-3 mb-[32px] lg:mb-[64px]"
        >
            <h2 class="text-[40px] sm:text-[48px] md:text-[54px] lg:text-[72px] xl:text-[96px] font-semibold leading-[1.2] text-right">
                {{ $t('about.bottomVideo.title') }}
            </h2>
        </div>

        <div 
            v-motion
            :initial="{ opacity: 0, y: 40 }"
            :visible-once="{ opacity: 1, y: 0, transition: { duration: 800, delay: 150, ease: 'easeOut' } }"
            class="relative w-full md:w-[60%] m-auto aspect-[16/9] bg-gray-900 rounded-lg overflow-hidden"
        >
            <img v-if="!cities[activeIndex]?.videoUrl" :src="cities[activeIndex]?.cover"
                :alt="cities[activeIndex]?.name"
                class="absolute inset-0 w-full h-full object-cover" />

            <video v-else :key="cities[activeIndex]?.videoUrl" ref="videoRef"
                :src="cities[activeIndex]?.videoUrl"
                :poster="cities[activeIndex]?.cover || undefined"
                playsinline :preload="cities[activeIndex]?.cover ? 'metadata' : 'auto'"
                class="absolute inset-0 w-full h-full object-cover"
                @loadeddata="onVideoLoadedData"
                @timeupdate="onVideoTimeUpdate"
                @play="isPlaying = true"
                @pause="isPlaying = false"
                @ended="isPlaying = false"
                @waiting="console.warn('[video] waiting 等待数据')"></video>

            <div class="absolute inset-0 bg-black/20"></div>

            <button v-if="cities[activeIndex]?.videoUrl" @click="togglePlay"
                class="absolute inset-0 flex items-center justify-center group"
                :aria-label="$t('about.bottomVideo.play')">
                <span v-if="!isPlaying"
                    class="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center group-hover:bg-black/60 transition">
                    <svg class="w-8 h-8 lg:w-10 lg:h-10 text-white translate-x-0.5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                    </svg>
                </span>
            </button>

            <div class="absolute bottom-1 md:bottom-3 left-0 right-0 h-[3px] bg-white">
                <div class="h-full bg-blue-600" :style="{ width: videoProgress + '%' }"></div>
            </div>
        </div>

        <div class="hidden lg:grid grid-cols-5 gap-3 mt-[40px]">
            <div v-for="(city, index) in cities" :key="index"
                @click="selectCity(index)"
                v-motion
                :initial="{ opacity: 0, y: 30 }"
                :visible-once="{ 
                    opacity: 1, 
                    y: 0, 
                    transition: { 
                        duration: 600, 
                        delay: 300 + (index * 100),
                        ease: 'easeOut' 
                    } 
                }"
                class="city-card cursor-pointer p-5 transition-all border-t-2"
                :class="{ 'active': activeIndex === index }">
                <div class="flex items-start justify-between mb-3">
                    <span></span>
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
        <div 
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible-once="{ opacity: 1, y: 0, transition: { duration: 700, delay: 300, ease: 'easeOut' } }"
            class="lg:hidden"
        >
            <div class="mt-[32px] mb-[24px]">
                <h3 class="text-[32px]  font-[600] mb-[8px] text-white">
                    {{ cities[activeIndex]?.name }}
                </h3>
                <p class="text-[16px] font-[400] text-[#7D86A1]">
                    {{ cities[activeIndex]?.address }}
                </p>
            </div>

            <div class="mt-4">
                <Swiper :modules="[SwiperNavigation]" :slides-per-view="2.5" :space-between="8" :loop="false"
                   :breakpoints="{
                        768: {
                            slidesPerView: 3.5,
                            spaceBetween: 12
                        }
                    }" 
                    class="w-full" @swiper="onSwiperInit" @slide-change="onSlideChange">

                    <SwiperSlide v-for="(city, index) in cities" :key="index">
                        <div @click="selectCity(index)"
                            class="cursor-pointer px-[8px] py-[16px] transition-all"
                            :class="activeIndex === index
                                 ? 'border-t-[#0043FF] border-t-[2px] bg-[#131416]'
                                 : 'border-t-[#454C5F] border-t-[2px] bg-[#000] '">
                            <div class="flex items-center justify-between mb-2">
                                <span></span>
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

                <div class="mt-4 h-[3px] bg-gray-800 rounded-full overflow-hidden">
                    <div class="h-full bg-blue-600 rounded-full transition-all duration-300"
                        :style="{ width: swiperProgress + '%' }"></div>
                </div>
            </div>
        </div>

    </div>
</template>


<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation as SwiperNavigation } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'


const { $pb } = useNuxtApp()
const cities = ref([])

onMounted(async () => {
    try {
        const records = await $pb.collection('office_locations').getFullList({
            sort: 'created',
            requestKey: null
        })
        cities.value = records.map(r => ({
            name: r.city,
            address: r.address,
            cover: r.image ? $pb.files.getUrl(r, r.image) : '',
            videoUrl: (r.has_video && r.video) ? $pb.files.getUrl(r, r.video) : ''
        }))
    } catch (e) {
        console.error('Failed to fetch office locations:', e)
    }
})


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


function onVideoLoadedData() {
    const video = videoRef.value
    if (!video) return

    if (!cities.value[activeIndex.value]?.cover && video.currentTime === 0) {
        try {
            video.currentTime = 0.001
        } catch (e) {
            console.warn('[video] 首帧渲染失败:', e)
        }
    }
}


function onVideoTimeUpdate() {
    if (videoRef.value) {
        const progress = (videoRef.value.currentTime / videoRef.value.duration) * 100
        videoProgress.value = isNaN(progress) ? 0 : progress
    }
}


function updateSwiperProgress(swiper) {
    const total = cities.value.length
    if (!total) return
    const slidesPerView = Number(swiper.params.slidesPerView)
    const maxMove = total - slidesPerView
    if (maxMove <= 0) {
        swiperProgress.value = 100
        return
    }

    const initialProgress = slidesPerView / total
    const currentMove = Math.min(swiper.activeIndex, maxMove)
    const moveProgress = currentMove / maxMove
    swiperProgress.value = (initialProgress + moveProgress * (1 - initialProgress)) * 100
}

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