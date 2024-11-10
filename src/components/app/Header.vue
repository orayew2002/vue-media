<template>
  <div class="header">
    <div class="header_container">
      <div class="header_logo_search">
        <img
          src="@/assets/img/logo.svg"
          alt="logo"
          @click="() => $router.push('/')"
        />
        <Search v-if="!isMobile" />
      </div>

      <div class="links">
        <ul>
          <li v-for="link in links" :key="link.name">
            <RouterLink :to="link.path">{{ $t(link.name) }}</RouterLink>
            <div class="dropdown_container" v-if="link.name === 'movies'">
              <li v-for="cat in categories">
                <RouterLink :key="cat.id" :to="'/movies/category/' + cat.id">{{
                  cat.title[locale as keyof TLang]
                }}</RouterLink>
              </li>
            </div>
          </li>
        </ul>
      </div>

      <Locales />
    </div>
  </div>
  <BottomMenu v-if="isMobile" />
</template>

<style scoped>
.header {
  position: relative;
  height: 90px;
  width: 100%;
}
.header_container {
  position: fixed;
  width: 100%;
  padding: 0.6rem 0.5rem;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 2), rgba(0, 0, 0, 0.9));
  display: flex;
  justify-content: space-between;
  align-items: center;
  top: 0;
  left: 0;
  z-index: 105;
}

.header_logo_search {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.links {
  margin-inline: 2rem;
  position: relative;
}

.links > ul {
  display: flex;
  gap: 2rem;
}

.links > ul > li {
  position: relative;
}

.header_logo_search > img {
  width: 10rem;
  cursor: pointer;
}

ul {
  padding: 0px;
  list-style: none;
}

a {
  text-transform: uppercase;
  text-decoration: none;
  font-size: 1.4rem;
  color: rgb(148 163 184);
}

a:hover {
  color: var(--slate-100);
}
li:hover .dropdown_container {
  display: block;
}

.dropdown_container {
  background-color: var(--slate-600);
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  width: 200px;
  transition: 0.7s ease-in-out;
  border-radius: 5px;
}

.dropdown_container > li {
  padding: 4px;
  width: 100%;
}

.dropdown_container > li > a {
  display: block;
  color: #fff;
  font-size: 16px;
  padding-bottom: 3px;
}

.dropdown_container > li:hover {
  background-color: var(--slate-500);
  border-radius: 5px;
}

@media screen and (max-width: 768px) {
  .header_logo_search > img {
    width: 7rem;
  }
  .header {
    height: 60px;
  }
  .header_container {
    padding: 0.3rem;
  }
  .menu {
    display: block;
  }
  a {
    font-size: 1rem;
  }
  img {
    width: 8rem;
  }
  .links {
    display: none;
  }
}
</style>

<script setup lang="ts">
import { getMovieCategories } from '@/services/movies'
import Locales from '@/components/app/Locales.vue'
import type { TLang } from '@/types/common'
import type { TMovieCategory } from '@/types/movie'
import { onMounted, onUnmounted, ref, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
import Search from './Search.vue'
import BottomMenu from '@/components/app/BottomMenu.vue'
import { links } from '@/utils/links'
import { useIsMobile } from '@/composables/useIsMobile'
const { isMobile } = useIsMobile()
const categories = ref<TMovieCategory[]>([])
const menuIsOpened = ref(false)
const menu = ref<HTMLDivElement>()
const { locale } = useI18n()

const openMenu = () => {
  menuIsOpened.value = !menuIsOpened.value
}

const handleClickOutside = (event: any) => {
  if (menuIsOpened.value && menu.value && !menu.value.contains(event.target)) {
    menuIsOpened.value = false
  }
}

watchEffect(async () => {
  try {
    const res = await getMovieCategories()
    categories.value = res.data
  } catch (err) {
    console.log(err)
  }
})

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
