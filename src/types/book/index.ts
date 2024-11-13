import type { TLang } from '../common'

export type TBook = {
  id: number
  path: string
  title: TLang
}

export type TBookAll = {
  books: TBook[]
  total: number
}
