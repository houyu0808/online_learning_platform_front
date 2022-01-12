import axios from './ajax/index';

let api = {};

api.getCarousel = () => {
  return axios.get('video/getcarousel');
};

export default api;
