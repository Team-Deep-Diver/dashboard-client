import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalOpen: false,
  modalType: "",
  message: "",
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModalOpen(state, action) {
      const { type, message } = action.payload;
      state.modalType = type;
      state.isModalOpen = true;
      state.message = message;
    },
    setModalClose(state) {
      state.isModalOpen = false;
    },
  },
});

export const { setModalOpen, setModalClose } = modalSlice.actions;
export default modalSlice.reducer;
