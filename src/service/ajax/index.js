import axios from './ajax';

export default {
  get: function (url, params, form, catchReject) {
    return axios.ajax(url, 'get', params, form, catchReject);
  },
  post: function (url, params, form, catchReject) {
    return axios.ajax(url, 'post', params, form, catchReject);
  },
  delete: function (url, params, form, catchReject) {
    return axios.ajax(url, 'delete', params, form, catchReject);
  },
  put: function (url, params, form, catchReject) {
    return axios.ajax(url, 'put', params, form, catchReject);
  }
};
