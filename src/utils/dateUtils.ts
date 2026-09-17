import type { calendarDaysType } from "../types/calendarDaysType";

export const getCalendarDays = (
  year: number,
  month: number,
  showAdjacentMonths: boolean,
): calendarDaysType[] => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();
  const shiftIndex = firstDayIndex === 0 ? 6 : firstDayIndex - 1;
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const calendarDays: calendarDaysType[] = [];

  // Дни предыдущего месяца
  for (let i = shiftIndex; i > 0; i--) {
    calendarDays.push({
      day: showAdjacentMonths ? daysInPrevMonth - i + 1 : null,
      isCurrentMonth: false,
    });
  }

  // Дни текущего месяца
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push({
      day,
      isCurrentMonth: true,
    });
  }

  // Дни следующего месяца до ровной сетки (42 ячейки)
  const totalCells = 42;
  const remainingCells = totalCells - calendarDays.length;

  for (let day = 1; day <= remainingCells; day++) {
    calendarDays.push({
      day: showAdjacentMonths ? day : null,
      isCurrentMonth: false,
    });
  }

  return calendarDays;
};

export const formatDateString = (
  day: number | null,
  month: number,
  year: number,
  separator: string = ".",
): string => {
  const displayMonth = String(month + 1).padStart(2, "0");
  const displayDay = String(day).padStart(2, "0");
  return `${displayDay}${separator}${displayMonth}${separator}${year}`;
};

export const checkIsToday = (
  dayObj: calendarDaysType,
  currentMonth: number,
  currentYear: number,
): boolean => {
  const today = new Date();
  return (
    dayObj.isCurrentMonth &&
    dayObj.day === today.getDate() &&
    currentMonth === today.getMonth() &&
    currentYear === today.getFullYear()
  );
};

export const maskAndCleanDateInput = (value: string, separator: string = "."): string => {
  const digits = value.replace(/\D/g, "");

  const sliced = digits.slice(0, 8);

  if (sliced.length <= 2) return sliced;
  if (sliced.length <= 4) return `${sliced.slice(0, 2)}${separator}${sliced.slice(2)}`;
  return `${sliced.slice(0, 2)}.${sliced.slice(2, 4)}${separator}${sliced.slice(4)}`;
};

export const isValidDate = (dateStr: string, separator: string = "."): boolean => {
  if (dateStr.length !== 10) return false;

  // Экранируем разделитель для регулярного выражения, если это точка или слэш
  const escapedSeparator = separator.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
  const regex = new RegExp(`^\\d{2}${escapedSeparator}\\d{2}${escapedSeparator}\\d{4}$`);
  if (!regex.test(dateStr)) return false;

  const [day, month, year] = dateStr.split(separator).map(Number);
  if (month < 1 || month > 12 || year < 1900 || year > 2200) return false;

  const checkDate = new Date(year, month - 1, day);
  return (
    checkDate.getFullYear() === year &&
    checkDate.getMonth() === month - 1 &&
    checkDate.getDate() === day
  );
};

export const getPlaceholderTemplate = (value: string, separator: string = "."): string => {
  const template = `ДД${separator}ММ${separator}ГГГГ`;

  if (!value) return template;

  return value + template.slice(value.length);
};
