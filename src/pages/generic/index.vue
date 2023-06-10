<script setup>
import { useChatgpt } from '../../composables'
import useStore from '../../stores'
import config from '../config'
import template from './template'
const { user } = useStore()
const { loading, output, generate } = useChatgpt()
const data = ref({})
const copied = ref(false)
onLoad((e) => {
  const targetConfig = config.find(c => c.id === e.from)
  const { pageConfig, ...restConfig } = targetConfig
  data.value = Object.assign(pageConfig, restConfig)
})
const handleConfirm = () => {
  if (data.value.val.length > 140) {
    uni.showToast({
      title: '文本超长请重新输入',
      icon: 'error',
    })
    return
  }
  if (user.credit < 1) {
    uni.showToast({
      title: '使用次数不足',
      icon: 'error',
    })
    return
  }
  const rawData = toRaw(data.value)
  const prompt = template(rawData)
  generate([{
    role: 'user',
    content: `${prompt}: \n ${rawData.val ? rawData.val : rawData.placeholder}`,
  }])
}
const copy = async () => {
  await uni.setClipboardData({ data: output.value })
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 2000)
}
</script>

<template>
  <div>
    <u-navbar
      :title="data.title"
      :auto-back="true"
    />
    <div class="mt-20 px-2">
      <uni-section :title="data.inputTitle" type="line">
        <u-textarea v-model="data.val" :placeholder="data.placeholder" count />
      </uni-section>
      <uni-section v-if="data.category" :title="data.category.title" type="line">
        <uni-data-select
          v-model="data.category.val"
          :localdata="data.category.options"
        />
      </uni-section>
      <div class="mt-4">
        <u-button v-if="loading" loading loading-text="生成中" />
        <u-button v-else text="提交" color="rgb(45, 212, 191)" @click="handleConfirm" />
      </div>
      <div v-if="output">
        <div class="mx-auto my-4 w-full flex flex-col items-center justify-center whitespace-pre-wrap">
          <div
            class="box-border w-full border border-gray-200 rounded-xl border-solid bg-white p-4 text-left shadow-md transition"
          >
            <p v-html="output" />
          </div>
        </div>
        <u-button v-if="copied" color="rgb(94, 234, 212)" text="已复制" />
        <u-button v-else text="复制答案" color="rgb(45, 212, 191)" @click="copy" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">

</style>
