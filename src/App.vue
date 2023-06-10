<script setup lang="ts">
import useStore from './stores'
import { getUserInfo } from './apis/user.ts'
const { user } = useStore()
onLaunch(async () => {
  if (!user.logged)
    return
  const newUserInfo = await getUserInfo()
  user.setUserInfo(newUserInfo)
})
onShow(() => {})
onHide(() => {})
</script>

<style lang="scss">
  @import "uview-plus/index.scss";
</style>
