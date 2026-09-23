<template>
  <div>
    <h1 class="text-2xl font-bold p-4">首页测试</h1>
    <HomeSwiper />
    <a href="/about-us">关于我们</a>
  <div class="min-h-screen bg-slate-100 flex flex-col items-center justify-center space-y-6">
    <div class="p-8 bg-white rounded-2xl shadow-xl border border-slate-200 text-center max-w-md w-full">
      <h1 class="text-3xl font-bold text-slate-800 mb-4">
        {{ $t('welcome') }}
      </h1>
      
      <div class="flex justify-center space-x-4">
        <button 
          @click="setLocale('zh')" 
          class="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-200 shadow-md active:scale-95">
          中文
        </button>
        <button 
          @click="setLocale('en')" 
          class="px-4 py-2 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition duration-200 shadow-md active:scale-95">
          English
        </button>
      </div>
    </div>
  </div>
   </div>
</template>

<script setup>
const { setLocale } = useI18n()
</script>