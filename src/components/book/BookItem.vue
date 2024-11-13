<script setup lang="ts">
import { useIsMobile } from '@/composables/useIsMobile'
import type { TLang } from '@/types/common'
import type { TMusic } from '@/types/music'
import { useRoute } from 'vue-router'

const props = defineProps<{
  book: TMusic
}>()
const { isMobile } = useIsMobile()
const route = useRoute()
console.log(route.params.id, 'id')
</script>
<template>
  <div
    @click="$emit('bookClick', book.path)"
    class="book_item"
    :class="{
      'bg-dark': book.id.toString() === $route.params.id,
      mb: isMobile,
    }"
  >
    <p>{{ book.title[$i18n.locale as keyof TLang] }}</p>
  </div>
</template>
<style scoped>
.book_item {
  position: relative;
  display: flex;
  width: 100%;
  padding: 10px;
  align-items: center;
  background-color: transparent;
  gap: 1rem;
}

.bg-dark {
  background-color: var(--slate-800);
}

.mb:last-child {
  margin-bottom: 3.3rem;
}

.book_item:hover {
  background-color: var(--slate-900);
  cursor: pointer;
}

.book_item > p {
  color: var(--slate-300);
}

svg {
  fill: var(--slate-400);
}
</style>
