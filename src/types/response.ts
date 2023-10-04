import {
  IAclGroup,
  IBoostNode,
  IBoostZone,
  IClientUpdate,
  IDnsGroup,
  IGame,
  IGameBoostConfig,
  IGamePkg,
  IGameRegion,
} from ".";

export interface ILoginResponse {
  authorization: string;
}

export interface IGetUploadUrlResponse {
  upload_url: string;
  saved_url: string;
}

export interface IListBoostNodesResponse {
  total: number;
  nodes: IBoostNode[];
}

export interface ISearchBoostNodesResponse {
  nodes: IBoostNode[];
}

export interface IEditBoostNodeResponse {}

export interface IListBoostZonesResponse {
  zones: IBoostZone[];
}

export interface IAddBoostZoneResponse {}

export interface IListDnsGroupResponse {
  groups: IDnsGroup[];
}

export interface IListGlobalAclResponse {
  android_acl: string;
  ios_acl: string;
}

export interface IListAclGroupsResponse {
  groups: IAclGroup[];
}

export interface IListGameResponse {
  total: number;
  games: IGame[];
}
export interface ISearchGamesResponse {
  games: IGame[];
}

export interface IListGamePkgsResponse {
  pkgs: IGamePkg[];
}

export interface IListGameRegionResponse {
  regions: IGameRegion[];
}

export interface IListGameBoostConfigResponse {
  cfg: IGameBoostConfig;
}

export interface IListClientUpdatesResponse {
  updates: IClientUpdate[];
}
