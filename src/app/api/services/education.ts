import { ICourse } from "../responses/course";
import { IGetResponse } from "../responses/responseBase";
import request from "./agent";

const baseURL = process.env.REACT_APP_RATING_API_URL as string;

const educationAPI = {
  getByIds: (id: string): Promise<IGetResponse<ICourse[]|null[]>> =>
    request.get(baseURL + `subjectclass/ids?list=${id}`),
};

export default educationAPI;
