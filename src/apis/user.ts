import type { LoginParams, LoginResult, UserInfoResult } from './types'
import request from './request'

enum Path {
  Login = '/api/auth',
  User = '/api/user',
  Chat = '/api/chat-stream',
}
// 登录
export async function login(form: LoginParams) {
  return request.post<LoginResult>(Path.Login, form)
}

// 获取用户信息
export async function getUserInfo() {
  return request.get<UserInfoResult>(Path.User)
}

// openai api
export async function getChatStream(data: any) {
  return request.post<string>(Path.Chat, data)
}

// 退出登录
// export async function logout() {
//   return request.get(Path.Logout)
// }
