import {
  IAddClientUpdateRequest,
  IEditClientUpdateRequest,
} from "../types/request";
import { IListClientUpdatesResponse } from "../types/response";
import http from "../utils/http";

export const getClientUpdateList = (): Promise<IListClientUpdatesResponse> => {
  return http.get("/list_client_updates");
};

export const addClientUpdate = (
  request: IAddClientUpdateRequest
): Promise<void> => {
  return http.post("/add_client_update", request);
};

export const editClientUpdate = (
  request: IEditClientUpdateRequest
): Promise<void> => {
  return http.post("/edit_client_update", request);
};
