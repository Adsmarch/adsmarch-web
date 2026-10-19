<template>
    <div class="py-[56px] md:py-[120px]">
        <div 
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible-once="{ opacity: 1, y: 0, transition: { duration: 700, ease: 'easeOut' } }"
            class="flex md:gap-[24px] gap-[12px] mb-[32px] md:mb-[64px]"
        >
            <img :src="icon" alt="" class="w-[16px] h-[16px] md:w-[32px] md:h-[32px]">
            <p class="text-[40px] sm:text-[52px] md:text-[64px] xl:text-[96px] font-semibold leading-[1.2]">
                {{ $t('insightFilter.title') }}
            </p>
        </div>

        <div 
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible-once="{ opacity: 1, y: 0, transition: { duration: 700, delay: 150, ease: 'easeOut' } }"
            class="border-t border-b border-[#454C5F] my-[32px] md:my-[64px]"
        >
            <div class="flex items-center justify-between md:py-[32px] py-[20px]">
                <button type="button" @click="expanded = !expanded"
                    class="flex items-center md:gap-[8px] gap-[4px] text-white text-[16px] md:text-[24px]">
                    <span class="w-[16px] md:w-[28px] text-center leading-none">{{ expanded ? '—' : '+' }}</span>
                    <span>{{ $t('insightFilter.filter') }}</span>
                    <span v-if="!expanded && selected.length" class="text-[#7D86A1]">({{ selected.length }})</span>
                </button>

                <div class="relative">
                    <button type="button" @click="sortOpen = !sortOpen"
                        class="flex items-center gap-[8px] text-[16px] md:text-[24px]">
                        <span class="text-[#7D86A1]">{{ $t('insightFilter.sortBy') }}</span>
                        <span class="text-white">{{ $t(`insightFilter.sortOptions.${sortBy}`) }}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none"
                            class="text-[#7D86A1] transition-transform duration-200"
                            :class="sortOpen ? 'rotate-180' : ''">
                            <path d="M2 4L6 8L10 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                                stroke-linejoin="round" />
                        </svg>
                    </button>

                    <div v-if="sortOpen"
                        class="absolute right-0 top-full mt-[8px] z-20 min-w-[120px] bg-[#131416] border border-[#454C5F] rounded-[4px] py-[8px]">
                        <button v-for="opt in sortOptions" :key="opt" type="button" @click="setSort(opt)"
                            class="w-full text-left px-[16px] py-[8px] text-[14px] transition-colors"
                            :class="sortBy === opt ? 'text-[#0043FF]' : 'text-white hover:bg-[#1A1B1E]'">
                            {{ $t(`insightFilter.sortOptions.${opt}`) }}
                        </button>
                    </div>
                </div>
            </div>

            <div v-if="expanded" class="pb-[20px] md:pb-[32px] pt-[20px] md:pt-[32px] border-t border-[#454C5F]">
                <div class="flex flex-wrap gap-[12px] md:gap-[24px]">
                    <button v-for="cat in categories" :key="cat" type="button" @click="toggleCategory(cat)"
                        class="px-[16px] py-[8px] rounded-[4px] text-[14px] md:text-[20px] transition-colors font-[400]"
                        :class="pendingSelected.includes(cat) ? 'bg-[#0043FF] text-white' : 'bg-[#131416] text-white hover:bg-[#0043FF]'">
                        {{ $t(`insightFilter.categories.${cat}`) }}
                    </button>
                </div>

                <div class="grid grid-cols-2 md:flex md:justify-end md:gap-[21px] gap-[12px] mt-[32px]">
                    <button type="button" @click="clearAll"
                        class="h-[40px] px-[24px] bg-[#26282C] text-white text-[14px] md:text-[20px] font-[600] rounded-[4px] hover:bg-[#33363B] transition-colors">
                        {{ $t('insightFilter.clearAll') }}
                    </button>
                    <button type="button" @click="applyFilter"
                        class="h-[40px] px-[24px] bg-[#0043FF] text-white text-[14px] md:text-[20px] font-[600] rounded-[4px] hover:bg-[#103C93] active:scale-[0.98] transition">
                        {{ $t('insightFilter.showResults') }}
                    </button>
                </div>
            </div>
        </div>

        <div v-if="!loading && visibleList.length > 0" class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-y-[32px] md:items-start">
            <NuxtLink 
                v-for="(item, index) in visibleList" 
                :key="item.id" 
                :to="localePath(`/articles/${item.slug || item.id}`)"
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
                class="flex flex-col justify-between h-full insight-card group block bg-[#131416] rounded-[4px] md:rounded-none md:bg-transparent md:relative md:pr-[24px] md:border-b md:border-[#454C5F] md:pb-[32px]"
            >
                <InsightItem :item="item" />
            </NuxtLink>
        </div>

        <div v-else class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-y-[32px] md:items-start animate-pulse">
            <div 
                v-for="i in 6" 
                :key="i"
                v-motion
                :initial="{ opacity: 0, y: 30 }"
                :visible-once="{ 
                    opacity: 1, 
                    y: 0, 
                    transition: { 
                        duration: 500, 
                        delay: (i - 1) * 80, 
                        ease: 'easeOut' 
                    } 
                }"
                class="flex flex-col justify-between h-full insight-card bg-[#131416] p-[16px] md:p-0 rounded-[4px] md:rounded-none md:bg-transparent md:relative md:pr-[24px] md:border-b md:border-[#454C5F] md:pb-[32px]"
            >
                <div class="flex flex-col flex-1">
                    <div class="flex items-center justify-between mb-[16px]">
                        <div class="h-[18px] bg-[#26282C] rounded-[2px] w-[80px]"></div>
                        <div class="h-[16px] bg-[#26282C] rounded-[2px] w-[90px]"></div>
                    </div>

                    <div class="space-y-[8px] mb-[16px]">
                        <div class="h-[24px] md:h-[28px] bg-[#26282C] rounded-[4px] w-[95%]"></div>
                        <div class="h-[24px] md:h-[28px] bg-[#26282C] rounded-[4px] w-[65%]"></div>
                    </div>

                    <div class="space-y-[6px] mb-[24px] flex-1">
                        <div class="h-[14px] md:h-[16px] bg-[#26282C] rounded-[2px] w-full"></div>
                        <div class="h-[14px] md:h-[16px] bg-[#26282C] rounded-[2px] w-[90%]"></div>
                        <div class="h-[14px] md:h-[16px] bg-[#26282C] rounded-[2px] w-[40%]"></div>
                    </div>

                    <div class="flex items-center justify-between mb-[20px]">
                        <div class="h-[14px] bg-[#26282C] rounded-[2px] w-[70px]"></div>
                        <div class="h-[14px] bg-[#26282C] rounded-[2px] w-[60px]"></div>
                    </div>
                </div>

                <div class="w-full aspect-[16/9] bg-[#26282C] rounded-[4px]"></div>
            </div>
        </div>

        <hr class="border-[#454C5F] my-[32px] md:hidden">      
        <div v-if="hasMore" class="flex justify-center mt-[40px] md:mt-[64px]">
            <button type="button" @click="loadMore"
                class="px-[56px] py-[16px] bg-[#0043FF] text-white md:text-[20px] text-[14px] font-[600] rounded-[4px] hover:bg-[#103C93] active:scale-[0.98] transition duration-200">
                {{ $t('insights.loadMore') }}
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
const { t, locale, setLocale } = useI18n()
import InsightItem from './insight-item.vue'
import icon from '~/assets/Union.png'

