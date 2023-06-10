<script setup>
import { loginIntercept } from '../apis/login.ts'
import useStore from '../stores'
const { user } = useStore()
const pic = computed(() => user.id ? 'https://mp-7772c90a-7206-4a36-8ba8-82747c24b2e6.cdn.bspapp.com/cloudstorage/cb7c76b2-4072-4d80-a9ff-f44eba383cfd.png' : '')
const login = () => {
  loginIntercept(() => {
    uni.switchTab({
      url: './me',
    })
  })
}

const showAboutPop = ref(false)

const logOut = () => user.logOut()
const description = ref(`
  1、本站系统调用官方接口，数据由官方返回，高峰期官方api也会存在调用超时的可能，并且小程序不支持流式返回，因此回答会有延迟，请耐心等待
  2、因为官方api收费，因此每人每天可获得15次使用机会
  3、本应用不会存储任何聊天记录和生成内容
`)
</script>

<template>
  <view id="me" class="mx-4 mt-23">
    <u-navbar
      title="智能AI助手"
      left-icon=""
      bg-color="#5eead4"
      :auto-back="false"
    />
    <div>
      <view class="u-flex py-4">
        <view class="mr-4">
          <u-avatar :src="pic" size="55" shape="circle" />
        </view>
        <view class="u-flex-1">
          <view v-if="user.nickname" class="text-lg">
            {{ user.nickname }}
          </view>
          <view v-if="user.id" class="text-sm">
            {{ user.id }}
          </view>
          <view v-else class="text-lg" @click="login">
            点击登录
          </view>
        </view>
      </view>

      <div v-if="user.logged" class="time-box mb-4 mt-2 flex items-center justify-between rounded-lg bg-[#5eead4] px-2 py-3 shadow-md">
        <span class="w-200px text-left">
          今日剩余次数<span class="mx-1 text-xl text-purple-500">{{ user.credit }}</span>次
        </span>
        <button open-type="share" class="mx-0 h-30px flex items-center rounded-full text-sm">
          去分享
        </button>
      </div>
    </div>

    <view id="tool-box" class="rounded-lg bg-white pt-4 shadow-lg">
      <div class="mb-3 px-3">
        常用工具
      </div>
      <u-button open-type="contact" class="mx-0 my-1 flex border-none bg-transparent px-0 text-left">
        <view class="w-full text-left">
          <u-cell icon="kefu-ermai" title="客服" :is-link="true" />
        </view>
      </u-button>
      <u-button class="mx-0 my-1 flex border-none bg-transparent px-0 text-left" @click="showAboutPop = true">
        <view class="w-full text-left">
          <u-cell icon="info-circle" title="关于" :is-link="true" />
        </view>
      </u-button>
      <u-button v-if="user.id" class="mx-0 my-1 flex border-none bg-transparent px-0 text-left" @click="logOut">
        <view class="w-full text-left">
          <u-cell icon="setting" title="退出登录" :is-link="true" class="w-full" />
        </view>
      </u-button>
    </view>
    <view class="mt-4 text-center text-xs text-gray-400">
      <text>版本号 2.0.0</text>
    </view>
    <u-action-sheet :close-on-click-overlay="true" title="说明" :description="description" :show="showAboutPop" @close="showAboutPop = false" />
  </view>
</template>

<style lang="scss">
  .u-font-xl {
		font-size: 34rpx;
	}
  .u-cell {
    width: 100%;
  }

	.u-cell__body {
		padding-left: 0;
		padding-right: 0;
	}
	.time-box {
		/* background-color: #ebe0c4; */
		button {
			background-color: #373334;
			color: #ebe0c4;
		}
	}

	.u-flex {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
	}

	page{
		background-color: #f9fafb;
	}
	.u-button--square {
		padding: 0 0;
	}
  #me {
    .u-action-sheet__description {
      text-align: left;
    }
  }
</style>
