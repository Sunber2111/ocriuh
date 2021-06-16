import { IChecksResponse, IDetectCommonResponse } from "../responses/detect";
import request from "./agent";

const baseURL = process.env.REACT_APP_DETECT_API_URL as string;

const detectAPI = {
  detectPhoto: (
    data: string,
    isTheory?: boolean
  ): Promise<IDetectCommonResponse> =>
    request.postForm(baseURL + "detect/common", data, isTheory),
  detectChecksTheory: (data: string, dataRest: string) => {
    let formData = new FormData();
    formData.append("File1", data);
    formData.append("File2", dataRest);
    return request.postFormMany(baseURL + "detect/theory/checks", formData);
  },

  detectChecksTheoryFirst: (data: string): Promise<IChecksResponse> =>
    request.postForm(baseURL + "detect/theory/checks/first", data),
  detectChecksTheorySecond: (data: string): Promise<IChecksResponse> =>
    request.postForm(baseURL + "detect/theory/checks/second", data),

  detectChecksFirstPrac: (data: string): Promise<IChecksResponse> =>
    request.postForm(baseURL + "detect/practice/checks/first", data),
  detectChecksSecondPrac: (data: string): Promise<IChecksResponse> =>
    request.postForm(baseURL + "detect/practice/checks/second", data),

  sendImageFirst: (data: string): Promise<IChecksResponse> =>
    request.postForm(baseURL + "detect/first/save", data),

  sendImageSecond: (data: string): Promise<IChecksResponse> =>
    request.postForm(baseURL + "detect/sec/save", data),
};

export default detectAPI;
