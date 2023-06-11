<script setup>
import mpHtml from './mp-html/mp-html.vue'
const props = defineProps({
  role: {
    type: String,
  },
  content: {
    type: String,
  },
  loading: {
    type: Boolean,
  },
})
const config = {
  system: {
    className: 'bg-blue-400',
    icon: 'https://cos.codefe.top/images/robot_1f916.png',
  },
  user: {
    className: 'mr-2 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl bg-blue-400',
    icon: 'https://cos.codefe.top/images/bear-avatar.png',
  },
  assistant: {
    className: 'ml-2 rounded-br-3xl rounded-tl-xl rounded-tr-3xl bg-gray-400',
    icon: 'https://cos.codefe.top/images/robot_1f916.png',
  },
}
const { loading, role, content } = toRefs(props)
const tranformed = computed(() => content.value.replace(/\x20/g, '&nbsp;').replace(/\n\n/g, '<br />').replace(/\n/g, '<br />').replace(/```/g, '<code>'))

const copy = async (tranformed) => {
  await uni.setClipboardData({ data: tranformed })
  uni.showToast({
    title: '复制成功',
    duration: 1500,
  })
}
</script>

<template>
  <div class="mb-2 flex" :class="role !== 'user' ? 'justify-end flex-row-reverse' : 'justify-end'">
    <div
      class="px-3 py-2 text-white"
      :class="config[role].className"
      @click="copy(tranformed)"
    >
      <div v-if="loading && !content" class="flex items-center justify-center" style="font-size: 12px">
        <div class="h-2 w-2 animate-spin border-4 border-white border-t-transparent rounded-full border-solid" />
        <div class="ml-2">
          处理中...
        </div>
      </div>
      <mp-html v-else ref="article" container-style="max-width: 280px; overflow-x: scroll; font-size: 12px;overflow-wrap: break-word;" :content="tranformed" />
    </div>
    <img
      :src="config[role].icon"
      class="h-8 min-w-[35px] w-8 rounded-full object-cover"
      alt=""
    >
  </div>
</template>
