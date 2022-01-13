import axios from './ajax/index';

let api = {};

api.getCarousel = () => {
  return axios.get('common/getcarousel');
};
api.getExtensionList = () => {
  return axios.get('common/getextensionlist');
};

export default api;
