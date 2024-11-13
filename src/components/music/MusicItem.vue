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
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 20.311 20.311"
      xml:space="preserve"
    >
      <g>
        <path
          d="M17.815,16.47c0-0.003,0-0.007,0-0.01V4.879L8.438,0v10.523C7.15,9.499,5.18,9.6,3.8,10.842
      c-1.521,1.37-1.745,3.604-0.499,4.989c1.247,1.385,3.492,1.398,5.012,0.028c0.859-0.771,1.303-1.817,1.306-2.831V4.372l6.977,3.28
      v6.273c-1.286-0.991-3.232-0.879-4.6,0.35c-1.523,1.37-1.744,3.603-0.498,4.987c1.246,1.387,3.491,1.399,5.014,0.03
      c0.851-0.768,1.297-1.809,1.303-2.818l0,0V16.47z"
        />
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

.music_item:hover {
  background-color: var(--slate-900);
  cursor: pointer;
}

.music_item::before {
  content: '';
  position: absolute;
  top: 5px;
  left: 5px;
  background-color: var(--slate-600);
  width: 40px;
  height: 40px;
  border-radius: 5px;
}
.music_item > svg {
  position: relative;
  width: 30px;
  height: 30px;
}

.music_item > p {
  color: var(--slate-300);
}

svg {
  fill: var(--slate-400);
}
</style>
