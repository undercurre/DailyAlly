// api.js

import axios from 'axios';
import {localStg} from '../../utils/storage';

const baseURL = '/strapi'; // 替换为你的API地址

const api = axios.create({
  baseURL,
  timeout: 5000, // 请求超时时间，单位毫秒
});

// 请求拦截器
api.interceptors.request.use(
  async config => {
    const handleConfig = {...config};
    handleConfig.headers.Authorization = (await localStg.get('token'))
      ? `Bearer ${localStg.get('token')}`
      : '';
    return config;
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error);
  },
);

// 响应拦截器
api.interceptors.response.use(
  response => {
    // 对响应数据做些什么
    return response.data;
  },
  error => {
    // 对响应错误做些什么
    return Promise.reject(error);
  },
);

export default api;
