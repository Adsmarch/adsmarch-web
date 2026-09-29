<template>
  <section class="relative w-full bg-black text-white py-12 md:pt-[120px] md:pb-[60px] overflow-hidden">
    <div class="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-12 md:mb-16 px-[15px] md:px-[40px] xl:px-[120px]">
      
      <h2 class="text-[40px] sm:text-[48px] md:text-[54px] lg:text-[72px] xl:text-[96px] font-semibold leading-[1.2]">
        {{ $t('homeSocialMedia.title') }}
      </h2>

      <div class="flex items-start gap-3 xl:gap-6 justify-end">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="shrink-0 w-[12px] h-[12px] xl:w-[32px] xl:h-[32px]">
          <path d="M15.7563 22.9719L0.162437 32V25.3546L15.7563 16.3265V22.9719Z" fill="#0043FF"/>
          <path d="M15.5939 6.92219L0 16.3265V9.40434L15.5939 0V6.92219Z" fill="#0043FF"/>
          <path d="M32 6.92219L15.7563 16.3265V9.40434L32 0V6.92219Z" fill="#0043FF"/>
        </svg>
        
        <div class="w-[70%] xl:w-[auto]">
          <i18n-t 
            keypath="homeSocialMedia.subtitle" 
            tag="div" 
            class="text-[28px] sm:text-[32px] md:text-[42px] lg:text-[52px] xl:text-[64px] font-semibold leading-[1.2] mb-3"
          >
            <template #count>
              <span class="text-[#0043FF] font-semibold">200+</span>
            </template>
          </i18n-t>

          <p class="text-[#0043FF] text-[18px] sm:text-[24px] xl:text-[40px] font-semibold">
            {{ $t('homeSocialMedia.tag') }}
          </p>
        </div>
      </div>

    </div>

    <div class="relative w-full overflow-hidden mask-gradient">
      <div class="marquee-container">
        <div class="marquee-content animate-marquee-left">
          <template v-for="n in 2" :key="`row1-${n}`">
            <div 
              v-for="(imgSrc, index) in row1Images" 
              :key="`r1-${n}-${index}`" 
              class="marquee-item"
            >
              <img 
                :src="imgSrc" 
                :alt="`media-icon-${index + 1}`" 
                class="w-[200px] h-[80px] xl:w-auto xl:h-auto object-contain transition-all duration-300"
              />
            </div>
          </template>
        </div>
      </div>

      <div class="marquee-container">
        <div class="marquee-content animate-marquee-right">
          <template v-for="n in 2" :key="`row2-${n}`">
            <div 
              v-for="(imgSrc, index) in row2Images" 
              :key="`r2-${n}-${index}`" 
              class="marquee-item"
            >
              <img 
                :src="imgSrc" 
                :alt="`media-icon-${index + 7}`" 
                class="w-[200px] h-[80px] xl:w-auto xl:h-auto object-contain transition-all duration-300"
              />
            </div>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const allImagesMap = import.meta.glob('@/assets/image/social-media-icon-*.{png,jpg,svg,webp}', {
  eager: true,
  import: 'default'
})

const sortedImages = computed(() => {
  return Object.keys(allImagesMap)
    .sort((a, b) => {
      const numA = parseInt(a.match(/social-media-icon-(\d+)/)?.[1] || '0', 10)
      const numB = parseInt(b.match(/social-media-icon-(\d+)/)?.[1] || '0', 10)
      return numA - numB
    })
    .map(key => allImagesMap[key])
})

const row1Images = computed(() => sortedImages.value.slice(0, 8))
const row2Images = computed(() => sortedImages.value.slice(8, 16))
</script>

<style scoped>
.marquee-container {
  display: flex;
  overflow: hidden;
  user-select: none;
  width: 100%;
}

.marquee-content {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: space-around;
  min-width: 100%;
}
.marquee-item {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.animate-marquee-left {
  animation: marquee-left 25s linear infinite;
}

.animate-marquee-right {
  animation: marquee-right 25s linear infinite;
}

.marquee-container:hover .marquee-content {
  animation-play-state: paused;
}

@keyframes marquee-left {
  0% { transform: translateX(0%); }
  100% { transform: translateX(-50%); }
}

@keyframes marquee-right {
  0% { transform: translateX(-50%); }
  100% { transform: translateX(0%); }
}

.mask-gradient {
  mask-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 1) 12%,
    rgba(0, 0, 0, 1) 88%,
    rgba(0, 0, 0, 0) 100%
  );
  -webkit-mask-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 1) 12%,
    rgba(0, 0, 0, 1) 88%,
    rgba(0, 0, 0, 0) 100%
  );
}
</style>