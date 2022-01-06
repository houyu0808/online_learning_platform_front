import axios from './ajax/index'

let api = {}

api.getTeacherPage = (params) => {
  return axios.get('teacher/getteacherpage', params)
}
api.saveTeacher = (params) => {
  return axios.post('teacher/saveteacher', params)
}
api.deleteTeacher = (params) => {
  return axios.get('teacher/deleteteacher?ids=' + params)
}
api.getTeacherById = (params) => {
  return axios.get('teacher/getteacherbyid?id=' + params)
}
api.getCollegeList = (params) => {
  return axios.get('college/getcollegepage', params)
}
api.getMajorList = (params) => {
  return axios.get('major/getmajorbycollege', params)
}
export default api
