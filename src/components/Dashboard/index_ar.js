import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

import { setModalOpen } from "../../store/slices/modalSlice";
import {
  addItem,
  moveItem,
  dragStarted,
  dragMoved,
  dragEnded,
  animationEnded,
} from "../../store/slices/moveSlice.js";

import { getCardInfo } from "../../utils/getCardInfo";
import { setCardInput } from "../../utils/setCardInput";

import { Wrapper, GridLayer, Cell, Content } from "./style.js";

// import { cards } from "./cards";

function Dashboard({ socket }) {
  const dispatch = useDispatch();
  const { user_id } = useParams();
  const [cards, setCards] = useState([]);
  const [todoChange, setTodoChange] = useState(null);
  const { currentDate } = useSelector((state) => state.calendar);
  const { items, cells, dragging } = useSelector((state) => state.move);

  useEffect(() => {
    socket?.emit("searchMyCards", { user_id, currentDate });
    socket?.on("getMyCards", (data) => {
      const cardInfo = getCardInfo(data);

      setCards(cardInfo);
    });
  }, [socket, currentDate]);

  useEffect(() => {
    socket?.emit("modifyCard", { socketValue: todoChange });
    socket?.on("getMyCards", (data) => {
      const cardInfo = getCardInfo(data);

      setCards(cardInfo);
    });
  }, [todoChange]);

  const handleCheckbox = (e, card) => {
    const newcard = card.todo.map((item) => {
      return {
        text: item.text,
        checked:
          item.text === e.target.textContent || item.text === e.target.id
            ? !item.checked
            : item.checked,
      };
    });

    const cardInput = setCardInput(user_id, currentDate, card, newcard);
    setTodoChange(cardInput);
  };

  useEffect(() => {
    for (const card of cards) {
      dispatch(addItem({ item: card }));
    }
  }, []);

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
              backgroundColor: "#ffffff",
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
      {cards?.map((item, idx) => {
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
                  20 - item.width
                ),
                y: Math.min(
                  Math.max(Math.round((y + info.point.y) / 70), 0),
                  20 - item.height
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
              backgroundColor: "#ffffff",
              fontSize: 10,
              textAlign: "center",
              border: `5px solid ${item.colorCode}`,
              borderRadius: "10px",
              zIndex: isDragging ? 99 : 1,
            }}
            onDoubleClick={(e) => {
              const parentElement = e.target.parentElement;
              !(parentElement.id === "todo-item") &&
                dispatch(setModalOpen({ type: "handleCard", message: item }));
            }}
          >
            <Content color={item.colorCode}>
              <div className="hash-tag" size={item.category.length}>
                #{item.category}
              </div>
              <div className="layout">
                <div className="date-line"></div>
                <div className="text">
                  {item.period.startDate.split("T")[0]}
                </div>
                <div className="date-hyphen">~</div>
                <div className="text">{item.period.endDate.split("T")[0]}</div>
              </div>
              <div className="todo-box">
                {item.todo?.map((it) => (
                  <div key={it._id} id="todo-item">
                    <input
                      type="checkbox"
                      id={it.text}
                      defaultChecked={it.checked}
                      onClick={(e) => handleCheckbox(e, item)}
                    />
                    <label
                      htmlFor={it.text}
                      className="todo-text"
                      onClick={(e) => handleCheckbox(e, item)}
                    >
                      {it.text}
                    </label>
                  </div>
                ))}
              </div>
              <div className="text-box">{item.description}</div>
              <div className="img-box">
                {item.imgUrl && (
                  <input className="img" type="image" src={item.imgUrl} />
                )}
              </div>
            </Content>
          </motion.div>
        );
      })}
      <FontAwesomeIcon
        icon={faCirclePlus}
        className="plus-icon"
        onClick={() =>
          dispatch(
            setModalOpen({
              type: "handleCard",
              message: "",
              cardsLength: cards.length,
            })
          )
        }
      />
    </Wrapper>
  );
}

export default Dashboard;
