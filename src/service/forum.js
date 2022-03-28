import axios from './ajax/index';

let api = {};

api.publishForum = (params) => {
  return axios.post('forum/publishforum', params);
};
api.getForumList = (params) => {
  return axios.get('forum/getforumlist', params);
};
export default api;
