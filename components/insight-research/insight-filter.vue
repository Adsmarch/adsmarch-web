<template>
    <div ref="containerRef" class="py-[56px] md:py-[120px]">
        <div 
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible-once="{ opacity: 1, y: 0, transition: { duration: 700, ease: 'easeOut' } }"
            class="flex md:gap-[24px] gap-[12px] mb-[32px] md:mb-[64px]"
        >
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
                <div v-if="categoriesLoading" class="flex flex-wrap gap-[12px] md:gap-[24px] animate-pulse">
                    <div v-for="n in 4" :key="'sk-cat-' + n" class="h-[38px] md:h-[46px] w-[96px] bg-[#26282C] rounded-[4px]"></div>
                </div>

                <div v-else class="flex flex-wrap gap-[12px] md:gap-[24px]">
                    <button
                    v-for="cat in categories"
                    :key="cat.value"
                    type="button"
                    @click="toggleCategory(cat.value)"
                    class="px-[16px] py-[8px] rounded-[4px] text-[14px] md:text-[20px] transition-colors font-[400] cursor-pointer"
                    :class="pendingSelected.includes(cat.value) ? 'bg-[#0043FF] text-white' : 'bg-[#131416] text-white hover:bg-[#0043FF]'"
                    >
                    {{ getCategoryLabel(cat) }}
                    </button>
                </div>

                <div class="grid grid-cols-2 md:flex md:justify-end md:gap-[21px] gap-[12px] mt-[32px]">
                    <button type="button" @click="clearAll"
                    class="h-[40px] px-[24px] bg-[#26282C] text-white text-[14px] md:text-[20px] font-[600] rounded-[4px] hover:bg-[#33363B] transition-colors cursor-pointer">
                    {{ $t('insightFilter.clearAll') }}
                    </button>
                    <button type="button" @click="applyFilter"
                    class="h-[40px] px-[24px] bg-[#0043FF] text-white text-[14px] md:text-[20px] font-[600] rounded-[4px] hover:bg-[#103C93] active:scale-[0.98] transition cursor-pointer">
                    {{ $t('insightFilter.showResults') }}
                    </button>
                </div>
                </div>
            </div>

        <div v-if="loading" class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-y-[32px] md:gap-x-[24px] md:items-start animate-pulse">
            <div 
                v-for="i in 6" 
                :key="i"
                class="flex flex-col justify-between h-full insight-card bg-[#131416] p-[16px] md:p-0 rounded-[4px] md:rounded-none md:bg-transparent md:relative md:border-b md:border-[#454C5F] md:pb-[32px]"
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

        <div v-else-if="visibleList.length > 0" class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-y-[32px] md:items-start md:gap-x-[24px]"
            :class="{'mt-[120px]': sortOpen}"
        >
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
                class="flex flex-col justify-between h-full insight-card group bg-[#131416] rounded-[4px] md:rounded-none md:bg-transparent md:relative"
            >
                <InsightItem :item="item" />
            </NuxtLink>
        </div>

        <hr class="border-[#454C5F] my-[32px] md:hidden">
        <div v-if="totalPages > 1" class="flex items-center justify-center gap-[8px] md:gap-[16px] mt-[40px] md:mt-[64px]">
            <button
                type="button"
                @click="handlePageChange(page - 1)"
                :disabled="page <= 1 || loading"
                aria-label="Previous page"
                class="group w-8 h-8 xl:w-12 xl:h-12 flex items-center justify-center transition cursor-pointer focus:outline-none rounded-[4px]"
            >
                <svg data-v-35d9e7ef="" class="w-full h-full" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><rect data-v-35d9e7ef="" width="64" height="64" rx="4" fill="#131416" class="transition-colors duration-200 group-hover:fill-[#103C93]"></rect><path data-v-35d9e7ef="" d="M20.2679 30.7622H48L47.9646 33.2021H20.2351L27.0324 40H23.9912L16 32.0174L24.0265 24H26.997L20.2679 30.7622Z" fill="#7D86A1" class="transition-colors duration-200 group-hover:fill-white"></path></svg>
            </button>

            <template v-for="(item, idx) in paginationItems" :key="'page-' + idx">
                <span
                    v-if="item === '...'"
                    class="w-8 h-8 xl:w-12 xl:h-12 flex items-center justify-center text-[#FFFFFF] text-[14px] md:text-[20px] select-none"
                >
                    ...
                </span>
                <button
                    v-else
                    type="button"
                    @click="handlePageChange(item)"
                    :disabled="loading"
                    class="w-8 h-8 xl:w-12 xl:h-12 flex items-center justify-center text-[14px] md:text-[20px] font-[600] transition-colors cursor-pointer"
                    :class="page === item
                        ? ' text-[#0043FF] hover:text-[#0043FF]'
                        : 'text-white'"
                >
                    {{ item }}
                </button>
            </template>

            <button
                type="button"
                @click="handlePageChange(page + 1)"
                :disabled="page >= totalPages || loading"
                aria-label="Next page"
                class="group w-8 h-8 xl:w-12 xl:h-12 flex items-center justify-center transition cursor-pointer focus:outline-none rounded-[4px]"
            >
               <svg data-v-35d9e7ef="" class="w-full h-full" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><rect data-v-35d9e7ef="" width="64" height="64" rx="4" fill="#0043FF" class="transition-colors duration-200 group-hover:fill-[#103C93]"></rect><path data-v-35d9e7ef="" d="M44.7321 30.7622H17L17.0354 33.2021H44.7649L37.9676 40H41.0088L49 32.0174L40.9735 24H38.003L44.7321 30.7622Z" fill="white"></path></svg>
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
const { t, locale } = useI18n()
import InsightItem from './insight-item.vue'

