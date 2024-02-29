import { ref } from 'vue'
import axios from 'axios'

export const useAxios = async (url: string, method: string, payload: any = null) => {
  const data = ref(null)
  const error = ref('')
  try {
    let response = null
    switch (method) {
      case 'GET':
        response = await axios.get(url, payload)
        break
      case 'POST':
        response = await axios.post(url, payload)
        break
      case 'PUT':
        response = await axios.put(url, payload)
        break
      case 'PATCH':
        response = await axios.patch(url, payload)
        break
      case 'DELETE':
        response = await axios.delete(url, payload)
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
    error.value = err.data.message
  }

  return { data, error }
}
