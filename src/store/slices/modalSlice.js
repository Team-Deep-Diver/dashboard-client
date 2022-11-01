import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalOpen: false,
  modalType: "",
  messageType: "",
  message: "",
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModalOpen(state, action) {
      const { type, message, cardsLength, messageType } = action.payload;
      state.modalType = type;
      state.isModalOpen = true;
      state.message = message;
      state.messageType = messageType;
      state.cardsLength = cardsLength;
      state.messageType = messageType;
    },
    setModalClose(state) {
      state.isModalOpen = false;
    },
  },
});

export const { setModalOpen, setModalClose } = modalSlice.actions;
export default modalSlice.reducer;
