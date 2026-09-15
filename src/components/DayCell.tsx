import { memo } from "react";
import clsx from "clsx";
import type { DayCellProps } from "./DayCellProps";
import s from "./DayCell.module.scss";

const DayCell = memo((props: DayCellProps) => {
  const { item, isToday, isSelected, onClick } = props;

  return (
    <div
      className={clsx(s.dayCell, {
        [s.otherMonth]: item.type !== "current",
        [s.todayCell]: isToday,
        [s.selectedCell]: isSelected,
      })}
      onClick={onClick}
    >
      {item.day}
    </div>
  );
});

export default DayCell;