const { $pb } = useNuxtApp()
const localePath = useLocalePath()

const sortOptions = ['featured', 'latest', 'hottest']
const categories = ref(['tips', 'research', 'report'])

const expanded = ref(false)
const sortOpen = ref(false)
const sortBy = ref('latest') 
const selected = ref([])
const pendingSelected = ref([])

const rawList = ref([])
const page = ref(1)
const totalPages = ref(1)
const loading = ref(false)

const isMobile = ref(false)
if (process.client) {
    isMobile.value = window.innerWidth < 768
    window.addEventListener('resize', () => {
        isMobile.value = window.innerWidth < 768
    })
}
const perPage = computed(() => isMobile.value ? 5 : 6)

async function fetchBlogs(isLoadMore = false) {
    loading.value = true
    try {
        let filterStr = 'status = "published"'
        
        if (selected.value.length > 0) {
            const catFilters = selected.value.map(c => `category = "${c}"`).join(' || ')
            filterStr += ` && (${catFilters})`
        }

        let sortStr = '-publish_date'
        if (sortBy.value === 'featured') {
            sortStr = '-is_featured,-publish_date'
        } else if (sortBy.value === 'latest') {
            sortStr = '-publish_date'
        } else if (sortBy.value === 'hottest') {
            sortStr = '-views'
        }

        const currentPage = isLoadMore ? page.value + 1 : 1
        
        const resultList = await $pb.collection('blogs').getList(currentPage, perPage.value, {
            filter: filterStr,
            sort: sortStr
        })

        if (isLoadMore) {
            rawList.value = [...rawList.value, ...resultList.items]
            page.value = currentPage
        } else {
            rawList.value = resultList.items
            page.value = 1
        }

        totalPages.value = resultList.totalPages
    } catch (e) {
        console.error('获取博客列表失败:', e)
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    fetchBlogs()
})

watch(sortBy, () => {
    fetchBlogs(false)
})

const visibleList = computed(() => {
    return rawList.value.map(r => {
        const isEn = locale.value === 'en'
        return {
            id: r.id,
            slug: r.slug,
            date: r.publish_date || r.created,
            category: r.category,
            title: isEn && r.title_en ? r.title_en : r.title,
            shortdesc: isEn && r.shortdesc_en ? r.shortdesc_en : r.shortdesc,
            author: isEn && r.author_en ? r.author_en : r.author,
            is_featured: r.is_featured || false,
            views: r.views || 0,
            image: r.cover_image 
                ? `https://api.adsmarch.bot.cd/api/files/${r.collectionId}/${r.id}/${r.cover_image}`
                : ''
        }
    })
})

const hasMore = computed(() => page.value < totalPages.value)

function loadMore() {
    if (!loading.value && hasMore.value) {
        fetchBlogs(true)
    }
}

function setSort(opt) {
    sortBy.value = opt
    sortOpen.value = false
}

function toggleCategory(cat) {
    const i = pendingSelected.value.indexOf(cat)
    if (i >= 0) pendingSelected.value.splice(i, 1)
    else pendingSelected.value.push(cat)
}

function clearAll() {
    pendingSelected.value = []
}

function applyFilter() {
    selected.value = [...pendingSelected.value]
    expanded.value = false
    fetchBlogs(false)
}
</script>

<style scoped>
@media screen and (min-width: 1024px) {
    .insight-card:nth-child(3n){
        padding-right: 0;
    }
    .insight-card:nth-child(3n) :deep(.col-line),
    .insight-card:last-child :deep(.col-line) {
        display: none;
    }
}
@media screen and (min-width: 768px) and (max-width: 1023px) {
    .insight-card:nth-child(2n){
        padding-right: 0;
    }
    .insight-card:nth-child(2n) :deep(.col-line),
    .insight-card:last-child :deep(.col-line) {
        display: none;
    }
}
</style>