import global from '../../utils/global'
import axios from '../../utils/Interceptor'

axios.ajax = function ajax (url, method, params, form = false, catchReject = false) {
  if (method !== 'get') {
    if (form) {
      return new Promise((resolve, reject) => {
        axios({
          url: global.BASE_URL + url,
          method: method,
          data: params,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then(response => {
          resolve(response.data)
        })
          .catch(err => {
            reject(err)
          })
      })
    } else {
      if (catchReject) {
        return new Promise((resolve, reject) => {
          axios({
            url: global.BASE_URL + url,
            method: method,
            data: params
          }).then(response => {
            resolve(response.data)
          })
            .catch(err => {
              reject(err)
            })
        })
      } else {
        return new Promise((resolve, reject) => {
          axios({
            url: global.BASE_URL + url,
            method: method,
            data: params,
            headers: {
              'Content-type': 'application/json;charset=utf-8'
            }
          }).then(response => {
            resolve(response.data)
          })
            .catch(err => {
              reject(err)
            })
        })
      }
    }
  } else {
    return new Promise((resolve, reject) => {
      axios({
        url: global.BASE_URL + url,
        method: method,
        params: params,
        headers: {
          'Content-type': 'application/json;charset=utf-8'
        }
      }).then(response => {
        resolve(response.data)
      })
        .catch(err => {
          reject(err)
        })
    })
  }
}

export default axios
