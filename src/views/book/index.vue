<script setup lang="ts">
import BookList from '@/components/book/BookList.vue'
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useBookStore } from '@/store/book'
import AppLoading from '@/components/app/AppLoading.vue'
const store = useBookStore()
const loadTrigger = ref(null)
let observer: IntersectionObserver | null = null
const createObserver = () => {
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0, // Trigger when 100% of element is in view
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && store.hasMore && !store.loading) {
        store.getBooksFn()
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

onMounted(() => {
  createObserver()
  store.page = 1
  store.getBooksFn()
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect() // Properly disconnect the observer on unmount
    observer = null
  }
})
</script>
<template>
  <AppLoading v-if="store.loading" />
  <div class="book_container">
    <BookList v-if="store.books?.books.length" :books="store.books?.books" />
    <div
      ref="loadTrigger"
      class="load-trigger"
      v-if="!store.loading && store.hasMore"
    >
      Loading more books...
    </div>
  </div>
</template>
<style scoped>
.book_container {
  position: relative;
}
.load-trigger {
  color: white;
  font-size: 1.2rem;
  text-align: center;
  padding: 1rem 0;
}
</style>
