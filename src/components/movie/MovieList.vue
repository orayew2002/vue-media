<script setup lang="ts">
import type { TMovieHomePage } from '@/types/movie'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import type { TLang } from '@/types/common'
import MovieItemHorizontal from './MovieItemHorizontal.vue'
defineProps<{
  movies: TMovieHomePage
}>()

const { locale } = useI18n()
</script>

<template>
  <div class="movie_list_container" v-if="movies.movies.length > 0">
    <div class="movie_list_header">
      <RouterLink :to="'/movies/category/' + movies.id">
        {{ movies.title[locale as keyof TLang] }}
      </RouterLink>
      <div class="show_all">
        <span @click="$router.push('/movies/category/' + movies.id)">{{
          $t('all')
        }}</span>
        <div class="right_arrow_img">
          <img src="/right_arrow.svg" alt="right arrow" />
        </div>
      </div>
    </div>
    <div class="movie_list">
      <MovieItemHorizontal
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
  /* margin-bottom: 3.5rem; */
}

.movie_list {
  width: 100%;
  max-height: 100%;
  display: flex;
  padding-left: 4px;
  gap: 2rem;
  overflow-x: scroll;
  overflow-y: hidden;
  margin-top: 4px;
  --webkit-overflow-scroll: none;
}
.movie_list::-webkit-scrollbar {
  display: none;
}

.movie_list_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-block: 4px;
}

.show_all {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  background-color: var(--slate-800);
  /* border-radius: 10px; */
  margin-right: 4px;
  cursor: pointer;
  width: 120px !important;
}

.show_all > span {
  color: #fff;
}

.movie_list_header > a {
  text-decoration: none;
  color: #ffff;
  /* padding: 1rem 0.5rem; */
  display: flex;
  font-size: 2rem;
  align-self: self-start;
}

.right_arrow_img {
  background-color: var(--slate-950);
  display: flex;
  padding: 4px;
  border-radius: 50%;
}

@media screen and (max-width: 768px) {
  .movie_list_container {
    margin-top: 2px;
    /* margin-bottom: 3.5rem; */
  }
  .movie_list {
    gap: 10px;
    /* padding: 6px; */
  }
  .movie_list_header > a {
    font-size: medium;
  }
  .show_all {
    padding: 4px;
    border-radius: 10px;
    width: 90px !important;
  }
  .show_all > span {
    font-size: 10px;
  }
}
@media (min-width: 768px) and (max-width: 3000px) {
  .movie_list_header > a {
    font-size: x-large;
    padding: 0;
  }
  .show_all {
    padding-inline: 12px;
    padding-block: 6px;
    border-radius: 10px;
  }
  .show_all > span {
    font-size: medium;
  }
}
</style>
