import detectAPI from "app/api/services/detect";
import ratingAPI from "app/api/services/rating";
import { showError, showMessage } from "app/notify/notification";
import { AppDispatch, AppThunk } from "app/store";
import { history } from "index";
import {
  detectFirstFail,
  detectSecondFail,
  setChecks,
  setCommonInfoFail,
  setInfomationDetect,
  setLoadingChecks,
  setLoadingWhenDetect,
  setResultCheckFirstSide,
  setResultCheckSecondSide,
} from "../photoSlice";

export const detectInfomationCommon =
  (data: string, isTheory?: boolean): AppThunk =>
  async (dispatch: AppDispatch) => {
    try {
      const res = await detectAPI.detectPhoto(data.split(",")[1], isTheory);
      dispatch(setInfomationDetect(res.data));
    } catch (error) {
      dispatch(setCommonInfoFail());
      showError(
        "Nhận diện thông tin chung thất bại. Bạn vui lòng chụp lại hoặc nhập mã lớp học phần !"
      );
    }
  };

export const detectChecksTheory =
  (data1: string, data2: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoadingWhenDetect(true));
      dispatch(setLoadingChecks(true));
      history.push("/preview");
      const res = await detectAPI.detectChecksTheory(
        data1.split(",")[1],
        data2.split(",")[1]
      );
      dispatch(setChecks(res.data));
    } catch (error) {}
  };

export const sendRating =
  (ratings: number[][], classRoomId: number) =>
  async (dispatch: AppDispatch) => {
    try {
      let ratingsContent: string = "";
      ratings.forEach((row) => {
        row.forEach((col) => {
          ratingsContent = ratingsContent + col + ",";
        });
      });

      ratingsContent = ratingsContent.substring(0, ratingsContent.length - 1);
      await ratingAPI.ratingTheory({
        subjectClassId: classRoomId,
        rating: ratingsContent,
      });
      showMessage("Gửi thành công", 2400);
      history.push("/thanks");
    } catch (error) {
      showMessage("fail");
    }
  };

export const sendRatingPracs =
  (ratings: number[][], classRoomId: number) =>
  async (dispatch: AppDispatch) => {
    try {
      let ratingsContent: string = "";
      ratings.forEach((row) => {
        row.forEach((col) => {
          ratingsContent = ratingsContent + col + ",";
        });
      });

      ratingsContent = ratingsContent.substring(0, ratingsContent.length - 1);
      await ratingAPI.ratingPractice({
        subjectClassId: classRoomId,
        rating: ratingsContent,
      });
      
      showMessage("Gửi thành công", 2400);
      history.push("/thanks");
    } catch (error) {
      alert(JSON.stringify(error));
      showMessage("fail");
    }
  };

export const detectChecksFirst =
  (data: string, isTheory: boolean = true): AppThunk =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoadingChecks(true));
      const res = await detectAPI.detectChecksTheoryFirst(data.split(",")[1]);
      dispatch(setResultCheckFirstSide(res.data));
    } catch (error) {
      dispatch(detectFirstFail());
      if (isTheory) history.push("/photo/takepicture/theory");
      else history.push("/photo/takepicture/practice");
      showError(
        "Nhận diện thông tin đánh dấu mặt trước thất bại. Xin bạn vui lòng chụp lại !"
      );
    }
  };

export const detectChecksSecond =
  (data: string, isTheory: boolean = true): AppThunk =>
  async (dispatch: AppDispatch) => {
    try {
      const res = await detectAPI.detectChecksTheorySecond(data.split(",")[1]);
      dispatch(setResultCheckSecondSide(res.data));
    } catch (error) {
      dispatch(detectSecondFail());
      if (isTheory) history.push("/photo/takepicture/theory");
      else history.push("/photo/takepicture/practice");
      showError(
        "Nhận diện thông tin đánh dấu mặt sau thất bại. Xin bạn vui lòng chụp lại !"
      );
    }
  };

  export const detectChecksFirstPrac =
  (data: string, isTheory: boolean = true): AppThunk =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoadingChecks(true));
      const res = await detectAPI.detectChecksFirstPrac(data.split(",")[1]);
      dispatch(setResultCheckFirstSide(res.data));
    } catch (error) {
      dispatch(detectFirstFail());
      if (isTheory) history.push("/photo/takepicture/theory");
      else history.push("/photo/takepicture/practice");
      showError(
        "Nhận diện thông tin đánh dấu mặt trước thất bại. Xin bạn vui lòng chụp lại !"
      );
    }
  };

  export const detectChecksSecPrac =
  (data: string, isTheory: boolean = true): AppThunk =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoadingChecks(true));
      const res = await detectAPI.detectChecksSecondPrac(data.split(",")[1]);
      dispatch(setResultCheckFirstSide(res.data));
    } catch (error) {
      dispatch(detectFirstFail());
      if (isTheory) history.push("/photo/takepicture/theory");
      else history.push("/photo/takepicture/practice");
      showError(
        "Nhận diện thông tin đánh dấu mặt trước thất bại. Xin bạn vui lòng chụp lại !"
      );
    }
  };