import { useState } from "react";
import { clsx } from "clsx";
import "./DatePicker.css";
import type { DatePickerProps } from "./types/DatePickerProps";
import DayCell from "./components/DayCell";
import type { calendarDaysType } from "./types/calendarDaysType";
import WeekDaysTr from "./components/WeekDaysTr";
import { getCalendarDays, formatDateString, checkIsToday } from "./utils/dateUtils";

export default function DatePicker(props: DatePickerProps) {
  const { width, idInput } = props;

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

  const calendarDays = getCalendarDays(year, month);

  const handlePrevMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const isToday = (dayObj: calendarDaysType) => {
    return checkIsToday(dayObj.day, dayObj.type, month, year);
  };

  const isSelected = (dayObj: calendarDaysType) => {
    if (dayObj.type !== "current") return false;
    return formatDateString(dayObj.day, month, year) === selectedDate;
  };

  const handleDayClick = (dayObj: calendarDaysType) => {
    if (dayObj.type !== "current") return;
    setSelectedDate(formatDateString(dayObj.day, month, year));
    setIsOpen(false);
  };

  return (
    <div className="date-picker-container" style={{ width: computedWidth }}>
      <div className="input-wrapper" onClick={() => setIsOpen(!isOpen)}>
        <input
          className={clsx("date-picker-input", { active: isOpen })}
          type="text"
          placeholder="Выберите дату"
          value={selectedDate}
          readOnly
          id={idInput}
        />
        <span className="calendar-icon">📅</span>
      </div>

      {isOpen && (
        <>
          <div
            className="date-picker-overlay"
            onMouseDown={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
          />

          <div className="date-picker-modal">
            <div className="calendar-header">
              <button type="button" className="nav-btn" onClick={handlePrevMonth}>
                ◀
              </button>
              <span className="month-title">{monthNow}</span>
              <button type="button" className="nav-btn" onClick={handleNextMonth}>
                ▶
              </button>
            </div>

            <div className="calendar-grid">
              <WeekDaysTr />

              {calendarDays.map((item, index) => (
                <DayCell
                  key={index}
                  item={item}
                  isToday={isToday(item)}
                  isSelected={isSelected(item)}
                  onClick={() => handleDayClick(item)}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
