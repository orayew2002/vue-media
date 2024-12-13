<script setup lang="ts">
import type { TMovieCategory } from '@/types/movie'
import { onMounted, onUnmounted, ref } from 'vue'
import CategoryLinks from '@/components/app/CategoryLinks.vue'
defineProps<{
  categories: TMovieCategory[]
}>()
const menu = ref<HTMLButtonElement>()
const isVisible = ref(false)
const handleClickMenu = (e: Event) => {
  e.preventDefault()
  isVisible.value = !isVisible.value
}

const handleClickOutside = (event: MouseEvent) => {
  if (
    isVisible.value &&
    menu.value &&
    !menu.value.contains(event.target as Node)
  ) {
    isVisible.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
<template>
  <div class="category_menu_container">
    <div class="category-menu" ref="menu">
      <button @click="handleClickMenu">Kategoriyalar</button>
      <img class="arrow" src="/right_arrow.svg" alt="" />
    </div>
    <CategoryLinks
      :link="{
        name: 'movies',
        path: '/',
      }"
      v-if="isVisible"
      :categories="categories"
    />
  </div>
</template>

<style scoped>
.category_menu_container {
  position: relative;
}
.category-menu {
  padding: 0.5rem 1rem;
  background-color: var(--slate-900);
  display: flex;
  align-items: center;
  gap: 3px;
  border-radius: 10px;
  margin-bottom: 5px;
}

.category-menu > button {
  background-color: transparent;
  border: none;
  color: var(--slate-200);
  font-size: 10px;
}
.arrow {
  transform: rotate(90deg);
  display: block;
}
</style>
