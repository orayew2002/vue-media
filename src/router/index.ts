import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import MovieView from '@/views/MovieView.vue'
import MoviesByCategory from '@/views/MoviesByCategory.vue'
import SearchView from '@/views/Search/SearchView.vue'
import SearchMovie from '@/views/Search/SearchMovie.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'movies',
      component: HomeView,
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
