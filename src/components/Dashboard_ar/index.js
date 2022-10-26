import { Wrapper, GridLayer, Cell } from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setModalOpen } from "../../store/slices/modalSlice";

import { getCardInfo } from "../../utils/getCardInfo";
import { setCardInput } from "../../utils/setCardInput";
import {
  addItem,
  moveItem,
  dragStarted,
  dragMoved,
  dragEnded,
  animationEnded,
} from "../../store/slices/moveSlice2";
import { card } from "./cards";

function Dashboard({ socket }) {
  const dispatch = useDispatch();
  const { items, cells, dragging } = useSelector((state) => state.move);

  useEffect(() => {
    for (const [key, value] of Object.entries(card)) {
      dispatch(addItem({ item: { ...value } }));
    }
  }, [dispatch]);

  const draggingItem = items.find((i) => i.id === dragging?.id);

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
              backgroundColor: "rgba(239, 239, 239,.8)",
              x: dragging.initialPoint.x * 44,
              y: dragging.initialPoint.y * 44,
              width: draggingItem.width * 44 - 2,
              height: draggingItem.height * 44 - 2,
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
              x: dragging.nextPoint.x * 44,
              y: dragging.nextPoint.y * 44,
              width: draggingItem.width * 44 - 2,
              height: draggingItem.height * 44 - 2,
            }}
          />
        </>
      )}
      {items.map((item) => {
        const x = item.x * 44;
        const y = item.y * 44;
        const width = item.width * 44 - 2;
        const height = item.height * 44 - 2;
        const isDragging = item.id === dragging?.id;

        return (
          <motion.div
            key={item.id}
            drag
            dragMomentum={false}
            onDragStart={() => dispatch(dragStarted({ item }))}
            onDragEnd={() => dispatch(dragEnded({ item }))}
            onDrag={(_, info) => {
              const point = {
                x: Math.min(
                  Math.max(Math.round((x + info.offset.x) / 44), 0),
                  10 - item.width
                ),
                y: Math.min(
                  Math.max(Math.round((y + info.offset.y) / 44), 0),
                  10 - item.height
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
              textAlign: "right",
              padding: "0",
              zIndex: isDragging ? 99 : 1,
            }}
          >
            {item.name}
          </motion.div>
        );
      })}
    </Wrapper>
  );
}

export default Dashboard;
