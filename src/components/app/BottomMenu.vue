<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const current_link = useRoute()
const router = useRouter()
console.log(current_link.path, 'value link')
const onNavigate = (path: string) => {
  router.push({ path })
}
</script>
<template>
  <div class="bottom-menu_container">
    <ul class="bottom-menu">
      <li @click="onNavigate('/')">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_49_982)">
            <path
              d="M4 6.47L5.76 10H20V18H4V6.47ZM22 4H18L20 8H17L15 4H13L15 8H12L10 4H8L10 8H7L5 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V4Z"
              :fill="current_link.path !== '/' ? 'var(--slate-400)' : 'white'"
            />
          </g>
          <defs>
            <clipPath id="clip0_49_982">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </li>
      <li @click="onNavigate('/music')">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_49_981)">
            <path
              d="M22 6H17V14.18C16.69 14.07 16.35 14 16 14C14.34 14 13 15.34 13 17C13 18.66 14.34 20 16 20C17.66 20 19 18.66 19 17V8H22V6ZM15 6H3V8H15V6ZM15 10H3V12H15V10ZM11 14H3V16H11V14ZM15 17C15 16.45 15.45 16 16 16C16.55 16 17 16.45 17 17C17 17.55 16.55 18 16 18C15.45 18 15 17.55 15 17Z"
              :fill="
                current_link.path !== '/music' ? 'var(--slate-400)' : 'white'
              "
            />
          </g>
          <defs>
            <clipPath id="clip0_49_981">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </li>
      <li @click="onNavigate('/books')">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_59_980)">
            <path
              d="M18 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V4C20 2.9 19.1 2 18 2ZM9 4H11V9L10 8.25L9 9V4ZM18 20H6V4H7V13L10 10.75L13 13V4H18V20Z"
              :fill="
                current_link.path !== '/books' ? 'var(--slate-400)' : 'white'
              "
            />
          </g>
          <defs>
            <clipPath id="clip0_59_980">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </li>
      <li @click="onNavigate('/search')">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_49_980)">
            <path
              d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z"
              :fill="
                current_link.path !== '/search' ? 'var(--slate-400)' : 'white'
              "
            />
          </g>
          <defs>
            <clipPath id="clip0_49_980">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.bottom-menu {
  position: fixed;
  width: 100%;
  height: 50px;
  padding-inline: 15px;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 2), rgba(0, 0, 0, 0.9));
  display: flex;
  justify-content: space-between;
  align-items: center;
  bottom: 0;
  left: 0;
  z-index: 5;
}

.bottom-menu > li {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}

/* .bottom-menu > li > svg > g > path {
  fill: var(--slate-600);
} */

@media screen and (min-width: 768px) {
  .bottom-menu {
    display: none;
  }
}
</style>
