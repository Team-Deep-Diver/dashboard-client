import { useDispatch, useSelector } from "react-redux";
import { TfiAngleDoubleLeft, TfiAngleDoubleRight } from "react-icons/tfi";

import { getDate } from "../../utils/getDate";
import { showNextDay, showPrevDay } from "../../store/slices/calendarSlice";

import { Wrapper } from "./style";

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
      <div className="font">{`${year}년 ${month}월 ${date}일`}</div>
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
