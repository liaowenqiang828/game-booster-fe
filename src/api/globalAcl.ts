import { IEditGlobalAclRequest } from "../types/request";
import { IListAclGroupsResponse } from "../types/response";
import http from "../utils/http";

export const getGlobalAclList = (): Promise<IListAclGroupsResponse> => {
  return http.get("/lis_global_acl");
};

export const editGloablAcl = (
  request: IEditGlobalAclRequest
): Promise<void> => {
  return http.post("/edit_global_acl", request);
};
