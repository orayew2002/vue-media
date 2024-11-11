import type { TLang } from '../common'

export type TMusic = {
  id: number
  path: string
  title: TLang
}

export type TMusicAll = {
  musics: TMusic[]
  total: number
}
