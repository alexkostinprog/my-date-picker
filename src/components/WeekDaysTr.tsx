import { memo } from "react";
import { weekDays } from "../static/weekDays";
import s from "./WeekDaysTr.module.scss";

const WeekDaysTr = memo(() => {
  return (
    <>
      {weekDays.map((wd) => (
        <div key={wd} className={s.weekdayCell}>
          {wd}
        </div>
      ))}
    </>
  );
});

export default WeekDaysTr;
