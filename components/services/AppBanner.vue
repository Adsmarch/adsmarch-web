<template>
  <section class="relative w-full bg-black text-white py-[56px] md:pt-[120px] md:pb-[120px] overflow-hidden">
    <div class="flex flex-col md:flex-row md:items-start justify-between gap-8 lg:gap-16 xl:gap-[120px] px-[15px] md:px-[40px] xl:px-[120px]">
      
      <div class="flex items-start gap-3 xl:gap-6 shrink-0">
        <!-- 左上角小 SVG Icon -->
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" class="w-6 h-6 md:w-8 md:h-8 shrink-0 mt-2">
          <path d="M15.7563 22.9719L0.162437 32V25.3546L15.7563 16.3265V22.9719Z" fill="#0043FF"/>
          <path d="M15.5939 6.92219L0 16.3265V9.40434L15.5939 0V6.92219Z" fill="#0043FF"/>
          <path d="M32 6.92219L15.7563 16.3265V9.40434L32 0V6.92219Z" fill="#0043FF"/>
        </svg>
        <h1 class="text-[40px] sm:text-[48px] md:text-[54px] lg:text-[72px] xl:text-[96px] font-semibold leading-[1.2] whitespace-nowrap">
          {{ $t('appBanner.title') }}
        </h1>
      </div>

      <div class="flex flex-col w-full md:w-[50%] lg:w-[43%] md:max-w-[720px] shrink-0 md:space-y-8">
        
        <div class="hidden md:block shrink-0 w-[160px]">
          <svg width="168" height="168" viewBox="0 0 168 168" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full block">
            <path d="M101.82 4.00085L44.2785 120.202M22.1991 164.001L30.5403 146.971M164 120.202H122.655M4 120.202H95.7536M144 164.001L95.7536 65.0009M64.6635 4.00085L83.6014 40.6114" stroke="#0043FF" stroke-width="8" stroke-linecap="round"/>
          </svg>
        </div>

        <div class="space-y-3 md:space-y-6">
          <h2 class="text-[24px] sm:text-[32px] md:text-[40px] font-semibold leading-[120%]">
            {{ $t('appBanner.subtitle') }}
          </h2>
          <p class="text-[16px] sm:text-[18px] md:text-[20px] xl:text-[24px] leading-[150%] text-white font-[400]">
            {{ $t('appBanner.description') }}
          </p>
        </div>

        <div class="block md:hidden self-end shrink-0 pt-2">
          <svg width="72" height="72" viewBox="0 0 72 72" fill="none" class="w-full h-full block">
            <path d="M46.019 2.00049L20.1253 54.291M10.1896 74.0005L13.9431 66.3369M74 54.291H55.3948M2 54.291H43.2891M65 74.0005L43.2891 29.4505M29.2986 2.00049L37.8206 18.4752" stroke="#0043FF" stroke-width="4" stroke-linecap="round"/>
          </svg>
        </div>

      </div>

    </div>
  </section>
</template>