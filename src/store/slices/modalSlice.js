import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalType: "",
  message: "",
  messageType: "",
  isModalOpen: false,
  cardsLength: 0,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModalOpen(state, action) {
      const { type, message, cardsLength, messageType } = action.payload;

      state.modalType = type;
      state.message = message;
      state.messageType = messageType;
      state.isModalOpen = true;
      state.cardsLength = cardsLength;
    },
    setModalClose(state) {
      state.isModalOpen = false;
    },
  },
});

export const { setModalOpen, setModalClose } = modalSlice.actions;
export default modalSlice.reducer;
