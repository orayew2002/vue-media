import type { AxiosResponse } from 'axios'
import api from '@/plugins/api'
import type { TPost, TSignInRes } from '@/types/auth'

export const signIn = async (body: TPost): Promise<AxiosResponse<TSignInRes>> =>
  api.post('/auth/sign-in', body)
