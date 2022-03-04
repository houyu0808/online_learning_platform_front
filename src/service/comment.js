import axios from './ajax/index';

let api = {};

api.getComments = (params) => {
  return axios.get('comment/getvideocomments', params);
};
api.addComments = (params) => {
  return axios.post('comment/addcomments', params);
};
api.addChildComments = (params) => {
  return axios.post('comment/addchildcomments', params);
};

export default api;
