import useStore from '../stores'
const { user } = useStore()

/**
 * 登录拦截
 */
export function loginIntercept(callBack: Function) {
  if (user.logged) {
    callBack()
    return
  }
  uni.navigateTo({
    url: '/pages/login',
  })
}
