import api from '@/plugins/api'
import type { TMovie, TMovieCategory, TMoviesHomePage } from '@/types/movie'
import type { AxiosResponse } from 'axios'

export const getMovies = async (): Promise<AxiosResponse<TMovie[]>> =>
  api.get<TMovie[]>('/movies')

export const getHomePageMovies = async (): Promise<
  AxiosResponse<TMoviesHomePage>
> => api.get<TMoviesHomePage>('/movies/main-page')

export const getMovieCategories = async (): Promise<
  AxiosResponse<TMovieCategory[]>
> => api.get<TMovieCategory[]>('/categories/1/sub')
