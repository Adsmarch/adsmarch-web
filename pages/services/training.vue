<template>
  <div class="bg-black text-white min-h-screen">
    <AppBanner 
      v-if="pageData.title || bannerLoading"
      :data="pageData" 
      :iconUrl="bannerIconUrl" 
      :loading="bannerLoading" 
    />

    <AppServiceSwiper 
      v-if="(serviceItems && serviceItems.length > 0) || itemsLoading"
      :items="serviceItems" 
      :loading="itemsLoading" 
    />

    <TrainingSystem 
      :items="trainingItems" 
      :loading="trainingLoading" 
    />

    <CaseStudySection 
      v-if="(caseList && caseList.length > 0) || casesLoading"
      :cases="caseList" 
      :sectionTitle="pageData.cases_section_name"
      :loading="casesLoading" 
    />
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute } from '#imports'
import PocketBase from 'pocketbase'

import AppBanner from '@/components/services/AppBanner.vue'
import AppServiceSwiper from '@/components/services/AppServiceSwiper.vue'
import TrainingSystem from '@/components/services/TrainingSystem.vue'
import CaseStudySection from '@/components/services/CaseStudySection.vue'

const route = useRoute()
const pb = new PocketBase('https://api.adsmarch.bot.cd')

const bannerLoading = ref(true)
const itemsLoading = ref(true)
const casesLoading = ref(true)
const trainingLoading = ref(true)

const pageData = ref({})
const bannerIconUrl = ref('')
const serviceItems = ref([])
const caseList = ref([])
const trainingItems = ref([])

const currentSlug = ref('training')

const fetchPageData = async () => {
  bannerLoading.value = true
  itemsLoading.value = true
  casesLoading.value = true
  trainingLoading.value = true

  pageData.value = {}
  bannerIconUrl.value = ''
  serviceItems.value = []
  caseList.value = []
  trainingItems.value = []

  try {
    const record = await pb.collection('service_main').getFirstListItem('slug="training"', {
      expand: 'icon,items,cases,partners'
    })

    if (record) {
      pageData.value = record

      if (record.expand?.icon && record.expand.icon.media_file) {
        bannerIconUrl.value = pb.files.getUrl(record.expand.icon, record.expand.icon.media_file)
      } else if (record.icon && typeof record.icon === 'string') {
        bannerIconUrl.value = pb.files.getUrl(record, record.icon)
      }

      if (record.expand?.items) {
        serviceItems.value = record.expand.items.map(item => ({
          ...item,
          image: (item.image && typeof item.image === 'string') ? pb.files.getUrl(item, item.image) : ''
        }))
      }

      if (record.expand?.cases) {
        caseList.value = record.expand.cases.map(c => ({
          ...c,
          coverImage: (c.cover_image && typeof c.cover_image === 'string') ? pb.files.getUrl(c, c.cover_image) : '',
          videoUrl: (c.has_video && c.video && typeof c.video === 'string') ? pb.files.getUrl(c, c.video) : ''
        }))
      }
    }

    const trainingRecords = await pb.collection('service_training').getFullList({
      sort: 'created', 
      requestKey: null
    })
    trainingItems.value = trainingRecords || []

  } catch (err) {
    if (err?.status !== 404) {
      console.warn('获取页面数据提示:', err?.message || err)
    }
  } finally {
    bannerLoading.value = false
    itemsLoading.value = false
    casesLoading.value = false
    trainingLoading.value = false 
  }
}

watch(() => route.params.slug, () => {
  fetchPageData()
})

onMounted(() => {
  fetchPageData()
})
</script>