import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ModalReducerName } from "app/constants/reducer.name.constants";
import { IModalStates } from "./@types/modal";

const initialState: IModalStates = {
  open: false,
  body: null,
  size:undefined
};

const modal = createSlice({
  name: ModalReducerName,
  initialState,
  reducers: {
    openModal(state, { payload }: PayloadAction<{ body: any }>) {
      state.body = payload.body;
      state.open = true;
      if (!state.size) {
        state.size = "mini";
      }
    },
    closeModal(state) {
      state.open = false;
      state.body = null;
    },
  },
});

const { actions, reducer } = modal;

export const { openModal, closeModal } = actions;

export default reducer;
