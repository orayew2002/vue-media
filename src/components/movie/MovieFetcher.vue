<script setup lang="ts">
import { useMovieStore } from '@/store/movie'
import MovieItem from '@/components/movie/MovieItem.vue'
import { onMounted, ref, onUnmounted, watch } from 'vue'
import type { TLang } from '@/types/common'
import type { TMovie, TMovieCategory } from '@/types/movie'
const store = useMovieStore()
const loadTrigger = ref(null)
let observer: IntersectionObserver | null = null

const props = defineProps<{
  id: string
  data: TMovieCategory
}>()
// Intersection Observer for infinite scrolling
const createObserver = () => {
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0, // Trigger when 100% of element is in view
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && store.hasMore && !store.loadingForPaginated) {
        store.fetchMoviesByIdWithPagination(props.id as string)
      }
    })
  }, options)

  if (loadTrigger.value) {
    observer.observe(loadTrigger.value)
  }
}

// Watch for the element reference and start observing once it’s available
watch(loadTrigger, newVal => {
  if (newVal) createObserver()
})

watch(
  () => props.id,
  newVal => {
    if (newVal) {
      store.page = 1
      store.hasMore = true
      store.fetchMoviesByIdWithPagination(props.id as string)
    }
  },
  { immediate: true },
)

onMounted(() => {
  createObserver()
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect() // Properly disconnect the observer on unmount
    observer = null
  }
})
</script>

<template>
  <div v-if="store.moviesWithScrollPagination" class="container">
    <h1>{{ data?.title[$i18n.locale as keyof TLang] }}</h1>
    <div class="movie_list">
      <MovieItem
        v-for="movie in store.moviesWithScrollPagination.movies"
        :key="movie.id"
        :movie="movie"
        class="movie-item"
      />
      <div
        ref="loadTrigger"
        class="load-trigger"
        v-if="!store.loadingSubCatId && store.hasMore"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 90%;
  margin-inline: auto;
  padding-bottom: 1rem;
}
.movie_list {
  width: 100%;
  max-height: 100%;
  display: flex;
  gap: 1rem;
  /* padding: 10px; */
  overflow-x: scroll;
  overflow-y: hidden;
  --webkit-overflow-scroll: none;
}
.movie_list::-webkit-scrollbar {
  display: none;
}

.movie_list:last-child {
  margin-bottom: 3.3rem;
}

h1 {
  color: var(--slate-300);
  padding-block: 1rem;
  font-size: 1.2rem;
}

.load-trigger {
  color: white;
  text-align: center;
}
@media screen and (min-width: 1120px) and (max-width: 1553px) {
  h1 {
    font-size: 1.5rem;
  }
}
</style>
