import { useState } from "react";
import { clsx } from "clsx";
import s from "./DatePicker.module.css";
import type { DatePickerProps } from "./types/DatePickerProps";
import DayCell from "./components/DayCell";
import WeekDaysTr from "./components/WeekDaysTr";
import { getCalendarDays } from "./utils/dateUtils";

export default function DatePicker(props: DatePickerProps) {
  const { width, idInput, showAdjacentMonths = true, label } = props;

  const computedWidth = typeof width === "number" ? `${width}px` : width;

  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const currentMonthYear = currentDate.toLocaleString("ru-RU", {
    month: "long",
    year: "numeric",
  });

  const monthNow = currentMonthYear.charAt(0).toUpperCase() + currentMonthYear.slice(1);

  const calendarDays = getCalendarDays(year, month, showAdjacentMonths);

  const handlePrevMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleDayClick = (day: number) => {
    const displayMonth = String(month + 1).padStart(2, "0");
    const displayDay = String(day).padStart(2, "0");
    const formattedDate = `${displayDay}.${displayMonth}.${year}`;

    setSelectedDate(formattedDate);
    // setIsOpen(false);
  };

  const isFilled = selectedDate.length > 0;

  return (
    <div className={s.datePickerContainer} style={{ width: computedWidth }}>
      <div className={s.inputWrapper} onClick={() => setIsOpen(!isOpen)}>
        <input
          className={clsx(s.datePickerInput, { active: isOpen, hasValue: isFilled })}
          type="text"
          placeholder=""
          value={selectedDate}
          readOnly
          id={idInput}
        />

        {label && (
          <label
            htmlFor={idInput}
            className={clsx(s.floatingLabel, {
              [s.active]: isOpen,
              [s.hasValue]: isFilled,
            })}
          >
            {label}
          </label>
        )}
        <span className={s.calendarIcon}>📅</span>
      </div>

      {isOpen && (
        <>
          <div className={s.datePickerOverlay} onClick={() => setIsOpen(false)} />

          <div className={s.datePickerModal}>
            <div className={s.calendarHeader}>
              <button type="button" className={s.navBtn} onClick={handlePrevMonth}>
                ◀
              </button>
              <span className={s.monthTitle}>{monthNow}</span>
              <button type="button" className={s.navBtn} onClick={handleNextMonth}>
                ▶
              </button>
            </div>

            <div className={s.calendarGrid}>
              <WeekDaysTr />

              {calendarDays.map((item, index) => (
                <DayCell
                  key={index}
                  item={item}
                  month={month}
                  year={year}
                  selectedDate={selectedDate}
                  onDayClick={handleDayClick}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
