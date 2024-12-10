<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from '@/components/app/Header.vue'
import Wrapper from './components/app/Wrapper.vue'
</script>

<template>
  <Wrapper>
    <Header v-if="$route.name !== 'login'" />
    <div class="outlet_container">
      <RouterView />
    </div>
  </Wrapper>
</template>

<style scoped>
.outlet_container {
  height: 100%;
  background-color: var(--slate-950);
}
</style>
