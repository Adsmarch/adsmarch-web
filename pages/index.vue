<template>
  <div>
    <HomeBanner />
    <HomeSwiper />
    <HomeSocialMedia />
    <HomeGlobalAcclaim />
  </div>
</template>
<script setup>
const { t } = useI18n()
useSeoMeta({
  title: () => t('seoMeta.title'),
  description: () => t('seoMeta.description')
})
</script>