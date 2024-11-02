<template>
  <div
    ref="video_container_ref"
    class="video-container"
    :class="{
      paused: isPaused,
      theater: isTheaterMode,
      'full-screen': isFullScreenMode,
      'mini-player': isMiniPlayerMode,
      [volume_level]: volume_level,
      scrubbing: isScrubbing,
    }"
  >
    <video
      autoplay
      @playing="() => handlePlayPause(false)"
      @pause="() => handlePlayPause(true)"
      @play="() => handlePlayPause(true)"
      @click="togglePlay"
      @volumechange="volumeChangeHandler"
      @timeupdate="timeUpdateHandler"
      @dblclick="toggleFullScreen"
      ref="video_ref"
    ></video>
    <div @dblclick="skipForwardHandler" class="skipForward" />
    <div @dblclick="skipBackwardHandler" class="skipBackward" />
    <div class="video-controls-container">
      <div
        ref="timeline_container_ref"
        class="timeline-container"
        @mousemove="handleTimeLineUpdate"
        @mousedown="toggleScrubbing"
      >
        <div class="timeline">
          <div ref="buffered_ref" class="buffered"></div>
          <div class="thumb-indicator"></div>
        </div>
      </div>
      <div class="controls">
        <button ref="play_pause_btn" @click="togglePlay" class="play-pause-btn">
          <svg class="play-icon" viewBox="0 0 24 24">
            <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
          </svg>
          <svg class="pause-icon" viewBox="0 0 24 24">
            <path fill="currentColor" d="M14,19H18V5H14M6,19H10V5H6V19Z" />
          </svg>
        </button>
        <div class="volume-container">
          <button @click="toggleMute" class="mute-btn">
            <svg class="volume-high-icon" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z"
              />
            </svg>
            <svg class="volume-low-icon" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M5,9V15H9L14,20V4L9,9M18.5,12C18.5,10.23 17.5,8.71 16,7.97V16C17.5,15.29 18.5,13.76 18.5,12Z"
              />
            </svg>
            <svg class="volume-muted-icon" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z"
              />
            </svg>
          </button>

          <input
            class="volume-slider"
            type="range"
            name=""
            id=""
            min="0"
            max="1"
            step="any"
            v-model="sliderValue"
            @input="sliderVolumeHandler"
          />
        </div>
        <div class="duration-container">
          <div class="current-time">{{ currentTimeOfVideo }}</div>
          /
          <div class="total-time">{{ totalVideoDuration }}</div>
        </div>
        <button @click="playbackHandler" class="speed-btn wide-btn">
          {{ speed }}
        </button>
        <button @click="miniplayerModeHandler" class="mini-player-btn">
          <svg viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zm-10-7h9v6h-9z"
            />
          </svg>
        </button>
        <button @click="toggleTheater" class="theater-btn">
          <svg class="tall" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M19 6H5c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H5V8h14v8z"
            />
          </svg>
          <svg class="wide" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M19 7H5c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm0 8H5V9h14v6z"
            />
          </svg>
        </button>
        <button @click="toggleFullScreen" class="full-screen-btn">
          <svg class="open" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"
            />
          </svg>
          <svg class="close" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import dashjs from 'dashjs'
import formatDuration from '@/utils/formatDuration'
const isPaused = ref(true)
const video_ref = ref<HTMLVideoElement | null>(null)
const video_container_ref = ref<HTMLDivElement | null>(null)
const timeline_container_ref = ref<HTMLDivElement | null>(null)
const buffered_ref = ref<HTMLDivElement | null>(null)
// modes
const isTheaterMode = ref(false)
const isFullScreenMode = ref(false)
const isMiniPlayerMode = ref(false)
const volume_level = ref('high')
const sliderValue = ref('1')
const totalVideoDuration = ref('')
const currentTimeOfVideo = ref('0:00')
const speed = ref('1x')
const isScrubbing = ref(false)

let wasPaused: boolean
const handlePlayPause = (val: boolean) => {
  isPaused.value = val
}

const togglePlay = () => {
  if (video_ref.value) {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    video_ref.value.paused ? video_ref.value.play() : video_ref.value.pause()
  }
}

const handleKeydown = (e: KeyboardEvent) => {
  const tagName = document.activeElement?.tagName.toLowerCase()

  if (tagName === 'input') return
  switch (e.key.toLowerCase()) {
    case ' ':
      if (tagName === 'button') return
    case 'k':
      togglePlay()
      break
    case 'f':
      toggleFullScreen()
      break
    case 't':
      toggleTheater()
      break
    case 'i':
      miniplayerModeHandler()
      break
    case 'm':
      toggleMute()
      break
    case 'arrowleft':
    case 'j':
      skip(-5)
      break
    case 'arrowright':
    case 'l':
      skip(5)
      break
  }
}

