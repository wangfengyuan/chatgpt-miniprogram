import { getChatStream } from '../apis/user'
import useStore from '../stores'
export function useChatgpt() {
  const loading = ref(false)
  const output = ref('')
  const { user } = useStore()
  const generate = async (messages: { role: string; content: string }[]) => {
    if (loading.value)
      return
    loading.value = true
    output.value = ''
    try {
      const res: any = await getChatStream({
        messages,
      })
      if (typeof res === 'string') {
        output.value = res
      } else if (typeof res === 'object' && res.choices) {
        output.value = res.choices[0].content;
      }
      user.updateCredit(user.credit - 1)
    }
    catch (e: any) {
      uni.showToast({
        title: e.message || '超时请重试',
        icon: 'error',
      })
    }
    loading.value = false
    return output.value
  }
  return {
    loading,
    output,
    generate,
  }
}
