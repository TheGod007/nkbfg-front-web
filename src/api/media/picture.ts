/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from '../index.ts'
import { PicturePage, Picture } from './type.ts'
import { Page } from '../type.ts'

export function getPageAllAndCondition(page: Page) {
  return axios.post<any, PicturePage>('/media/picture/getPageAllAndCondition', page)
}

export function getPageAndCondition(page: Page) {
  return axios.post<any, PicturePage>('/media/picture/getPageAndCondition', page)
}

export function save(picture: Picture) {
  return axios.post('/media/picture/save', picture)
}

export function update(picture: Picture) {
  return axios.post('/media/picture/update', picture)
}

export function deleteById(id: string) {
  return axios.delete(`/media/picture/deleteById/${id}`)
}
