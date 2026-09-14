import { useState } from "react"; // useRef и useEffect БОЛЬШЕ НЕ НУЖНЫ!
import { clsx } from "clsx";
import "./DatePicker.css";
import type { DatePickerProps } from "./types/DatePickerProps";

export default function DatePicker(props: DatePickerProps) {
  const { width } = props;

  const computedWidth = typeof width === 'number' ? `${width}px` : width;

  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const currentMonthYear = currentDate.toLocaleString('ru-RU', {
    month: 'long',
    year: 'numeric'
  });

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();
  const shiftIndex = firstDayIndex === 0 ? 6 : firstDayIndex - 1;

  const calendarDays = [];

  for (let i = 0; i < shiftIndex; i++) {
    calendarDays.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

  const handleDayClick = (day: number | null) => {
    if (!day) return;

    const displayMonth = String(month + 1).padStart(2, '0');
    const displayDay = String(day).padStart(2, '0');
    const formattedDate = `${displayDay}.${displayMonth}.${year}`;

    setSelectedDate(formattedDate);
    setIsOpen(false);
  };

  const handlePrevMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const today = new Date();

  const isToday = (day: number | null) => {
    if (!day) return false;
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
  };

  const isSelected = (day: number | null) => {
    if (!day) return false;
    const displayMonth = String(month + 1).padStart(2, '0');
    const displayDay = String(day).padStart(2, '0');
    const currentCellString = `${displayDay}.${displayMonth}.${year}`;
    return currentCellString === selectedDate;
  };

  return (
    <div className="date-picker-container" style={{ width: computedWidth }}>
      <div className="input-wrapper" onClick={() => setIsOpen(!isOpen)}>
        <input
          type="text"
          placeholder="Выберите дату"
          value={selectedDate}
          readOnly
          className={clsx('date-picker-input', { 'active': isOpen })}
        />
        <span className="calendar-icon">
          📅
        </span>
      </div>

      {isOpen && (
        <>
          <div className="date-picker-overlay" onClick={() => setIsOpen(false)} />

          <div className="date-picker-modal">
            <div className="calendar-header">
              <button type="button" className="nav-btn" onClick={handlePrevMonth}>◀</button>
              <span className="month-title">
                {currentMonthYear.charAt(0).toUpperCase() + currentMonthYear.slice(1)}
              </span>
              <button type="button" className="nav-btn" onClick={handleNextMonth}>▶</button>
            </div>

            <div className="calendar-grid">
              {weekDays.map((wd) => (
                <div key={wd} className="weekday-cell">{wd}</div>
              ))}

              {calendarDays.map((day, index) => (
                <div
                  key={index}
                  className={clsx('day-cell', {
                    'empty': !day,
                    'today-cell': isToday(day),
                    'selected-cell': isSelected(day)
                  })}
                  onClick={() => handleDayClick(day)}
                >
                  {day}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
