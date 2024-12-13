import type { TBookAll } from '@/types/book'
import type { AxiosResponse } from 'axios'
import api from '@/plugins/api'

export const getBooks = async (
  page: number,
  count: number,
): Promise<AxiosResponse<TBookAll>> =>
  api.get<TBookAll>(`/books?page=${page || 1}&count=${count || 1}`)
