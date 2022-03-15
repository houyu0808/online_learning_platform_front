import axios from './ajax/index';

let api = {};

api.getTaskList = (params) => {
  return axios.get("task/gettaskpage", params);
};
api.addTask = (params) => {
  return axios.post("task/addtask", params);
};
api.deleteTask = (params) => {
  return axios.get("task/deletetask", params);
};
api.getClassList = (params) => {
  return axios.get("class/getclassbycollege", params);
};
api.getTaskClassPage = (params) => {
  return axios.get("task/gettaskclasspage", params);
};
api.getStudentTaskList = (params) => {
  return axios.get("task/getstudenttasklist", params);
};
api.downloadFile = (params) => {
  return axios.get("task/downloadfile", params);
};
api.uploadFile = (params) => {
  return axios.post("task/uploadfile", params);
};

export default api;
