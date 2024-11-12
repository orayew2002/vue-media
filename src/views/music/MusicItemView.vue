<script setup lang="ts">
import { useIsMobile } from '@/composables/useIsMobile'
import formatDuration from '@/utils/formatDuration'
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
const audio_ref = ref<HTMLAudioElement | null>(null)
const timeline = ref<HTMLDivElement>()
const URL = ref('')
const isPaused = ref(true)
const isScrubbing = ref(false)
const route = useRoute()
const currentTimeOfAudio = ref('0:00')
console.log(currentTimeOfAudio.value, 'current time')
const totalAudioDuration = ref('')
const { isMobile } = useIsMobile()
const onTogglePlayPause = () => {
  if (audio_ref.value?.paused) {
    audio_ref.value?.play()
    isPaused.value = false
  } else {
    audio_ref.value?.pause()
    isPaused.value = true
  }
}

const timeUpdateHandler = () => {
  currentTimeOfAudio.value = formatDuration(
    parseInt(audio_ref.value?.currentTime.toFixed(2) as string, 10),
  )
  if (audio_ref.value) {
    const percent = audio_ref.value?.currentTime / audio_ref.value?.duration
    timeline.value?.style.setProperty('--progress-position', percent + '')
  }
}

// Timeline

const handleTimeLineUpdate = (e: MouseEvent | TouchEvent) => {
  const rect = timeline.value?.getBoundingClientRect()
  if (!rect) return

  // Get x position based on event type (mouse or touch)
  const clientX = e instanceof MouseEvent ? e.clientX : e.touches?.[0]?.clientX
  if (clientX === undefined) return

  // Calculate percent based on x position
  const percent =
    Math.min(Math.max(0, clientX - rect.x), rect.width) / rect.width

  if (isMobile.value) {
    timeline.value?.style.setProperty('--progress-position', percent + '')
  } else {
    if (isScrubbing.value) {
      e.preventDefault()
      timeline.value?.style.setProperty('--progress-position', percent + '')
    }
  }
}

const toggleScrubbing = (e: MouseEvent | TouchEvent) => {
  const rect = timeline.value?.getBoundingClientRect()
  if (!rect) return

  const clientX = e instanceof MouseEvent ? e.clientX : e.touches?.[0]?.clientX
  if (clientX === undefined) return

  const percent =
    Math.min(Math.max(0, clientX - rect.x), rect.width) / rect.width

  isScrubbing.value = (e instanceof MouseEvent && e.buttons & 1) === 1
  if (audio_ref.value) {
    console.log(percent * audio_ref.value?.duration, 'calc')
    audio_ref.value.currentTime = percent * audio_ref.value?.duration
  }
  handleTimeLineUpdate(e)
}

const documentMouseupHandler = (e: any) => {
  if (isScrubbing.value) toggleScrubbing(e)
}

const documentMouseMoveHandler = (e: any) => {
  if (isScrubbing.value) handleTimeLineUpdate(e)
}

watch(
  () => route.params.id,
  newId => {
    if (newId) {
      URL.value = `${import.meta.env.VITE_API_URL}/uploads/musics/${route.params.id}.mp3`
    }
  },
  { immediate: true },
)

console.log(audio_ref.value?.currentTime, 'current timr audio')

onMounted(() => {
  if (audio_ref.value) {
    audio_ref.value.addEventListener('loadedmetadata', () => {
      totalAudioDuration.value = formatDuration(audio_ref.value?.duration)
    })
  }
  document.addEventListener('mouseup', documentMouseupHandler)
  document.addEventListener('mousemove', documentMouseMoveHandler)
  // for mobile
  document.addEventListener('touchstart', documentMouseupHandler)
  document.addEventListener('touchmove', documentMouseMoveHandler)
})

onUnmounted(() => {
  document.removeEventListener('touchstart', documentMouseupHandler)
  document.removeEventListener('touchmove', documentMouseMoveHandler)
  document.removeEventListener('mouseup', documentMouseupHandler)
  document.removeEventListener('mousemove', documentMouseMoveHandler)
})
</script>

<template>
  <div
    class="audio_container"
    :class="{
      paused: isPaused,
      fix_bottom: !isMobile,
    }"
  >
    <audio
      @playing="isPaused = false"
      @timeupdate="timeUpdateHandler"
      preload="auto"
      ref="audio_ref"
      autoplay
      :src="URL"
    ></audio>
    <div class="duration-container">
      <div class="current-time">{{ currentTimeOfAudio }}</div>
      <div class="total-time">{{ totalAudioDuration }}</div>
    </div>
    <div>
      <div
        @mousemove="handleTimeLineUpdate"
        @mousedown="toggleScrubbing"
        ref="timeline"
        class="timeline"
      ></div>
    </div>
    <div class="controls">
      <div class="pause_play_icons">
        <button @click="onTogglePlayPause">
          <svg class="pause-icon" viewBox="0 0 24 24">
            <path fill="#000" d="M14,19H18V5H14M6,19H10V5H6V19Z" />
          </svg>

          <svg class="play-icon" viewBox="0 0 24 24">
            <path fill="#000" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.audio_container {
  position: fixed;
  left: 0;
  bottom: 50px;
  width: 100%;
  height: 50px;
  color: white;
  background-color: var(--slate-800);
}
.fix_bottom {
  bottom: 0;
}
.duration-container {
  position: absolute;
  top: 2%;
  left: 0px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-inline: 2px;
  margin-top: 2px;
}
.timeline {
  position: relative;
  width: 100%;
  height: 5px;
  background-color: rgba(100, 100, 100, 0.932);
}

.timeline::after {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: calc(100% - var(--progress-position) * 100%);
  background-color: red;
}

.controls {
  display: flex;
  justify-content: center;
  height: 100%;
  align-items: center;
  width: 100%;
}

.pause_play_icons > button {
  background: var(--slate-200);
  border-radius: 50%;
  border: none;
  color: inherit;
  padding: 0;
  height: 40px;
  width: 40px;
  font-size: 1.1rem;
  cursor: pointer;
  opacity: 0.85;
  transition: opacity 150ms ease-in-out;
}

.audio_container.paused .pause-icon {
  display: none;
}

.audio_container:not(.paused) .play-icon {
  display: none;
}
</style>
