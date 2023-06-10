<script setup lang="ts">
import config from './config'
const cardList = ref(config)
const text = '高峰期官方api也会存在调用超时的可能，并且小程序不支持流式返回，因此回答会有延迟，请耐心等待10s左右'
const openTip = () => {
  uni.showModal({
    title: '提示',
    content: text,
  })
}
</script>

<template>
  <div>
    <u-navbar
      title="智能AI助手"
      left-icon=""
      bg-color="#5eead4"
      :auto-back="false"
    />
    <div id="home" class="mx-2 mt-23">
      <div class="overflow-hidden rounded-full text-white">
        <u-notice-bar :text="text" mode="link" custom-class="text-white" color="" bg-color="#5eead4" @click="openTip" />
      </div>
      <div class="mt-2">
        <Card v-for="card in cardList" :key="card.title" :card="card" />
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