const toggleTheater = () => {
  isTheaterMode.value = !isTheaterMode.value
}

const toggleFullScreen = () => {
  if (document.fullscreenElement == null) {
    video_container_ref.value?.requestFullscreen()
    // screen.orientation.lock('landscape')
  } else {
    document.exitFullscreen()
  }
}

const toggleMiniPlayerMode = (val: boolean) => {
  isMiniPlayerMode.value = val
}

const toggleMute = () => {
  if (video_ref.value) {
    video_ref.value.muted = !video_ref.value.muted
  }
}

const miniplayerModeHandler = () => {
  if (video_container_ref.value?.classList.contains('mini-player')) {
    document.exitPictureInPicture()
  } else {
    video_ref.value?.requestPictureInPicture()
  }
}

const fullScreenChangeHandler = () => {
  if (document.fullscreenElement) {
    isFullScreenMode.value = true
  } else {
    isFullScreenMode.value = false
  }
}

const sliderVolumeHandler = (e: Event) => {
  if (video_ref.value) {
    video_ref.value.volume = Number((e.target as HTMLInputElement).value)
    video_ref.value.muted = Number((e.target as HTMLInputElement).value) === 0
  }
}

const volumeChangeHandler = () => {
  if (video_ref.value) {
    sliderValue.value = `${video_ref.value?.volume as number}`
    if (video_ref.value?.muted || video_ref.value?.volume === 0) {
      sliderValue.value = '0'
      volume_level.value = 'muted'
    } else if (video_ref.value.volume >= 0.5) {
      volume_level.value = 'high'
    } else {
      volume_level.value = 'low'
    }
  }
}

const skip = (duration: number) => {
  if (video_ref.value) {
    video_ref.value.currentTime += duration
  }
}

const timeUpdateHandler = () => {
  currentTimeOfVideo.value = formatDuration(video_ref.value?.currentTime)
  if (video_ref.value) {
    const percent = video_ref.value?.currentTime / video_ref.value?.duration
    timeline_container_ref.value?.style.setProperty(
      '--progress-position',
      percent + '',
    )

    const buffered = video_ref.value?.buffered
    if (buffered) {
      for (let i = 0; i < buffered?.length; i++) {
        const end = buffered?.end(i) / video_ref.value.duration
        timeline_container_ref.value?.style.setProperty(
          '--buffered-position',
          end + '',
        )
      }
    }
  }
}

const playbackHandler = () => {
  if (video_ref.value) {
    let newPlaybackRate = video_ref.value?.playbackRate + 0.25
    if (newPlaybackRate > 2) newPlaybackRate = 0.25
    video_ref.value.playbackRate = newPlaybackRate
    speed.value = `${newPlaybackRate}x`
  }
}

// Timeline

const handleTimeLineUpdate = (e: MouseEvent) => {
  const rect = timeline_container_ref.value?.getBoundingClientRect()
  const percent =
    Math.min(Math.max(0, e.x - (rect as DOMRect).x), (rect as DOMRect).width) /
    (rect as DOMRect).width

  timeline_container_ref.value?.style.setProperty(
    '--preview-position',
    percent + '',
  )
  if (isScrubbing.value) {
    e.preventDefault()
    timeline_container_ref.value?.style.setProperty(
      '--progress-position',
      percent + '',
    )
  }
}

const toggleScrubbing = (e: MouseEvent) => {
  const rect = timeline_container_ref.value?.getBoundingClientRect()
  const percent =
    Math.min(Math.max(0, e.x - (rect as DOMRect).x), (rect as DOMRect).width) /
    (rect as DOMRect).width
  isScrubbing.value = (e.buttons & 1) === 1
  if (isScrubbing.value) {
    wasPaused = video_ref.value?.paused as boolean
    video_ref.value?.pause()
  } else {
    if (video_ref.value) {
      video_ref.value.currentTime = percent * video_ref.value?.duration
    }
    if (!wasPaused) video_ref.value?.play()
  }
  handleTimeLineUpdate(e)
}

const documentMouseupHandler = (e: MouseEvent) => {
  if (isScrubbing.value) toggleScrubbing(e)
}

const documentMouseMoveHandler = (e: MouseEvent) => {
  if (isScrubbing.value) handleTimeLineUpdate(e)
}

const skipForwardHandler = () => {
  if (video_ref.value) {
    video_ref.value.currentTime += 5
  }
}

