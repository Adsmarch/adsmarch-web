<template>
    <div class="bg-black w-full">
      <div class="text-white px-[15px] md:px-[40px] xl:px-[120px] pb-[64px] md:pb-[120px] m-auto max-w-site">
        <Honors />
        <IndustryRecognition />
      </div>
    </div>
</template>

<script setup>
import Honors from '~/components/awards-honors/honors.vue';
import IndustryRecognition from '~/components/awards-honors/industry-recognition.vue';
const { t } = useI18n()

useSeoMeta({
  title: () => t('seoMeta.awards_title'),
  description: () => t('seoMeta.description')
})

</script>
<style scoped></style>

