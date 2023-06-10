import { createSSRApp } from 'vue'
import UniLayouts from 'virtual:uni-layouts'
import uviewPlus from 'uview-plus'
import App from './App.vue'
import { setupPinia } from './stores'
import 'uno.css'

export function createApp() {
  const app = createSSRApp(App)

  app.mixin({
    onShareTimeline: () => {
      return {
        title: '这个回答太有趣了,你也来试试',
        imageUrl: 'https://mp-7772c90a-7206-4a36-8ba8-82747c24b2e6.cdn.bspapp.com/cloudstorage/2ae5ae9c-0685-4fec-85f0-90ad1e4cfc0c.png',
        path: '/pages/index',
      }
    },
  })
  // Configure store
  // https://pinia.vuejs.org/
  setupPinia(app)
  // 使用 uView UI
  app.use(uviewPlus)
  app.use(UniLayouts)

  return { app }
}
