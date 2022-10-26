import { createSlice } from "@reduxjs/toolkit";
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
    {
      id: "",
      name: "",
      x: 0,
      y: 0,
      height: 0,
      width: 0,
    },
  ],
  cells: range(100).map((y) => range(10).map((x) => "none")),
  dragging: {
    id: "",
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

      console.log("start", item);
      console.log("start", x, y);

      state.dragging = {
        id: item.id,
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

      console.log("move", state.dragging.nextPoint);

      // console.log(state.dragging.nextPoint); // 오류 안남 : 어떤 값을 할당하고 찍어보면 오류가 안나는 것 같음
    },
    dragEnded(state, action) {
      let { item } = action.payload;
      let point;

      if (state.dragging) {
        if (state.dragging.valid) {
          point = {
            x: state.dragging.nextPoint.x,
            y: state.dragging.nextPoint.y,
          };
        } else {
          point = {
            x: state.dragging.initialPoint.x,
            y: state.dragging.initialPoint.y,
          };
        }

        state.cells = setItemToCells(item, state.cells);

        state.cells = clearItemFromCells(item, state.cells);

        item = {
          ...item,
          x: point.x,
          y: point.y,
        };

        state.cells = setItemToCells(item, state.cells);

        const index = state.items.findIndex((i) => i.id === item.id);
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
