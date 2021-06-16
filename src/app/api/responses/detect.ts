import { ICourse } from "./course";
import { IResponseBase } from "./responseBase";

export interface IDetectCommonResponse extends IResponseBase {
  data: ICourse[];
}

export interface IChecksResponse extends IResponseBase {
  data: number[][];
}
