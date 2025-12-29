const apiUrl = import.meta.env.VITE_API_URL
import axios from 'axios'

export const taskapi = {
  getallTasks: async() => {
    const response = await axios.get(apiUrl)
    return response.data
  },

  addTask: async(postData) => {
    const response = await axios.post(apiUrl, postData)
    return response.data
  },

  updateTask: async (id, postData) => {
    const response = await axios.patch(`${apiUrl}/${id}`, postData)

    return response.data
  },

  deleteTask: async(id) => {
    const response = await axios.delete(`${apiUrl}/${id}`)
    return response.data
  },

  filterTask: async(status) => {
    const response = await axios.get(`${apiUrl}?status=${status}`)
    return response.data;
  },
}
