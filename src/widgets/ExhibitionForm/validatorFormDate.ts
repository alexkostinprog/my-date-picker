import type { FieldValues } from "react-hook-form";
import { isValidDate } from "../../utils/dateUtils";
import { DATE_SEPARATOR } from "./config";

const parseToTimestamp = (dateStr: string): number | null => {
  if (!dateStr || dateStr.length !== 10) return null;

  const [day, month, year] = dateStr.split(DATE_SEPARATOR).map(Number);

  if (isNaN(day) || !month || isNaN(year)) return null;

  const date = new Date(year, month - 1, day);

  // Проверяем, что получился валидный объект даты
  return isNaN(date.getTime()) ? null : date.getTime();
};

export const validateFormDate = (
  value: string,
  formValues: FieldValues,
  fieldName: "departureDate" | "exhibitionDateStart" | "exhibitionDateEnd" | "returnDate",
): boolean | string => {
  if (!value) return true;
  if (value.length < 10) return "Неверный формат даты";
  if (value.length === 10 && !isValidDate(value, DATE_SEPARATOR)) {
    return "Неверный формат даты";
  }

  const currentTimestamp = parseToTimestamp(value);
  if (!currentTimestamp) return true;

  // ИСПРАВЛЕНИЕ ДЛЯ: Дата окончания выставки
  if (fieldName === "exhibitionDateEnd" && formValues.exhibitionDateStart) {
    const startTimestamp = parseToTimestamp(formValues.exhibitionDateStart);
    // Сравниваем чистые числа миллисекунд
    if (startTimestamp && currentTimestamp < startTimestamp) {
      return "Не может быть раньше даты начала";
    }
  }

  // ИСПРАВЛЕНИЕ ДЛЯ: Дата вылета обратно
  if (fieldName === "returnDate" && formValues.departureDate) {
    const departureTimestamp = parseToTimestamp(formValues.departureDate);
    if (departureTimestamp && currentTimestamp < departureTimestamp) {
      return "Не может быть раньше даты вылета";
    }
  }

  return true;
};
