<template>
    <div class="pt-[56px] md:pt-[120px] pb-[0] md:pb-[0]">
        <div 
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible-once="{ opacity: 1, y: 0, transition: { duration: 700, ease: 'easeOut' } }"
            class="flex flex-col md:flex-row md:items-end md:justify-between gap-4 pt-[0] md:pt-[120px] mb-[32px] md:mb-[48px]"
        >
            <div class="flex items-start gap-3 xl:gap-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" class="shrink-0 mt-1 md:mt-2">
                    <path d="M11.9391 17.2289L0.121826 24V19.0159L11.9391 12.2449V17.2289Z" fill="#0043FF" />
                    <path d="M11.6954 5.19165L0 12.2449V7.05325L11.6954 0V5.19165Z" fill="#0043FF" />
                    <path d="M24 5.19165L11.8173 12.2449V7.05325L24 0V5.19165Z" fill="#0043FF" />
                </svg>
                <h2 class="text-[40px] sm:text-[48px] md:text-[54px] lg:text-[72px] xl:text-[84px] 2xl:text-[96px] font-semibold leading-[1.2]">
                    {{ $t('careers.recruitItem.title') }}
                </h2>
            </div>
        </div>

        <div v-if="!loading && visibleList.length > 0">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                <NuxtLink 
                    v-for="(item, index) in visibleList" 
                    :key="item.id"
                    :to="{ 
                        path: localePath(`/articles/${item.slug || item.id}`), 
                        query: { collection: 'recruit_blogs' } 
                    }"
                    v-motion
                    :initial="{ opacity: 0, y: 40 }"
                    :visible-once="{ 
                        opacity: 1, 
                        y: 0, 
                        transition: { 
                            duration: 600, 
                            delay: (index % 3) * 120,
                            ease: 'easeOut' 
                        } 
                    }"
                    class="group bg-[#F2F4F7] md:bg-white md:border-l md:border-[#D9DDE8] p-4 mb-3 md:px-4 md:py-6 xl:px-6 xl:py-8 flex flex-col justify-between transition cursor-pointer relative"
                >
                    <div>
                        <div class="w-full aspect-[16/10] rounded-[4px] overflow-hidden mb-5 xl:mb-10 bg-[#E5E9F0]">
                            <img 
                                :src="item.image || fallbackImage" 
                                :alt="item.title" 
                                class="w-full h-full object-cover transition duration-500 group-hover:scale-105" 
                                loading="lazy" 
                            />
                        </div>

                        <div class="flex items-start gap-3 flex-col">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" class="shrink-0 mt-1.5">
                                <path d="M11.9391 17.2289L0.121826 24V19.0159L11.9391 12.2449V17.2289Z" fill="#0043FF" />
                                <path d="M11.6954 5.19165L0 12.2449V7.05325L11.6954 0V5.19165Z" fill="#0043FF" />
                                <path d="M24 5.19165L11.8173 12.2449V7.05325L24 0V5.19165Z" fill="#0043FF" />
                            </svg>
                            <h3 class="text-[20px] md:text-[24px] xl:text-[32px] font-semibold leading-[1.2] text-[#131416] group-hover:text-[#0043FF] transition line-clamp-2">
                                {{ item.title }}
                            </h3>
                        </div>
                    </div>

                    <div class="flex justify-start mt-8 md:mt-10 xl:mt-16">
                        <div class="rounded flex items-center justify-center transition group-hover:translate-x-2 group-hover:-translate-y-1">
                           <svg width="32" height="32" viewBox="0 0 32 32" fill="none" class="w-5 h-5 md:w-6 md:h-6 xl:w-8 xl:h-8">
                                <path d="M29 28.3812H27.2496V5.98803L4.23761 29L3 27.7624L26.012 4.75043H3.6188V3H28.1248L29 3.87521V28.3812Z" fill="#0043FF"/>
                            </svg>
                        </div>
                    </div>
                </NuxtLink>
            </div>

            <div v-if="hasMore" class="flex justify-center mt-[40px] md:mt-[64px]">
                <button 
                    @click="loadMore"
                    class="md:px-[56px] md:py-[16px] w-[160px] h-[40px] md:w-[240px] md:h-[64px] bg-[#0043FF] text-white md:text-[20px] text-[14px] font-[600] rounded-[4px] hover:bg-[#103C93]"
                >
                    {{ loadingMore ? $t('insights.loading'): $t('insights.loadMore') }}
                </button>
            </div>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse">
            <div 
                v-for="i in 3" 
                :key="i"
                v-motion
                :initial="{ opacity: 0, y: 30 }"
                :visible-once="{ 
                    opacity: 1, 
                    y: 0, 
                    transition: { 
                        duration: 500, 
                        delay: (i - 1) * 100, 
                        ease: 'easeOut' 
                    } 
                }"
                class="p-4 bg-[#F2F4F7] md:bg-white rounded-[4px]"
            >
                <div class="w-full aspect-[16/10] bg-[#E5E9F0] rounded-[4px] mb-5"></div>
                <div class="h-[24px] bg-[#E5E9F0] rounded-[4px] w-[80%] mb-2"></div>
                <div class="h-[24px] bg-[#E5E9F0] rounded-[4px] w-[50%]"></div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const { $pb } = useNuxtApp()
const { t, locale } = useI18n()
const localePath = useLocalePath()

const rawList = ref([])
const loading = ref(false)
const currentPage = ref(1)
const totalPages = ref(1)
const fallbackImage = 'https://via.placeholder.com/600x400/131416/ffffff?text=AdsMarch'

async function fetchBlogs(page = 1) {
    if (page === 1) {
        loading.value = true
    }
    try {
       const result = await $pb.collection('recruit_blogs').getList(page, 3, {
            filter: 'status = "published"',
            sort: '-top,-publish_date',
            requestKey: null
        })
        
        if (page === 1) {
            rawList.value = result.items
        } else {
            rawList.value = [...rawList.value, ...result.items]
        }
        totalPages.value = result.totalPages
    } catch (e) {
        console.error('获取博客列表失败:', e)
    } finally {
        if (page === 1) {
            loading.value = false
        }
    }
}

onMounted(() => {
    fetchBlogs(1)
})

const visibleList = computed(() => {
    const isEn = locale.value === 'en'
    return rawList.value.map(r => ({
        id: r.id,
        slug: r.slug,
        title: isEn && r.title_en ? r.title_en : r.title,
        image: r.cover_image 
            ? `https://api.adsmarch.bot.cd/api/files/${r.collectionId}/${r.id}/${r.cover_image}`
            : ''
    }))
})

const hasMore = computed(() => {
    return currentPage.value < totalPages.value
})

function loadMore() {
    if (currentPage.value < totalPages.value) {
        currentPage.value++
        fetchBlogs(currentPage.value)
    }
}
</script>

<style scoped>
</style>