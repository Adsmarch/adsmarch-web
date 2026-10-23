<template>
    <div class="w-full px-[15px] md:px-[40px] xl:px-[120px]  py-[56px] md:py-[120px] text-[#131416]">
        <button @click="goBack" class="inline-block text-[#7D86A1] text-[16px] md:text-[18px] lg:text-[20px] font-[600] leading-[1] text-left">
            <div class="flex gap-[8px] items-center">
                <svg width="6" height="12" viewBox="0 0 6 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.00792897 6.0069L3.45614 12L6 12L2.54781 6L6 -2.62268e-07L3.45614 -1.51073e-07L0.00792897 5.9931L0 5.9931L0.00395105 6L0 6.0069L0.00792897 6.0069Z" fill="#7D86A1"/>
                </svg>
                {{ $t('insightDetail.title') }}
            </div>
        </button>

        <div v-if="currentArticle">
            <h1 v-if="currentArticle.title" class="text-[40px] sm:text-[48px] md:text-[60px] xl:text-[72px] font-semibold mb-[24px] md:mb-[32px] leading-[1.2] mt-[48px] md:mt-[64px]">
                {{ currentArticle.title }}
            </h1>

            <div v-if="currentArticle.category || currentArticle.author || currentArticle.date" class="flex items-center flex-wrap gap-[8px] md:gap-[16px] text-[#131416] mb-[48px] md:mb-[64px] text-[18px] md:text-[20px] lg:text-[24px] border-b-[1px] border-[#D9DDE8] pb-[48px] md:pb-[64px] font-semibold">
                <span v-if="currentArticle.category">{{ $t(`insightFilter.categories.${currentArticle.category}`) }}</span>
                <template v-if="currentArticle.author">
                    <span v-if="currentArticle.category">|</span>
                    <span>{{ locale === 'en' ? `Author: ${currentArticle.author_en || currentArticle.author}` : `作者:${currentArticle.author}` }}</span>
                </template>
                <template v-if="currentArticle.date">
                    <span v-if="currentArticle.category || currentArticle.author">|</span>
                    <span>{{ currentArticle.date }}</span>
                </template>
            </div>

            <div v-if="currentArticle.shortdesc" class="mb-[56px] md:mb-[72px]">
                <h2 class="text-[32px] sm:text-[38px] md:text-[48px] xl:text-[56px] font-semibold mb-[32px] leading-[1.2]">
                    {{ locale === 'en' ? 'Overview' : '概述' }}
                </h2>
                <div class="blog-overview text-[16px] md:text-[20px] lg:text-[24px] leading-[1.6]"
                    v-html="locale === 'en' && currentArticle.shortdesc_en ? currentArticle.shortdesc_en : currentArticle.shortdesc">
                </div>
            </div>

            <div v-if="currentArticle.reportFileUrl" class="mt-[48px] md:mt-[64px] min-w-[160px] md:min-w-[240px]">
                <a :href="currentArticle.reportFileUrl" target="_blank" download
                    class="inline-flex items-center gap-[8px] px-[32px] py-[12px] md:px-[48px] md:py-[16px] bg-[#0043FF] text-white text-[16px] md:text-[18px] lg:text-[20px] font-semibold rounded-[2px] md:rounded-[4px] hover:bg-[#103C93] transition-all h-[40px] md:h-[64px]">
                    <span>{{ locale === 'en' ? 'Read Full Report' : '阅读完整报告' }}</span>
                    <svg width="6" height="12" viewBox="0 0 6 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.99207 6.0069L2.54386 12L0 12L3.45219 6L0 -2.62268e-07L2.54386 -1.51073e-07L5.99207 5.9931L6 5.9931L5.99605 6L6 6.0069L5.99207 6.0069Z" fill="white"/>
                    </svg>
                </a>
            </div>

            <div v-if="currentArticle.sections_zh || currentArticle.sections_en" class="blog-rich-content text-[16px] md:text-[20px] lg:text-[24px] leading-[1.6]"
                v-html="locale === 'en' && currentArticle.sections_en ? currentArticle.sections_en : currentArticle.sections_zh">
            </div>

            <div v-if="currentArticle.reportFileUrl" class="mt-[48px] md:mt-[64px] min-w-[160px] md:min-w-[240px]">
                <a :href="currentArticle.reportFileUrl" target="_blank" download
                    class="inline-flex items-center gap-[8px] px-[32px] py-[12px] md:px-[48px] md:py-[16px] bg-[#0043FF] text-white text-[16px] md:text-[18px] lg:text-[20px] font-semibold rounded-[2px] md:rounded-[4px] hover:bg-[#103C93] transition-all h-[40px] md:h-[64px]">
                    <span>{{ locale === 'en' ? 'Read Full Report' : '阅读完整报告' }}</span>
                    <svg width="6" height="12" viewBox="0 0 6 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.99207 6.0069L2.54386 12L0 12L3.45219 6L0 -2.62268e-07L2.54386 -1.51073e-07L5.99207 5.9931L6 5.9931L5.99605 6L6 6.0069L5.99207 6.0069Z" fill="white"/>
                    </svg>
                </a>
            </div>
        </div>

        <div v-else class="py-[48px] md:py-[64px] animate-pulse">
            <div class="h-[48px] md:h-[72px] bg-[#E5E9F0] rounded-[6px] w-[85%] mb-[24px]"></div>
            <div class="h-[48px] md:h-[72px] bg-[#E5E9F0] rounded-[6px] w-[45%] mb-[48px]"></div>

            <div class="flex items-center gap-[16px] pb-[48px] border-b border-[#D9DDE8] mb-[64px]">
                <div class="h-[24px] bg-[#E5E9F0] rounded-[4px] w-[120px]"></div>
                <div class="h-[24px] bg-[#E5E9F0] rounded-[4px] w-[100px]"></div>
                <div class="h-[24px] bg-[#E5E9F0] rounded-[4px] w-[90px]"></div>
            </div>

            <div class="space-y-[16px] mb-[64px]">
                <div class="h-[36px] bg-[#E5E9F0] rounded-[4px] w-[30%] mb-[24px]"></div>
                <div class="h-[20px] bg-[#E5E9F0] rounded-[4px] w-full"></div>
                <div class="h-[20px] bg-[#E5E9F0] rounded-[4px] w-[95%]"></div>
                <div class="h-[20px] bg-[#E5E9F0] rounded-[4px] w-[80%]"></div>
            </div>

            <div class="space-y-[16px]">
                <div class="h-[44px] bg-[#E5E9F0] rounded-[6px] w-[70%] mt-[48px] mb-[24px]"></div>
                <div class="h-[20px] bg-[#E5E9F0] rounded-[4px] w-full"></div>
                <div class="h-[20px] bg-[#E5E9F0] rounded-[4px] w-[90%]"></div>
                <div class="h-[20px] bg-[#E5E9F0] rounded-[4px] w-[85%]"></div>
                <div class="h-[20px] bg-[#E5E9F0] rounded-[4px] w-[95%]"></div>
            </div>
        </div>
    </div>

    <div v-if="visibleList.length > 0" class="bg-[#000] text-[#fff] py-[56px] w-full px-[15px] md:px-[40px] xl:px-[120px]">
        <div class="flex md:gap-[24px] gap-[12px] mb-[32px] md:mb-[64px]">
            <img :src="icon" alt="" class="w-[16px] h-[16px] md:w-[32px] md:h-[32px]">
            <p class="text-[40px] sm:text-[52px] md:text-[64px] xl:text-[96px] font-semibold leading-[1.2]">{{ $t('insightId.title') }}</p>
        </div>
        <div class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:gap-y-[32px] gap-y-[12px] md:items-start">
            <NuxtLink v-for="item in visibleList" :key="item.id" :to="{ path: localePath(`/articles/${item.slug || item.id}`), query: { collection: $route.query.collection || 'blogs' } }"
                class="bg-[#000] text-[#fff] flex flex-col justify-between h-full insight-card group  rounded-[4px] md:rounded-none md:bg-transparent md:relative md:pr-[24px] md:border-[#454C5F] md:pb-[32px]">
                <InsightItem v-if="item" :item="item" />
            </NuxtLink>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, watch } from 'vue'
