import axios from './ajax/index';

let api = {};

api.getBroadcastList = () => {
  return axios.get("/broadcast/getbroadcastlist");
};
api.getBroadcastById = (params) => {
  return axios.get("/broadcast/getbroadcastbyid", params);
};

export default api;
