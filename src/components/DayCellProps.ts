import type { calendarDaysType } from "../types/calendarDaysType";

interface DayCellProps {
  item: calendarDaysType;
  isToday: boolean;
  isSelected: boolean;
  onClick: () => void;
}

export type { DayCellProps };
