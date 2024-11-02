<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import type { TMovie } from '@/types/movie'
import { getMovies } from '@/services/movies'
import MovieList from '@/components/movie/MovieList.vue'
import MovieScreen from '@/components/movie/MovieScreen.vue'
const loading = ref(false)
const movies = ref<TMovie[]>([])
const error = ref(null)
async function fetchData() {
  loading.value = true

  try {
    const data = await getMovies()
    movies.value = data.data
  } catch (err: any) {
    error.value = err.toString()
  } finally {
    loading.value = false
  }
}

watchEffect(() => fetchData())
</script>

<template>
  <div>
    <MovieScreen :movie="movies[0]" />
    <MovieList :movies="movies" />
  </div>
</template>
