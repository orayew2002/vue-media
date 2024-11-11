import { getMusicAll } from '@/services/music'
import type { TMusicAll } from '@/types/music'
import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useMusicStore = defineStore('music', () => {
  const music = ref<TMusicAll>()
  const loading = ref<boolean>(false)
  const page = ref(1)
  const count = 10
  const hasMore = ref(true)
  async function getMusic() {
    loading.value = true
    try {
      const res = await getMusicAll(page.value, count)
      if (page.value === 1) {
        music.value = res.data
        if (res.data.total > page.value * count) {
          hasMore.value = true
          page.value += 1
        } else {
          hasMore.value = false
        }
      } else {
        music.value?.musics.push(...res.data.musics)
        if (res.data.total > page.value * count) {
          hasMore.value = true
          page.value += 1
        } else {
          hasMore.value = false
        }
      }
    } catch (err) {
      console.log(err)
      loading.value = false
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    music,
    page,
    count,
    hasMore,
    getMusic,
  }
})
