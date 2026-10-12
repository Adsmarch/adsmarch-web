<template>
    <div
        class="flex flex-col justify-between h-full px-[16px] py-[24px] transition-all duration-300 md:p-0 md:group-hover:bg-[#131416] md:px-[24px] md:py-[32px] md:group-hover:rounded-[4px] md:border-l-[1px] md:border-[#454C5F] bg-[#131416] rounded-[2px]">

        <div
            class="flex items-center justify-between md:mb-[96px] md:group-hover:mb-[30px] transition-[margin] duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none"
                class="text-[#fff] md:text-[#7D86A1] group-hover:text-[#fff] w-[8px] h-[8px] md:w-[20px] md:h-[20px]">
                <path d="M9.84772 14.3575L0.101523 20V15.8466L9.84772 10.2041V14.3575Z" fill="currentColor" />
                <path d="M9.74619 4.32637L0 10.2041V5.87771L9.74619 0V4.32637Z" fill="currentColor" />
                <path d="M20 4.32637L9.84772 10.2041V5.87771L20 0V4.32637Z" fill="currentColor" />
            </svg>
            <span class="text-[#fff] md:text-[#7D86A1] md:text-[20px] text-[12px] group-hover:text-[#fff] leading-none">
                {{ formattedDate }}
            </span>
        </div>

        <div>
            <p class="text-[#0043FF] text-[18px] md:text-[20px] lg:text-[24px] mt-[20px] font-[600]">
                {{ displayCategory }}
            </p>
            <div class="relative pb-[24px] md:pb-0">
                <h3 class="text-white text-[28px] md:text-[32px] lg:text-[40px] font-[600] leading-[120%] mt-[8px] md:mt-[12px] line-clamp-2">
                    {{ item.title }}
                </h3>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none"
                    class="absolute top-full left-0 mt-[8px] md:mt-[40px] w-[20px] h-[20px] md:w-[26px] md:h-[26px] transition-all duration-300 md:opacity-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0">
                    <path
                        d="M29 28.3812H27.2496V5.98803L4.23761 29L3 27.7624L26.012 4.75043H3.6188V3H28.1248L29 3.87521V28.3812Z"
                        fill="#0043FF" />
                </svg>
            </div>

            <img :src="item.image || fallbackImage" :alt="item.title" loading="lazy"
                class="w-full aspect-[3/2] object-cover rounded-[4px] mt-[24px] md:mt-[64px] pt-[32px] md:pt-0 md:aspect-auto md:h-[calc((100vw_-_240px)/2*0.625_-_15px)] lg:h-[calc((100vw_-_240px)/3*0.625_-_15px)] md:group-hover:mt-[130px] transition-[margin] duration-300" />
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    item: {
        type: Object,
        required: true
    }
})

const { te, t, locale } = useI18n()

const fallbackImage = 'https://via.placeholder.com/600x400/131416/ffffff?text=AdsMarch'

const displayCategory = computed(() => {
    if (!props.item?.category) return ''
    const key = `insightFilter.categories.${props.item.category}`
    return te(key) ? t(key) : props.item.category
})

const formattedDate = computed(() => {
    if (!props.item?.date) return ''
    
    try {
        const d = new Date(props.item.date)
        if (isNaN(d.getTime())) return props.item.date
        
        const year = d.getFullYear()
        const month = String(d.getMonth() + 1).padStart(2, '0')
        const day = String(d.getDate()).padStart(2, '0')
        
        return `${year}/${month}/${day}`
    } catch (e) {
        return props.item.date
    }
})
</script>