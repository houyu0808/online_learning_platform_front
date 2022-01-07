import axios from './ajax/index';

let api = {};

api.getCoursePage = (params) => {
  return axios.get('course/getcoursepage', params);
};
api.saveCourse = (params) => {
  return axios.post('course/savecourse', params);
};
api.deleteCourse = (params) => {
  return axios.get('course/deletecourse?ids=' + params);
};
api.getCourseById = (params) => {
  return axios.get('course/getcoursebyid?id=' + params);
};
api.getCollegeList = (params) => {
  return axios.get('college/getcollegepage', params);
};
api.getMajorList = (params) => {
  return axios.get('major/getmajorbycollege', params);
};
api.getTeacherList = (params) => {
  return axios.get('teacher/getteacherpage', params);
};
export default api;
