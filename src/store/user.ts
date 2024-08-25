/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginRequest, getprofile } from '@/api/user/user.ts'
import type { IAccount, UserInfo } from '@/api/user/type.ts'
import { deleteFile } from '@/api/upFile/upFile'

export const useUserStore = defineStore('user', () => {
  const token = ref(localStorage.getItem('token') ?? '')
  const userInfo = ref<UserInfo>()
  const username = ref()
  const phone = ref()

  async function fetchprofile() {
    if (token.value) {
      userInfo.value = await getprofile()
      username.value = userInfo.value.username
      phone.value = userInfo.value.phone
      const path = localStorage.getItem('pictureUplodTemp')
      if (path) {
        deleteFile(path)
        localStorage.removeItem('pictureUplodTemp')
      }
      const path1 = localStorage.getItem('movieUplodTemp')
      if (path1) {
        deleteFile(path1)
        localStorage.removeItem('movieUplodTemp')
      }
      const path2 = localStorage.getItem('qqgroupUplodTemp')
      if (path2) {
        deleteFile(path2)
        localStorage.removeItem('qqgroupUplodTemp')
      }
      const path3 = localStorage.getItem('wegroupUplodTemp')
      if (path3) {
        deleteFile(path3)
        localStorage.removeItem('wegroupUplodTemp')
      }
    } else {
      userInfo.value = undefined
      username.value = undefined
      phone.value = undefined
    }
  }
  async function login(iAccount: IAccount) {
    try {
      const tokenData: string = await loginRequest(iAccount)
      token.value = tokenData
      localStorage.setItem('token', tokenData)
      await fetchprofile()
      return Promise.resolve('登陆成功')
    } catch (e: any) {
      return Promise.reject(e)
    }
  }

  return {
    fetchprofile,
    login,
    token,
    userInfo,
    username,
    phone
  }
})