import InsightItem from '~/components/insight-research/insight-item.vue'
import icon from '~/assets/Union.png'

const { $pb } = useNuxtApp()
const route = useRoute()
const { t, locale, setLocale } = useI18n()
const localePath = useLocalePath()

const allRecords = ref([])
const currentArticle = ref(null)

const initRichTextAccordions = async () => {
    await nextTick()
    const container = document.querySelector('.blog-rich-content')
    if (!container) return

    const headings = container.querySelectorAll('h1, h2')
    headings.forEach((heading, index) => {
        if (heading.dataset.injected) return
        heading.dataset.injected = 'true'

        const isFirst = index === 0
        if (!isFirst) {
            heading.classList.add('is-collapsed')
        }

        heading.className = `flex items-center justify-between cursor-pointer pt-[32px] mt-[48px] mb-[24px] font-semibold text-[32px] sm:text-[38px] md:text-[48px] xl:text-[56px] leading-[1.2] ${!isFirst ? 'is-collapsed' : ''}`

        const iconWrapper = document.createElement('div')
        iconWrapper.className = "flex items-center justify-center shrink-0 ml-[16px]"
        iconWrapper.innerHTML = `
            <svg class="icon-minus w-[24px] h-[24px] md:w-[32px] md:h-[32px] ${!isFirst ? 'hidden' : ''}" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M49 26.25V29.75H7V26.25H49Z" fill="currentColor"/>
            </svg>
            <svg class="icon-plus w-[24px] h-[24px] md:w-[32px] md:h-[32px] ${isFirst ? 'hidden' : ''}" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M29.75 7V26.696H49V30.196H29.75V49H26.25V30.196H7V26.696H26.25V7H29.75Z" fill="currentColor"/>
            </svg>
        `
        heading.appendChild(iconWrapper)

        if (!isFirst) {
            let sibling = heading.nextElementSibling
            while (sibling && sibling.tagName !== 'H1' && sibling.tagName !== 'H2') {
                sibling.style.display = 'none'
                sibling = sibling.nextElementSibling
            }
        }

        heading.onclick = () => {
            const isCollapsing = !heading.classList.contains('is-collapsed')
            heading.classList.toggle('is-collapsed', isCollapsing)

            iconWrapper.querySelector('.icon-minus').classList.toggle('hidden', isCollapsing)
            iconWrapper.querySelector('.icon-plus').classList.toggle('hidden', !isCollapsing)

            let nextSibling = heading.nextElementSibling
            while (nextSibling && nextSibling.tagName !== 'H1' && nextSibling.tagName !== 'H2') {
                nextSibling.style.display = isCollapsing ? 'none' : ''
                nextSibling = nextSibling.nextElementSibling
            }
        }
    })
}

