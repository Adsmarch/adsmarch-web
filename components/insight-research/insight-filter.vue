<template>
    <div class=" py-[56px] md:py-[120px]">
        <div class="flex md:gap-[24px] gap-[12px] mb-[32px] md:mb-[64px]">
            <img :src="icon" alt="" class="w-[16px] h-[16px] md:w-[32px] md:h-[32px]">
            <p class="text-[40px] font-[600]  md:text-[96px]">{{ $t('insightFilter.title') }}</p>
        </div>

        <!-- 筛选栏 -->
        <div class="border-t border-b border-[#454C5F] my-[32px] md:my-[64px]">
            <!-- 头部：展开切换 + 排序 -->
            <div class="flex items-center justify-between md:py-[32px] py-[20px]">
                <button type="button" @click="expanded = !expanded"
                    class="flex items-center md:gap-[8px] gap-[4px] text-white text-[16px] md:text-[24px]">
                    <span class="w-[16px] md:w-[28px] text-center leading-none ">{{ expanded ? '—' : '+' }}</span>
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
                    <!-- 排序下拉 -->
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

            <!-- 展开内容 -->
            <div v-if="expanded" class="pb-[20px] md:pb-[32px] pt-[20px] md:pt-[32px] border-t border-[#454C5F]">
                <div class="flex flex-wrap gap-[12px] md:gap-[24px]">
                    <button v-for="cat in categories" :key="cat" type="button" @click="toggleCategory(cat)"
                        class="px-[16px] py-[8px] rounded-[4px] text-[14px] md:text-[20px] transition-colors font-[400]"
                        :class="pendingSelected.includes(cat) ? 'bg-[#0043FF] text-white' : 'bg-[#131416] text-white hover:bg-[#0043FF]'">
                        {{ cat }}
                    </button>
                </div>
<!-- 结果按钮 -->
                <div class="grid grid-cols-2 md:flex md:justify-end md:gap-[21px] gap-[12px] mt-[32px]">
                    <button type="button" @click="clearAll"
                        class="h-[40px] px-[24px] bg-[#26282C] text-white text-[14px] md:text-[20px] font-[600] rounded-[4px] hover:bg-[#33363B] transition-colors">
                        {{ $t('insightFilter.clearAll') }}
                    </button>
                    <button type="button" @click="applyFilter"
                        class="h-[40px] px-[24px] bg-[#0043FF] text-white text-[14px] md:text-[20px] font-[600] rounded-[4px] hover:bg-[#0037D4] active:scale-[0.98] transition">
                        {{ $t('insightFilter.showResults') }}
                    </button>
                </div>
            </div>
        </div>
        <!-- 筛选结果列表 -->
        <div class="grid md:grid-cols-3 grid-cols-1 gap-y-[32px] md:items-start">
            <NuxtLink v-for="item in visibleList" :key="item.id" :to="`/insight/${item.id}`"
                class="flex flex-col justify-between h-full insight-card group block bg-[#131416] rounded-[4px] md:rounded-none md:bg-transparent md:relative md:pr-[24px] md:border-b md:border-[#454C5F] md:pb-[32px]">
                <InsightItem :item="item" />
            </NuxtLink>
        </div>

        <!-- 加载更多 -->
        <hr class="border-[#454C5F] my-[32px] md:hidden">
        <div v-if="hasMore" class="flex justify-center mt-[40px] md:mt-[64px]">
            <button type="button" @click="loadMore"
                class="px-[56px] py-[16px] bg-[#0043FF] text-white md:text-[20px] text-[14px] font-[600] rounded-[4px] hover:bg-[#0037D4] active:scale-[0.98] transition duration-200">
                {{ $t('insights.loadMore') }}
            </button>
        </div>
    </div>
</template>

<script setup>
import InsightItem from './insight-item.vue';
import icon from '~/assets/Union.png'
import PocketBase from 'pocketbase'

const pb = new PocketBase('https://api.adsmarch.bot.cd')

// 选项键名列表
const sortOptions = ['featured', 'latest', 'hottest']

const expanded = ref(false)
const sortOpen = ref(false)
const sortBy = ref('featured')
const selected = ref([])
const pendingSelected = ref([])

const list = ref([])
const categories = ref([])

onMounted(async () => {
    try {
        const records = await pb.collection('services').getFullList({
            sort: '-created'
        })
        list.value = records.map(r => ({
            id: r.id,
            date: r.created,
            category: r.subtitle,
            title: r.title,
            image: `https://api.adsmarch.bot.cd/api/files/${r.collectionId}/${r.id}/${r.cover_image}`
        }))
        // 从数据中提取不重复的分类
        categories.value = [...new Set(records.map(r => r.subtitle).filter(Boolean))]
    } catch (e) {
        console.error('Failed to fetch services:', e)
    }
})

// 响应式分页大小：PC 6 条，移动端 5 条
const isMobile = ref(false)
if (process.client) {
    isMobile.value = window.innerWidth < 768
    window.addEventListener('resize', () => {
        isMobile.value = window.innerWidth < 768
    })
}

const pageSize = computed(() => isMobile.value ? 5 : 6)
const count = ref(pageSize.value)

const filteredList = computed(() => {
    if (!selected.value.length) return list.value
    return list.value.filter(item => selected.value.includes(item.category))
})

const visibleList = computed(() => filteredList.value.slice(0, count.value))
const hasMore = computed(() => count.value < filteredList.value.length)

function loadMore() {
    count.value = filteredList.value.length // 点击显示全部
}
// 筛选
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
}
</script>

<style  scoped>
.insight-card:nth-child(3n),
.insight-card:last-child {
    padding-right: 0;
}

.insight-card:nth-child(3n) :deep(.col-line),
.insight-card:last-child :deep(.col-line) {
    display: none;
}

</style>
