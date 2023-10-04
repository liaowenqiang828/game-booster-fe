export interface ILoginRequest {
  name: string;
  password: string;
}

export interface IGetUploadUrlRequest {
  type: number;
}

export interface IListBoostNodesRequest {
  start_id: number;
  cnt: number;
}

export interface ISearchBoostNodesRequest {
  type: number;
  val: string;
}

export interface IEditBoostNodeRequest {
  id: number;
  name: string;
  enabled: boolean;
  modes: number;
  bandwidth: number;
}

export interface IListBoostZonesRequest {
  start_id: number;
  cnt: number;
}

export interface IAddBoostZoneRequest {
  name: string;
  enabled: boolean;
  ping_addr: string;
  country: string;
  region: string;
  inbound_country_code: string;
  putbound_country_code: string;
  nodes: string[];
  desc: string;
}

export interface IAddDnsGroupRequest {
  name: string;
  dns: string;
}
export interface IEditDnsGroupRequest {
  id: number;
  name: string;
  dns: string;
}

export interface IEditGlobalAclRequest {
  os: number;
  acl: string;
}

export interface IAddAclGroupRequest {
  name: string;
  content: string;
  desc: string;
}

export interface IEditAclGroupRequest {
  id: number;
  name: string;
  content: string;
  desc: string;
}

export interface IListGameRequest {
  start_id: number;
  cnt: number;
}

export interface ISearchGamesRequest {
  id: number;
  title: number;
}

export interface IAddGameRequest {
  title: string;
  summary: string;
  enabled: boolean;
  icon: string;
  banner: string;
  character_ic: string;
}

export interface IEditGameRequest {
  id: number;
  title: string;
  summary: string;
  enabled: boolean;
  icon: string;
  banner: string;
  character_ic: string;
}

export interface IListGamePkgsRequest {
  game_id: number;
}

export interface IAddGamePkgRequest {
  game_id: number;
  name: string;
  channel: string;
  sign: string;
  enabled: boolean;
}

export interface IEditGamePkgRequest {
  name: string;
  channel: string;
  sign: string;
  enabled: boolean;
}

export interface IDelGamePkgRequest {
  name: string;
}

export interface IListGameRegionRequest {
  game_id: number;
}

export interface IAddGameRegionRequest {
  name: string;
  enabled: boolean;
  dns_group: number;
  boost_zones: number[];
}

export interface IEditGameRegionRequest {
  id: number;
  name: string;
  enabled: boolean;
  dns_group: number;
  boost_zones: number[];
}

export interface IListGameBoostConfigRequest {
  game_id: number;
}

export interface IAddGameBoostConfigRequest {
  game_id: number;
  enabled: boolean;
  boost_pkgs: string[];
  android_acl_groups: number[];
  android_acl: string;
  ios_acl_groups: number[];
  ios_acl_content: string;
}

export interface IEditGameBoostConfigRequest {
  game_id: number;
  enabled: boolean;
  boost_pkgs: string[];
  android_acl_groups: number[];
  android_acl: string;
  ios_acl_groups: number[];
  ios_acl_content: string;
}

export interface IAddClientUpdateRequest {
  os: number;
  ver: string;
  url: string;
  md5: string;
  size: number;
  must_upd: boolean;
  title: string;
  change_log: string;
}

export interface IEditClientUpdateRequest {
  id: number;
  os: number;
  ver: string;
  url: string;
  md5: string;
  size: number;
  must_upd: boolean;
  title: string;
  change_log: string;
}
