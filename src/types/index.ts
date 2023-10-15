export interface IBoostNode {
  id: number;
  public_addr: string;
  name: string;
  enabled: boolean;
  modes: number;
  online_cnt: number;
  bandwidth: number;
  cur_in_bandwidth: number;
  cur_out_bandwidth: number;
  ver: string;
  created_at: number;
  updated_at: number;
  started_at: number;
}

export interface IBoostZone {
  id: number;
  name: string;
  enabled: boolean;
  ping_addr: string;
  country: string;
  region: string;
  inbound_country_code: string;
  outbound_country_code: string;
  nodes: string[];
  desc: string;
  created_at: number;
  updated_at: number;
}

export interface IDnsGroup {
  id: number;
  name: string;
  dns: string[];
  created_at: number;
  updated_at: number;
}

export interface IAclGroup {
  id: number;
  name: string;
  content: string;
  desc: string;
  created_at: number;
  updated_at: number;
}

export interface IGame {
  id: number;
  enabled: boolean;
  title: string;
  summary: string;
  icon: string;
  banner: string;
  character_pic: string;
  created_at: number;
  updated_at: number;
}

export interface IGamePkg {
  name: string;
  channel: string;
  sign: string;
  enabled: boolean;
  created_at: number;
  updated_at: number;
}

export interface IGameRegion {
  id: number;
  name: string;
  enabled: boolean;
  dns_group: number;
  boost_zones: number[];
  created_at: number;
  updated_at: number;
}

export interface IGameBoostConfig {
  game_id: number;
  enabled: boolean;
  boost_pkgs: string[];
  android_acl_groups: number[];
  android_acl: string;
  android_acl_rul: string;
  android_acl_md5: string;
  ios_acl: string;
  ios_acl_groups: number[];
  ios_acl_rul: string;
  ios_acl_md5: string;
  created_at: number;
  updated_at: number;
}

export interface IClientUpdate {
  id: number;
  os: 0 | 1 | 2;
  ver: string;
  url: string;
  md5: string;
  size: number;
  must_upd: boolean;
  title: string;
  change_log: string;
  release_date: number;
}

export enum PLATFORMENUM {
  "Android" = 0,
  "iOS" = 1,
}

export enum OSENUM {
  "Android" = 0,
  "IOS" = 1,
  "PC" = 2,
}

export enum ErrorCode {
  SERVER_ERROR = 0,
  INVALID_REQUEST = 1,
  NOT_FOUND = 2,
  ACCESS_DENIED = 3,
  FORBIDDEN = 4,
  RATE_LIMIT_EXCEEDED = 5,
  CLIENT_CLOSED_REQUEST = 6,
  INVALID_TIME = 7,
  REPLAY_ATTACKS = 8,
  INCORRECT_USER_OR_PASSWORD = 9, // 用户名或者密码不正确
  AUTHORIZATION_EXPIRED = 10, // 登录凭证过期
  VERIFICATION_CODE_COOL_DOWN = 1000, // 验证码请求过于频繁，需要等待 60 秒
  INVALID_VERIFICATION_CODE = 1001, // 验证码已失效，请重新请求
}
