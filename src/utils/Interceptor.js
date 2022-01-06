import axios from 'axios'

axios.interceptors.request.use(
  config => {
    if (localStorage.getItem('token')) {
      config.headers['token'] = localStorage.getItem('token')
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

axios.interceptors.response.use(
  response => {
    if (response.headers.token) {
      localStorage.setItem('token', response.headers.token)
    }
    return response
  }
)
export default axios
