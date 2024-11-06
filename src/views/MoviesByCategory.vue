<script setup lang="ts">
import MoviesBySubCatId from '@/components/movie/MoviesBySubCatId.vue'
import { useMovieStore } from '@/store/movie'
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
    v-if="$route.params.id && store.subCatIdData"
    :id="$route.params.id as string"
    :data="store.subCatIdData"
  />
</template>
