import type { TMusicAll } from '@/types/music'
import type { AxiosResponse } from 'axios'
import api from '@/plugins/api'

export const getMusicAll = async (
  page: number,
  count: number,
): Promise<AxiosResponse<TMusicAll>> =>
  api.get<TMusicAll>(`/musics?page=${page || 1}&count=${count || 1}`)
