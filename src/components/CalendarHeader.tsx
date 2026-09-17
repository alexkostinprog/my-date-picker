import { memo } from "react";
import s from "./CalendarHeader.module.scss";
import type { CalendarHeaderProps } from "./CalendarHeaderProps";

const CalendarHeader = memo((props: CalendarHeaderProps) => {
  const { monthNow, onPrevMonth, onNextMonth } = props;
  return (
    <div className={s.calendarHeader}>
      <button type="button" className={s.navBtn} onClick={onPrevMonth}>
        ◀
      </button>
      <span className={s.monthTitle}>{monthNow}</span>
      <button type="button" className={s.navBtn} onClick={onNextMonth}>
        ▶
      </button>
    </div>
  );
});

export default CalendarHeader;
