<template>
    <div class="bg-black w-full">
      <div class="max-w-site m-auto px-[15px] md:px-[40px] xl:px-[120px] text-white">
        <ContactUs />
      </div>
    </div>
</template>

<script setup>
import ContactUs from '~/components/contact-us.vue';
const { t } = useI18n()

useSeoMeta({
  title: () => t('seoMeta.contact_title'),
  description: () => t('contact.subtitle')
})
</script>
<style scoped></style>
