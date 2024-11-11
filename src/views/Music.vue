<script setup lang="ts">
import { useMusicStore } from '@/store/music'
import MusicList from '@/components/music/MusicList.vue'
import { onMounted, onUnmounted, ref, watch } from 'vue'
const store = useMusicStore()
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
        store.getMusic()
        console.log('in intersection')
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
  store.getMusic()
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect() // Properly disconnect the observer on unmount
    observer = null
  }
})
</script>
<template>
  <MusicList
    v-if="store.music?.musics.length"
    :music-all="store.music?.musics"
  />
  <div
    ref="loadTrigger"
    class="load-trigger"
    v-if="!store.loading && store.hasMore"
  >
    Loading more music...
  </div>
</template>
