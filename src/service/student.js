import axios from './ajax/index'

let api = {}

api.getStudentPage = (params) => {
  return axios.get('student/getstudentpage', params)
}
api.saveStudent = (params) => {
  return axios.post('student/savestudent', params)
}
api.deleteStudent = (params) => {
  return axios.get('student/deletestudent?ids=' + params)
}
api.getStudentById = (params) => {
  return axios.get('student/getstudentbyid?id=' + params)
}
api.getCollegeList = (params) => {
  return axios.get('college/getcollegepage', params)
}
api.getMajorList = (params) => {
  return axios.get('major/getmajorbycollege', params)
}
api.getClassList = (params) => {
  return axios.get('class/getclassbymajor', params)
}
export default api
