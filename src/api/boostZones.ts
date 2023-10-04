import {
  IAddBoostZoneRequest,
  IEditBoostZoneRequest,
  IListBoostZonesRequest,
  ISearchBoostZonesRequest,
} from "../types/request";
import {
  IAddBoostZoneResponse,
  IListBoostZonesResponse,
} from "../types/response";
import http from "../utils/http";

export const getListBoostZones = (
  request: IListBoostZonesRequest
): Promise<IListBoostZonesResponse> => {
  return http.get("/list_boost_zones", {
    params: request,
  });
};

export const searchBoostZones = (
  request: ISearchBoostZonesRequest
): Promise<IListBoostZonesResponse> => {
  return http.get("/search_boost_zones", {
    params: request,
  });
};

export const editBoostZone = (
  request: IEditBoostZoneRequest
): Promise<void> => {
  return http.post("/edit_boost_zone", request);
};

export const addBoostZone = (
  request: IAddBoostZoneRequest
): Promise<IAddBoostZoneResponse> => {
  return http.post("/add_boost_zone", request);
};
