// ajax封装工具
import axios from 'axios'

// 获取axios实例, 并添加默认参数
const instance = axios.create({
  // baseURL: 'https://www.fastmock.site/mock/ae8e9031947a302fed5f92425995aa19/jd',
  baseURL: 'http://localhost:3000',
  withCredentials: true,
  timeout: 5000
})
// get方法
const get = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    instance.get(url, { params }).then((respones) => {
      resolve(respones.data)
    }, (err) => {
      reject(err)
    })
  })
}

// post方法
const post = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    instance.post(url, data, {
      headers: {
        'content-type': 'application/json'
      }
    }).then((respones) => {
      resolve(respones.data)
    }, (err) => {
      reject(err)
    })
  })
}

export { post, get }
