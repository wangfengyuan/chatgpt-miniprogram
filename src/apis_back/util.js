let _debounceTimeout = null
let _throttleRunning = false

/**
 * 防抖
 * @param {Function} 执行函数
 * @param {Number} delay 延时ms
 */
export const debounce = (fn, delay = 500) => {
  clearTimeout(_debounceTimeout)
  _debounceTimeout = setTimeout(() => {
    fn()
  }, delay)
}
/**
 * 节流
 * @param {Function} 执行函数
 * @param {Number} delay 延时ms
 */
export const throttle = (fn, delay = 500) => {
  if (_throttleRunning)
    return

  _throttleRunning = true
  fn()
  setTimeout(() => {
	    _throttleRunning = false
  }, delay)
}

/**
 * toast
 */
export const showToast = (title = '', param = {}) => {
  if (!title)
    return
  uni.showToast({
    title,
    duration: param.duration || 1500,
    mask: param.mask || false,
    icon: param.icon || 'none',
  })
}
