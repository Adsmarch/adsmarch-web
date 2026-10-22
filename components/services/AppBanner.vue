<template>
  <section class="relative w-full bg-black text-white py-[56px] md:pt-[120px] md:pb-[120px] overflow-hidden">
    <div v-if="loading" class="flex flex-col md:flex-row md:items-start justify-between gap-8 lg:gap-16 xl:gap-[120px] px-[15px] md:px-[40px] xl:px-[120px] animate-pulse">
      <div class="flex items-start gap-3 xl:gap-6 shrink-0 w-full md:w-[40%]">
        <div class="w-8 h-8 bg-[#2A2F3D] rounded shrink-0 mt-2"></div>
        <div class="w-full h-24 bg-[#2A2F3D] rounded"></div>
      </div>
      <div class="flex flex-col w-full md:w-[50%] lg:w-[43%] space-y-6">
        <div class="hidden md:block w-[160px] h-[160px] bg-[#2A2F3D] rounded"></div>
        <div class="w-3/4 h-10 bg-[#2A2F3D] rounded"></div>
        <div class="w-full h-20 bg-[#2A2F3D] rounded"></div>
      </div>
    </div>

    <div 
      v-else 
      v-motion
      :initial="{ opacity: 0, y: 50 }"
      :visible-once="{ opacity: 1, y: 0, transition: { duration: 300, ease: 'easeOut' } }"
      class="flex flex-col md:flex-row md:items-start justify-between gap-8 lg:gap-16 xl:gap-[120px] px-[15px] md:px-[40px] xl:px-[120px] opacity-0"
    >
      <div class="flex items-start gap-3 xl:gap-6 shrink-0">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" class="w-6 h-6 md:w-8 md:h-8 shrink-0 mt-2">
          <path d="M15.7563 22.9719L0.162437 32V25.3546L15.7563 16.3265V22.9719Z" fill="#0043FF"/>
          <path d="M15.5939 6.92219L0 16.3265V9.40434L15.5939 0V6.92219Z" fill="#0043FF"/>
          <path d="M32 6.92219L15.7563 16.3265V9.40434L32 0V6.92219Z" fill="#0043FF"/>
        </svg>
        <h1 class="text-[40px] sm:text-[48px] md:text-[54px] lg:text-[72px] xl:text-[96px] font-semibold leading-[1.2] whitespace-nowrap">
          {{ displayTitle }}
        </h1>
      </div>

      <div class="flex flex-col w-full md:w-[50%] lg:w-[43%] md:max-w-[720px] shrink-0 md:space-y-8">
        <div v-if="iconUrl" class="hidden md:block shrink-0 w-[160px] h-[160px]">
          <img :src="iconUrl" alt="Banner Icon" class="w-full h-full object-contain block" />
        </div>
        <div class="space-y-3 md:space-y-6">
          <h2 class="text-[24px] sm:text-[32px] md:text-[40px] font-semibold leading-[120%]">
            {{ displaySubtitle }}
          </h2>
          <p class="text-[16px] sm:text-[18px] md:text-[20px] xl:text-[24px] leading-[150%] text-white font-[400]">
            {{ displayDescription }}
          </p>
        </div>
        <div v-if="iconUrl" class="block md:hidden self-end shrink-0 pt-2 w-[72px] h-[72px]">
          <img :src="iconUrl" alt="Banner Icon" class="w-full h-full object-contain block" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  data: { type: Object, default: () => ({}) },
  iconUrl: { type: String, default: '' },
  loading: { type: Boolean, default: false }
})

const { locale } = useI18n()
const isEn = computed(() => locale.value?.startsWith('en'))

const displayTitle = computed(() => isEn.value ? (props.data.title_en || props.data.title) : props.data.title)
const displaySubtitle = computed(() => isEn.value ? (props.data.subtitle_en || props.data.subtitle) : props.data.subtitle)
const displayDescription = computed(() => isEn.value ? (props.data.description_en || props.data.description) : props.data.description)
</script>