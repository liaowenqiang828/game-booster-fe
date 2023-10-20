export const Mode: Record<number, string[]> = {
  1: ["高速"],
  2: ["下载"],
  3: ["高速", "下载"],
};

export enum ModesEnum {
  highSpeed = 1,
  download = 2,
  both = 3,
}

export const BASE_URL = "/admin/v1";

export const IMAGE_BASE_URL =
  "https://etalient-1304742805.cos.ap-shanghai.myqcloud.com";
