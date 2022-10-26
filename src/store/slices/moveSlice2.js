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
  cells: range(10).map((y) => range(10).map((x) => "none")),
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
      // const nextstate = { ...state };
      const { item } = action.payload;

      state.items.push(item);
      state.cells = setItemToCells(item, state.cells);

      // return state;
    },
    moveItem(state, action) {
      // const { item, point } = action.payload;
      // state.cells = clearItemFromCells(item, state.cells);
      // item.x = point.x;
      // state.cells = setItemToCells(item, state.cells);
    },
    dragStarted(state, action) {
      // const nextstate = { ...state };

      const { item } = action.payload;
      const { x, y } = item;

      state.dragging = {
        id: item.id,
        initialPoint: { x, y },
        nextPoint: { x, y },
        valid: true,
      };

      console.log("start", state.dragging);
      // return state;
    },
    dragMoved(state, action) {
      // const nextstate = { ...state }; // add
      const { item, point } = action.payload;

      if (state.dragging) {
        state.dragging.nextPoint = point;
        // state.dragging.valid = itemWillFit(item, point, state.cells);

        console.log(state.dragging.nextPoint);
      }

      console.log("move!!", point);
      return state;
    },
    dragEnded(state, action) {
      // console.log("end state: ", state); // typeError
      // const nextstate = { ...state };
      const { item, point } = action.payload;
      console.log("end item: ", item);
      console.log("end point: ", typeof state.dragging);

      if (state.dragging) {
        console.log("여기 들어옴?");
        const { valid, initialPoint, nextPoint } = state.dragging;
        // const point = valid ? nextPoint : initialPoint;

        let point;

        if (valid) {
          point = state.dragging.nextPoint;
        } else {
          point = state.dragging.initialPoint;
        }

        console.log("end point: ", point);
        console.log("end item: ", item);

        state.cells = clearItemFromCells(item, state.cells);
        item.x = point.x;
        item.y = point.y;

        state.cells = setItemToCells(item, state.cells);
        const index = state.items.findIndex((i) => i.id === item.id);
        state.items[index] = item;
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
