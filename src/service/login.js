import axios from './ajax/index';

export const adminLogin = (params) => {
  return axios.post('user/adminlogin', params);
};
export const userLogin = (params) => {
  return axios.post('user/userlogin', params);
};
export const validateToken = (params) => {
  return axios.post('user/validatetoken?token=' + params);
};
export const searchStudent = (params) => {
  return axios.get('user/searchstudent?stuNumber=' + params);
};
export const searchTeacher = (params) => {
  return axios.get('user/searchteacher?employeeNumber=' + params);
};
export const stuRegister = (params) => {
  return axios.post('user/studentregister', params);
};
export const teachRegister = (params) => {
  return axios.post('user/teacherregister', params);
};
export const changePwd = (params) => {
  return axios.post('user/changepassword', params);
};