const { $pb } = useNuxtApp()
const localePath = useLocalePath()

const containerRef = ref(null)

const sortOptions = ['featured', 'latest', 'hottest']
const categories = ref([])
const categoriesLoading = ref(false)

const expanded = ref(false)
const sortOpen = ref(false)
const sortBy = ref('latest')
const selected = ref([])
const pendingSelected = ref([])

const rawList = ref([])
const page = ref(1)
const totalPages = ref(1)
const loading = ref(false)

const perPage = 6

function isZhLocale() {
    return String(locale.value || '').toLowerCase().startsWith('zh')
}

function formatFallbackText(val = '') {
    return String(val)
        .replace(/[-_]+/g, ' ')
        .replace(/\b\w/g, ch => ch.toUpperCase())
}

function getCategoryLabel(cat) {
    if (!cat) return ''
    if (typeof cat === 'object') {
        if (isZhLocale()) {
            return (cat.zh && cat.zh.trim()) || formatFallbackText(cat.value)
        }
        return formatFallbackText(cat.value)
    }
    return formatFallbackText(cat)
}

async function fetchCategories() {
    categoriesLoading.value = true
    const map = new Map()

    try {
        const publishedItems = await $pb.collection('blogs').getFullList({
            filter: 'status = "published"',
            fields: 'category,category_zh',
            requestKey: null
        })

        publishedItems.forEach(item => {
            const value = typeof item?.category === 'string' ? item.category.trim() : ''
            if (!value) return

            const zh = typeof item?.category_zh === 'string' ? item.category_zh.trim() : ''
            if (!map.has(value)) {
                map.set(value, { value, zh })
            } else if (zh && !map.get(value).zh) {
                map.get(value).zh = zh
            }
        })

        categories.value = Array.from(map.values())

        const validValues = new Set(categories.value.map(c => c.value))
        selected.value = selected.value.filter(v => validValues.has(v))
        pendingSelected.value = pendingSelected.value.filter(v => validValues.has(v))
    } catch (e) {
        console.error('获取分类列表失败:', e)
    } finally {
        categoriesLoading.value = false
    }
}

async function fetchBlogs(targetPage = 1) {
    loading.value = true

    try {
        let filterStr = 'status = "published"'

        if (selected.value.length > 0) {
            const catFilters = selected.value
                .map(c => `category = "${String(c).replace(/"/g, '\\"')}"`)
                .join(' || ')
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

        const resultList = await $pb.collection('blogs').getList(targetPage, perPage, {
            filter: filterStr,
            sort: sortStr,
            requestKey: null
        })

        rawList.value = resultList.items
        page.value = resultList.page || targetPage
        totalPages.value = resultList.totalPages || 1
    } catch (e) {
        console.error('获取博客列表失败:', e)
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    fetchCategories()
    fetchBlogs(1)
})

watch(sortBy, () => {
    fetchBlogs(1)
})

const visibleList = computed(() => {
    const isEn = locale.value === 'en'
    return rawList.value.map(r => ({
        id: r.id,
        slug: r.slug,
        date: r.publish_date || r.created,
        category: r.category,
        category_zh: r.category_zh || '',
        title: isEn && r.title_en ? r.title_en : r.title,
        shortdesc: isEn && r.shortdesc_en ? r.shortdesc_en : r.shortdesc,
        author: isEn && r.author_en ? r.author_en : r.author,
        is_featured: r.is_featured || false,
        views: r.views || 0,
        image: r.cover_image
            ? `https://api.adsmarch.bot.cd/api/files/${r.collectionId}/${r.id}/${r.cover_image}`
            : ''
    }))
})

const paginationItems = computed(() => {
    const total = totalPages.value
    const current = page.value

    if (total <= 5) {
        return Array.from({ length: total }, (_, i) => i + 1)
    }

    if (current < 3) {
        return [1, 2, 3, '...', total]
    }

    if (current >= total - 2) {
        return [1, '...', total - 2, total - 1, total]
    }

    return [current - 1, current, current + 1, '...', total]
})

async function handlePageChange(targetPage) {
    if (loading.value || targetPage === page.value || targetPage < 1 || targetPage > totalPages.value) return
    await fetchBlogs(targetPage)

    if (containerRef.value && import.meta.client) {
        const top = containerRef.value.getBoundingClientRect().top + window.scrollY - 80
        window.scrollTo({ top, behavior: 'smooth' })
    }
}

function setSort(opt) {
    sortBy.value = opt
    sortOpen.value = false
}

function toggleCategory(catValue) {
    const i = pendingSelected.value.indexOf(catValue)
    if (i >= 0) pendingSelected.value.splice(i, 1)
    else pendingSelected.value.push(catValue)
}

function clearAll() {
    pendingSelected.value = []
}

function applyFilter() {
    selected.value = [...pendingSelected.value]
    expanded.value = false
    fetchBlogs(1)
}
</script>

<style scoped>
@media screen and (min-width: 1024px) {
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