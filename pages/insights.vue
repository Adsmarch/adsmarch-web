<template>
  <div class="bg-[#000] w-full">
    <div class="px-[15px] md:px-[40px] xl:px-[120px] m-auto text-white max-w-site mx-auto">
      <InsightFilter />
    </div>
  </div>
</template>

<script setup>
import InsightFilter from '~/components/insight-research/insight-filter.vue';
const { t } = useI18n()

useSeoMeta({
  title: () => t('seoMeta.insights_title'),
  description: () => t('seoMeta.description')
})
</script>
<style scoped></style>