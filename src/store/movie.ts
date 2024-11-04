import { getHomePageMovies } from '@/services/movies'
import type { TMoviesHomePage } from '@/types/movie'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMovieStore = defineStore('counter', () => {
  const loading = ref(false)
  const moviesWithCategories = ref<TMoviesHomePage>([])
  const isMoviesFetched = ref(false)
  async function fetchMovies() {
    loading.value = true
    if (!isMoviesFetched.value) {
      console.log('here')
      try {
        const res = await getHomePageMovies()
        moviesWithCategories.value = res.data
      } catch {
      } finally {
        loading.value = false
      }
    }
  }

  return { loading, moviesWithCategories, fetchMovies }
})
