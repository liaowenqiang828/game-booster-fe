import { IEditGlobalAclRequest } from "../types/request";
import { IListGlobalAclResponse } from "../types/response";
import http from "../utils/http";

export const getGlobalAclList = (): Promise<IListGlobalAclResponse> => {
  return http.get("/list_global_acl");
};

export const editGloablAcl = (
  request: IEditGlobalAclRequest
): Promise<void> => {
  return http.post("/edit_global_acl", request);
};
