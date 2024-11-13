<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from '@/components/app/Header.vue'
</script>

<template>
  <Header v-if="$route.name !== 'login'" />
  <div class="outlet_container">
    <RouterView />
  </div>
</template>

<style scoped>
.outlet_container {
  height: 100%;
  background-color: var(--slate-950);
}
</style>
