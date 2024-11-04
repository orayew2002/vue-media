<script setup lang="ts">
import { onMounted } from 'vue'
import MovieList from '@/components/movie/MovieList.vue'
import MovieScreen from '@/components/movie/MovieScreen.vue'
import AppLoading from '@/components/app/AppLoading.vue'
import { useMovieStore } from '@/store/movie'

const movieStore = useMovieStore()

onMounted(() => {
  movieStore.fetchMovies()
})
</script>

<template>
  <AppLoading v-if="movieStore.loading" />
  <div v-else>
    <MovieScreen :movie="movieStore.moviesWithCategories[0]?.movies[0]" />
    <div class="movie-list-home">
      <MovieList
        v-for="movies in movieStore.moviesWithCategories"
        :movies="movies"
        class="movie-list-home"
      />
    </div>
  </div>
</template>

<style scoped></style>
