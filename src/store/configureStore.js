import { configureStore } from "@reduxjs/toolkit";
import calendarReducer from "./slices/calendarSlice";
import modalReducer from "./slices/modalSlice";
import moveReducer from "./slices/moveSlice";

const reducer = {
  calendar: calendarReducer,
  move: moveReducer,
  modal: modalReducer,
  move: moveReducer,
};

const store = configureStore({
  reducer,
});

export default store;
