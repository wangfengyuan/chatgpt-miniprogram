import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-persistedstate-plugin'
import user from './user'

export function setupPinia(app: any) {
  const pinia = createPinia()
  pinia.use(createPersistedState({
    storage: {
      getItem(key: string): string | null {
        return uni.getStorageSync(key)
      },
      setItem(key: string, value: string) {
        uni.setStorageSync(key, value)
      },
      removeItem(key: string) {
        uni.removeStorage({ key })
      },
    },
  }))
  app.use(pinia)
  return app
}

// 统一导出 useStore 方法
export default function useStore() {
  return {
    user: user(),
  }
}
