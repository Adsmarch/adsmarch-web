<template>
  <section class="relative w-full px-[15px] md:px-[40px] xl:px-[120px] h-[calc(100vh-72px)] xl:h-[calc(100vh-96px)] overflow-hidden bg-black text-white flex items-center">
    <div class="absolute inset-0 z-0">
      <video
        autoplay
        loop
        muted
        playsinline
        class="md:hidden w-full h-full object-cover"
      >
        <source src="@/assets/image/home-bg-m.mp4" type="video/mp4" />
      </video>
      
      <video
        autoplay
        loop
        muted
        playsinline
        class="hidden md:block w-full h-full object-cover"
      >
        <source src="@/assets/image/home-bg-pc.mp4" type="video/mp4" />
      </video>
      <div class="absolute inset-0 bg-black/40"></div>
    </div>

    <div class="relative z-10 w-full mx-auto h-full flex flex-col justify-between ">
      <div class="mt-[56px] md:mt-[120px] max-w-[980px]">
        <h1 class="text-[40px] sm:text-[48px] md:text-[64px] xl:text-[96px] font-semibold leading-[1.2]">
          {{ $t('homeBanner.title') }}
        </h1>
      </div>

      <div class="flex items-center md:flex-row md:items-end justify-between gap-8 mb-[56px] md:mb-[120px]">
        <div class="shrink-0">
          <div class="relative w-[80px] h-[80px] md:w-[200px] md:h-[200px] flex items-center justify-center">
            <svg 
              class="w-full h-full animate-[spin_12s_linear_infinite]" 
              viewBox="0 0 200 200"
            >
              <defs>
                <path
                  id="textCircle"
                  d="M 100, 100 m -65, 0 a 65,65 0 1,1 130,0 a 65,65 0 1,1 -130,0"
                />
              </defs>
              <text fill="#FFFFFF" class="text-[23px] font-normal tracking-[0.05em]">
                <textPath href="#textCircle" startOffset="0%">
                  AdsMarch&#160;&#160;&#160;&#160;AdsMarch&#160;&#160;&#160;&#160;AdsMarch&#160;&#160;&#160;&#160;
                </textPath>
              </text>
            </svg>
            <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
              <img src="/logo-icon.svg" alt="Logo Icon" class="w-8 h-8 md:w-16 md:h-16 object-contain" />
            </div>
          </div>
        </div>

        <div class="max-w-[520px] space-y-6 md:space-y-8">
          <p class="text-[20px] sm:text-[24px] xl:text-[32px] text-white leading-[1.4] font-normal">
            {{ $t('homeBanner.subtitle') }}
          </p>

          <div>
            <NuxtLinkLocale
              to="/contact"
              class="inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:px-8 sm:py-4 bg-[#0043FF] text-white text-[14px] sm:text-[20px] font-semibold rounded hover:bg-[#0038E0] transition-colors duration-200 w-auto min-w-[120px] sm:w-[240px] h-[40px] sm:h-[64px]"
            >
              <span>{{ $t('homeBanner.btn') }}</span>
              <svg width="6" height="12" viewBox="0 0 6 12" fill="none" class="w-1.5 h-2.5 sm:w-2 sm:h-3 ml-1">
                <path d="M5.99207 6.0069L2.54386 12L0 12L3.45219 6L0 -2.62268e-07L2.54386 -1.51073e-07L5.99207 5.9931L6 5.9931L5.99605 6L6 6.0069L5.99207 6.0069Z" fill="white"/>
              </svg>
            </NuxtLinkLocale>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>