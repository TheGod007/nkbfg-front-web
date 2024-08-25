/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from '../index.ts'
import { MoviePage, Movie } from './type.ts'
import { Page } from '../type.ts'

export function getPageAllAndCondition(page: Page) {
  return axios.post<any, MoviePage>('/media/picture/getPageAllAndCondition', page)
}

export function getPageAndCondition(page: Page) {
  return axios.post<any, MoviePage>('/media/movie/getPageAndCondition', page)
}

export function save(movie: Movie) {
  return axios.post('/media/movie/save', movie)
}

export function update(movie: Movie) {
  return axios.post('/media/movie/update', movie)
}

export function deleteById(id: string) {
  return axios.delete(`/media/movie/deleteById/${id}`)
}
