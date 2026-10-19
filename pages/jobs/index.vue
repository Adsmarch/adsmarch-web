<template>
    <div class="relative w-full px-[15px] md:px-[40px] xl:px-[120px] mt-[56px] md:mt-[120px] mb-[56px] md:mb-[120px] mx-auto text-[#131416] bg-white">
        
        <div 
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible-once="{ opacity: 1, y: 0, transition: { duration: 700, ease: 'easeOut' } }"
            class="flex flex-col lg:flex-row lg:items-end justify-between gap-[32px] lg:gap-[48px] pb-[32px] md:pb-[56px] mb-[32px] md:mb-[56px] border-b border-[#D9DDE8]"
        >
            <div class="flex items-flex-start gap-[16px] md:gap-[24px]">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="shrink-0 w-[16px] h-[16px] md:w-[40px] md:h-[40px] lg:w-[48px] lg:h-[48px]">
                    <path d="M15.7563 22.9719L0.162437 32V25.3546L15.7563 16.3265V22.9719Z" fill="#0043FF"/>
                    <path d="M15.5939 6.92219L0 16.3265V9.40434L15.5939 0V6.92219Z" fill="#0043FF"/>
                    <path d="M32 6.92219L15.7563 16.3265V9.40434L32 0V6.92219Z" fill="#0043FF"/>
                </svg>
                <h1 class="text-[40px] sm:text-[52px] md:text-[64px] lg:text-[72px] xl:text-[80px] 2xl:text-[96px] font-semibold leading-[1.2] tracking-tight">
                    {{ $t('jobs.title') }}
                </h1>
            </div>
            <div class="w-full lg:w-[45%] xl:w-[55%] 2xl:w-[60%] relative">
                <input 
                    v-model="searchKeyword" 
                    type="text" 
                    :placeholder="$t('jobs.search')"
                    class="w-full h-[40px] md:h-[52px] xl:h-[64px] px-[20px] md:px-[24px] pl-[35px] md:pl-[58px] rounded-[4px] md:rounded-[6px] border border-[#D9DDE8] bg-white text-[#131416] placeholder-[#454C5F] md:placeholder-[#7D86A1] focus:border-[#0043FF] outline-none transition-all text-[14px] md:text-[18px] xl:text-[22px]"
                />
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" class="w-[16px] h-[16px] md:w-[26px] md:h-[26px] xl:w-[28px] xl:h-[28px] absolute left-[12px] md:left-[20px] top-[13px] xl:top-[20px] text-[#7D86A1]">
                    <path d="M21.6221 13.2512C21.6221 8.62824 17.8742 4.88039 13.2512 4.88039C8.62824 4.88039 4.88039 8.62824 4.88039 13.2512C4.88039 17.8742 8.62824 21.6221 13.2512 21.6221C14.0833 21.6221 14.8859 21.501 15.6429 21.2757L16.0373 22.5988C15.1538 22.8618 14.2182 23.0025 13.2512 23.0025C7.86568 23.0025 3.5 18.6368 3.5 13.2512C3.5 7.86568 7.86568 3.5 13.2512 3.5C18.6368 3.5 23.0025 7.86568 23.0025 13.2512C23.0025 15.5218 21.9946 17.9448 20.6757 19.6518L24.5 23.0935L23.5764 24.1199L19.2616 20.2366L19.2093 19.2633C20.5501 17.7653 21.6221 15.3752 21.6221 13.2512Z" fill="#7D86A1"/>
                </svg>
            </div>
        </div>
        <div v-if="isLoading" class="w-full">
            <div class="flex flex-col md:flex-row gap-[40px] md:gap-[60px] items-start">
                <div class="hidden md:block shrink-0 space-y-4 animate-pulse">
                    <div class="h-6 bg-[#E5E7EB] rounded w-1/2"></div>
                    <div class="h-32 bg-[#F8F9FA] rounded-[6px]"></div>
                </div>
                <div class="flex-1 w-full space-y-[12px]">
                    <div v-for="i in 5" :key="i" class="h-[80px] bg-[#F8F9FA] rounded-[6px] animate-pulse"></div>
                </div>
            </div>
        </div>

        <div v-else class="flex flex-col md:flex-row md:gap-[32px] lg:gap-[48px] items-start justify-between">
            <div class="hidden md:block shrink-0 w-[26%] lg:w-[25%] xl:w-[35%]">
                <div class="flex items-center justify-between pb-[32px] mb-[32px] border-b border-[#D9DDE8]">
                    <span class="text-[18px] md:text-[24px] xl:text-[32px] font-semibold text-[#131416]">{{ $t('jobs.filter') }}</span>
                    <button @click="resetFilter" class="text-[12px] md:text-[18px] xl:text-[24px] font-semibold text-[#7D86A1] flex items-center gap-[4px]">
                        {{ $t('jobs.clear') }}
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.3089 9.67277C4.5954 4.8716 9.53038 2.02243 14.3316 3.3089C15.9843 3.75176 17.4058 4.62803 18.507 5.78156L18.5075 3.88781H19.7075L19.707 8.10949H15.8298V6.90949H17.9093C16.9222 5.76232 15.5933 4.88918 14.021 4.46789C9.85999 3.35295 5.58285 5.82231 4.46789 9.98332C3.35295 14.1443 5.82233 18.4215 9.98332 19.5364C14.1443 20.6514 18.4215 18.182 19.5364 14.021L20.6954 14.3316C19.4089 19.1327 14.474 21.9819 9.67277 20.6954C4.87162 19.4089 2.02243 14.4739 3.3089 9.67277Z" fill="#7D86A1"/>
                        </svg>
                    </button>
                </div>

                <div class="mb-[32px]">
                    <h3 class="text-[12px] md:text-[18px] xl:text-[24px] font-semibold text-[#131416] mb-[20px]">{{ $t('jobs.city') }}</h3>
                    <div class="space-y-[12px]">
                        <label v-for="city in dynamicCities" :key="city" class="flex items-center gap-[8px] text-[12px] md:text-[16px] xl:text-[20px] text-[#454C5F] cursor-pointer hover:text-[#0043FF] group">
                            <input 
                                type="checkbox" 
                                :value="city" 
                                v-model="selectedCities" 
                                class="w-[20px] h-[20px] rounded-[2px] border-[#454C5F] text-[#0043FF] focus:ring-0 cursor-pointer" 
                            />
                            <span>{{ city }}</span>
                        </label>
                    </div>
                </div>

                <div class="mb-[32px]">
                    <h3 class="text-[12px] md:text-[18px] xl:text-[24px] font-semibold text-[#131416] mb-[20px]">{{ $t('jobs.type') }}</h3>
                    <div class="space-y-[12px]">
                        <label v-for="type in dynamicTypes" :key="type" class="flex items-center gap-[8px] text-[12px] md:text-[16px] xl:text-[20px] text-[#454C5F] cursor-pointer hover:text-[#0043FF] group">
                            <input 
                                type="checkbox" 
                                :value="type" 
                                v-model="selectedTypes" 
                                class="w-[20px] h-[20px] rounded-[2px] border-[#454C5F] text-[#0043FF] focus:ring-0 cursor-pointer" 
                            />
                            <span>{{ type }}</span>
                        </label>
                    </div>
                </div>
            </div>

            <div class="md:hidden w-full flex justify-end items-center mb-[32px]">
                <button @click="isMobileDrawerOpen = true" class="flex items-center gap-[6px] text-[#7D86A1] text-[16px]">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.5 3.75H17.5M4.375 10H15.625M6.125 16.25H13.875" stroke-width="2" stroke="#7D86A1"/>
                    </svg>
                    <span>{{ $t('jobs.filter') }}</span>
                </button>
            </div>

            <div class="space-y-[12px] w-full lg:w-[65%] xl:w-[55%] 2xl:w-[60%] relative">
                <div v-if="filteredCareers.length === 0" class="py-16 text-center text-[#7D86A1] text-[32px]">
                    {{ $t('jobs.noJobs') }}
                </div>
                
                <NuxtLink 
                    v-for="item in filteredCareers" 
                    :key="item.id" 
                    :to="`/jobs/${item.id}`"
                    class="group block p-[20px] transition-all duration-200 cursor-pointer md:border-b-[1px] bg-[#EBF0FF] md:bg-white hover:bg-[#EBF0FF] hover:border-[#EBF0FF]"
                >
                    <div>
                        <h3 class="text-[24px] md:text-[28px] xl:text-[32px] font-semibold text-[#131416] group-hover:text-[#0043FF] transition-colors leading-[1.2] flex items-center justify-between md:block">
                            {{ item.title }}
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" class="md:hidden">
                                <path d="M21.75 21.2859H20.4372V4.49103L3.17821 21.75L2.25 20.8218L19.509 3.56282H2.7141V2.25H21.0936L21.75 2.90641V21.2859Z" fill="#0043FF"/>
                            </svg>

                        </h3>
                        <p class="text-[16px] md:text-[18px] xl:text-[20px] text-[#454C5F] mt-[8px] md:mt-[12px] flex items-center gap-[8px]">
                            <span>{{ item.type }}</span>
                            <span class="text-[#454C5F]">|</span>
                            <span>{{ Array.isArray(item.city) ? item.city.join('/') : item.city }}</span>
                        </p>
                    </div>
                </NuxtLink>
            </div>
        </div>

        <div v-if="isMobileDrawerOpen" class="fixed inset-0 z-50 bg-white w-full h-full flex flex-col justify-between md:hidden py-[32px] px-[15px] overflow-y-auto">
            <div>
                <div class="flex items-center justify-between pb-[32px] mb-[32px] border-b border-[#D9DDE8]">
                    <button @click="isMobileDrawerOpen = false" class="text-[16px] font-semibold text-[#131416] flex items-center gap-[8px]">
                        <svg width="4" height="8" viewBox="0 0 4 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.00528598 4.0046L2.3041 8L4 8L1.69854 4L4 -1.74846e-07L2.3041 -1.00715e-07L0.00528598 3.9954L0 3.9954L0.00263403 4L0 4.0046L0.00528598 4.0046Z" fill="#131416"/>
                        </svg>
                        <span>{{ $t('jobs.backToList') }}</span>
                    </button>
                    <button @click="resetFilter" class="text-[16px] font-semibold text-[#454C5F] flex items-center gap-[8px]">
                        <span>{{ $t('jobs.clear') }}</span> <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.75742 8.06064C3.8295 4.05967 7.94198 1.68536 11.943 2.75742C13.3203 3.12647 14.5048 3.85669 15.4225 4.81797L15.4229 3.23984H16.4229L16.4225 6.75791H13.1915V5.75791H14.9244C14.1019 4.80193 12.9944 4.07431 11.6842 3.72324C8.21666 2.79412 4.65238 4.85193 3.72324 8.31943C2.79412 11.7869 4.85194 15.3512 8.31943 16.2804C11.787 17.2095 15.3512 15.1517 16.2804 11.6842L17.2462 11.943C16.1741 15.9439 12.0616 18.3183 8.06064 17.2462C4.05968 16.1741 1.68536 12.0616 2.75742 8.06064Z" fill="#454C5F"/>
                        </svg>

                    </button>
                </div>

                <div class="mb-[32px]">
                    <h3 class="text-[20px] font-bold text-[#131416] mb-[24px]">{{ $t('jobs.city', '城市') }}</h3>
                    <div class="space-y-[16px]">
                        <label v-for="city in dynamicCities" :key="city" class="flex items-center gap-[8px] text-[16px] text-[#454C5F]">
                            <input type="checkbox" :value="city" v-model="selectedCities" class="w-[16px] h-[16px] rounded-[2px] text-[#0043FF]" />
                            <span>{{ city }}</span>
                        </label>
                    </div>
                </div>

                <div class="mb-[32px]">
                    <h3 class="text-[20px] font-bold text-[#131416] mb-[24px]">{{ $t('jobs.type', '职位类型') }}</h3>
                    <div class="space-y-[16px]">
                        <label v-for="type in dynamicTypes" :key="type" class="flex items-center gap-[8px] text-[16px] text-[#454C5F]">
                            <input type="checkbox" :value="type" v-model="selectedTypes" class="w-[16px] h-[16px] rounded-[2px] text-[#0043FF]" />
                            <span>{{ type }}</span>
                        </label>
                    </div>
                </div>
            </div>

            <div class="pt-[20px] pb-[10px]">
                <button @click="isMobileDrawerOpen = false" class="w-full h-[40px] bg-[#0043FF] text-white rounded-[4px] font-semibold text-[14px] flex items-center justify-center gap-[4px]">
                    <span>{{ $t('jobs.showResults') }}</span>
                    <svg width="4" height="8" viewBox="0 0 4 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.99471 4.0046L1.6959 8L2.38419e-07 8L2.30146 4L2.38419e-07 -1.74846e-07L1.6959 -1.00715e-07L3.99471 3.9954L4 3.9954L3.99737 4L4 4.0046L3.99471 4.0046Z" fill="white"/>
                    </svg>

                </button>
            </div>
        </div>
        <ContactSection />
    </div>
</template>

<script setup>
definePageMeta({
  keepalive: true
})

import { ref, computed, onMounted } from 'vue'
import { useI18n } from '#imports'
import ContactSection from '~/components/careers/ContactSection.vue';

const { locale } = useI18n()
const { $pb } = useNuxtApp()

const rawList = ref([])
const isLoading = ref(true)
const searchKeyword = ref('')
const selectedCities = ref([])
const selectedTypes = ref([])
const isMobileDrawerOpen = ref(false)

const fetchCareers = async () => {
    isLoading.value = true
    try {
        const records = await $pb.collection('jobs').getFullList()
        rawList.value = records || []
    } catch (error) {
        console.error('获取职位列表失败:', error)
    } finally {
        isLoading.value = false
    }
}

onMounted(() => {
    fetchCareers()
})

const dynamicCities = computed(() => {
    const citiesSet = new Set()
    rawList.value.forEach(item => {
        if (Array.isArray(item.city)) {
            item.city.forEach(c => c && citiesSet.add(c))
        } else if (item.city) {
            citiesSet.add(item.city)
        }
    })
    return Array.from(citiesSet)
})

const dynamicTypes = computed(() => {
    const typesSet = new Set()
    rawList.value.forEach(item => {
        if (item.type) {
            typesSet.add(item.type)
        }
    })
    return Array.from(typesSet)
})

const resetFilter = () => {
    selectedCities.value = []
    selectedTypes.value = []
    searchKeyword.value = ''
}

const filteredCareers = computed(() => {
    const isEn = locale.value === 'en'
    return rawList.value.map(item => ({
        id: item.id,
        title: isEn ? (item.job_title_en || item.job_title) : item.job_title,
        city: item.city || [],
        type: item.type || '',
    })).filter(item => {
        const matchKeyword = !searchKeyword.value || item.title.toLowerCase().includes(searchKeyword.value.toLowerCase())
        const matchCity = selectedCities.value.length === 0 || selectedCities.value.some(c => 
            Array.isArray(item.city) ? item.city.includes(c) : item.city === c
        )
        const matchType = selectedTypes.value.length === 0 || selectedTypes.value.includes(item.type)

        return matchKeyword && matchCity && matchType
    })
})
</script>