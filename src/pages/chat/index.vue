<script setup>
import { onShareAppMessage } from '@dcloudio/uni-app'
import useStore from '../../stores'
const { loading, generate } = useChatgpt()
const { user } = useStore()
const shareApp = () => {
  onShareAppMessage(() => {
    return {
      title: '这个回答太有趣了22',
      path: `/pages/chat/index?messages=${JSON.stringify([])}`,
    }
  })
}
shareApp()

const messageList = ref([])
const inputValue = ref('')
const isFromShare = ref(false)

const messageShowList = computed(() => ([
  {
    role: 'assistant',
    content: '你好，可以开始和我聊天啦',
  },
  ...messageList.value,
]))
onLoad((e) => {
  if (e.messages) {
    isFromShare.value = true
    messageList.value = JSON.parse(e.messages)
  }
})
const clear = () => messageList.value = []
const handleButtonClick = async () => {
  if (!inputValue.value)
    return
  if (user.credit < 1) {
    uni.showToast({
      title: '使用次数不足',
      icon: 'error',
    })
    loading.value = false
    return
  }
  messageList.value = [
    ...messageList.value,
    {
      role: 'user',
      content: inputValue.value,
    },
    {
      role: 'assistant',
      content: '',
    },
  ]
  inputValue.value = ''
  try {
    const generateText = await generate(messageList.value)
    messageList.value.pop()
    if (generateText) {
      messageList.value.push({
        role: 'assistant',
        content: generateText,
      })
    }
  }
  catch (error) {
    console.log('catch', error)
  }
}

const jumpHome = () => {
  uni.switchTab({
    url: '/pages/index',
  })
}
</script>

<template>
  <!-- This is an example component -->
  <div>
    <u-navbar
      title="聊天"
      :auto-back="true"
    />
    <div class="mx-auto mt-23 h-full rounded-lg px-2 container">
      <div class="content flex flex-row justify-between overflow-scroll bg-white">
        <div class="w-full flex flex-col justify-between">
          <div v-if="messageShowList.length" class="mt-5 flex flex-col">
            <MessageItem v-for="({ role, content }, index) in messageShowList" :key="index" :role="role" :content="content" :loading="loading" />
          </div>
        </div>
      </div>
      <div v-if="!isFromShare" class="relative mb-1 mt-3 flex">
        <!-- <input
          v-model="inputValue"
          class="w-full rounded-xl bg-gray-100 px-3 py-2 pr-20 text-sm text-gray-900"
          type="text"
          placeholder="请输入你的对话"
        > -->
        <view class="z-1 mr-10 w-full">
          <u-input
            v-model="inputValue"
            placeholder="请输入你的对话"
            border="surround"
          />
        </view>
        <div class="absolute bottom-0 right-0 top-0 z-10 flex items-center justify-center rounded-lg px-4 text-white" :class="loading ? 'bg-gray-500' : 'bg-blue-500 '" @tap="handleButtonClick" @click.stop="handleButtonClick">
          <i class="i-tabler-send" />
        </div>
      </div>
      <div v-else>
        <u-button text="我也试试" color="linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))" @click="jumpHome" />
      </div>
      <view class="text-center text-xs text-gray-400">
        提示: 点击消息框即可复制
      </view>
    </div>
    <div>
      <button open-type="share" class="absolute bottom-50 right-0 h-8 w-20 flex items-center justify-center rounded-full rounded-r-0 bg-teal-300 text-sm text-white -mr-[10px]">
        分享<i class="i-tabler-share" />
      </button>
      <button class="absolute bottom-40 right-0 h-8 w-20 flex items-center justify-center rounded-full rounded-r-0 bg-teal-300 text-sm text-white -mr-[10px]" @click="clear">
        清空<i class="i-ic:outline-cleaning-services" />
      </button>
    </div>
  </div>
</template>

<style scoped>
  image {
    flex: none;
  }
  .content {
    height: calc(100vh - 400rpx);
  }
  page {
    background-color: #fff;
  }
</style>
