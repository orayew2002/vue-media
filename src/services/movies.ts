import api from '@/plugins/api'
import type { TMovie, TMovieCategory } from '@/types/movie'
import type { AxiosResponse } from 'axios'

export const getMovies = async (): Promise<AxiosResponse<TMovie[]>> =>
  api.get<TMovie[]>('/movies')

export const getMovieCategories = async (): Promise<
  AxiosResponse<TMovieCategory[]>
> => api.get<TMovieCategory[]>('/categories/1/sub')
