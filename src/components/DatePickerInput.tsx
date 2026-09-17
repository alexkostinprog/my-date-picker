import { clsx } from "clsx";
import s from "./DatePickerInput.module.scss";
import type { DatePickerInputProps } from "./DatePickerInputProps";

export default function DatePickerInput(props: DatePickerInputProps) {
  const { selectedDate, isOpen, idInput, onToggle, label, onChange } = props;
  const isFilled = selectedDate.length > 0;

  return (
    <div className={s.inputWrapper}>
      <input
        className={clsx(s.datePickerInput, {
          [s.active]: isOpen,
        })}
        type="text"
        placeholder=""
        id={idInput}
        value={selectedDate}
        onChange={onChange}
      />

      <label
        htmlFor={idInput}
        className={clsx(s.floatingLabel, {
          [s.active]: isOpen,
          [s.hasValue]: isFilled,
        })}
      >
        {label ? label : "Введите дату"}
      </label>

      <span className={s.calendarIcon} onClick={onToggle}>
        📅
      </span>
    </div>
  );
}
