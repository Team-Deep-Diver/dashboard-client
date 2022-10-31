import { Wrapper, Content } from "./style";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setModalClose } from "../../store/slices/modalSlice";
import { validateCardForm } from "../../utils/validateCardForm";
import ConfirmMessageModal from "../ConfirmMessageModal";

function CardModal({ socket }) {
  const dispatch = useDispatch();
  const { user_id } = useParams();
  const { message, cardsLength } = useSelector((state) => state.modal);
  const { currentDate } = useSelector((state) => state.calendar);

  const [errorMessage, setErrorMessage] = useState("");
  const [socketType, setSocketType] = useState(null);
  const [showConfirmMessage, setShowConfirmMessage] = useState(false);
  const themeColors = ["#62FCAF", "#9300FE", "#11ffee", "#034EFD", "#fcf434"];

  let cardX;
  let cardY;

  if (cardsLength % 3 === 0) {
    cardX = 1;
  } else if (cardsLength % 3 === 1) {
    cardX = 7;
  } else {
    cardX = 13;
  }

  cardY = parseInt(cardsLength / 3) * 4 + 1;

  let cardX;
  let cardY;

  if (cardsLength % 3 === 0) {
    cardX = 1;
  } else if (cardsLength % 3 === 1) {
    cardX = 7;
  } else {
    cardX = 13;
  }

  cardY = parseInt(cardsLength / 3) * 4 + 1;

  const [cardInput, setCardInput] = useState({
    cardId: message ? message.cardId : "",
    snapshotId: message ? message.snapshotId : "",
    currentDate,
    createdBy: user_id,
    category: message ? message.category : "",
    startDate: message ? message.startDate : "",
    endDate: message ? message.endDate : "",
    colorCode: message ? message.colorCode : "",
    todos: message
      ? message.todo.map((item) => {
          return { text: item.text, checked: item.checked };
        })
      : [],
    imgUrl: message ? message.imgUrl : "",
    description: message ? message.description : "",
    x: message ? message.x : cardX,
    y: message ? message.y : cardY,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCardInput({
      ...cardInput,
      [name]: value,
    });
  };

  const addTodo = (e) => {
    const todoValue = e.target.previousSibling.value;
    e.target.previousSibling.value = "";

    setCardInput({
      ...cardInput,
      todos: [...cardInput.todos, { text: todoValue, checked: false }],
    });
  };

  const validationCheck = (e) => {
    e.preventDefault();
    const type = message ? "modify" : "create";
    const errors = validateCardForm(cardInput, type);

    if (errors.length > 0) {
      const { message } = errors[0];
      return setErrorMessage(message);
    }

    message ? setSocketType("modifyCard") : setSocketType("createCard");

    setShowConfirmMessage(true);
  };

  const deleteCard = (e) => {
    e.preventDefault();
    setSocketType("deleteCard");
    setShowConfirmMessage(true);
  };

  return (
    <>
      <Wrapper>
        <h3 className="title">{message ? "카드 수정하기" : "카드 생성하기"}</h3>
        <div className="layout">
          <div className="category-name">
            카테고리 <em>*</em>
          </div>
          <input
            name="category"
            className="category-input"
            defaultValue={cardInput.category}
            onChange={handleChange}
          />
        </div>
        {!message && (
          <>
            <div className="layout">
              <div className="category-name">
                기간 <em>*</em>
              </div>
              <div className="category-date">
                <input
                  type="date"
                  name="startDate"
                  className="date-input"
                  onChange={handleChange}
                />
                <div className="date-hyphen">-</div>
                <input
                  type="date"
                  name="endDate"
                  className="date-input"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="layout">
              <div className="category-name">
                테마 <em>*</em>
              </div>
              <div className="category-colors">
                {themeColors.map((color) => (
                  <div className="category-color" key={color}>
                    <input
                      type="radio"
                      name="colorCode"
                      value={color}
                      checked={cardInput.colorCode === color}
                      onChange={handleChange}
                    />
                    <Content color={color}></Content>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
        <div className="layout">
          <div className="category-name">TODO</div>
          <div>
            <div className="todo">
              {cardInput.todos.map((item, idx) => (
                <div className="layout-todo-show" key={item.text + idx}>
                  <div className="todo-item">{idx + 1}.</div>
                  <div className="todo-item" key={item.text + idx}>
                    {item.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="layout-todo">
              <input className="todo-input" />
              <input
                type="submit"
                value="추가"
                className="todo-submit"
                onClick={addTodo}
              />
            </div>
          </div>
        </div>
        <div className="layout">
          <div className="category-name">IMG</div>
          <input
            name="imgUrl"
            className="category-input"
            placeholder="이미지 url 을 입력하세요"
            defaultValue={cardInput.imgUrl}
            onChange={handleChange}
          />
        </div>
        <div className="layout">
          <div className="category-name">TEXT</div>
          <textarea
            name="description"
            className="category-text"
            defaultValue={cardInput.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="error-message">{errorMessage}</div>
        <div className="layout-buttons">
          <input
            type="submit"
            value="취소"
            className="button"
            onClick={() => dispatch(setModalClose())}
          />
          <input
            type="submit"
            value="확인"
            className="button"
            onClick={validationCheck}
          />
          {message && (
            <input
              type="submit"
              value="삭제"
              className="button"
              onClick={deleteCard}
            />
          )}
        </div>
      </Wrapper>
      {showConfirmMessage &&
        (message ? (
          <ConfirmMessageModal
            socket={socket}
            socketType={socketType}
            socketValue={cardInput}
            confirmMessage={
              socketType === "modifyCard"
                ? "카드를 수정하시겠습니까?"
                : "카드를 삭제하시겠습니까?"
            }
            endMessage={
              socketType === "modifyCard"
                ? "카드가 수정되었습니다."
                : "카드가 삭제되었습니다."
            }
          />
        ) : (
          <ConfirmMessageModal
            socket={socket}
            socketType="createCard"
            socketValue={cardInput}
            confirmMessage="카드를 생성하시겠습니까?"
            endMessage="카드가 생성되었습니다."
          />
        ))}
    </>
  );
}

export default CardModal;
