import {
  getHomePageMovies,
  getMoviesByCatId,
  getSubCatById,
} from '@/services/movies'
import type {
  TMovieCategory,
  TMoviesBySubCatId,
  TMoviesHomePage,
} from '@/types/movie'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMovieStore = defineStore('counter', () => {
  const loading = ref(false)
  const moviesHomePage = ref<TMoviesHomePage>([])
  const moviesBySubCatId = ref<TMoviesBySubCatId>()
  const subCatIdData = ref<TMovieCategory>()
  const page = ref(1)
  const count = ref(10)
  const hasMore = ref(true)
  const isMoviesFetched = ref(false)
  const loadingBySubIdMovies = ref(false)
  const loadingSubCatId = ref(false)
  async function fetchMovies() {
    loading.value = true
    if (!isMoviesFetched.value) {
      try {
        const res = await getHomePageMovies()
        moviesHomePage.value = res.data
      } catch {
      } finally {
        loading.value = false
      }
    }
  }

  async function fetchMoviesBySubCatId(id: string) {
    console.log('hello it is me')
    loadingBySubIdMovies.value = true
    try {
      const res = await getMoviesByCatId(id, page.value, count.value)
      if (page.value === 1) {
        moviesBySubCatId.value = res.data
        if (res.data.total > page.value * count.value) {
          hasMore.value = true
          page.value += 1
        } else {
          hasMore.value = false
        }
      } else {
        moviesBySubCatId.value?.movies.push(...res.data.movies)
        console.log(res.data.total, page.value * count.value)
        if (res.data.total > page.value * count.value) {
          hasMore.value = true
          page.value += 1
        } else {
          hasMore.value = false
        }
      }
    } catch (err) {
      console.log(err)
    } finally {
      loadingBySubIdMovies.value = false
    }
  }

  async function getSubCatIdFn(id: string) {
    loadingSubCatId.value = true
    try {
      const res = await getSubCatById(id)
      subCatIdData.value = res.data
    } catch (err) {
      console.log(err)
      loadingSubCatId.value = false
    } finally {
      loadingSubCatId.value = false
    }
  }

  return {
    loading,
    moviesHomePage,
    fetchMovies,
    fetchMoviesBySubCatId,
    moviesBySubCatId,
    loadingSubCatId,
    loadingBySubIdMovies,
    hasMore,
    getSubCatIdFn,
    subCatIdData,
    page,
  }
})
