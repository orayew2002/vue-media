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
      <RouterLink :to="'/movies/category/' + movies.id">{{
        movies.title[locale as keyof TLang]
      }}</RouterLink>
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
  /* margin-bottom: 3.5rem; */
}

.movie_list {
  width: 100%;
  max-height: 100%;
  display: flex;
  gap: 2rem;
  padding: 10px;
  overflow-x: scroll;
  overflow-y: hidden;
  --webkit-overflow-scroll: none;
}
.movie_list::-webkit-scrollbar {
  display: none;
}

.movie_list_header {
  display: flex;
  justify-content: space-between;
  align-items: end;
}

.show_all {
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background-color: var(--bg-new);
  border-radius: 20px;
  margin-right: 4px;
  cursor: pointer;
}
.show_all > span {
  color: #fff;
}

.movie_list_header > a {
  text-decoration: none;
  color: #ffff;
  /* padding: 1rem 0.5rem; */
  padding-left: 0.5rem;
  font-size: 2rem;
}

.right_arrow_img {
  background-color: black;
  padding-inline: 10px;
  padding-block: 4px;
  border-radius: 10px;
}

@media screen and (max-width: 768px) {
  .movie_list_container {
    margin-top: 2px;
    /* margin-bottom: 3.5rem; */
  }
  .movie_list {
    gap: 10px;
    padding: 6px;
  }
  .movie_list_header > a {
    font-size: medium;
  }
  .show_all {
    padding: 2px;
    border-radius: 10px;
  }
  .show_all > span {
    font-size: 10px;
  }
  .right_arrow_img {
    padding-inline: 3px;
    padding-block: 0.1px;
  }
}
@media (min-width: 768px) and (max-width: 1555px) {
  .movie_list_header > a {
    font-size: x-large;
  }
}
</style>
