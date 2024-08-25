export interface IAccount {
  username: string
  password: string
}

export interface IAccount2 {
  username: string
  phone: string
  password: string
  repassword: string
  verifyCode: string
}

export interface TokenResult {
  code: number
  message: string
  data: string
}

export interface UserInfo {
  id: string
  username: string
  openid: string
  phone: string
  password: string
  avatar: string
  birthday: string
  realname: string
  sex: string
  province: string
  city: string
  district: string
  realaddress: string
  cardnum: string
  cardfonturl: string
  cardbackurl: string
  gmtcreate: string
  gmtmodified: string
  permissions: string[]
  ophone: boolean
  obirthday: boolean
  orealname: boolean
  osex: boolean
  oprovince: boolean
  ocity: boolean
  odistrict: boolean
  ocardnum: boolean
}

export interface UserVo {
  pageNo: number
  pageSize: number
  sex: string
  province: string
  city: string
  district: string
  beginTime: string
  endTime: string
}

export interface UserPag {
  total: number
  records: UserInfo[]
}

export interface RePassVo {
  oldpass: string
  newpass: string
  renewpass: string
}

export interface VerifyVo {
  realName: string
  cardNo: string
}

export interface YearCount {
  year: string
  num: number
}

export interface SexCount {
  sex: string
  num: number
}

export interface ProvinceCount {
  province: string
  num: number
}

export interface CountMap {
  yearCountList: YearCount[]
  sexCountList: SexCount[]
  provinceCountList: ProvinceCount[]
}
