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
api.getRecommendTeacher = () => {
  return axios.get('common/getrecommendteacher');
};
api.addClickTimes = (params) => {
  return axios.get('common/addclicktimes', params);
};
api.getVideoInfo = (params) => {
  return axios.get('common/getvideoinfo', params);
};
api.getVideoList = (params) => {
  return axios.get('common/getvideolist', params);
};
api.getTeacher = (params) => {
  return axios.get('common/getteacherinfo', params);
};
api.getTodayRecommend = () => {
  return axios.get("common/gettodayrecommend");
};
api.searchVideo = (params) => {
  return axios.get("common/searchvideo", params);
};
api.uploadHeadImg = (params) => {
  return axios.post("common/uploadheadimg", params);
};

export default api;
