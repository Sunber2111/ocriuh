import { ISplitStateImage } from "app/@types/common";

const skipRight: number = 0.1;
const heightRatio:number = 0.85;
const SkipTop: number = 0.12;

export const convertStateHW = (
  height: number,
  width: number
): ISplitStateImage => {
  let data: ISplitStateImage = {
    height: 0,
    skipHeight: 0,
    skipWidth: 0,
    width: 0,
  };

  data.skipWidth = Math.round(skipRight * width);
  data.skipHeight = Math.round(height * SkipTop);
  data.width = width - (data.skipWidth * 2);
  data.height = height*heightRatio;

  return data;
};
