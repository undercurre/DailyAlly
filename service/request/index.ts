// api.js

import axios from 'axios';
import {localStg} from '../../utils/storage';

const baseURL = 'http://81.71.85.68:9111'; // 替换为你的API地址

const api = axios.create({
  baseURL,
  timeout: 5000, // 请求超时时间，单位毫秒
});

// 请求拦截器
api.interceptors.request.use(
  async config => {
    const handleConfig = {...config};
    handleConfig.headers.Authorization = (await localStg.get('token'))
      ? `Bearer ${await localStg.get('token')}`
      : '';
    return config;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  },
);

// 响应拦截器
api.interceptors.response.use(
  response => {
    // 401清除token
    if (response.data.error && response.data.error.status === 401) {
      localStg.remove('token');
    }
    return response.data;
  },
  error => {
    // 对响应错误做些什么
    return Promise.reject(error);
  },
);

export default api;
