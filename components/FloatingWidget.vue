<template>
  <div class="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
    <div 
      ref="consultRef"
      class="group relative"
      @click="toggleQr('consult')"
    >
      <button 
        class="w-14 h-14 xl:w-16 xl:h-16 bg-[#131416]/90 backdrop-blur-md rounded-lg flex flex-col items-center justify-center text-white hover:bg-[#0043FF] transition-colors cursor-pointer group-hover:bg-[#0043FF]"
        :class="{ 'bg-[#0043FF]': activeKey === 'consult' }"
        :aria-label="$t('floatWidget.consult')"
      >
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor">
          <path d="M10.0535 5.26723C13.301 3.72526 17.6213 3.55468 21.2053 4.95284C24.83 6.36689 27.7484 9.41412 27.9853 14.2724C28.2246 19.179 25.5007 22.4361 22.2813 24.5249C19.0808 26.6013 15.3084 27.5877 13.1707 28L12.8873 26.527C14.9472 26.1296 18.5008 25.1885 21.4654 23.2651C24.4109 21.354 26.692 18.5385 26.4876 14.3457C26.2841 10.1731 23.8279 7.58682 20.6604 6.35111C17.4524 5.09968 13.5623 5.26294 10.6966 6.62372L10.0535 5.26723ZM7.95223 8.61266C5.98176 10.6608 5.16325 13.3175 5.6268 15.7623C6.08674 18.1876 7.83015 20.5119 11.2056 21.8712L10.6453 23.2636C6.85572 21.7375 4.71983 19.0303 4.15318 16.0422C3.59024 13.0737 4.59733 9.93558 6.87118 7.57202L7.95223 8.61266Z" fill="white"/>
          <path d="M13.0806 14.8812V13.3804H11.2056V14.8812H13.0806Z" fill="white"/>
          <path d="M16.8708 14.8812V13.3804H14.9958V14.8812H16.8708Z" fill="white"/>
          <path d="M20.6208 14.975V13.4742H18.7458V14.975H20.6208Z" fill="white"/>
        </svg>

        <span class="text-xs text-center leading-tight mt-1">{{ $t('floatWidget.consult') }}</span>
      </button>

      <div 
        class="absolute right-full top-0 mr-3  p-1 bg-white rounded-xl shadow-2xl transition-all duration-200 flex-shrink-0 min-w-[80px] min-h-[80px] flex items-center justify-center pointer-events-none group-hover:pointer-events-auto"
        :class="[
          activeKey === 'consult' 
            ? 'opacity-100 visible pointer-events-auto' 
            : 'opacity-0 invisible lg:group-hover:opacity-100 lg:group-hover:visible'
        ]"
      >
        <div class="absolute -right-2 top-5 w-0 h-0 border-y-8 border-y-transparent border-l-8 border-l-white"></div>
        <img 
          src="../assets/image/consult.png" 
          :alt="$t('floatWidget.consultQr')" 
          class="w-20 h-20 xl:w-24 xl:h-24 block object-contain rounded-lg flex-shrink-0"
        />
      </div>
    </div>

    <div 
      ref="followRef"
      class="group relative"
      @click="toggleQr('follow')"
    >
      <button 
        class="w-14 h-14 xl:w-16 xl:h-16 bg-[#131416]/90 backdrop-blur-md rounded-lg flex flex-col items-center justify-center text-white hover:bg-[#0043FF] transition-colors cursor-pointer group-hover:bg-[#0043FF]"
        :class="{ 'bg-[#0043FF]': activeKey === 'follow' }"
        :aria-label="$t('floatWidget.follow')"
      >
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor">
          <path d="M11.8896 4C15.0561 4.00015 17.6917 6.29698 18.512 9.38127L17.081 9.7865C16.4212 7.30662 14.3279 5.53311 11.8896 5.53296C8.93806 5.53307 6.48371 8.14069 6.48352 11.4364C6.48356 12.4631 6.85496 13.4009 7.45623 14.3105C8.06396 15.2298 8.87428 16.0736 9.70597 16.9207C13.2913 20.572 15.1209 22.8662 16.0567 24.3403C16.1613 24.5051 16.2555 24.661 16.3401 24.8082C16.4372 24.6446 16.5472 24.4707 16.6698 24.285C17.0422 23.7214 17.5473 23.0387 18.2339 22.2083L19.3751 23.1882C18.7127 23.9882 18.2368 24.6319 17.8952 25.1488C17.4421 25.8348 17.2406 26.2772 17.1498 26.5489C17.0672 26.7964 17.071 26.9138 17.071 27H15.5875C15.5875 26.9115 15.5913 26.7921 15.5133 26.547C15.4281 26.2799 15.2394 25.8488 14.8159 25.1816C13.9656 23.8421 12.2226 21.6375 8.66442 18.0138C7.84313 17.1773 6.93138 16.2358 6.23083 15.1762C5.52386 14.1067 5.00004 12.8697 5 11.4364C5.00019 7.3652 8.05115 4.00011 11.8896 4Z" fill="white"/>
          <path d="M23.3719 18.652H26.7945V20.0998H23.3719V24.125H21.8703V20.0998H18.4477V18.652H21.8703V15.0208H23.3719V18.652Z" fill="white"/>
          <path d="M21.1104 4C24.9489 4 27.9998 7.36513 28 11.4364C27.9999 13.3803 27.0062 14.9725 25.8671 16.2871L24.8346 15.1762C25.8175 14.0244 26.5164 12.8226 26.5165 11.4364C26.5163 8.14062 24.062 5.53296 21.1104 5.53296C20.1321 5.53302 19.215 5.81692 18.4223 6.31441L17.6525 5.00419C18.6679 4.36693 19.8497 4.00006 21.1104 4Z" fill="white"/>
        </svg>

        <span class="text-xs text-center leading-tight mt-1">{{ $t('floatWidget.follow') }}</span>
      </button>

      <div 
        class="absolute right-full top-0 mr-3 p-1 bg-white rounded-xl shadow-2xl transition-all duration-200 flex-shrink-0 min-w-[80px] min-h-[80px] flex items-center justify-center pointer-events-none group-hover:pointer-events-auto"
        :class="[
          activeKey === 'follow' 
            ? 'opacity-100 visible pointer-events-auto' 
            : 'opacity-0 invisible lg:group-hover:opacity-100 lg:group-hover:visible'
        ]"
      >
        <div class="absolute -right-2 top-5 w-0 h-0 border-y-8 border-y-transparent border-l-8 border-l-white"></div>
        <img 
          src="../assets/image/adsmarch.png" 
          :alt="$t('floatWidget.followQr')" 
          class="w-20 h-20 xl:w-24 xl:h-24 block object-contain rounded-lg flex-shrink-0"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const activeKey = ref(null)
const consultRef = ref(null)
const followRef = ref(null)

const toggleQr = (key) => {
  if (window.matchMedia('(hover: none)').matches || window.innerWidth < 1024) {
    activeKey.value = activeKey.value === key ? null : key
  }
}

const handleClickOutside = (event) => {
  if (
    consultRef.value && !consultRef.value.contains(event.target) &&
    followRef.value && !followRef.value.contains(event.target)
  ) {
    activeKey.value = null
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>