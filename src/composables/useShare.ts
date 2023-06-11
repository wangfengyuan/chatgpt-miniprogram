import { onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app'

export function useShare() {
  const options = {
    title: '这个回答太有趣了,你也来试试',
    imageUrl: 'https://cos.codefe.top/images/ai-home-screenshot.png',
    path: '/pages/index',
  }
  onShareAppMessage(() => (options))
	
	onShareTimeline(() => (options));
  return {
    onShareAppMessage,
    onShareTimeline,
  }
}
