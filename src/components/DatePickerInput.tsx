import { clsx } from "clsx";
import s from "./DatePickerInput.module.scss";
import type { DatePickerInputProps } from "./DatePickerInputProps";
import { getPlaceholderTemplate } from "../utils/dateUtils";
import { X } from "lucide-react";

export default function DatePickerInput(props: DatePickerInputProps) {
  const { selectedDate, isOpen, idInput, label, separator, hasClear, onToggle, onChange, onClear } =
    props;
  const isFilled = selectedDate.length > 0;

  // Получаем строку шаблона (например, "12.ММ.ГГГГ")
  const placeholderTemplate = getPlaceholderTemplate(selectedDate, separator);

  return (
    <div className={s.inputWrapper}>
      <input
        className={clsx(s.datePickerInput, {
          [s.active]: isOpen,
          [s.hasValue]: isFilled,
        })}
        type="text"
        placeholder=""
        id={idInput}
        value={selectedDate}
        onChange={onChange}
        onClick={onToggle}
      />

      {(isOpen || (selectedDate.length > 0 && selectedDate.length < 10)) && (
        <span className={s.inputMaskHint}>{placeholderTemplate}</span>
      )}

      <label
        htmlFor={idInput}
        className={clsx(s.floatingLabel, {
          [s.active]: isOpen,
          [s.hasValue]: isFilled,
        })}
      >
        {label ? label : "Введите дату"}
      </label>

      {hasClear && selectedDate && (
        <button
          className={s.clearButton}
          type="button"
          key="date-clear-button"
          title="Очистить дату"
          onClick={onClear}
        >
          <X size={24} className={s.clearIcon} />
        </button>
      )}

      <span
        className={clsx(s.calendarIcon, {
          [s.calendarIconShifted]: hasClear && selectedDate,
        })}
        onClick={onToggle}
      >
        📅
      </span>
    </div>
  );
}
