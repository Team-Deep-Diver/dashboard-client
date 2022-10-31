import { createSlice } from "@reduxjs/toolkit";
import range from "lodash-es/range";

const initialState = {
  items: [],
  cells: range(20).map((y) => range(20).map((x) => "none")),
  dragging: {
    snapshotId: "",
    initialPoint: { x: 1, y: 1 },
    nextPoint: { x: 1, y: 1 },
    valid: false,
  },
};

const moveSlice = createSlice({
  name: "move",
  initialState,
  reducers: {
    addItem(state, action) {
      const { item } = action.payload;
      state.items = [...item];
    },
    dragStarted(state, action) {
      const { item } = action.payload;
      const { x, y } = item;

      state.dragging = {
        snapshotId: item.snapshotId,
        initialPoint: { x, y },
        nextPoint: { x, y },
        valid: true,
      };
    },
    dragMoved(state, action) {
      const { item, point } = action.payload;

      if (state.dragging) {
        state.dragging.nextPoint = point;
      }
    },
    dragEnded(state, action) {
      let { item } = action.payload;
      let point;

      if (state.dragging) {
        point = { x: item.x, y: item.y };

        if (state.dragging.valid) {
          point.x = state.dragging.nextPoint.x;
          point.y = state.dragging.nextPoint.y;

          item = {
            ...item,
            x: point.x,
            y: point.y,
          };
        }

        const index = state.items.findIndex(
          (i) => i.snapshotId === item.snapshotId
        );
        state.items[index] = { ...item, x: item.x, y: item.y };
      }
    },
    animationEnded(state, action) {
      state.dragging = undefined;
    },
  },
});

export const { addItem, dragStarted, dragMoved, dragEnded, animationEnded } =
  moveSlice.actions;
export default moveSlice.reducer;
