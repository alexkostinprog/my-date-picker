import { weekDays } from "../static/weekDays";
import s from "./WeekDaysTr.module.scss";

export default function WeekDaysTr() {
  return (
    <>
      {weekDays.map((wd) => (
        <div key={wd} className={s.weekdayCell}>
          {wd}
        </div>
      ))}
    </>
  );
}
