<template>
    <div class="relative w-full px-[15px] md:px-[40px] xl:px-[120px] mt-[56px] md:mt-[120px] mb-[56px] md:mb-[120px] mx-auto text-[#131416] bg-white">
        <button @click="$router.back()" class="inline-flex items-center gap-[10px] text-[16px] md:text-[20px] text-[#7D86A1] hover:text-[#0043FF] transition-colors mb-[32px] md:mb-[64px] cursor-pointer">
            <svg width="6" height="12" viewBox="0 0 6 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.00792897 6.0069L3.45614 12L6 12L2.54781 6L6 -2.62268e-07L3.45614 -1.51073e-07L0.00792897 5.9931L0 5.9931L0.00395105 6L0 6.0069L0.00792897 6.0069Z" fill="#7D86A1"/>
            </svg>
            <span>{{ $t('jobs.backToList') }}</span>
        </button>

        <div v-if="isLoading" class="space-y-6 animate-pulse">
            <div class="h-10 bg-[#E5E7EB] rounded w-3/4"></div>
            <div class="h-4 bg-[#F3F4F6] rounded w-1/4"></div>
            <div class="h-40 bg-[#F9FAFB] rounded"></div>
        </div>

        <template v-else-if="career">
            <div class="pb-[32px] mb-[32px] md:pb-[64px] md:mb-[64px] border-b border-[#D9DDE8]">
                <h1 class="text-[40px] sm:text-[48px] md:text-[54px] lg:text-[72px] xl:text-[96px] font-semibold leading-[1.2] text-[#131416] mb-[16px] md:mb-[32px]">
                    {{ career.title }}
                </h1>
                <p class="text-[18px] md:text-[24px] xl:text-[32px] leading-[1.2] text-[#7D86A1]">
                    {{ career.type }} <span class="mx-1">|</span> {{ Array.isArray(career.city) ? career.city.join('/') : career.city }}
                </p>
            </div>

            <div class="jobs_description mb-[32px] md:mb-[64px] text-[#454C5F] leading-[1.5] md:text-[24px] text-[16px] prose max-w-none" v-html="career.description"></div>
            <a 
                :href="career.submissionLink || 'mailto:hr@example.com'" 
                target="_blank"
                class="inline-flex items-center justify-center md:px-[48px] md:py-[16px] bg-[#0043FF] text-white font-semibold md:text-[20px] rounded-[4px] hover:bg-[#103C93] transition-colors md:min-w-[280px] md:h-[64px] gap-[8px] min-w-[200px] h-[40px] px-[40px] mpy-[12px] text-[14px]"
            >
                {{ $t('jobs.apply') }}
                <svg width="6" height="12" viewBox="0 0 6 12" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-[4px] h-[8px] md:w-[6px] md:h-[12px]">
                    <path d="M5.99207 6.0069L2.54386 12L0 12L3.45219 6L0 -2.62268e-07L2.54386 -1.51073e-07L5.99207 5.9931L6 5.9931L5.99605 6L6 6.0069L5.99207 6.0069Z" fill="white"/>
                </svg>
            </a>
        </template>
        <ContactSection />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useI18n } from '#imports'
import ContactSection from '~/components/careers/ContactSection.vue';

const route = useRoute()
const { locale } = useI18n()
const { $pb } = useNuxtApp()

const career = ref(null)
const isLoading = ref(true)

const fetchDetail = async () => {
    isLoading.value = true
    try {
        const record = await $pb.collection('jobs').getOne(route.params.id)
        const isEn = locale.value === 'en'
        career.value = {
            title: isEn ? (record.job_title_en || record.job_title) : record.job_title,
            city: record.city || [],
            type: record.type || '',
            description: isEn ? (record.description_en || record.description) : record.description,
            submissionLink: record.submission_link || ''
        }
    } catch (error) {
        console.error('获取职位详情失败:', error)
    } finally {
        isLoading.value = false
    }
}

onMounted(() => {
    fetchDetail()
})
</script>
<style scoped>
.jobs_description :deep(h1){
    font-size: 40px;
    font-weight: 600;
    line-height: 120%;
    color: #131416;
    margin: 64px 0 32px;
}
.jobs_description :deep(h1):first-child{
    margin-top: 0;
}
.jobs_description :deep(ul) {
    list-style: none;
    padding-left: 0;
    margin: 16px 0;
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.jobs_description :deep(li) {
    position: relative;
    padding-left: 24px;
}

.jobs_description :deep(li::before) {
    content: '';
    position: absolute;
    left: 0;
    top: 0.65em;
    width: 8px;
    height: 8px;
    background-color: #0043FF;
    border-radius: 2px;
}
@media screen and (max-width: 768px) {
    .jobs_description :deep(h1){
        font-size: 28px;
        margin: 32px 0  16px;
    }
    .jobs_description :deep(h1):first-child{
        margin-top: 0;
    }
    .jobs_description :deep(ul) {
        gap: 8px;
    }
    .jobs_description :deep(li::before) {
        content: '';
        position: absolute;
        left: 0;
        top: 0.65em;
        width: 4px;
        height: 4px;
        background-color: #0043FF;
        border-radius: 2px;
    }
    .jobs_description :deep(li) {
        position: relative;
        padding-left: 12px;
    }
}
</style>