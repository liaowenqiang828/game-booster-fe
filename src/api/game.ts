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
  IGetUploadUrlRequest,
  IListGameBoostConfigRequest,
  IListGamePkgsRequest,
  IListGameRegionRequest,
  IListGameRequest,
  ISearchGamesRequest,
  IUploadImageRequest,
} from "../types/request";
import {
  IGetUploadUrlResponse,
  IListGameBoostConfigResponse,
  IListGamePkgsResponse,
  IListGameRegionResponse,
  IListGameResponse,
  ISearchGamesResponse,
} from "../types/response";
import http from "../utils/http";
// const fs = require("fs");

export const getGameList = (
  request: IListGameRequest
): Promise<IListGameResponse> => {
  return http.get("/list_games", {
    params: request,
  });
};

export const searchGames = (
  request: ISearchGamesRequest
): Promise<ISearchGamesResponse> => {
  return http.get("/search_games", {
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
  return http.get("/get_game_boost_config", {
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

export const getUploadUrl = (
  request: IGetUploadUrlRequest
): Promise<IGetUploadUrlResponse> => {
  return http.get("get_upload_url", {
    params: request,
  });
};

export const putFileIntoTencentOSS = (
  request: IUploadImageRequest
): Promise<void> => {
  console.log("request", request);
  console.log(typeof request.file);
  // const data = fs.readFileSync("/Users/zhouweixin/Downloads/IMG_3563.JPG");

  return http.put(request.uplaodUrl, request.file, {
    headers: {
      "Content-Type": "image/png",
      "Content-Disposition": "attachment; filename=a.png",
    },
  });
};

// 下载地址：https://etalient-1304742805.cos.ap-shanghai.myqcloud.com/game/2b9b90532a61429f932dac4195c83a36.png
// 上传文本没问题，可以正常下载
// axios.put("https://etalient-1304742805.cos.ap-shanghai.myqcloud.com/game/2b9b90532a61429f932dac4195c83a36.png?q-sign-algorithm=sha1&q-ak=AKIDa6Tgh3Qt4NVfx86zslXCbvMnHdolbPCq&q-sign-time=1697804112%3B1697807712&q-key-time=1697804112%3B1697807712&q-header-list=host&q-url-param-list=&q-signature=7c0b30671ecaa24c0686c69090d560b1dabe6e8d",
//     "helloworld",
//     {
//         headers: {
//             Authorization: "W8RLZNb31tVSN9SsyPpu82_fezYW9fu4utaRkmJ5lmRTxnPeFuEeTBOYEf0",
//             "Content-Type": "text/plain",
//             "Content-Disposition": "attachment; filename=a.txt",
//         }
//     },
// ).then(resp => {
//     console.log(resp.status);
// })

// const data = fs.readFileSync("/Users/zhouweixin/Downloads/IMG_3563.JPG");

// axios
//   .put(
//     "https://etalient-1304742805.cos.ap-shanghai.myqcloud.com/game/2b9b90532a61429f932dac4195c83a36.png?q-sign-algorithm=sha1&q-ak=AKIDa6Tgh3Qt4NVfx86zslXCbvMnHdolbPCq&q-sign-time=1697804112%3B1697807712&q-key-time=1697804112%3B1697807712&q-header-list=host&q-url-param-list=&q-signature=7c0b30671ecaa24c0686c69090d560b1dabe6e8d",
//     data,
//     {
//       headers: {
//         Authorization:
//           "W8RLZNb31tVSN9SsyPpu82_fezYW9fu4utaRkmJ5lmRTxnPeFuEeTBOYEf0",
//         "Content-Type": "image/png",
//         "Content-Disposition": "attachment; filename=a.png",
//       },
//     }
//   )
//   .then((resp) => {
//     console.log(resp.status);
//   });
