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
      const res = await getChatStream({
        messages,
      })

      console.log('res', res)
      if (res) {
        output.value = res
        user.updateCredit(user.credit - 1)
      }
    }
    catch (e: any) {
      uni.showToast({
        title: e.message,
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
