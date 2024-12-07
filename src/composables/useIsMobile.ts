import { ref, onMounted, onUnmounted } from 'vue'

export function useIsMobile(breakpoint = 1200) {
  const isMobile = ref(window.innerWidth <= breakpoint)

  const updateIsMobile = () => {
    isMobile.value = window.innerWidth <= breakpoint
  }

  onMounted(() => {
    window.addEventListener('resize', updateIsMobile)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', updateIsMobile)
  })

  return { isMobile }
}
