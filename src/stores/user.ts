import { defineStore } from 'pinia'

export default defineStore('user', {
  state: () => {
    return {
      userInfo: {} as {
        id: string
        nickname: string
        avatar: string
        credit: number
	    },
    }
  },
  getters: {
    logged: (state) => {
      const { id } = state.userInfo
      return !!id
    },
    id: (state) => {
      return state.userInfo.id
    },
    nickname: (state) => {
      return state.userInfo.nickname
    },
    avatar: (state) => {
      return state.userInfo.avatar
    },
    credit: (state) => {
      return state.userInfo.credit
    },
  },
  actions: {
    setUserInfo(userInfo: any) {
      Object.assign(this.userInfo, userInfo)
    },
    updateCredit(num: number) {
      Object.assign(this.userInfo, {
        credit: num,
      })
    },
    logOut() {
      this.userInfo = {}
    },
  },
})
