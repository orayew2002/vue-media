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

export type TMovieHomePage = {
  id: number
  title: TLang
  movies: TMovie[]
}

export type TMoviesBySubCatId = {
  movies: TMovie[]
  total: number
}

export type TMoviesHomePage = TMovieHomePage[]
