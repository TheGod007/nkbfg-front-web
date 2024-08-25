/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from '../index.ts'
import { QqgroupPage, Qqgroup } from './type.ts'
import { Page } from '../type.ts'

export function getPageAllAndCondition(page: Page) {
  return axios.post<any, QqgroupPage>('/media/qqgroup/getPageAllAndCondition', page)
}

export function getPageAndCondition(page: Page) {
  return axios.post<any, QqgroupPage>('/media/qqgroup/getPageAndCondition', page)
}

export function save(qqgroup: Qqgroup) {
  return axios.post('/media/qqgroup/save', qqgroup)
}

export function update(qqgroup: Qqgroup) {
  return axios.post('/media/qqgroup/update', qqgroup)
}

export function deleteById(id: string) {
  return axios.delete(`/media/qqgroup/deleteById/${id}`)
}
