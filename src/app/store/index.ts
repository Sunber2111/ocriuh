import { configureStore, combineReducers, Action } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import modalReducer from "features/modal/modalSlice";
import photoReducer from "features/photo/photoSlice";

//tạo reducer tổng
const rootReducer = combineReducers({
  modal: modalReducer,
  photo: photoReducer,
});

// khởi tạo store
const store = configureStore({
  reducer: rootReducer,
});

// interface = type
export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const appDispatch = store.dispatch;

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

// tải ra thành module
export default store;
