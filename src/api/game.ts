import {
  IAddGameBoostConfigRequest,
  IAddGamePkgRequest,
  IAddGameRegionRequest,
  IAddGameRequest,
  IDelGamePkgRequest,
  IEditGameBoostConfigRequest,
  IEditGamePkgRequest,
  IEditGameRegionRequest,
  IEditGameRequest,
  IListGameBoostConfigRequest,
  IListGamePkgsRequest,
  IListGameRegionRequest,
  IListGameRequest,
  ISearchGamesRequest,
} from "../types/request";
import {
  IListGameBoostConfigResponse,
  IListGamePkgsResponse,
  IListGameRegionResponse,
  IListGameResponse,
  ISearchGamesResponse,
} from "../types/response";
import http from "../utils/http";

export const getGameList = (
  request: IListGameRequest
): Promise<IListGameResponse> => {
  return http.get("/list_game", {
    params: request,
  });
};

export const searchGames = (
  request: ISearchGamesRequest
): Promise<ISearchGamesResponse> => {
  return http.get("/search_game", {
    params: request,
  });
};

export const addGame = (request: IAddGameRequest): Promise<void> => {
  return http.post("/add_game", request);
};

export const editGame = (request: IEditGameRequest): Promise<void> => {
  return http.post("/edit_game", request);
};

export const getGamePkgsList = (
  request: IListGamePkgsRequest
): Promise<IListGamePkgsResponse> => {
  return http.get("/list_game_pkgs", {
    params: request,
  });
};

export const addGamePkg = (request: IAddGamePkgRequest): Promise<void> => {
  return http.post("/add_game_pkg", request);
};

export const editGamePkg = (request: IEditGamePkgRequest): Promise<void> => {
  return http.post("/edit_game_pkg", request);
};

export const delGamePkg = (request: IDelGamePkgRequest): Promise<void> => {
  return http.post("/del_game_pkg", request);
};

export const getGameRegionList = (
  request: IListGameRegionRequest
): Promise<IListGameRegionResponse> => {
  return http.get("/list_game_regions", {
    params: request,
  });
};

export const addGameRegion = (
  request: IAddGameRegionRequest
): Promise<void> => {
  return http.post("/add_game_region", request);
};

export const editGameRegion = (
  request: IEditGameRegionRequest
): Promise<void> => {
  return http.post("/edit_game_region", request);
};

export const getGameBoostConfigList = (
  request: IListGameBoostConfigRequest
): Promise<IListGameBoostConfigResponse> => {
  return http.get("/list_game_regions", {
    params: request,
  });
};

export const addGameBoostConfig = (
  request: IAddGameBoostConfigRequest
): Promise<void> => {
  return http.post("/add_game_boost_config", request);
};

export const editGameBoostConfig = (
  request: IEditGameBoostConfigRequest
): Promise<void> => {
  return http.post("/edit_game_boost_config", request);
};
