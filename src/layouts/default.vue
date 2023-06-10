<script setup lang="ts">
import useStore from '../stores'
const { user } = useStore()
const credit = computed(() => user.credit)
</script>

<template>
  <view class="pb-4">
    <slot />
    <view v-if="user.logged" class="py-1 text-center text-xs text-gray-400">
      当前剩余次数: {{ credit }}
    </view>
  </view>
</template>
