export interface IResponseBase {
  status: string;
  code: number;
}

export interface IGetResponse<T> extends IResponseBase {
  data: T;
}
