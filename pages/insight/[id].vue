<template>
    <div class=" px-[15px] md:px-[120px] py-[56px] md:py-[120px]">
        <NuxtLink to="/insights" class="inline-block md:mb-[64px] mb-[48px] text-[#7D86A1] text-[16px] md:text-[20px] font-[600]">
            <div class="flex  gap-[8px] items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="6" height="12" viewBox="0 0 6 12" fill="none">
                    <path
                        d="M0.00792897 6.0069L3.45614 12L6 12L2.54781 6L6 -2.62268e-07L3.45614 -1.51073e-07L0.00792897 5.9931L0 5.9931L0.00395105 6L0 6.0069L0.00792897 6.0069Z"
                        fill="#7D86A1" />
                </svg>
                {{$t('insightDetail.title')}}
            </div>
        </NuxtLink>
        <h1 class="text-[40px] md:text-[72px] font-[600] mb-[24px] md:mb-[32px]">
            {{ currentArticle?.title }}
        </h1>
    </div>

    <!-- 相关推荐 -->
    <div class="bg-[#000] text-[#fff] px-[15px] md:px-[120px] py-[56px] md:py-[120px]">
        <div class="flex md:gap-[24px] gap-[12px] mb-[32px] md:mb-[64px]">
            <img :src="icon" alt="" class="w-[16px] h-[16px] md:w-[32px] md:h-[32px]">
            <p class="text-[40px] font-[600]  md:text-[96px]">{{ $t('insightId.title') }}</p>
        </div>
        <div class="grid md:grid-cols-3 grid-cols-1 gap-y-[32px] md:items-start">
            <NuxtLink v-for="item in visibleList" :key="item.id" :to="`/insight/${item.id}`"
                class="bg-[#000] text-[#fff] flex flex-col justify-between h-full insight-card group block bg-[#131416] rounded-[4px] md:rounded-none md:bg-transparent md:relative md:pr-[24px] md:border-[#454C5F] md:pb-[32px]">
                <InsightItem v-if="item" :item="item" />
            </NuxtLink>
        </div>
    </div>

</template>

<script setup>
import InsightItem from '~/components/insight-research/insight-item.vue';
import icon from '~/assets/Union.png';
import PocketBase from 'pocketbase'

const pb = new PocketBase('https://api.adsmarch.bot.cd')
const route = useRoute()

const list = ref([])
const currentArticle = ref(null)

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
        currentArticle.value = list.value.find(item => item.id === route.params.id)
    } catch (e) {
        console.error('Failed to fetch services:', e)
    }
})

// 详情页只渲染前 3 条（排除当前文章）
const visibleList = computed(() =>
    list.value.filter(item => item.id !== route.params.id).slice(0, 3)
)
</script>
<style scoped></style>
