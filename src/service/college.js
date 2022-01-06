import axios from './ajax/index'

let api = {}

api.getCollegePage = (params) => {
  return axios.get('college/getcollegepage', params)
}
api.saveCollege = (params) => {
  return axios.post('college/savecollege', params)
}
api.deleteCollege = (params) => {
  return axios.get('college/deletecollege?ids=' + params)
}
api.getCollegeById = (params) => {
  return axios.get('college/getcollegebyid?id=' + params)
}
export default api
