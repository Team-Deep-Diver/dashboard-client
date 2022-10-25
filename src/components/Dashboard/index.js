import { Wrapper, Content } from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setModalOpen } from "../../store/slices/modalSlice";

import { getCardInfo } from "../../utils/getCardInfo";
import { setCardInput } from "../../utils/setCardInput";

function Dashboard({ socket }) {
  const dispatch = useDispatch();
  const { user_id } = useParams();
  const [cards, setCards] = useState([]);
  const [todoChange, setTodoChange] = useState(null);
  const { currentDate } = useSelector((state) => state.calendar);

  useEffect(() => {
    socket?.emit("searchMyCards", { user_id, currentDate });
    socket?.on("getMyCards", (data) => {
      const cardInfo = getCardInfo(data);

      setCards(cardInfo);
    });
  }, [socket, currentDate]);

  // useEffect(() => {
  //   socket?.emit("modifyCard", { socketValue: todoChange });
  //   socket?.on("getMyCards", (data) => {
  //     const cardInfo = getCardInfo(data);

  //     setCards(cardInfo);
  //   });
  // }, [todoChange]);

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

  return (
    <>
      <Wrapper>
        {cards?.map((card, idx) => (
          <motion.div
            key={idx}
            layoutId={card.cardId}
            onDoubleClick={(e) => {
              const parentElement = e.target.parentElement;
              !(parentElement.id === "todo-item") &&
                dispatch(setModalOpen({ type: "handleCard", message: card }));
            }}
          >
            <Content color={card.colorCode}>
              <div className="hash-tag" size={card.category.length}>
                #{card.category}
              </div>
              <div className="layout">
                <div className="date-line"></div>
                <div className="text">
                  {card.period.startDate.split("T")[0]}
                </div>
                <div className="date-hyphen">~</div>
                <div className="text">{card.period.endDate.split("T")[0]}</div>
              </div>
              <div className="todo-box">
                {card.todo.map((item) => (
                  <div key={item._id} id="todo-item">
                    <input
                      type="checkbox"
                      id={item.text}
                      defaultChecked={item.checked}
                      onClick={(e) => handleCheckbox(e, card)}
                    />
                    <label
                      htmlFor={item.text}
                      className="todo-text"
                      onClick={(e) => handleCheckbox(e, card)}
                    >
                      {item.text}
                    </label>
                  </div>
                ))}
              </div>
              <div className="text-box">{card.description}</div>
              <div className="img-box">
                {card.imgUrl && (
                  <input className="img" type="image" src={card.imgUrl} />
                )}
              </div>
            </Content>
          </motion.div>
        ))}
        {new Date(currentDate).toLocaleDateString() ===
          new Date().toLocaleDateString() && (
          <FontAwesomeIcon
            icon={faCirclePlus}
            className="plus-icon"
            onClick={() =>
              dispatch(setModalOpen({ type: "handleCard", message: "" }))
            }
          />
        )}
      </Wrapper>
    </>
  );
}

export default Dashboard;
