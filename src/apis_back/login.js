import useStore from '../stores'
import { request } from './request.js'
const { user } = useStore()
/**
 * 登录拦截
 */
export function loginIntercept(callBack) {
  if (user.logged) {
    callBack()
    return
  }
  uni.navigateTo({
    url: '/pages/login',
  })
}

/**
 * 更新用户信息
 * return 更新后的信息
 */
export async function updateUserInfo({ id, nickName, gender, avatarUrl }) {
  return request('login', 'updateUserInfo', {
    id,
    nickName,
    gender,
    avatarUrl,
  }, {
    showLoading: true,
  })
}

/**
 * 登陆后返回用户信息
 */
export async function login({ code, encryptedData, iv }) {
  return request('login', 'loginByWeixin', {
    code,
    encryptedData,
    iv,
  }, {
    showLoading: true,
  })
}
/**
 * 获取用户信息，打开小程序时调用用于更新次数
 */
export async function getUserInfo() {
  if (!user.id)
    return
  return request('login', 'getUserInfo', {
    id: user.id,
  }, {
    showLoading: false,
  })
}
