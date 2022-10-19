import { Wrapper } from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function Dashboard() {
  const [cards, setCards] = useState(null);
  const { user_id } = useParams();
  const { currentDate } = useSelector((state) => state.calendar);

  useEffect(() => {
    async function getUserCards() {
      const res = await fetch(
        `${process.env.REACT_APP_SOCKET_SERVER_URL}/users/${user_id}/cards?date=${currentDate}`
      );

      if (res.status === 200) {
        const { cards } = await res.json();
        setCards(cards);
      }
    }

    user_id && getUserCards();
  });

  function addNewCard() {
    console.log("add new card..");
  }

  return (
    <Wrapper>
      <FontAwesomeIcon
        icon={faCirclePlus}
        className="plus-icon"
        onClick={addNewCard}
      />
    </Wrapper>
  );
}

export default Dashboard;
