import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICourse } from "app/api/responses/course";
import { PhotoReducerName } from "app/constants/reducer.name.constants";
import { IPhotoState, stateChangeSelect } from "./@types/photo";

const initialCreate: IPhotoState = {
  data: [],
  isCommonInfoFail: false,
  informationCommonDetect: [
    {
      isHasPractice: false,
      semester: 1,
      subjectClassId: 0,
      subjectClassName: "42030062541",
      subjectName: "Máy Học",
      teacherName: "Phạm Thị Thiết",
      yearStudy: "2021-2022",
    },
  ],
  checks: [
    [6, 6, 6, 6, 6, 6, 6, 6],
    [6, 6, 6, 6],
    [6, 6, 6],
    [6, 6, 6, 6],
    [6, 6, 6, 6, 6],
  ],
  loadingWhenDetect: true,
  informationCommonSelect: {
    isHasPractice: false,
    semester: 0,
    subjectClassId: 0,
    subjectClassName: "",
    subjectName: "",
    teacherName: "",
    yearStudy: "",
  },
  loadingChecks: true,
  loadingChecksFirst: true,
  isDetectTheory: false,
  loadingChecksSecond: true,
};

const photoSlice = createSlice({
  name: PhotoReducerName,
  initialState: initialCreate,
  reducers: {
    setInfomationDetect(state, { payload }: PayloadAction<ICourse[]>) {
      state.informationCommonDetect = payload;
      if (payload.length > 0) {
        state.informationCommonSelect = payload[0];
      }
      state.loadingWhenDetect = false;
    },
    insertNewPhoto(state, { payload }: PayloadAction<string>) {
      if (state.data.length < 2) {
        if (state.data.length === 0) {
          state.data.push({ content: payload, isFirst: true });
        } else {
          const item = state.data[0];
          if (item.isFirst) {
            state.data.push({ content: payload, isFirst: false });
          } else {
            state.data.push({ content: payload, isFirst: true });
          }
        }
      }
    },
    removePhoto(state, { payload }: PayloadAction<number>) {
      if (state.data[payload]) {
        state.data.splice(payload, 1);
      }
    },
    setChecks(state, { payload }: PayloadAction<number[][]>) {
      state.checks = payload;
      state.loadingWhenDetect = false;
    },
    setLoadingWhenDetect(state, { payload }: PayloadAction<boolean>) {
      state.loadingWhenDetect = payload;
    },
    setInformationSelected(state, { payload }: PayloadAction<ICourse>) {
      state.informationCommonSelect = payload;
    },
    setSelectChecks(state, { payload }: PayloadAction<stateChangeSelect>) {
      state.checks[payload.row][payload.col] = payload.choose;
    },
    setLoadingChecks(state, { payload }: PayloadAction<boolean>) {
      state.loadingChecks = payload;
      state.loadingChecksFirst = true;
    },
    setStateDetect(state, { payload }: PayloadAction<boolean>) {
      state.isDetectTheory = payload;
      state.loadingChecksFirst = true;
      state.loadingChecksSecond = true;
      if (payload) {
        state.checks = [
          [6, 6, 6, 6, 6, 6, 6],
          [6, 6, 6, 6, 6, 6],
          [6, 6, 6, 6, 6, 6],
          [6, 6, 6, 6],
        ];
      } else {
        state.checks = [
          [6, 6, 6, 6, 6, 6, 6, 6],
          [6, 6, 6, 6],
          [6, 6, 6],
          [6, 6, 6, 6],
          [6, 6, 6, 6, 6],
        ];
      }
    },
    setResultCheckFirstSide(state, { payload }: PayloadAction<number[][]>) {
      payload.forEach((row, indexRow) => {
        row.forEach((col, indexCol) => {
          state.checks[indexRow][indexCol] = col;
        });
      });
      state.loadingChecksFirst = false;
    },
    setResultCheckSecondSide(state, { payload }: PayloadAction<number[][]>) {
      if (state.isDetectTheory) {
        payload.forEach((row, indexRow) => {
          indexRow += 1;
          row.forEach((col, indexCol) => {
            if (indexRow === 1) {
              indexCol += 2;
            }
            state.checks[indexRow][indexCol] = col;
          });
        });
      }
      state.loadingChecksSecond = false;
    },
    detectFirstFail(state) {
      const index = state.data.findIndex((x) => x.isFirst === true);
      if (index !== -1) {
        state.data.splice(index, 1);
      }
    },
    detectSecondFail(state) {
      const index = state.data.findIndex((x) => x.isFirst === false);
      if (index !== -1) {
        state.data.splice(index, 1);
      }
    },
    setCommonInfoFail(state) {
      state.isCommonInfoFail = true;
    },
    setDataGetSCById(state, { payload }: PayloadAction<ICourse>) {
      state.informationCommonDetect = [payload];
      state.informationCommonSelect = state.informationCommonDetect[0];
      state.isCommonInfoFail = false;
      state.loadingWhenDetect = false;
    },
  },
});

const { actions, reducer } = photoSlice;

export const {
  insertNewPhoto,
  removePhoto,
  setInfomationDetect,
  setChecks,
  setLoadingWhenDetect,
  setInformationSelected,
  setSelectChecks,
  setLoadingChecks,
  setStateDetect,
  setResultCheckFirstSide,
  setResultCheckSecondSide,
  detectFirstFail,
  detectSecondFail,
  setCommonInfoFail,
  setDataGetSCById,
} = actions;

export default reducer;
