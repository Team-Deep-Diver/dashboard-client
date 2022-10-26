import { createSlice, current } from "@reduxjs/toolkit";
import range from "lodash-es/range";

function setItemToCells(item, cells) {
  const next = [...cells];

  for (let y = 0; y < item.height; y++) {
    for (let x = 0; x < item.width; x++) {
      next[y + item.y][x + item.x] = item.id;
    }
  }
  return next;
}

function clearItemFromCells(item, cells) {
  const next = [...cells];

  for (let y = 0; y < item.height; y++) {
    for (let x = 0; x < item.width; x++) {
      next[y + item.y][x + item.x] = "none";
    }
  }
  return next;
}

function itemWillFit(item, point, cells) {
  for (let y = 0; y < item.height; y++) {
    for (let x = 0; x < item.width; x++) {
      const cell = cells[y + point.y][x + point.x];

      if (cell !== "none" && cell !== item.id) {
        return false;
      }
    }
  }
  return true;
}

const initialState = {
  items: [
    // {
    //   id: "",
    //   name: "",
    //   x: 0,
    //   y: 0,
    //   height: 0,
    //   width: 0
    // }
  ],
  cells: range(100).map((y) => range(100).map((x) => "none")),
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

      state.items.push(item);
      state.cells = setItemToCells(item, state.cells);
    },
    moveItem(state, action) {
      let { item, point } = action.payload;
      state.cells = clearItemFromCells(item, state.cells);
      item = { x: point.x, y: point.y };
      state.cells = setItemToCells({ x: point.x, y: point.y }, state.cells);
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
        state.dragging.valid = itemWillFit(item, point, state.cells);
      }
    },
    dragEnded(state, action) {
      let { item } = action.payload;
      let point;

      if (state.dragging) {
        point = { x: item.x, y: item.y };

        if (state.dragging.valid) {
          state.cells = clearItemFromCells(item, state.cells);

          point.x = state.dragging.nextPoint.x;
          point.y = state.dragging.nextPoint.y;

          item = {
            ...item,
            x: point.x,
            y: point.y,
          };
        }

        state.cells = setItemToCells(item, state.cells);
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

export const {
  addItem,
  moveItem,
  dragStarted,
  dragMoved,
  dragEnded,
  animationEnded,
} = moveSlice.actions;
export default moveSlice.reducer;
