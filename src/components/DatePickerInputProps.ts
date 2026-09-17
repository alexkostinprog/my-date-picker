interface DatePickerInputProps {
  idInput?: string;
  selectedDate: string;
  isOpen: boolean;
  label?: string;
  separator: string;
  hasClear: boolean;
  onToggle: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
}

export type { DatePickerInputProps };
