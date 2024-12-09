import {
  getHomePageMovies,
  getMoviesByCatId,
  getSearchedMovies,
  getSubCatById,
} from '@/services/movies'
import type {
  TMovie,
  TMovieCategory,
  TMoviesBySubCatId,
  TMoviesHomePage,
} from '@/types/movie'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMovieStore = defineStore('counter', () => {
  const moviesHomePage = ref<TMoviesHomePage>([])
  const moviesWithScrollPagination = ref<TMoviesBySubCatId>()
  const subCatIdData = ref<TMovieCategory>()
  const moviesBySearch = ref<TMovie[]>([])
  const movieNotFound = ref(false)
  const page = ref(1)
  const count = 10
  const hasMore = ref(true)
  const isMoviesFetched = ref(false)
  // Loadings
  const loading = ref(false)
  const loadingForPaginated = ref(false)
  const loadingSubCatId = ref(false)
  const loadingSearched = ref(false)
  const path = ref('sub')
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

  async function fetchMoviesByIdWithPagination(id: string) {
    loadingForPaginated.value = true
    try {
      const res = await getMoviesByCatId(id, page.value, count)
      if (page.value === 1) {
        moviesWithScrollPagination.value = res.data
        if (res.data.total > page.value * count) {
          hasMore.value = true
          page.value += 1
        } else {
          hasMore.value = false
        }
      } else {
        moviesWithScrollPagination.value?.movies.push(...res.data.movies)
        if (res.data.total > page.value * count) {
          hasMore.value = true
          page.value += 1
        } else {
          hasMore.value = false
        }
      }
    } catch (err) {
      console.log(err)
    } finally {
      loadingForPaginated.value = false
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

  async function getMoviesBySearch(searchVal: string) {
    loadingSearched.value = true
    try {
      const res = await getSearchedMovies(searchVal)
      if (!res.data.length) {
        movieNotFound.value = true
      }
      moviesBySearch.value = res.data
    } catch (err) {
      loadingSearched.value = false
      console.error(err)
    } finally {
      loadingSearched.value = false
    }
  }

  return {
    loading,
    moviesHomePage,
    fetchMovies,
    fetchMoviesByIdWithPagination,
    moviesWithScrollPagination,
    loadingSubCatId,
    loadingForPaginated,
    hasMore,
    getSubCatIdFn,
    subCatIdData,
    page,
    path,
    getMoviesBySearch,
    loadingSearched,
    moviesBySearch,
    movieNotFound,
  }
})
