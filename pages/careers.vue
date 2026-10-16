<template>
    <div class="bg-white text-[#131416] px-[15px] md:px-[40px] xl:px-[120px] pb-[64px] md:pb-[120px] m-auto overflow-hidden">
        <Join />
        <Life />
        <EmployeeQuotes />
        <RecruitItem />
        <ContactSection />
    </div>
</template>

<script setup>
import Join from '~/components/careers/Join.vue';
import Life from '~/components/careers/Life.vue';
import EmployeeQuotes from '~/components/careers/EmployeeQuotes.vue';
import RecruitItem from '~/components/careers/RecruitItem.vue';
import ContactSection from '~/components/careers/ContactSection.vue';
</script>