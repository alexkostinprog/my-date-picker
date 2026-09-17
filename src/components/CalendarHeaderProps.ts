interface CalendarHeaderProps {
  monthNow: string;
  onPrevMonth: (e: React.MouseEvent) => void;
  onNextMonth: (e: React.MouseEvent) => void;
}

export type { CalendarHeaderProps };
