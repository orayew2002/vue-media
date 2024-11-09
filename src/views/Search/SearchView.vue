<script setup lang="ts">
import { useIsMobile } from '@/composables/useIsMobile'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const search = ref('')
const router = useRouter()
const submitHandler = (e: Event) => {
  e.preventDefault()
  router.push({
    path: `/search/movies/${search.value}`,
  })
}
const { isMobile } = useIsMobile()
</script>
<template>
  <div class="form_container">
    <form @submit="submitHandler" class="form" v-if="isMobile">
      <input type="text" v-model="search" placeholder="Interstellar" />
    </form>
  </div>
  <router-view />
</template>

<style>
.form_container {
  padding-inline: 10px;
  padding-block: 4px;
}
.form > input {
  width: 100%;
  padding: 0.5rem;
  border: none;
  outline: none;
  background-color: var(--slate-700);
  color: var(--slate-100);
  border-radius: 5px;
  font-size: 1rem;
}

.form > input::placeholder {
  color: var(--slate-400);
}
</style>
