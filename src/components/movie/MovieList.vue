<script setup lang="ts">
import type { TMovieHomePage } from '@/types/movie'
import { RouterLink } from 'vue-router'
import MovieItem from '@/components/movie/MovieItem.vue'
import { useI18n } from 'vue-i18n'
import type { TLang } from '@/types/common'
const props = defineProps<{
  movies: TMovieHomePage
}>()

const { locale } = useI18n()
</script>

<template>
  <div class="movie_list_container">
    <div class="movie_list_header">
      <RouterLink :to="'/movies/category/' + movies.id"
        >{{ movies.title[locale as keyof TLang] }} ></RouterLink
      >
    </div>
    <div class="movie_list">
      <MovieItem
        v-for="movie in movies.movies"
        :key="movie.id"
        :movie="movie"
      />
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
  max-height: 100%;
  display: flex;
  gap: 2rem;
  padding: 10px;
  overflow-x: scroll;
  --webkit-overflow-scroll: none;
}
.movie_list::-webkit-scrollbar {
  display: none;
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
