<template>
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
</template>

<style scoped>
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
</style>

<script setup lang="ts">
import type { TLang } from '@/types/common'
import i18n from '@/plugins/i18n'

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

const changeLocale = (lang: string) => {
  i18n.global.locale = lang as keyof TLang
}
</script>
