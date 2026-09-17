interface DatePickerProps {
  width?: string | number; // Может принимать как '100%', так и число 300
  idInput?: string;
  showAdjacentMonths?: boolean;
  label?: string;
  separator?: string;
  hasClear?: boolean;
}

export type { DatePickerProps };
