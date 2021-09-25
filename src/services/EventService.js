import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/',
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
  },
  postEvent(event) {
    return apiClient.post('/events', event);
  }
}