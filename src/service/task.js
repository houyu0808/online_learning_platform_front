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

export default api;
