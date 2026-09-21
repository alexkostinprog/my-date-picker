import { useCallback, useEffect, useRef, useState } from "react";
import s from "./DatePicker.module.css";
import type { DatePickerProps } from "./types/DatePickerProps";
import DayCell from "./components/DayCell";
import WeekDaysTr from "./components/WeekDaysTr";
import {
  formatDateString,
  getCalendarDays,
  isValidDate,
  maskAndCleanDateInput,
} from "./utils/dateUtils";
import DatePickerInput from "./components/DatePickerInput";
import CalendarHeader from "./components/CalendarHeader";
import clsx from "clsx";

export default function DatePicker(props: DatePickerProps) {
  const { width, showAdjacentMonths = true, label, separator = ".", hasClear = false } = props;

  const computedWidth = typeof width === "number" ? `${width}px` : width;

  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [error, setError] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const currentMonthYear = currentDate.toLocaleString("ru-RU", {
    month: "long",
    year: "numeric",
  });

  const monthNow = currentMonthYear.charAt(0).toUpperCase() + currentMonthYear.slice(1);

  const calendarDays = getCalendarDays(year, month, showAdjacentMonths);

  const handlePrevMonth = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentDate((prevDate) => {
      const currentYear = prevDate.getFullYear();
      const currentMonth = prevDate.getMonth();
      return new Date(currentYear, currentMonth - 1, 1);
    });
  }, []);

  const handleNextMonth = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentDate((prevDate) => {
      const currentYear = prevDate.getFullYear();
      const currentMonth = prevDate.getMonth();
      return new Date(currentYear, currentMonth + 1, 1);
    });
  }, []);

  const handleDayClick = (day: number) => {
    setSelectedDate(formatDateString(day, month, year, separator));
    setError(null);
    // setIsOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const maskedValue = maskAndCleanDateInput(rawValue, separator);
    setSelectedDate(maskedValue);
    if (maskedValue.length === 0) {
      setError(null);
      return;
    }
    if (maskedValue.length === 10) {
      if (isValidDate(maskedValue, separator)) {
        setError(null); // Всё ок!
        const [, monthStr, yearStr] = maskedValue.split(separator).map(Number);
        setCurrentDate(new Date(yearStr, monthStr - 1, 1));
      } else {
        setError("Неверный формат даты"); // Нашли ошибку!
      }
    } else {
      setError(null);
    }
  };

  const handleClear = () => {
    setSelectedDate("");
    setCurrentDate(new Date());
    setError(null);
  };

  return (
    <div ref={containerRef} className={s.datePickerContainer} style={{ width: computedWidth }}>
      <DatePickerInput
        selectedDate={selectedDate}
        label={label}
        isOpen={isOpen}
        separator={separator}
        hasClear={hasClear}
        inputError={error}
        onToggle={() => setIsOpen(!isOpen)}
        onChange={handleInputChange}
        onClear={handleClear}
      />

      {isOpen && (
        <div
          className={clsx(s.datePickerModal, {
            [s.calendarShifted]: error,
          })}
        >
          <CalendarHeader
            monthNow={monthNow}
            onPrevMonth={handlePrevMonth}
            onNextMonth={handleNextMonth}
          />

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
      )}
    </div>
  );
}
