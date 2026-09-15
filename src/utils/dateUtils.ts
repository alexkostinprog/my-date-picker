import type { calendarDaysType } from "../types/calendarDaysType";

export const getCalendarDays = (year: number, month: number): calendarDaysType[] => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();
  const shiftIndex = firstDayIndex === 0 ? 6 : firstDayIndex - 1;
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const calendarDays: calendarDaysType[] = [];

  // Дни предыдущего месяца
  for (let i = shiftIndex; i > 0; i--) {
    calendarDays.push({
      day: daysInPrevMonth - i + 1,
      type: "prev",
    });
  }

  // Дни текущего месяца
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push({
      day,
      type: "current",
    });
  }

  // Дни следующего месяца до ровной сетки (42 ячейки)
  const totalCells = 42;
  const remainingCells = totalCells - calendarDays.length;

  for (let day = 1; day <= remainingCells; day++) {
    calendarDays.push({
      day,
      type: "next",
    });
  }

  return calendarDays;
};

export const formatDateString = (day: number, month: number, year: number): string => {
  const displayMonth = String(month + 1).padStart(2, "0");
  const displayDay = String(day).padStart(2, "0");
  return `${displayDay}.${displayMonth}.${year}`;
};

export const checkIsToday = (
  day: number,
  type: string,
  currentMonth: number,
  currentYear: number,
): boolean => {
  if (type !== "current") return false;
  const today = new Date();
  return (
    day === today.getDate() &&
    currentMonth === today.getMonth() &&
    currentYear === today.getFullYear()
  );
};