watch([currentArticle, locale], async () => {
    await initRichTextAccordions()
})

onMounted(async () => {
    try {
        const targetIdOrSlug = route.params.id
        const collectionName = route.query.collection || 'blogs'

        const records = await $pb.collection(collectionName).getList(1, 200, {
            filter: 'status = "published"',
            sort: '-publish_date',
            requestKey: null
        })

        allRecords.value = records.items

        const rawCurrent = records.items.find(r => r.id === targetIdOrSlug || r.slug === targetIdOrSlug)
        if (rawCurrent) {
            const isEn = locale.value === 'en'
            const rawDate = rawCurrent.publish_date || rawCurrent.created
            const d = rawDate ? new Date(rawDate) : null
            const formattedDate = (d && !isNaN(d.getTime())) 
                ? `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}` 
                : ''

            currentArticle.value = {
                id: rawCurrent.id,
                slug: rawCurrent.slug || '',
                date: formattedDate,
                category: rawCurrent.category || '',
                title: isEn && rawCurrent.title_en ? rawCurrent.title_en : (rawCurrent.title || ''),
                shortdesc: rawCurrent.shortdesc || '',
                shortdesc_en: rawCurrent.shortdesc_en || '',
                author: rawCurrent.author || '',
                author_en: rawCurrent.author_en || '',
                sections_zh: rawCurrent.sections_zh || '',
                sections_en: rawCurrent.sections_en || '',
                reportFileUrl: rawCurrent.report_file 
                    ? `https://api.adsmarch.bot.cd/api/files/${rawCurrent.collectionId || collectionName}/${rawCurrent.id}/${rawCurrent.report_file}`
                    : ''
            }

            try {
                await $pb.collection(collectionName).update(rawCurrent.id, {
                    "views+": 1
                })
            } catch (err) {
            }
        }
    } catch (e) {
        console.error('获取文章详情失败:', e)
    }
})

const visibleList = computed(() => {
    if (!currentArticle.value) return []
    const targetIdOrSlug = route.params.id
    const mappedList = allRecords.value.map(r => {
        const isEn = locale.value === 'en'
        const rawDate = r.publish_date || r.created
        const d = rawDate ? new Date(rawDate) : null
        return {
            id: r.id,
            slug: r.slug || '',
            date: (d && !isNaN(d.getTime())) ? `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}` : '',
            category: r.category || '',
            title: isEn && r.title_en ? r.title_en : (r.title || ''),
            shortdesc: isEn && r.shortdesc_en ? r.shortdesc_en : (r.shortdesc || ''),
            image: r.cover_image ? `https://api.adsmarch.bot.cd/api/files/${r.collectionId || route.query.collection || 'blogs'}/${r.id}/${r.cover_image}` : ''
        }
    })

    const otherArticles = mappedList.filter(item => item.id !== targetIdOrSlug && item.slug !== targetIdOrSlug)
    
    if (currentArticle.value.category) {
        const sameCategoryList = otherArticles.filter(item => item.category === currentArticle.value.category)
        const diffCategoryList = otherArticles.filter(item => item.category !== currentArticle.value.category)
        return [...sameCategoryList, ...diffCategoryList].slice(0, 3)
    } else {
        return otherArticles.slice(0, 3)
    }
})

const router = useRouter()

function goBack() {
    if (window.history.length > 1) {
        router.back()
    } else {
        router.push('/')
    }
}
</script>

<style scoped>
.blog-overview :deep(ul),
.blog-rich-content :deep(ul) {
    list-style: none;
    padding-left: 0;
    margin: 16px 0;
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.blog-overview :deep(li),
.blog-rich-content :deep(li) {
    position: relative;
    padding-left: 24px;
}

.blog-overview :deep(li::before),
.blog-rich-content :deep(li::before) {
    content: '';
    position: absolute;
    left: 0;
    top: 0.65em;
    width: 8px;
    height: 8px;
    background-color: #0043FF;
    border-radius: 2px;
}

.blog-rich-content :deep(p) {
    margin-bottom: 32px;
}

.blog-rich-content :deep(img) {
    width: 100%;
    border-radius: 8px;
    margin: 32px 0;
    border: 1px solid #D9DDE8;
}
</style>