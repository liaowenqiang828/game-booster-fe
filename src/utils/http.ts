import axios from "axios";
import { ErrorCode } from "../types";
import { message } from "antd";
import { clearLoginInfo } from ".";

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
    return response.data;
  },
  (error) => {
    console.log("response in intercepter error", error);
    if (error.response.data.code === ErrorCode.INVALID_REQUEST) {
      message.error("请求错误，请重试");
      return;
    }
    if (error.response.data.code === ErrorCode.AUTHORIZATION_EXPIRED) {
      message.error("登录已过期，请重新登录", 3, () => {
        clearLoginInfo();
        window.location.href = "/login";
      });
      return;
    }

    return Promise.reject(error.response.data);
  }
);

export default http;
