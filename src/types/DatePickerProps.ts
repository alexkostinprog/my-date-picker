interface DatePickerProps {
  width?: string | number; // Может принимать как '100%', так и число 300
  showAdjacentMonths?: boolean;
  label?: string;
  separator?: string;
  hasClear?: boolean;
  value?: string;
  error?: string;
  onChangeValue?: (value: string) => void;
}

export type { DatePickerProps };
