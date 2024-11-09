<script setup lang="ts">
import MoviesBySubCatId from '@/components/movie/MovieFetcher.vue'
import { useMovieStore } from '@/store/movie'
import type { TMovieCategory } from '@/types/movie'
import { watch } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const store = useMovieStore()

watch(
  () => route.params.id,
  newVal => {
    if (newVal) {
      store.getSubCatIdFn(route.params.id as string)
    }
  },
  { immediate: true },
)
</script>

<template>
  <MoviesBySubCatId
    :movies="store.moviesWithScrollPagination?.movies ?? []"
    :loading="store.loadingForPaginated"
    :id="$route.params.id as string"
    :data="store.subCatIdData as TMovieCategory"
    :path="'search'"
    v-if="$route.params.id"
  />
</template>
