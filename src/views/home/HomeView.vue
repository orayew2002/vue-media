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
    <MovieScreen
      v-if="movieStore.moviesHomePage[0]?.movies[0].id"
      :movie="movieStore.moviesHomePage[0]?.movies[0]"
    />
    <div class="movie-list-home">
      <MovieList
        v-for="movies in movieStore.moviesHomePage"
        :movies="movies"
        class="movie-list-home"
      />
    </div>
  </div>
</template>

<style scoped>
.movie-list-home:last-child {
  margin-bottom: 3.5rem;
}
</style>
