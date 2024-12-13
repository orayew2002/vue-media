<script setup lang="ts">
import { onMounted } from 'vue'
import MovieList from '@/components/movie/MovieList.vue'
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
    <div class="movie-list-home">
      <MovieList
        v-bind:key="movies.id"
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
  max-width: var(--max-width);
  margin-inline: auto;
  padding-left: 4px;
}
</style>
