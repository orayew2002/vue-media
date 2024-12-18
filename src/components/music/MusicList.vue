<script setup lang="ts">
import MusicItem from '@/components/music/MusicItem.vue'
import type { TMusic } from '@/types/music'
import { useRouter } from 'vue-router'
const router = useRouter()
const props = defineProps<{
  musicAll: TMusic[]
}>()

const musicClickHandler = (id: string) => {
  router.push('/music/' + id)
}
</script>
<template>
  <div class="music_list">
    <MusicItem
      @music-click="musicClickHandler"
      v-for="music in props.musicAll"
      :key="music.id"
      :music="music"
    />
  </div>
</template>

<style scoped>
.music_list {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
