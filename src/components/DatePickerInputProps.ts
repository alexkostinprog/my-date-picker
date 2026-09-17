interface DatePickerInputProps {
  idInput?: string;
  selectedDate: string;
  isOpen: boolean;
  label?: string;
  onToggle: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export type { DatePickerInputProps };
