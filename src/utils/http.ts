import axios from "axios";

const http = axios.create({
  baseURL: "/admin/v1",
  timeout: 60000,
});

// 请求拦截器
http.interceptors.request.use(
  (config) => {
    console.log(config);
    const authorization = window.localStorage.getItem("authorization");
    if (authorization) {
      config.headers.authorization = authorization;
    }

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
    return response.data;
  },
  (error) => {
    console.log("response error", error);
    if (error.response.status === 401) {
      window.location.href = "/login";
      // redirct to login page
    }

    return Promise.reject(error);
  }
);

export default http;
