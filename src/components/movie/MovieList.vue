<script setup lang="ts">
import type { TMovie } from '@/types/movie'
import { RouterLink } from 'vue-router'
import MovieItem from '@/components/movie/MovieItem.vue'
import { defineProps } from 'vue'
const props = defineProps<{
  movies: TMovie[]
}>()
</script>

<template>
  <div class="movie_list_container">
    <div class="movie_list_header">
      <RouterLink to="/">Movie List ></RouterLink>
    </div>
    <div class="movie_list">
      <MovieItem v-for="movie in movies" :key="movie.id" :movie="movie" />
    </div>
  </div>
</template>

<style scoped>
.movie_list_container {
  margin-top: 1rem;
  overflow-x: auto;
}

.movie_list {
  width: 100%;
  height: 100%;
  display: flex;
  gap: 1rem;
  padding: 10px;
  overflow-x: scroll;
}

.movie_list_header > a {
  text-decoration: none;
  color: #ffff;
  padding: 1rem 0.5rem;
  font-size: 2rem;
}
@media screen and (max-width: 768px) {
  .movie_list_header > a {
    font-size: 1rem;
  }
}
@media (min-width: 768px) and (max-width: 1440px) {
  .movie_list_header > a {
    font-size: 1.5rem;
  }
}
</style>
