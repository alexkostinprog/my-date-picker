import { useCallback, useState } from "react";
import { clsx } from "clsx";
import s from "./DatePicker.module.css";
import type { DatePickerProps } from "./types/DatePickerProps";
import DayCell from "./components/DayCell";
import WeekDaysTr from "./components/WeekDaysTr";
import { getCalendarDays, isValidDate, maskAndCleanDateInput } from "./utils/dateUtils";
import DatePickerInput from "./components/DatePickerInput";
import CalendarHeader from "./components/CalendarHeader";

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
    const displayMonth = String(month + 1).padStart(2, "0");
    const displayDay = String(day).padStart(2, "0");
    const formattedDate = `${displayDay}.${displayMonth}.${year}`;

    setSelectedDate(formattedDate);
    // setIsOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;

    // 1. Применяем маску (пользователь пишет "1509", маска сама делает "15.09")
    const maskedValue = maskAndCleanDateInput(rawValue);

    // 2. Всегда обновляем текст в инпуте, чтобы пользователь видел, что он пишет
    setSelectedDate(maskedValue);

    // 3. Если дата дописана до конца и она валидна — синхронизируем сетку календаря!
    if (isValidDate(maskedValue)) {
      const [, monthStr, yearStr] = maskedValue.split(".").map(Number);

      // Перелистываем календарь на этот месяц и год, ставя фокус на 1 число
      setCurrentDate(new Date(yearStr, monthStr - 1, 1));
    }
  };

  return (
    <div className={s.datePickerContainer} style={{ width: computedWidth }}>
      <DatePickerInput
        selectedDate={selectedDate}
        idInput={idInput}
        label={label}
        isOpen={isOpen}
        onToggle={() => setIsOpen(!isOpen)}
        onChange={handleInputChange}
      />

      {isOpen && (
        <>
          <div className={s.datePickerOverlay} onClick={() => setIsOpen(false)} />

          <div className={s.datePickerModal}>
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
        </>
      )}
    </div>
  );
}
