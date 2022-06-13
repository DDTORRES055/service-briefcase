import Axios from 'axios'

export default {
  get: async (url) => {
    const headers =
      localStorage.getItem('access-token') &&
      localStorage.getItem('access-token') !== 'null'
        ? { 'access-token': localStorage.getItem('access-token') }
        : {}
    const response = await Axios.get(
      `${process.env.REACT_APP_API_URL}${url}`,
      { headers }
    )
    localStorage.setItem(
      'access-token',
      response.headers['access-token'] || localStorage.getItem('access-token')
    )
    return response
  },
  post: async (url, payload) => {
    const headers =
      localStorage.getItem('access-token') &&
      localStorage.getItem('access-token') !== 'null'
        ? { 'access-token': localStorage.getItem('access-token') }
        : {}
    const response = await Axios.post(
      `${process.env.REACT_APP_API_URL}${url}`,
      payload,
      { headers }
    )
    localStorage.setItem(
      'access-token',
      response.headers['access-token'] || localStorage.getItem('access-token')
    )
    return response
  },
  put: async (url, payload) => {
    const headers =
      localStorage.getItem('access-token') &&
      localStorage.getItem('access-token') !== 'null'
        ? { 'access-token': localStorage.getItem('access-token') }
        : {}
    const response = await Axios.put(
      `${process.env.REACT_APP_API_URL}${url}`,
      payload,
      { headers }
    )
    localStorage.setItem(
      'access-token',
      response.headers['access-token'] || localStorage.getItem('access-token')
    )
    return response
  },
  delete: async (url) => {
    const headers =
      localStorage.getItem('access-token') &&
      localStorage.getItem('access-token') !== 'null'
        ? { 'access-token': localStorage.getItem('access-token') }
        : {}
    const response = await Axios.delete(
      `${process.env.REACT_APP_API_URL}${url}`,
      { headers }
    )
    localStorage.setItem(
      'access-token',
      response.headers['access-token'] || localStorage.getItem('access-token')
    )
    return response
  },
}
