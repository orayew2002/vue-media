import type { TCommon, TLang } from '../common'

export type TMovie = {
  description: TLang
  duration: number
  id: number
  image: string
  sub_categories: TCommon[]
  title: TLang
}

export type TMovieCategory = {
  id: number
  title: TLang
}
