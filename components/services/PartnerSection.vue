<template>
  <section class="relative w-full bg-black text-white px-[15px] md:px-[40px] xl:px-[120px] pb-[56px] md:pb-[120px] overflow-hidden select-none">
    <div class="flex flex-col md:flex-row items-stretch justify-between gap-10 md:gap-12 lg:gap-20">
      <div class="w-full md:w-auto md:order-2 flex flex-col justify-between items-start shrink-0">
        
        <div class="w-full flex items-center justify-between md:justify-start gap-6">
          
          <div class="block md:hidden shrink-0">
            <div class="relative w-[80px] h-[80px] flex items-center justify-center">
              <svg 
                class="w-full h-full animate-[spin_12s_linear_infinite]" 
                viewBox="0 0 200 200"
              >
                <defs>
                  <path
                    id="textCircleM"
                    d="M 100, 100 m -65, 0 a 65,65 0 1,1 130,0 a 65,65 0 1,1 -130,0"
                  />
                </defs>
                <text fill="#FFFFFF" class="text-[23px] font-normal tracking-[0.05em]">
                  <textPath href="#textCircleM" startOffset="0%">
                    AdsMarch&#160;&#160;&#160;&#160;AdsMarch&#160;&#160;&#160;&#160;AdsMarch&#160;&#160;&#160;&#160;
                  </textPath>
                </text>
              </svg>
              <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
                <img src="/logo-icon.svg" alt="Logo Icon" class="w-8 h-8 object-contain" />
              </div>
            </div>
          </div>

          <div class="relative pt-2">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" class="absolute top-0 right-0 w-4 h-4 md:w-8 md:h-8 z-10">
                <path d="M16.2437 22.9719L31.8376 32V25.3546L16.2437 16.3265V22.9719Z" fill="#0043FF"/>
                <path d="M16.4061 6.92219L32 16.3265V9.40434L16.4061 0V6.92219Z" fill="#0043FF"/>
                <path d="M0 6.92219L16.2437 16.3265V9.40434L0 0V6.92219Z" fill="#0043FF"/>
            </svg>

            <h2 class="text-[40px] sm:text-[48px] md:text-[54px] lg:text-[72px] xl:text-[96px] font-semibold leading-[1.2] whitespace-pre-line tracking-tight md:mr-[32px]">
              {{ $t('partner.title') }}
            </h2>
          </div>
        </div>

        <div class="hidden md:flex justify-end w-full mt-auto pb-4">
          <div class="shrink-0">
            <div class="relative w-[160px] h-[160px] xl:w-[200px] xl:h-[200px] flex items-center justify-center">
              <svg 
                class="w-full h-full animate-[spin_12s_linear_infinite]" 
                viewBox="0 0 200 200"
              >
                <defs>
                  <path
                    id="textCirclePC"
                    d="M 100, 100 m -65, 0 a 65,65 0 1,1 130,0 a 65,65 0 1,1 -130,0"
                  />
                </defs>
                <text fill="#FFFFFF" class="text-[23px] font-normal tracking-[0.05em]">
                  <textPath href="#textCirclePC" startOffset="0%">
                    AdsMarch&#160;&#160;&#160;&#160;AdsMarch&#160;&#160;&#160;&#160;AdsMarch&#160;&#160;&#160;&#160;
                  </textPath>
                </text>
              </svg>
              <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
                <img src="/logo-icon.svg" alt="Logo Icon" class="w-12 h-12 xl:w-16 xl:h-16 object-contain" />
              </div>
            </div>
          </div>
        </div>

      </div>

    <div class="w-full md:w-[62%] md:order-1">
    <div class="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-1 md:gap-y-4 gap-x-1 md:gap-x-4 items-center justify-items-center py-4 md:py-8 border-y border-[#454C5F]">
        <div 
        v-for="(logo, index) in partnerLogos" 
        :key="index"
        class="w-[112px] h-[64px] md:w-[120px] md:h-[80px] lg:w-[200px] lg:h-[200px] xl:w-[160px] xl:h-[160px] 2xl:w-[200px] 2xl:h-[200px] relative overflow-hidden flex items-center justify-center group"
        >
        <img 
            :src="logo" 
            :alt="`Partner ${index + 1}`" 
            class="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-300" 
        />
        </div>
    </div>
    </div>

    </div>
  </section>
</template>

<script setup>
import p1 from '@/assets/image/app/partner-01.svg'
import p2 from '@/assets/image/app/partner-02.svg'
import p3 from '@/assets/image/app/partner-03.svg'
import p4 from '@/assets/image/app/partner-04.svg'
import p5 from '@/assets/image/app/partner-05.svg'
import p6 from '@/assets/image/app/partner-06.svg'
import p7 from '@/assets/image/app/partner-07.svg'
import p8 from '@/assets/image/app/partner-08.svg'
import p9 from '@/assets/image/app/partner-09.svg'
import p10 from '@/assets/image/app/partner-10.svg'
import p11 from '@/assets/image/app/partner-11.svg'
import p12 from '@/assets/image/app/partner-12.svg'
import p13 from '@/assets/image/app/partner-13.svg'
import p14 from '@/assets/image/app/partner-14.svg'
import p15 from '@/assets/image/app/partner-15.svg'

const partnerLogos = [
  p1, p2, p3, p4, p5,
  p6, p7, p8, p9, p10,
  p11, p12, p13, p14, p15
]
</script>

<style scoped></style>