import { getBooks } from '@/services/book'
import type { TBookAll } from '@/types/book'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useBookStore = defineStore('book', () => {
  const books = ref<TBookAll>()
  const loading = ref<boolean>(false)
  const page = ref(1)
  const count = 10
  const hasMore = ref(true)

  async function getBooksFn() {
    loading.value = true
    try {
      const res = await getBooks(page.value, count)
      console.log(res, 'response')
      if (page.value === 1) {
        books.value = res.data
        if (res.data.total > page.value * count) {
          hasMore.value = true
          page.value += 1
        } else {
          hasMore.value = false
        }
      } else {
        books.value?.books.push(...res.data.books)
        if (res.data.total > page.value * count) {
          hasMore.value = true
          page.value += 1
        } else {
          hasMore.value = false
        }
      }
    } catch (err) {
      console.log(err)
      loading.value = false
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    page,
    count,
    hasMore,
    books,
    getBooksFn,
  }
})
