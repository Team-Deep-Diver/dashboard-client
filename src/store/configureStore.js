import { configureStore } from "@reduxjs/toolkit";
import calendarReducer from "./slices/calendarSlice";

const reducer = {
  calendar: calendarReducer,
};

const store = configureStore({
  reducer
});

export default store;
