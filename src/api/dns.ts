import { IAddDnsGroupRequest, IEditDnsGroupRequest } from "../types/request";
import { IListDnsGroupResponse } from "../types/response";
import http from "../utils/http";

export const getDnsList = (): Promise<IListDnsGroupResponse> => {
  return http.get("/list_dns_groups");
};

export const addDnsGroup = (request: IAddDnsGroupRequest): Promise<void> => {
  return http.post("/add_dns_group", request);
};

export const editDnsGroup = (request: IEditDnsGroupRequest): Promise<void> => {
  return http.post("/edit_dns_group", request);
};
