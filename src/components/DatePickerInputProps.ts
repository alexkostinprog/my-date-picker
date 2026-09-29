interface DatePickerInputProps {
  selectedDate: string;
  isOpen: boolean;
  label?: string;
  separator: string;
  hasClear: boolean;
  inputError?: string;
  onToggle: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
}

export type { DatePickerInputProps };
