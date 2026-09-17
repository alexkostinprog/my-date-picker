// import { memo } from "react";
import clsx from "clsx";
import type { DayCellProps } from "./DayCellProps";
import s from "./DayCell.module.scss";
import { memo } from "react";

const DayCell = (props: DayCellProps) => {
  const { item, month, year, selectedDate, onDayClick } = props;

  if (item.day === null) {
    return <div />;
  }

  const today = new Date();
  const isToday =
    item.isCurrentMonth &&
    item.day === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear();

  const cleanSelected = selectedDate.replace(/\D/g, "");

  const displayMonth = String(month + 1).padStart(2, "0");
  const displayDay = String(item.day).padStart(2, "0");
  const currentCellStringClean = `${displayDay}${displayMonth}${year}`;
  const isSelected = item.isCurrentMonth && currentCellStringClean === cleanSelected;

  return (
    <div
      className={clsx(s.dayCell, {
        [s.otherMonth]: !item.isCurrentMonth,
        [s.todayCell]: isToday,
        [s.selectedCell]: isSelected,
      })}
      onClick={() => item.isCurrentMonth && onDayClick(item.day!)}
    >
      {item.day}
    </div>
  );
};

export default memo(DayCell, (prevProps, nextProps) => {
  // Вспомогательная функция, чтобы узнать, был ли этот день выбран в прошлых пропсах
  const wasSelected = () => {
    if (!prevProps.item.isCurrentMonth || prevProps.item.day === null) return false;
    const cleanSelected = prevProps.selectedDate.replace(/\D/g, "");
    const m = String(prevProps.month + 1).padStart(2, "0");
    const d = String(prevProps.item.day).padStart(2, "0");
    return `${d}${m}${prevProps.year}` === cleanSelected;
  };

  // Вспомогательная функция, чтобы узнать, станет ли этот день выбранным в новых пропсах
  const isBecomingSelected = () => {
    if (!nextProps.item.isCurrentMonth || nextProps.item.day === null) return false;
    const cleanSelected = nextProps.selectedDate.replace(/\D/g, "");
    const m = String(nextProps.month + 1).padStart(2, "0");
    const d = String(nextProps.item.day).padStart(2, "0");
    return `${d}${m}${nextProps.year}` === cleanSelected;
  };

  // ЖЕЛЕЗНОЕ УСЛОВИЕ ОБНОВЛЕНИЯ:
  // Если статус "выбранности" для этой конкретной ячейки изменился — возвращаем false (перерендерить!).
  if (wasSelected() !== isBecomingSelected()) {
    return false;
  }

  // Если поменялся сам месяц или год (листаем календарь) — возвращаем false (перерендерить!).
  if (prevProps.month !== nextProps.month || prevProps.year !== nextProps.year) {
    return false;
  }

  // Во всех остальных случаях возвращаем true — пропсы считаются "одинаковыми", рендер ИГНОРИРУЕТСЯ.
  return true;
});
