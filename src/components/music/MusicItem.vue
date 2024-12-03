<script setup lang="ts">
import { useIsMobile } from '@/composables/useIsMobile'
import type { TLang } from '@/types/common'
import type { TMusic } from '@/types/music'
import { useRoute } from 'vue-router'

const props = defineProps<{
  music: TMusic
}>()
const { isMobile } = useIsMobile()
const route = useRoute()
</script>
<template>
  <div
    @click="$emit('musicClick', music.id)"
    class="music_item"
    :class="{
      'bg-dark': music.id.toString() === $route.params.id,
      mb: isMobile,
    }"
  >
    <svg
      width="145px"
      height="145px"
      viewBox="0 0 16.00 16.00"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          d="M15 1H4V9H3C1.34315 9 0 10.3431 0 12C0 13.6569 1.34315 15 3 15C4.65685 15 6 13.6569 6 12V5H13V9H12C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12V1Z"
        ></path>
      </g>
    </svg>
    <p>{{ music.title[$i18n.locale as keyof TLang] }}</p>
  </div>
</template>
<style scoped>
.music_item {
  position: relative;
  display: flex;
  width: 100%;
  padding: 5px;
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

.music_item:hover {
  background-color: var(--slate-900);
  cursor: pointer;
}
.music_item > svg {
  position: relative;
  width: 20px;
  height: 20px;
  padding: 5px;
  background-color: var(--slate-600);
}

.music_item > p {
  color: var(--slate-300);
  font-size: 10px;
}

svg {
  fill: var(--slate-400);
}

@media screen and (min-width: 900px) {
  .music_item::before {
    width: 40px;
    height: 40px;
  }
  .music_item > svg {
    width: 30px;
    height: 30px;
    padding-top: 0px;
  }
  .music_item {
    padding: 10px;
  }

  .music_item > p {
    font-size: 14px;
  }
}
</style>
