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
  ios_acl_content: string;
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
