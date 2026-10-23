<template>
    <div class="bg-black text-white">
        <AboutTopSwiper :data="aboutData" :loading="loading" />
        <DevelopmentSwiper :data="aboutData" :loading="loading" />
        <LeaderTeam />
        <BottomVideo />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AboutTopSwiper from '@/components/about-us/aboutTopSwiper.vue'
import BottomVideo from '~/components/about-us/bottom-video.vue'
import DevelopmentSwiper from '~/components/about-us/developmentSwiper.vue'
import LeaderTeam from '~/components/about-us/leader-team.vue'

const { $pb } = useNuxtApp()
const loading = ref(true)
const aboutData = ref({})

onMounted(async () => {
    try {
        const records = await $pb.collection('about_us').getList(1, 1, {
            requestKey: null 
        })
        if (records.items.length > 0) {
            aboutData.value = records.items[0]
        }
    } catch (e) {
        console.error('获取 about_us 失败:', e)
    } finally {
        loading.value = false
    }
})
</script>