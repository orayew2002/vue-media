<template>
  <div class="header">
    <div class="header_container">
      <img src="@/assets/img/logo.svg" alt="logo" />
      <div class="links">
        <ul>
          <li v-for="link in links" :key="link.name">
            <RouterLink :to="link.path">{{ $t(link.name) }}</RouterLink>
            <div class="dropdown_container" v-if="link.name === 'movies'">
              <li v-for="cat in categories">
                <RouterLink :key="cat.id" :to="'/' + cat">{{
                  cat.title[locale as keyof TLang]
                }}</RouterLink>
              </li>
            </div>
          </li>
        </ul>
      </div>
      <div class="locales">
        <span
          :class="{
            underline_lang: $i18n.locale === locale.name,
          }"
          v-for="locale in locales"
          :key="locale.name"
          @click="changeLocale(locale.name)"
          >{{ locale.label }}</span
        >
      </div>
    </div>
  </div>
  <div ref="menu" class="menu" @click="openMenu">
    <div class="burger">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
  <div
    class="mobile_links"
    :class="menuIsOpened ? 'animate_in' : 'animate_out'"
  >
    <ul>
      <li v-for="link in links" :key="link.name">
        <RouterLink :to="link.path">{{ $t(link.name) }}</RouterLink>
      </li>
    </ul>
  </div>
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
  z-index: 5;
}

.links {
  margin-inline: 2rem;
}

.links > ul {
  display: flex;
  gap: 2rem;
}

.links > ul > li {
  position: relative;
}

.mobile_links {
  display: none;
}

img {
  width: 10rem;
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

.menu {
  cursor: pointer;
  position: fixed;
  background: var(--slate-200);
  width: 3rem;
  bottom: 0;
  left: 0;
  margin: 0 auto;
  margin-bottom: 4px;
  right: 0;
  /* padding: 0.5rem; */
  border-radius: 10px;
  z-index: 100;
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.12),
    0 1px 2px rgba(0, 0, 0, 0.24);
  display: none;
}

.burger {
  position: relative;
  display: flex;
  padding: 0.8rem 0.5rem;
  flex-direction: column;
  gap: 5px;
}

.burger > * {
  width: 100%;
  display: block;
  height: 3px;
  background: black;
}
.hide {
  display: none;
}

.locales {
  display: flex;
  gap: 10px;
  padding-right: 1rem;
}

.locales > span {
  display: block;
  font-size: 2rem;
  cursor: pointer;
}

.underline_lang {
  border-bottom: 1px solid white;
}

@keyframes slideInFromBottom {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slideTopToBottom {
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(100%);
    opacity: 0;
  }
}

@media screen and (max-width: 768px) {
  .header {
    height: 66px;
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
  .mobile_links {
    display: block;
    position: fixed;
    padding: 1rem 0.6rem;
    margin: 0;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 2),
      rgba(0, 0, 0, 0.9)
    );
    left: 0;
    bottom: 0;
    height: 50vh;
    width: 100%;
    z-index: 69;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
  }
  .animate_out {
    transform: translate(0);
    animation: slideTopToBottom 0.2s ease-in-out forwards;
  }

  .animate_in {
    transform: translateY(100%); /* Start off-screen */
    animation: slideInFromBottom 0.2s ease-out forwards; /* Animation properties */
  }
  .mobile_links > ul {
    display: flex;
    gap: 2rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>

<script setup lang="ts">
import { getMovieCategories } from '@/services/movies'
import type { TLang } from '@/types/common'
import type { TMovieCategory } from '@/types/movie'
import { onMounted, onUnmounted, ref, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'
import i18n from '@/plugins/i18n'
import { RouterLink, useRoute } from 'vue-router'
const categories = ref<TMovieCategory[]>([])
const menuIsOpened = ref(false)
const menu = ref<HTMLDivElement>()
const { locale } = useI18n()
const locales = [
  {
    name: 'tk',
    label: '🇹🇲',
  },
  {
    name: 'ru',
    label: '🇷🇺',
  },
]

const links = [
  {
    name: 'movies',
    path: '/',
  },
  {
    name: 'music',
    path: '/music',
  },
  {
    name: 'books',
    path: '/books',
  },
]

const openMenu = () => {
  menuIsOpened.value = !menuIsOpened.value
}

const handleClickOutside = (event: any) => {
  if (menuIsOpened.value && menu.value && !menu.value.contains(event.target)) {
    menuIsOpened.value = false
  }
}

const changeLocale = (lang: string) => {
  i18n.global.locale = lang as keyof TLang
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
