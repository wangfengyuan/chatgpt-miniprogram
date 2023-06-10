import { onShareAppMessage } from '@dcloudio/uni-app'

export function useShare() {
  onShareAppMessage(() => {
    return {
      title: '这个回答太有趣了,你也来试试',
      imageUrl: 'https://mp-7772c90a-7206-4a36-8ba8-82747c24b2e6.cdn.bspapp.com/cloudstorage/2ae5ae9c-0685-4fec-85f0-90ad1e4cfc0c.png',
      path: '/pages/index',
    }
  })
  onShareTimeline(() => {
    return {
      title: '这个回答太有趣了,你也来试试',
      imageUrl: 'https://mp-7772c90a-7206-4a36-8ba8-82747c24b2e6.cdn.bspapp.com/cloudstorage/2ae5ae9c-0685-4fec-85f0-90ad1e4cfc0c.png',
      path: '/pages/index',
    }
  })
  const a = ref(0)
  return {
    a,
  }
}
