import axios from './ajax/index'

let api = {}

api.getVideoPage = (params) => {
  return axios.get('video/getvideopage', params)
}
api.saveVideo = (params) => {
  return axios.post('video/savevideo', params, false, true)
}
api.deleteVideo = (params) => {
  return axios.get('video/deletevideo?ids=' + params)
}
api.getVideoById = (params) => {
  return axios.get('video/getvideobyid?id=' + params)
}
api.getTeacherList = (params) => {
  return axios.get('teacher/getteacherpage', params)
}
api.getCourseList = (params) => {
  return axios.get('course/getcoursepage', params)
}
export default api
