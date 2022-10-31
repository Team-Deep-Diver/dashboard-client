import { Wrapper, BlockContainer, Content } from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

import { useState, useEffect, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setModalOpen } from "../../store/slices/modalSlice";

import { getCardInfo } from "../../utils/getCardInfo";
import { setCardInput } from "../../utils/setCardInput";

import styled from "styled-components";
import useDraggable from "./useDraggable";
import Block from "./Block";
import { useSprings } from "react-spring";

const Dashboard = ({ socket }) => {
  const parentRef = useRef(null);
  const dispatch = useDispatch();
  const { user_id } = useParams();
  const [cards, setCards] = useState([]);
  const [todoChange, setTodoChange] = useState(null);
  const { currentDate } = useSelector((state) => state.calendar);

  const blockInRow = 3;
  const totalBlocks = 6;

  const immediateMotionsProps = {
    x: true,
    y: true,
  };

  const getBlockCoordinates = (index) => {
    const col = Math.floor(index % blockInRow);
    const row = Math.floor(index / blockInRow);
    return { x: col * 360 + col * 40, y: 360 * row + row * 40 };
  };

  const blocks = useRef(new Array(totalBlocks).fill(0).map((_, i) => i));
  const initialCoordinates = useRef(
    blocks.current.map((i) => getBlockCoordinates(i))
  );

  const {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    movingBlockIndex,
    block: movingBlock,
  } = useDraggable({
    parentRef,
  });

  const animate = useCallback(
    (index) => {
      const blockIndex = blocks.current.indexOf(index);
      const blockCoordinate = initialCoordinates.current[blockIndex];

      return {
        x: index === movingBlockIndex ? movingBlock.x : blockCoordinate.x,
        y: index === movingBlockIndex ? movingBlock.y : blockCoordinate.y,
        scale: index === movingBlockIndex ? 1.2 : 1,
        zIndex: index === movingBlockIndex ? 10 : 1,
        immediate:
          movingBlockIndex === index
            ? (n) => immediateMotionsProps[n]
            : undefined,
      };
    },
    [movingBlock, initialCoordinates, movingBlockIndex]
  );

  const [springs, api] = useSprings(blocks.current.length, animate);

  useEffect(() => {
    const oldPosition = blocks.current.indexOf(movingBlockIndex);
    if (oldPosition !== -1) {
      const coordinatesMoved = {
        x: movingBlock.x - initialCoordinates.current[oldPosition].x,
        y: movingBlock.y - initialCoordinates.current[oldPosition].y,
      };

      let y = Math.round(coordinatesMoved.y / 360);
      if (Math.abs(y) > 0.5) {
        y = y * blockInRow;
      }

      const x = Math.round(coordinatesMoved.x / 360);

      const newPosition = y + x + oldPosition;

      if (newPosition !== oldPosition) {
        let newOrder = [...blocks.current];

        const [toBeMoved] = newOrder.splice(oldPosition, 1);
        newOrder.splice(newPosition, 0, toBeMoved);
        blocks.current = newOrder;
      }
    }

    api.start(animate);
  }, [api, animate, initialCoordinates, movingBlock, movingBlockIndex, cards]);

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

  console.log("dashboard cards", cards);

  return (
    <BlockContainer
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      cards={cards}
    >
      <Wrapper
        cards={cards}
        ref={parentRef}
        width={blockInRow * 360 + (blockInRow - 1) * 40}
      >
        {springs.map((style, index) => {
          const blockIndex = blocks.current.indexOf(index);
          return (
            <Block
              key={index}
              label={index}
              style={style}
              onMouseDown={(e) =>
                handleMouseDown(
                  e,
                  initialCoordinates.current[blockIndex],
                  index
                )
              }
              card={cards[index]}
              onDoubleClick={(e) => {
                const parentElement = e.target.parentElement;
                !(parentElement.id === "todo-item") &&
                  dispatch(
                    setModalOpen({ type: "handleCard", message: cards[index] })
                  );
              }}
            />
          );
        })}
        <FontAwesomeIcon
          icon={faCirclePlus}
          className="plus-icon"
          onClick={() =>
            dispatch(setModalOpen({ type: "handleCard", message: "" }))
          }
        />
      </Wrapper>
    </BlockContainer>
  );
};

export default Dashboard;