const skipBackwardHandler = () => {
  if (video_ref.value) {
    video_ref.value.currentTime -= 5
  }
}
let player: any = null
onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
  document.addEventListener('fullscreenchange', fullScreenChangeHandler)
  document.addEventListener('mouseup', documentMouseupHandler)
  document.addEventListener('mousemove', documentMouseMoveHandler)
  video_ref.value?.addEventListener('enterpictureinpicture', () =>
    toggleMiniPlayerMode(true),
  )
  video_ref.value?.addEventListener('leavepictureinpicture', () =>
    toggleMiniPlayerMode(false),
  )

  player = dashjs.MediaPlayer().create()
  player.initialize(
    video_ref.value as HTMLMediaElement,
    'http://172.31.13.14:8080/movies/video/1',
    true,
  )

  // Listen for the playback metadata event to get the duration
  player.on(dashjs.MediaPlayer.events.PLAYBACK_METADATA_LOADED, () => {
    totalVideoDuration.value = formatDuration(player.duration())
  })
  // totalVideoDuration.value = formatDuration(video_ref.value?.duration)
  // video_container_ref.value?.classList.add('paused');
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
.video-container {
  position: relative;
  width: 90%;
  max-width: 1000px;
  display: flex;
  justify-content: center;
  margin-inline: auto;
  background-color: black;
}

video {
  width: 100%;
}

.video-container.theater,
.video-container.full-screen {
  max-width: initial;
  width: 100%;
}

.video-container.theater {
  max-height: 90vh;
}

.video-container.full-screen {
  max-height: 100vh;
}

.skipBackward {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 33%;
  cursor: pointer;
}

.skipForward {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 33%;
  cursor: pointer;
}

.video-controls-container {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  color: white;
  z-index: 100;
  opacity: 0;
  transition: opacity 150ms ease-in-out;
}

.video-controls-container::before {
  content: '';
  position: absolute;
  bottom: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.75), transparent);
  width: 100%;
  aspect-ratio: 6 / 1;
  z-index: -1;
  pointer-events: none;
}

.video-container:hover .video-controls-container,
.video-container:focus-within .video-controls-container,
.video-container.paused .video-controls-container {
  opacity: 1;
}

.video-controls-container .controls {
  display: flex;
  gap: 0.5rem;
  padding: 0.25rem;
  align-items: center;
}

.video-controls-container .controls button {
  background: none;
  border: none;
  color: inherit;
  padding: 0;
  height: 30px;
  width: 30px;
  font-size: 1.1rem;
  cursor: pointer;
  opacity: 0.85;
  transition: opacity 150ms ease-in-out;
}

.video-controls-container .controls button:hover {
  opacity: 1;
}

.video-container.paused .pause-icon {
  display: none;
}

.video-container:not(.paused) .play-icon {
  display: none;
}

.video-container.theater .tall {
  display: none;
}

.video-container:not(.theater) .wide {
  display: none;
}

.video-container.full-screen .open {
  display: none;
}

.video-container:not(.full-screen) .close {
  display: none;
}

.volume-high-icon,
.volume-low-icon,
.volume-muted-icon {
  display: none;
}

.video-container.muted .volume-muted-icon {
  display: block;
}

.video-container.low .volume-low-icon {
  display: block;
}

.video-container.high .volume-high-icon {
  display: block;
}

.volume-container {
  display: flex;
  align-items: center;
}

.volume-slider {
  width: 0;
  transform-origin: left;
  transform: scaleX(0);
  transition:
    width 150ms ease-in-out,
    transform 150ms ease-in-out;
}

.volume-container:hover .volume-slider,
.volume-slider:focus-within {
  width: 100px;
  transform: scaleX(1);
}

.duration-container {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  flex-grow: 1;
}

.video-controls-container .controls button.wide-btn {
  width: 50px;
}

.timeline-container {
  height: 7px;
  margin-inline: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.timeline-container:hover .timeline {
  height: 100%;
}

.timeline {
  width: 100%;
  height: 5px;
  background-color: rgba(100, 100, 100, 0.5);
  position: relative;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: calc(100% - var(--preview-position) * 100%);
  background-color: rgb(150, 150, 150);
  display: none;
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

.buffered {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: calc(100% - var(--buffered-position) * 100%);
  background-color: rgb(100, 100, 100);
}

.timeline .thumb-indicator {
  --scale: 0;
  position: absolute;
  transform: translateX(-50%) scale(var(--scale));
  height: 200%;
  top: -50%;
  left: calc(var(--progress-position) * 100%);
  background-color: red;
  border-radius: 50%;
  transition: transform 150ms ease-in-out;
  aspect-ratio: 1 / 1;
}

.video-container.scrubbing .timeline::before,
.timeline-container:hover .timeline::before {
  display: block;
}

.video-container.scrubbing .thumb-indicator,
.timeline-container:hover .thumb-indicator {
  --scale: 1;
}

.video-container.scrubbing .timeline,
.timeline-container:hover .timeline {
  height: 100%;
}
</style>
