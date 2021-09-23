import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://my-json-server.typicode.com/Code-Pop/Real-World_Vue-3',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getEvents(limit, page) {
    return apiClient.get(`/events?_limit=${limit}&_page=${page}`)
  },
  getEvent(id) {
    return apiClient.get(`/events/${id}`)
  }
}
