<script setup lang="ts">
import type { TMovie } from '@/types/movie'
import { useI18n } from 'vue-i18n'
import type { TLang } from '@/types/common'
import formatDuration from '@/utils/formatDuration'
const env = import.meta.env.VITE_API_URL
const props = defineProps<{
  movie: TMovie
}>()

const { locale } = useI18n()
</script>
<template>
  <div class="movie_item">
    <div class="movie_item_info">
      <span class="movie_title">{{ movie.title[locale as keyof TLang] }}</span>
    </div>
    <span class="movie_duration">{{ formatDuration(movie.duration) }}</span>
    <img
      :src="movie.image ? env + movie.image : '/logo.svg'"
      alt="movie image"
    />
  </div>
</template>
<style scoped>
.movie_item {
  position: relative;
  flex-shrink: 0;
  overflow-x: auto;
  scroll-behavior: smooth;
  width: 300px;
  cursor: pointer;
  transform: scale(1);
  transition: transform 0.3s ease-in-out;
}

.movie_item::before {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  content: '';
  background: 
    /* Top shading */
    linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0)) 0 0,
    /* Bottom shading */
      linear-gradient(to top, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0)) 0 100%,
    /* Left shading */
      linear-gradient(to right, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0)) 0 0,
    /* Right shading */
      linear-gradient(to left, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0)) 100% 0;
}

.movie_item:hover {
  transform: scale(1.05);
  /* Bottom shading */
}

.movie_item_info {
  position: absolute;
  bottom: 10%;
  margin-left: 5px;
  color: white;
  left: 0;
}

.movie_item_info > .movie_title {
  font-weight: 800;
  font-size: medium;
  text-transform: uppercase;
}

.movie_item_info > p {
  font-size: smaller;
  color: var(--slate-300);
}

.movie_duration {
  position: absolute;
  top: 2%;
  right: 3%;
  background: rgba(0, 0, 0, 0.4);
  padding: 2px 5px;
  border-radius: 5px;
  font-size: smaller;
  color: white;
}

.movie_item > img {
  width: 100%;
  height: 100%;
  border-radius: 4px;
  object-fit: cover;
}

@media screen and (max-width: 768px) {
  .movie_item {
    width: 120px;
    height: 100%;
  }
}

@media (min-width: 768px) and (max-width: 1440px) {
  .movie_item {
    width: 320px;
    height: 220px;
  }
}
</style>
