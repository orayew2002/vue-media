<script setup lang="ts">
import type { TMovie } from '@/types/movie'
import { useI18n } from 'vue-i18n'
import type { TLang } from '@/types/common'
import formatDuration from '@/utils/formatDuration'
import { ref } from 'vue'
const env = import.meta.env.VITE_API_URL
const loadingImage = ref(true)

const props = defineProps<{
  movie: TMovie
}>()

const { locale } = useI18n()

const onImageLoad = () => {
  loadingImage.value = false
}
</script>

<template>
  <div>
    <div class="movie_item">
      <span class="movie_duration">{{ formatDuration(movie.duration) }}</span>
      <img
        @load="onImageLoad"
        :src="movie.image ? env + movie.image : '/placeholder.png'"
        alt="movie image"
      />
      <!-- Skeleton  -->
      <div v-if="loadingImage" class="skeleton"></div>
    </div>
    <span class="movie_title">{{ movie.title[locale as keyof TLang] }}</span>
  </div>
</template>
<style scoped>
.movie_item {
  position: relative;
  flex-shrink: 0;
  overflow-x: auto;
  scroll-behavior: smooth;
  width: 300px;
  transform: scale(1);
  transition: transform 0.3s ease-in-out;
  height: 100%;
  overflow: hidden;
}

.movie_item:hover {
  transform: scale(1.05);
  /* Bottom shading */
}

.movie_title {
  font-weight: 800;
  font-size: medium;
  text-transform: uppercase;
  color: var(--movie-title);
  display: block;
  margin-top: 0.5rem;
}

.movie_item_info > p {
  font-size: smaller;
  color: var(--slate-300);
}

.movie_duration {
  position: absolute;
  top: 0;
  right: 0;
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

/* Shimmer Effect */

@media screen and (max-width: 768px) {
  .movie_item {
    width: 120px;
    height: 100%;
  }
}

@media (min-width: 768px) and (max-width: 1440px) {
  .movie_item {
    width: 160px;
    height: 220px;
  }
}
</style>
