import { getToken } from './auth'
export interface Result<T = any> {
  code: number
  msg: string
  data: T
}

const baseUrl = {
  dev: 'http://localhost:3000',
  production: 'https://aichat.codefe.top',
}

type MethodType =
  | 'OPTIONS'
  | 'GET'
  | 'HEAD'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'TRACE'
  | 'CONNECT'

class Request {
  public request(method: MethodType, url: string, data?: any) {
    const token = getToken()
    return new Promise((resolve, reject) => {
      let result: any
      uni.request({
        url: `${baseUrl.production}${url}`,
        method,
        timeout: 15000,
        header: {
          'cookie': `token=${token}`,
          'Authorization': `Bearer ${token || ''}`,
          'content-type':
            method === 'GET'
              ? 'application/json; charset=utf-8'
              : 'application/json',
        },
        data,
        success: (res: any) => {
          if (res.statusCode === 401) {
            return uni.navigateTo({
              url: '/pages/login',
            })
          }
          console.log('request res', res);
          if (res.header['Transfer-Encoding'] === 'chunked' && typeof res.data === 'string')
            return resolve(res.data)

          result = res.data
          if (!result)
            throw new Error('[HTTP] Request has no return value')
          const { status, message, data } = result
          if (status === 'success')
            resolve(data)
          else
            reject(new Error(message || 'Error'))
        },
        fail: (err) => {
          reject(err)
        },
      })
    })
  }

  public get<T = any>(url: string, data?: any) {
    return this.request('GET', url, data) as T
  }

  public post<T = any>(url: string, data: any) {
    return this.request('POST', url, data) as T
  }
}

export default new Request()
