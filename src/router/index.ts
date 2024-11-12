import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/home/HomeView.vue'
import MovieView from '@/views/movie/MovieView.vue'
import MoviesByCategory from '@/views/movie/MoviesByCategory.vue'
import SearchView from '@/views/search/SearchView.vue'
import SearchMovie from '@/views/search/SearchMovie.vue'
import Music from '@/views/music/Music.vue'
import MusicItemView from '@/views/music/MusicItemView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'movies',
      component: HomeView,
    },
    {
      path: '/music',
      name: 'music',
      component: Music,
      children: [
        {
          path: ':id',
          name: 'music-id',
          component: MusicItemView,
        },
      ],
    },
    {
      path: '/movies/:id',
      name: 'movie',
      component: MovieView,
    },
    {
      path: '/movies/category/:id',
      name: 'movie-category',
      component: MoviesByCategory,
    },
    {
      path: '/search',
      name: 'search',
      component: SearchView,
      children: [
        {
          path: 'movies/:search',
          name: 'search-movie',
          component: SearchMovie,
        },
      ],
    },
  ],
})

export default router
