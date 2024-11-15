import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/home/HomeView.vue'
import MovieView from '@/views/movie/MovieView.vue'
import BookView from '@/views/book/index.vue'
import LoginView from '@/views/login/index.vue'
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
      path: '/books',
      name: 'books',
      component: BookView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
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

router.beforeEach(async (to, from) => {
  if (
    // make sure the user is authenticated
    !localStorage.getItem('token') &&
    // ❗️ Avoid an infinite redirect
    to.name !== 'login'
  ) {
    // redirect the user to the login page
    return { name: 'login' }
  }
})

export default router
