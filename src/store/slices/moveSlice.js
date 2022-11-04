import { createSlice } from "@reduxjs/toolkit";
import range from "lodash-es/range";

const initialState = {
  items: [
    {
      cardId: "aaa",
      snapshotId: "bb",
      colorCode: "	#FFC0CB",
      period: {
        startDate: "2022.10.12",
        endDate: "2022.10.14",
      },
      category: "운동",
      todo: [],
      imgUrl: "",
      description: "hihi",
      x: 100,
      y: 100,
      width: 400,
      height: 300,
    },
  ],
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
      const { point } = action.payload;

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
          console.log(point.x, point.y);

          item = {
            ...item,
            x: point.x,
            y: point.y,
          };
        }

        console.log(item, state.items);
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
