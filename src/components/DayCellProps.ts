import type { calendarDaysType } from "../types/calendarDaysType";

interface DayCellProps {
  item: calendarDaysType;
  month: number;
  year: number;
  selectedDate: string;
  onDayClick: (day: number) => void;
}

export type { DayCellProps };
