import { ILoginRequest } from "../types/request";
import http from "../utils/http";

export const login = async (loginRequest: ILoginRequest): Promise<void> => {
  return http
    .get(`/login?name=${loginRequest.name}&password=${loginRequest.password}`)
    .then((res) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.localStorage.setItem("authorization", res.authorization);
    })
    .catch((error) => {
      console.log("error in login api file", error);
      return Promise.reject(error);
    });
};
