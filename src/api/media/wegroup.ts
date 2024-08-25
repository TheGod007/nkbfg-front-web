/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from '../index.ts'
import { WegroupPage, Wegroup } from './type.ts'
import { Page } from '../type.ts'

export function getPageAllAndCondition(page: Page) {
  return axios.post<any, WegroupPage>('/media/wegroup/getPageAllAndCondition', page)
}

export function getPageAndCondition(page: Page) {
  return axios.post<any, WegroupPage>('/media/wegroup/getPageAndCondition', page)
}

export function save(wegroup: Wegroup) {
  return axios.post('/media/wegroup/save', wegroup)
}

export function update(wegroup: Wegroup) {
  return axios.post('/media/wegroup/update', wegroup)
}

export function deleteById(id: string) {
  return axios.delete(`/media/wegroup/deleteById/${id}`)
}
