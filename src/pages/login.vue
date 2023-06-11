<script setup>
import { login } from '../apis/user'
import { setToken } from '../apis/auth'
import useStore from '../stores'
const { user } = useStore()
const mpWxLogin = async () => {
  const { code } = await uni.login()
  uni.showLoading()
  try {
    const res = await login({
      code,
    })

    setToken(res.token)
    user.setUserInfo(res.user)
    uni.showToast({
      title: '登陆成功',
    })

    setTimeout(() => {
      uni.navigateBack()
    }, 1000)
  }
  catch (error) {
    mpWxLogin()
  }
  uni.hideLoading()
}
</script>

<template>
  <view class="app mt-10">
    <u-navbar
      title="智能AI助手"
      bg-color="#5eead4"
      :auto-back="true"
    />
    <div class="imgDiv">
      <image src="https://cos.codefe.top/images/analysis.png" mode="aspectFill" />
    </div>
    <view class="text-center">
      <h1 class="text-lg font-bold text-black">
        智能AI助手
      </h1>
      <view class="my-2 text-sm opacity-80">
        上下文聊天, 邮件日周报生成, 写文案, 等你来试
      </view>
    </view>
    <view class="mx-auto w-70%">
      <u-button color="linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))" @click="mpWxLogin">
        微信一键登录
      </u-button>
    </view>
  </view>
</template>

<style scoped lang='scss'>
	.app {
		text-align: center;
		padding: 20px;
	}

	.imgDiv {
		width: 200rpx;
		height: 200rpx;
		margin: 50px auto 15px auto;

		image {
			width: 100%;
			height: 100%;
			border-radius: 50%;
		}
	}

	.mt20 {
		margin-top: 20px;
	}
</style>
