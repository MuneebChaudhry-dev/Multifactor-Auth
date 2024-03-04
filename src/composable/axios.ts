import { ref } from 'vue'
import axios from 'axios'
const axiosAPI = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})
type MethodType = 'get' | 'post' | 'put' | 'patch' | 'delete'

export const useAxios = async (url: string, method: MethodType, payload: any = null) => {
  const data = ref(null)
  const error = ref('')

  try {
    let response = null
    response = await axiosAPI[method](url, payload)
    if (response) {
      data.value = await response.data
      console.log('axios response', data.value)
    }
  } catch (err: any) {
    error.value = err
  }

  return { data, error }
}
