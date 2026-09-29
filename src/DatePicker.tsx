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
  const {
    width,
    showAdjacentMonths = true,
    label,
    separator = ".",
    hasClear = false,
    error,
    value: externalValue,
    onChangeValue,
  } = props;

  const computedWidth = typeof width === "number" ? `${width}px` : width;

  const [localDate, setLocalDate] = useState("");

  const isControlled = externalValue !== undefined;
  const currentSelectedDate = isControlled ? externalValue : localDate;

  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

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

  const updateDate = (nextValue: string) => {
    if (isControlled) {
      // Если управляется формой — отправляем значение наверх в React Hook Form
      onChangeValue?.(nextValue);
    } else {
      // Если работает сам по себе — обновляем локальный стейт
      setLocalDate(nextValue);
    }
  };

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
    const formatted = formatDateString(day, month, year, separator);
    updateDate(formatted);
    // setIsOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const maskedValue = maskAndCleanDateInput(rawValue, separator);
    updateDate(maskedValue);

    if (maskedValue.length === 0) {
      return;
    }
    if (maskedValue.length === 10) {
      if (isValidDate(maskedValue, separator)) {
        const [, monthStr, yearStr] = maskedValue.split(separator).map(Number);
        setCurrentDate(new Date(yearStr, monthStr - 1, 1));
      }
    }
  };

  const handleClear = () => {
    updateDate("");
    setCurrentDate(new Date());
  };

  return (
    <div ref={containerRef} className={s.datePickerContainer} style={{ width: computedWidth }}>
      <DatePickerInput
        selectedDate={currentSelectedDate}
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
            [s.calendarShifted]: error && currentSelectedDate.length === 10,
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
                selectedDate={currentSelectedDate}
                onDayClick={handleDayClick}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
