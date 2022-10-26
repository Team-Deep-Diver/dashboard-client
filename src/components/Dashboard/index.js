import { useEffect } from "react";
import { motion } from "framer-motion";
import { Wrapper, GridLayer, Cell } from "./style.js";
import { useDispatch, useSelector } from "react-redux";

import {
  addItem,
  moveItem,
  dragStarted,
  dragMoved,
  dragEnded,
  animationEnded,
} from "../../store/slices/moveSlice.js";

import { cards } from "./cards";

function Dashboard() {
  const dispatch = useDispatch();
  const { items, cells, dragging } = useSelector((state) => state.move);

  useEffect(() => {
    for (const card of cards) {
      dispatch(addItem({ item: card }));
    }
  }, []);

  const draggingItem = items.find((i) => i.snapshotId === dragging?.snapshotId);

  const saveMovedCard = (item) => {
    const cardInput = setCardInput(user_id, currentDate, item, item.todo);
    setTodoChange(cardInput);
  };

  useMemo(() => {
    dispatch(resetItem());

    for (const card of cards) {
      dispatch(addItem({ item: card }));
    }
  }, [cards]);

  const draggingItem = cards.find((i) => i.snapshotId === dragging?.snapshotId);

  return (
    <Wrapper>
      <GridLayer>
        {cells.map((row, y) => row.map((_, x) => <Cell key={`${y}_${x}`} />))}
      </GridLayer>
      {dragging && draggingItem && (
        <>
          <motion.div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              backgroundColor: "rgba(239, 239, 239, .8)",
              x: dragging.initialPoint.x * 70,
              y: dragging.initialPoint.y * 70,
              width: draggingItem.width * 70 - 2,
              height: draggingItem.height * 70 - 2,
            }}
          />
          <motion.div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              border: "1px solid #000",
              backgroundColor: dragging.valid
                ? "rgb(152, 195, 121)"
                : "rgb(224, 109, 118)",
              x: dragging.nextPoint.x * 70,
              y: dragging.nextPoint.y * 70,
              width: draggingItem.width * 70 - 2,
              height: draggingItem.height * 70 - 2,
            }}
          />
        </>
      )}
      {items.map((item, idx) => {
        const x = item.x * 70;
        const y = item.y * 70;
        const width = item.width * 70 - 2;
        const height = item.height * 70 - 2;
        const isDragging = item.snapshotId === dragging?.snapshotId;

        return (
          <motion.div
            key={item.snapshotId + idx}
            drag
            dragMomentum={false}
            onDragStart={() => dispatch(dragStarted({ item }))}
            onDragEnd={() => dispatch(dragEnded({ item }))}
            onDrag={(_, info) => {
              const point = {
                x: Math.min(
                  Math.max(Math.round((x + info.point.x) / 70), 0),
                  100 - item.width
                ),
                y: Math.min(
                  Math.max(Math.round((y + info.point.y) / 70), 0),
                  100 - item.height
                ),
              };

              if (dragging) {
                const { nextPoint } = dragging;
                if (point.x !== nextPoint.x || point.y !== nextPoint.y) {
                  dispatch(dragMoved({ item, point }));
                }
              }
            }}
            onAnimationComplete={() => dispatch(animationEnded())}
            initial={false}
            animate={!isDragging}
            style={{
              position: "absolute",
              top: y,
              left: x,
              width,
              height,
              border: "1px solid #000",
              backgroundColor: "#efefef",
              fontSize: 10,
              textAlign: "center",
              padding: "2px 4px",
              zIndex: isDragging ? 99 : 1,
            }}
          >
            {item.category}
          </motion.div>
        );
      })}
    </Wrapper>
  );
}

export default Dashboard;
