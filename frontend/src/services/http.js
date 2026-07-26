import axios from 'axios'
import { store } from '../app/store'

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

export const http = axios.create({
  baseURL,
  timeout: 20000,
})

http.interceptors.request.use((config) => {
  const { idToken } = store.getState().auth
  if (idToken) config.headers.Authorization = `Bearer ${idToken}`
  return config
})

