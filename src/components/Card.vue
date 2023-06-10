<script setup lang="ts">
import { loginIntercept } from '../apis/login.js'
const props = defineProps<{
  card: {
    icon: string
    title: string
    desc: string
    url: string
    className: string
    id: string
    pageConfig?: any
    status: number
  }
}>()
const isGeneric = (card) => {
  return /generic/g.test(card.url)
}
const isActive = computed(() => props.card.status !== 0)
const goDetail = (card) => {
  if (!isActive.value)
    return
  // loginIntercept(() => {
    uni.navigateTo({
      url: `${card.url}${isGeneric ? `?from=${card.id}` : ''}`,
    })
  // })
}
</script>

<template>
  <div class="mb-3 flex items-center rounded-xl bg-cyan bg-gradient-to-r" :class="card.className" @click="goDetail(card)">
    <div class="w-full flex items-center justify-center p-3 pr-15">
      <div class="mr-2 h-60px w-60px flex flex-none items-center justify-center overflow-hidden">
        <img class="block h-40px w-40px object-cover" :src="card.icon">
      </div>
      <div class="overflow-hidden color-white">
        <div class="flex">
          <strong>{{ card.title }}</strong>
        </div>
        <p class="text-sm fw300 op80 line-2">
          {{ card.desc }}
        </p>
      </div>
    </div>
    <i v-if="isActive" class="i-tabler-circle-arrow-right absolute right-25px text-xl color-white op80" />
  </div>
</template>

<style scoped>
</style>
