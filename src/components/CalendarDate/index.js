import { Wrapper } from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft,faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { getDate } from "../../utils/getDate";
import { showNextDay, showPrevDay } from "../../store/slices/calendarSlice";

function CalendarDate() {
  const dispatch = useDispatch();
  const { currentDate } = useSelector(state => state.calendar);
  const { year, month, date } = getDate(currentDate);

  return (
    <Wrapper>
      <FontAwesomeIcon
        icon={faAnglesLeft}
        className="left-arrow"
        onClick={() => dispatch(showPrevDay())}
      />
      <div>{`${year}-${month}-${date}`}</div>
      <FontAwesomeIcon
        icon={faAnglesRight}
        className="right-arrow"
        onClick={() => dispatch(showNextDay())}
      />
    </Wrapper>
  );
}

export default CalendarDate;
