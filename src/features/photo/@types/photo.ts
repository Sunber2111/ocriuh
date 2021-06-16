import { ICourse } from "app/api/responses/course";

export interface IPhotoState {
  data: IPhoto[];
  informationCommonDetect: ICourse[];
  checks: number[][];
  loadingWhenDetect: boolean;
  informationCommonSelect?: ICourse;
  loadingChecks: boolean;

  loadingChecksFirst:boolean;
  loadingChecksSecond:boolean;
  isDetectTheory:boolean;

  isCommonInfoFail:boolean
}

export interface IPhoto {
  content: string;
  isFirst: boolean;
}

export interface stateChangeSelect {
  choose: number;
  row: number;
  col: number;
}
