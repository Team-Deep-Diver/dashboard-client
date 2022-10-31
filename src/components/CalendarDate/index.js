import { Wrapper } from "./style";
import { TfiAngleDoubleLeft, TfiAngleDoubleRight } from "react-icons/tfi";
import { useDispatch, useSelector } from "react-redux";
import { getDate } from "../../utils/getDate";
import { showNextDay, showPrevDay } from "../../store/slices/calendarSlice";

function CalendarDate() {
  const dispatch = useDispatch();
  const { currentDate } = useSelector((state) => state.calendar);
  const { year, month, date } = getDate(currentDate);

  return (
    <Wrapper>
      <TfiAngleDoubleLeft
        size={35}
        className="arrow"
        onClick={() => dispatch(showPrevDay())}
      />
      <div className="font">{`${year}-${month}-${date}`}</div>
      {new Date(currentDate).toLocaleDateString() ===
      new Date().toLocaleDateString() ? (
        <TfiAngleDoubleRight size={35} className="disabled-arrow" />
      ) : (
        <TfiAngleDoubleRight
          size={35}
          className="arrow"
          onClick={() => dispatch(showNextDay())}
        />
      )}
    </Wrapper>
  );
}

export default CalendarDate;
