<template>
    <div class="text-[#131416] w-full px-[15px] md:px-[40px] xl:px-[120px] m-auto">
        <ResumeForm />
    </div>
</template>

<script setup>
import ResumeForm from '~/components/resume/resume-form.vue';
const { t } = useI18n()
useSeoMeta({
  title: () => `${t('resume.title')} | ${t('seoMeta.title')}`,
  description: () => t('seoMeta.description')
})
</script>
