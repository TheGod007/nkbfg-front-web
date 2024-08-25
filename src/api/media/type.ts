export interface Picture {
  id: string
  uid: string
  username: string
  path: string
  title: string
  reason: string
  state: number
  stateStr: string
  description: string
  gmtmodified: string
  gmtcreate: string
}

export interface PicturePage {
  records: Picture[]
  total: number
}

export interface Movie {
  id: string
  uid: string
  username: string
  path: string
  title: string
  reason: string
  state: number
  stateStr: string
  description: string
  gmtmodified: string
  gmtcreate: string
}

export interface MoviePage {
  records: Movie[]
  total: number
}

export interface Qqgroup {
  id: string
  uid: string
  username: string
  path: string
  title: string
  reason: string
  state: number
  stateStr: string
  description: string
  gmtmodified: string
  gmtcreate: string
}

export interface QqgroupPage {
  records: Qqgroup[]
  total: number
}

export interface Wegroup {
  id: string
  uid: string
  username: string
  path: string
  title: string
  reason: string
  state: number
  stateStr: string
  description: string
  gmtmodified: string
  gmtcreate: string
}

export interface WegroupPage {
  records: Wegroup[]
  total: number
}
