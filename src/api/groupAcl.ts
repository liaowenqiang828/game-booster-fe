import { IAddAclGroupRequest, IEditAclGroupRequest } from "../types/request";
import { IListAclGroupsResponse } from "../types/response";
import http from "../utils/http";

export const getAclGroupList = (): Promise<IListAclGroupsResponse> => {
  return http.get("/list_acl_groups");
};

export const addAclGroup = (request: IAddAclGroupRequest): Promise<void> => {
  return http.post("/add_acl_group", request);
};

export const editAclGroup = (request: IEditAclGroupRequest): Promise<void> => {
  return http.post("/edit_acl_group", request);
};
