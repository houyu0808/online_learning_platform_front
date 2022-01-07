import axios from './ajax/index';

let api = {};

api.getClassPage = (params) => {
  return axios.get('class/getclasspage', params);
};
api.saveClass = (params) => {
  return axios.post('class/saveclass', params);
};
api.deleteClass = (params) => {
  return axios.get('class/deleteclass?ids=' + params);
};
api.getClassById = (params) => {
  return axios.get('class/getclassbyid?id=' + params);
};
api.getCollegeList = (params) => {
  return axios.get('college/getcollegepage', params);
};
api.getMajorList = (params) => {
  return axios.get('major/getmajorbycollege', params);
};
export default api;
