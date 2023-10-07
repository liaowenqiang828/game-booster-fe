import {
  IEditBoostNodeRequest,
  IListBoostNodesRequest,
  ISearchBoostNodesRequest,
} from "../types/request";
import {
  IListBoostNodesResponse,
  ISearchBoostNodesResponse,
} from "../types/response";
import http from "../utils/http";

export const getBoostNodesList = (
  request: IListBoostNodesRequest
): Promise<IListBoostNodesResponse> => {
  return http({
    method: "GET",
    url: "/list_boost_nodes",
    params: request,
  });
};

export const searchBoostNodes = (
  request: ISearchBoostNodesRequest
): Promise<ISearchBoostNodesResponse> => {
  return http.get("/search_boost_nodes", {
    params: request,
  });
};

export const editBoostNode = (
  request: IEditBoostNodeRequest
): Promise<void> => {
  return http.post("/edit_boost_node", request);
};
