<script setup>
import { useChatgpt } from '../../composables'
const report = ref('日报')
const catelogList = ref([
  { name: '日报', text: '日报' },
  { name: '周报', text: '周报' },
  { name: '月报', text: '月报' },
])
const { loading, output, generate } = useChatgpt()
const reportContent = ref('eg: 送了三家外卖，整理了工作报告文档')
const generateOutput = () => {
  const prompt = `帮我写个工作的${report.value}，内容+列表的形式: ${reportContent.value}`
  generate(prompt)
}
</script>

<template>
  <div>
    <div>
      <u-navbar
        title="周报"
        :auto-back="true"
      />
      <div class="mt-25 px-2">
        <uni-section title="输入周报主题" type="line">
          <u-textarea v-model="reportContent" :placeholder="reportContent" count />
        </uni-section>
        <uni-section title="选择语言" type="line">
          <u-radio-group
            v-model="report"
            icon-placement="right"
            placement="row"
          >
            <u-radio
              v-for="(item, index) in catelogList"
              :key="index"
              :label="item.name"
              :name="item.name"
              active-color="red"
              size="22"
            />
          </u-radio-group>
        </uni-section>
        <div class="mt-4">
          <u-button v-if="!loading" type="primary" text="生成" @click="generateOutput" />
          <u-button v-else type="primary" text="生成" loading loading-text="生成中" />
        </div>
        <div v-if="output">
          <div>
            <h2 class="mx-auto my-2 text-center text-xl font-bold">
              生成内容
            </h2>
          </div>
          <div class="mx-auto flex flex-col items-center justify-center whitespace-pre-wrap">
            <div
              class="border border-gray-200 rounded-xl border-solid bg-white p-4 text-left shadow-md transition"
            >
              <p v-html="output" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.u-radio {
  margin-right: 10px;
}
</style>
