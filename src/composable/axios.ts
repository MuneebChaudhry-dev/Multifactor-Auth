import { ref } from 'vue'
import axios from 'axios'
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})
export const useAxios = async (url: string, method: string, payload: any = null) => {
  const data = ref(null)
  const error = ref('')
  try {
    let response = null
    switch (method) {
      case 'GET':
        response = await api.get(url, payload)
        break
      case 'POST':
        response = await api.post(url, payload)
        break
      case 'PUT':
        response = await api.put(url, payload)
        break
      case 'PATCH':
        response = await api.patch(url, payload)
        break
      case 'DELETE':
        response = await api.delete(url, payload)
        break
      default:
        error.value = 'Invalid Request Method'
        break
    }
    if (response) {
      data.value = await response.data
      console.log('axios response', data.value)
    }
  } catch (err: any) {
    error.value = err
  }

  return { data, error }
}
