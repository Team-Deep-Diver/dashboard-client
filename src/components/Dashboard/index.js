import { Wrapper, Content } from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setModalOpen } from "../../store/slices/modalSlice";

function Dashboard({ socket }) {
  const dispatch = useDispatch();
  const { user_id } = useParams();
  const [cards, setCards] = useState([]);
  const { currentDate } = useSelector((state) => state.calendar);

  useEffect(() => {
    socket?.emit("searchMyCards", { user_id, currentDate });
    socket?.on("getMyCards", (data) => {
      const socketRecievedCards = data.myCards;

      const cardInfoArr = socketRecievedCards.map((card) => {
        const { colorCode, period, snapshots } = card;
        const cardContent = snapshots[0].value;

        const cardInfo = {
          colorCode,
          period,
          category: snapshots[0].category,
          todo: cardContent.todos,
          imgUrl: cardContent.imgUrl,
          description: cardContent.description,
        };

        return cardInfo;
      });

      setCards(cardInfoArr);
    });
  }, [socket, currentDate]);

  return (
    <Wrapper>
      {cards?.map((card, idx) => (
        <Content
          key={idx}
          color={card.colorCode}
          onClick={() =>
            dispatch(setModalOpen({ type: "handleCard", message: card }))
          }
        >
          <div className="hash-tag" size={card.category.length}>
            #{card.category}
          </div>
          <div className="layout">
            <div className="date-line"></div>
            <div className="text">{card.period.startDate.split("T")[0]}</div>
            <div className="date-hyphen">~</div>
            <div className="text">{card.period.endDate.split("T")[0]}</div>
          </div>
          <div className="todo-box">
            {card.todo.map((item) => (
              <div key={item._id}>
                <input type="checkbox" id={item.text} />
                <label htmlFor={item.text} className="todo-text">
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
      ))}
      <FontAwesomeIcon
        icon={faCirclePlus}
        className="plus-icon"
        onClick={() =>
          dispatch(setModalOpen({ type: "handleCard", message: "" }))
        }
      />
    </Wrapper>
  );
}

export default Dashboard;
