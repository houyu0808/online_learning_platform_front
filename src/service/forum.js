import axios from './ajax/index';

let api = {};

api.publishForum = (params) => {
  return axios.post('forum/publishforum', params);
};
api.getForumList = (params) => {
  return axios.get('forum/getforumlist', params);
};
api.addLike = (params) => {
  return axios.get('forum/addlike', params);
};
api.cancelLike = (params) => {
  return axios.get('forum/cancellike', params);
};
api.addComment = (params) => {
  return axios.post('forum/addcomment', params);
};
export default api;
