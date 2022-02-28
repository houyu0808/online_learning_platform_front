import axios from './ajax/index';

let api = {};

api.getCarousel = () => {
  return axios.get('common/getcarousel');
};
api.getExtensionList = () => {
  return axios.get('common/getextensionlist');
};
api.getStudentInfo = (params) => {
  return axios.get('common/getstudentinformation', params);
};
api.getTeacherInfo = (params) => {
  return axios.get('common/getteacherinformation', params);
};
api.getStudentHotList = (params) => {
  return axios.get('common/getstudenthotlist', params);
};
api.getTeacherHotList = (params) => {
  return axios.get('common/getteacherhotlist', params);
};

export default api;
