import type { AxiosError, AxiosInstance } from 'axios'
import baseAxios from 'axios'
import router from '@/router'
const baseURL = import.meta.env.VITE_API_URL?.toString()
// eslint-disable-next-line consistent-return
// const refrshAccessToken = async () => {
// 	try {
// 		const { data } = await refreshToken(
// 			localStorage.getItem('refresh_token_mh') as string
// 		);
// 		return data.access_token;
// 	} catch (err) {
// 		console.log(err);
// 	}
// };
export const getAxios = (): AxiosInstance => {
  const instance = baseAxios.create({
    baseURL,
    headers: { 'Content-Type': 'application/json' },
  })
  instance.interceptors.request.use(
    (config: { headers: any; params?: any }) => {
      if (!config.headers.Authorization) {
        // TODO get token from store
        config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
      }
      return config
    },
  )

  instance.interceptors.response.use(
    response => response,
    async (error: AxiosError) => {
      if (error.response?.status === 403 || error.response?.status === 401) {
        router.push('/login')
      }
      return Promise.reject(error)
    },
  )

  return instance
}

const axios = getAxios()
export default axios
