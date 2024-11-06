<template>
  <div class="search-input" :class="{ expanded: searchExpanded }">
    <div class="search_icon">
      <img class="icon" src="/search.svg" @click="toggleSearch" />
    </div>
    <input v-show="searchExpanded" type="text" placeholder="Search..." />
  </div>
</template>

<style scoped>
.search-input {
  display: flex;
  align-items: center;
  border-radius: 20px;
  padding: 5px 10px;
  width: 44px;
  height: 50px;
  background-color: var(--slate-600);
  transition:
    width 0.3s ease,
    height 0.3s ease,
    background-color 0.3s ease,
    border-radius 0.3s ease-in-out;
  overflow: hidden;
}

.search-input.expanded {
  border: 1px solid var(--slate-600);
  width: 250px;
  height: 50px;
}

.search_icon {
  width: 50px;
  height: 50px;
  cursor: pointer;
}

.icon {
  width: 100%;
  height: 100%;
  transition:
    width 0.3s ease,
    height 0.3s ease;
}

.search-input.expanded .icon {
  width: 60%;
  height: 100%;
}
.search-input > input {
  flex-grow: 1;
  border: none;
  outline: none;
  width: 100%;
  height: 100%;
  background-color: var(--slate-600);
  color: var(--slate-200);
}

.search-input > input::placeholder {
  color: var(--slate-200);
}
</style>

<script setup lang="ts">
import { ref } from 'vue'

const searchExpanded = ref(false)

const toggleSearch = () => {
  searchExpanded.value = !searchExpanded.value
}
</script>
