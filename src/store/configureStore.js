import { configureStore } from "@reduxjs/toolkit";
import calendarReducer from "./slices/calendarSlice";
import modalReducer from "./slices/modalSlice";

const reducer = {
  calendar: calendarReducer,
  modal: modalReducer,
};

const store = configureStore({
  reducer
});

export default store;
