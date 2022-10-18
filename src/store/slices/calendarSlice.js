import { createSlice } from "@reduxjs/toolkit";

const today = new Date();
const initialState = {
  currentDate: today.toString(),
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    showNextDay(state) {
      const dateObj = new Date(state.currentDate);
      const date = dateObj.getDate();
      const newDate = new Date(dateObj.setDate(date + 1));

      state.currentDate = newDate.toString();
    },
    showPrevDay(state) {
      const dateObj = new Date(state.currentDate);
      const date = dateObj.getDate();
      const newDate = new Date(dateObj.setDate(date - 1));

      state.currentDate = newDate.toString();
    },
  },
});

export const { showNextDay, showPrevDay } = calendarSlice.actions;
export default calendarSlice.reducer;
