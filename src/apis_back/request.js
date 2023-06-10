import {
  showToast,
} from './util.js'

/**
 * @param {String} cloudFnName
 * @param {String} operation  操作类型（增删改查）
 * @param {Object} data 请求参数
 * @param {Object} ext 附加参数
 */
export const request = (cloudFnName, operation, data = {}, ext = {}) => {
  return new Promise((resolve, reject) => {
    const {
      showLoading = false,
    } = ext

    if (showLoading)
      uni.showLoading()

    uniCloud.callFunction({
      name: cloudFnName,
      data: {
        operation,
        data,
      },
    }).then((res) => {
      if (showLoading)
        uni.hideLoading()

      const {
        result,
        result: {
          status,
          msg,
          data,
        },
      } = res
      if (status === 1) {
        resolve(data)
      }
      else {
        showToast(msg)
        reject(new Error(msg))
      }
    }).catch((err) => {
      if (showLoading)
        uni.hideLoading()

      reject(err)
    })
  })
}
