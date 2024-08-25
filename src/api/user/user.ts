/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from '../index.ts'
import type { IAccount, IAccount2, UserInfo, UserPag, UserVo, RePassVo, VerifyVo, CountMap } from './type.ts'

/** 用户的网络请求 */
export function loginRequest(iAccount: IAccount) {
  return axios.get<any, string>('/ucenter/user/login', {
    params: iAccount
  })
}

export function getprofile() {
  return axios.get<any, UserInfo>('/ucenter/user/getprofile')
}

export function saveAvatar(path: string) {
  return axios.put('/ucenter/user/saveAvatar', { path })
}

export function register(iAccount2: IAccount2) {
  return axios.post('/ucenter/user/register', iAccount2)
}

export function getByIds(ids: string[]) {
  return axios.post<any, UserInfo[]>('/ucenter/user/getByIds', ids)
}

export function update(userInfo: UserInfo) {
  return axios.post('/ucenter/user/update', userInfo)
}

export function getUserByNameOrPhone(username: string) {
  return axios.get<any, UserInfo>('/ucenter/user/getUserByNameOrPhone', {
    params: { username }
  })
}

export function cardVerify(verifyVo: VerifyVo) {
  return axios.put('/ucenter/user/cardVerify', verifyVo)
}

export function resetPassword(rePassVo: RePassVo) {
  return axios.put('/ucenter/user/resetPassword', rePassVo)
}

export function getPageAndCondition(userVo: UserVo) {
  return axios.post<any, UserPag>('/ucenter/user/getPageAndCondition', userVo)
}

export function getAllProvince() {
  return axios.get<any, string[]>('/ucenter/user/getAllProvince')
}

export function getAllCityByProvince(province: string) {
  return axios.get<any, string[]>('/ucenter/user/getAllCityByProvince', {
    params: { province }
  })
}

export function getAllDistrictByCity(city: string) {
  return axios.get<any, string[]>('/ucenter/user/getAllDistrictByCity', {
    params: { city }
  })
}

export function getCountMap() {
  return axios.get<any, CountMap>('/ucenter/user/getCountMap')
}
export function getCode() {
  return axios.get<any, string>('/ucenter/user/getCode')
}
