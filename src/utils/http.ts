import axios from "axios";

const http = axios.create({
  baseURL: "/",
  timeout: 60000,
});

// 请求拦截器
http.interceptors.request.use(
  (config) => {
    // config.headers.Authorization = ''
    // loading
    return config;
  },
  (error) => {
    // loading disapper
    return Promise.reject(error);
  }
);

// 响应拦截器
http.interceptors.response.use(
  (response) => {
    // loading disappear
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default http;
