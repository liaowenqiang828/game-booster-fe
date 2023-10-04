import { ILoginRequest } from "../types/request";
import http from "../utils/http";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const login = (loginRequest: ILoginRequest): Promise<any> => {
  return http.get(
    `/login?name=${loginRequest.name}&password=${loginRequest.password}`
  );
};
