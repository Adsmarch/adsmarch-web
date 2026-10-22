<template>
  <div class="relative w-full bg-black text-white py-12 px-4 md:px-12">
    <div v-if="loading" class="animate-pulse space-y-4">
      <div class="h-8 bg-[#2A2F3D] rounded w-1/4"></div>
      <div class="h-32 bg-[#131416] rounded w-full"></div>
    </div>

    <div v-else>
      <h2 class="text-2xl font-bold mb-4">training页面</h2>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
</style>