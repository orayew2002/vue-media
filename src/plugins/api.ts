import type { AxiosInstance } from 'axios'
import baseAxios from 'axios'

// eslint-disable-next-line import/no-cycle
// import { refreshToken } from '@/services/auth';
// import store from '@/store';
// import { setAuth } from '@/store/auth/authSlice';

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
        config.headers.Authorization = `Bearer ${localStorage.getItem('access_token_mh')}`
      }
      return config
    },
  )

  instance.interceptors.response.use(
    response => response,
    // async (error: AxiosError) => {
    // 	if (error.response?.status === 403) {
    // 		// TODO update token from store
    // 		const accessToken = await refrshAccessToken();
    // 		localStorage.setItem('access_token_mh', accessToken as string);
    // 		baseAxios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    // 	}
    // 	if (error.response?.status === 401) {
    // 		localStorage.removeItem('access_token_mh');
    // 		localStorage.removeItem('refresh_token_mh');
    // 	}
    // 	return Promise.reject(error);
    // }
  )

  return instance
}

const axios = getAxios()
export default axios
