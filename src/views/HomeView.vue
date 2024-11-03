<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import type { TMovie, TMoviesHomePage } from '@/types/movie'
import { getHomePageMovies, getMovies } from '@/services/movies'
import MovieList from '@/components/movie/MovieList.vue'
import MovieScreen from '@/components/movie/MovieScreen.vue'
import AppLoading from '@/components/app/AppLoading.vue'
const loading = ref(false)
const moviesWithCategories = ref<TMoviesHomePage>([])
const error = ref(null)
async function fetchData() {
  loading.value = true

  try {
    const data = await getHomePageMovies()
    moviesWithCategories.value = data.data
  } catch (err: any) {
    error.value = err.toString()
  } finally {
    loading.value = false
  }
}

watchEffect(() => fetchData())
</script>

<template>
  <AppLoading v-if="loading" />
  <div v-else>
    <MovieScreen :movie="moviesWithCategories[0]?.movies[0]" />
    <MovieList v-for="movies in moviesWithCategories" :movies="movies" />
  </div>
</template>
