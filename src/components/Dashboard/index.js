import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Wrapper, Content } from "./style";
import { motion } from "framer-motion";
import {
  addItem,
  dragStarted,
  dragMoved,
  dragEnded,
  animationEnded,
} from "../../store/slices/moveSlice.js";

function Dashboard() {
  const dispatch = useDispatch();
  const { items, dragging } = useSelector((state) => state.move);

  const GRID_SIZE = 100 * window.devicePixelRatio;
  const [camera, setCamera] = useState({
    x: items[0].x,
    y: items[0].y,
    zoom: 1,
  });
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      const scaledGridSize = GRID_SIZE * camera.zoom;
      const dpi = window.devicePixelRatio;

      canvasRef.current.width = window.innerWidth * dpi;
      canvasRef.current.height = window.innerHeight * dpi;

      const ctx = canvasRef.current.getContext("2d");
      if (!ctx) {
        return;
      }

      const x = -scaledGridSize + ((camera.x * dpi) % scaledGridSize);
      const y = -scaledGridSize + ((camera.y * dpi) % scaledGridSize);
      const width = canvasRef.current.width + scaledGridSize * 2;
      const height = canvasRef.current.height + scaledGridSize * 2;

      ctx.clearRect(x, y, width, height);

      for (let xPos = x; xPos <= width; xPos += scaledGridSize) {
        ctx.moveTo(xPos, y);
        ctx.lineTo(xPos, height);
      }

      for (let yPos = y; yPos <= height; yPos += scaledGridSize) {
        ctx.moveTo(x, yPos);
        ctx.lineTo(width, yPos);
      }

      ctx.stroke();
    }
  }, [camera]);

  useEffect(() => {
    function handleWheel(e) {
      e.preventDefault();
      const { deltaX, deltaY, clientX, clientY, ctrlKey, metaKey } = e;
      console.log(deltaX, clientX, ctrlKey, metaKey);
      const isZooming = ctrlKey || metaKey;

      if (isZooming) {
        setCamera((camera) => {
          const newZoom = Math.max(
            Math.min(4, camera.zoom + -deltaY * 0.007),
            0.125
          );

          const zoomRatio = 1 - newZoom / camera.zoom;
          const newX = camera.x + (clientX - camera.x) * zoomRatio;
          const newY = camera.y + (clientY - camera.y) * zoomRatio;

          return {
            x: newX,
            y: newY,
            zoom: newZoom,
          };
        });
      } else {
        setCamera((camera) => {
          return {
            x: camera.x - deltaX,
            y: camera.y - deltaY,
            zoom: camera.zoom,
          };
        });
      }
    }

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);
  const saveMovedCard = (item) => {
    // const cardInput = setCardInput(user_id, currentDate, item, item.todo);
    // setTodoChange(cardInput);
    console.log(item);
  };
  const isDragging = true;

  return (
    <Wrapper>
      <canvas className="canvas-grid" ref={canvasRef} />
      <div
        className="canvas"
        style={{
          transform: `translate(${camera.x}px, ${camera.y}px) scale(${camera.zoom})`,
        }}
      >
        {items?.map((item, idx) => {
          console.log("item", item.x, item.y, camera.x, camera.y);
          // const x = item.x * 70;
          // const y = item.y * 70;
          // const width = item.width * 70 - 2;
          // const height = item.height * 70 - 2;
          const isDragging = item.snapshotId === dragging?.snapshotId;

          <motion.div
            drag
            dragMomentum={false}
            onDragStart={() => dispatch(dragStarted({ item }))}
            onDragEnd={() => dispatch(dragEnded({ item }))}
            onDrag={(_, info) => {
              const point = {
                x: Math.round((camera.x + info.point.x) / 100) * 100,
                y: Math.round((camera.y + info.point.y) / 100) * 100,
              };

              if (dragging) {
                const { nextPoint } = dragging;
                if (point.x !== nextPoint.x || point.y !== nextPoint.y) {
                  dispatch(dragMoved({ item, point }));
                }
              }
            }}
            onAnimationComplete={() => {
              saveMovedCard(item);
              dispatch(animationEnded());
            }}
            initial={false}
            // animate={!isDragging}
            style={{
              position: "absolute",
              // top: 0,
              // left: 0,
              // top: item.y,
              // left: item.x,
              // transform: `translate(${camera.x}px, ${camera.y}px) scale(${camera.zoom})`,
              // x: item.x,
              // y: item.y,
              // x: camera.x,
              // y: camera.y,
              width: item.width,
              height: item.height,
              backgroundColor: "#ffffff",
              borderTop: `15px solid ${item.colorCode}`,
              borderRadius: "10px",
              zIndex: isDragging ? 99 : 1,
              borderBottom: `2px solid ${item.colorCode}`,
            }}
          ></motion.div>;
        })}
      </div>
    </Wrapper>
  );
}

export default Dashboard;
