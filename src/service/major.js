import axios from './ajax/index';

let api = {};

api.getMajorPage = (params) => {
  return axios.get('major/getmajorpage', params);
};
api.saveMajor = (params) => {
  return axios.post('major/savemajor', params);
};
api.deleteMajor = (params) => {
  return axios.get('major/deletemajor?ids=' + params);
};
api.getMajorById = (params) => {
  return axios.get('major/getmajorbyid?id=' + params);
};
api.getCollegeList = (params) => {
  return axios.get('college/getcollegepage', params);
};
export default api;
