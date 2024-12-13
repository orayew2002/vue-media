<script setup lang="ts">
import { useIsMobile } from '@/composables/useIsMobile'
import type { TLang } from '@/types/common'
import type { TMovieCategory } from '@/types/movie'
defineProps<{
  categories: TMovieCategory[]
  link: {
    name: string
    path: string
  }
}>()
const { isMobile } = useIsMobile()
</script>
<template>
  <div
    class="dropdown_container"
    :class="{ for_mobile: isMobile }"
    v-if="link.name === 'movies'"
  >
    <li v-bind:key="cat.id" v-for="cat in categories">
      <RouterLink :key="cat.id" :to="'/movies/category/' + cat.id">{{
        cat.title[$i18n.locale as keyof TLang]
      }}</RouterLink>
    </li>
  </div>
</template>

<style scoped>
li:hover .dropdown_container {
  display: block;
}

.dropdown_container {
  background-color: var(--slate-800);
  position: absolute;
  top: 100%;
  left: 0;
  width: 200px;
  transition: 0.7s ease-in-out;
  border-radius: 5px;
  display: none;
}

.for_mobile {
  display: block;
}

.dropdown_container > li {
  padding: 8px;
  width: 100%;
}

.dropdown_container > li > a {
  display: block;
  color: #fff;
  font-size: 1rem;
  padding-bottom: 3px;
  text-transform: uppercase;
  text-decoration: none;
}

.dropdown_container > li:hover {
  background-color: var(--slate-500);
  border-radius: 5px;
}

li {
  list-style: none;
}

a:hover {
  color: var(--slate-100);
}

@media screen and (min-width: 1300px) {
  .dropdown_container > li > a {
    font-size: 1rem;
  }
}
</style>
