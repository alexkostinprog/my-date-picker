import { clsx } from "clsx";
import s from "./DatePickerInput.module.scss";
import type { DatePickerInputProps } from "./DatePickerInputProps";
import { getPlaceholderTemplate } from "../utils/dateUtils";
import { X } from "lucide-react";
import { useInputId } from "../hooks/useInputId";

export default function DatePickerInput(props: DatePickerInputProps) {
  const {
    selectedDate,
    isOpen,
    label,
    separator,
    hasClear,
    inputError,
    onToggle,
    onChange,
    onClear,
  } = props;
  const isFilled = selectedDate.length > 0;

  // Получаем строку шаблона (например, "12.ММ.ГГГГ")
  const placeholderTemplate = getPlaceholderTemplate(selectedDate, separator);

  const inputId = useInputId();

  return (
    <div className={s.inputWrapper}>
      <input
        className={clsx(s.datePickerInput, {
          [s.active]: isOpen,
          [s.hasValue]: isFilled,
          [s.inputError]: inputError,
        })}
        type="text"
        placeholder=""
        id={inputId}
        value={selectedDate}
        onChange={onChange}
        onClick={onToggle}
      />

      {inputError && selectedDate.length === 10 && (
        <div className={s.errorMessage}>{inputError}</div>
      )}

      {(isOpen || (selectedDate.length > 0 && selectedDate.length < 10)) && (
        <span className={s.inputMaskHint}>{placeholderTemplate}</span>
      )}

      <label
        htmlFor={inputId}
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
