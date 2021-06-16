import { IRatingRequest } from "../requests/rating";
import request from "./agent";

const baseURL = process.env.REACT_APP_RATING_API_URL as string;

const ratingAPI = {
  ratingTheory: (data: IRatingRequest) =>
    request.post(baseURL + "theoryRating", data),
  ratingPractice: (data: IRatingRequest) =>
    request.post(baseURL + "Practices", data),
};

export default ratingAPI;
