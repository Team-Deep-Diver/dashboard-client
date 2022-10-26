import { useState } from "react";
import styled from "styled-components";
import { animated } from "react-spring";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCardInput } from "../../utils/setCardInput";

const BlockWrapper = styled(animated.div)`
  width: calc((100% - 160px) / 3);
  max-height: 400px;
  padding: 20px;
  margin: 20px;
  border: solid 5px ${(props) => props.colorCode};
  border-radius: 10px;
  background-color: #FFFFFF;
  box-sizing: border-box;
  background: pink;
  display: flex;
  position: absolute;
  top: 0;
  left: 0;

  & .layout {
    display: flex;
    align-items: center;
  }

  & .hash-tag {
    width: ${(props) => props.size}
    height: 20px;
    padding: 2px;
    margin-bottom: 10px;
    text-align: center;
    font-size: 20px;
    background-color: ${(props) => props.colorCode};
  }

  & .date-line {
    width: 5px;
    height: 25px;
    margin-right: 10px;
    background-color: ${(props) => props.colorCode};
  }

  & .date-hyphen {
    margin-left: 5px;
    margin-right: 5px;
  }

  & .todo-box {
    max-height: 80px;
    margin-top: 15px;
    overFlow: scroll;
  }

  & .img-box {
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }

  & .todo-text {
    font-size: 18px;
  }

  & .text {
    font-size: 20px;
  }

  & .img {
    max-width: 150px;
  }

  & .text-box {
    max-height: 70px;
    margin-top: 15px;
    font-size: 18px;
    overFlow: scroll;
  }
`;

const Block = ({ label, card, ...props }) => {
  const { user_id } = useParams();
  const { currentDate } = useSelector((state) => state.calendar);
  const [todoChange, setTodoChange] = useState(null);

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

  console.log("Block card, ", card);

  return (
    <BlockWrapper {...props}>
      <div className="hash-tag">#{card?.category}</div>
      <div className="layout">
        <div className="date-line"></div>
        <div className="text">{card?.period.startDate}</div>
        <div className="date-hyphen">~</div>
        <div className="text">{card?.period.endDate}</div>
      </div>
      <div className="todo-box">
        {card?.todo.map((item) => (
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
      <div className="text-box">{card?.description}</div>
      <div className="img-box">
        {card?.imgUrl && (
          <input className="img" type="image" src={card?.imgUrl} />
        )}
      </div>
    </BlockWrapper>
  );
};

export default Block;
