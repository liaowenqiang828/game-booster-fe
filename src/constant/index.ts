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
