import axios from '../index.ts'

export function deleteFile(path: string) {
  return axios.delete('/media/upFile/delete', { params: { path } })
}
