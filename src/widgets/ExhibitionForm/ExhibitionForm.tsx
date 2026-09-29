import { useForm, Controller } from "react-hook-form";
import DatePicker from "../../DatePicker";
import s from "./ExhibitionForm.module.css";
import { DATE_SEPARATOR } from "./config";
import { validateFormDate } from "./validatorFormDate";

interface FormInputs {
  departureDate: string;
  exhibitionDateStart: string;
  exhibitionDateEnd: string;
  returnDate: string;
}

export const ExhibitionForm = () => {
  const { control, handleSubmit, getValues, trigger } = useForm<FormInputs>({
    defaultValues: {
      departureDate: "",
      exhibitionDateStart: "",
      exhibitionDateEnd: "",
      returnDate: "",
    },
    mode: "onChange",
  });

  const onSubmit = (data: FormInputs) => {
    console.log("Данные формы валидны! Отправляем:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="departureDate"
        control={control}
        rules={{
          required: "Выберите дату вылета",
          validate: (val, values) => validateFormDate(val, values, "departureDate"),
        }}
        render={({ field, fieldState }) => (
          <DatePicker
            width={610}
            label="Билет туда"
            separator={DATE_SEPARATOR}
            error={fieldState.error?.message}
            value={field.value}
            onChangeValue={(val) => {
              field.onChange(val);
              if (getValues("returnDate")) trigger("returnDate");
            }}
          />
        )}
      />

      <div className={s.oneRow}>
        <Controller
          name="exhibitionDateStart"
          control={control}
          rules={{
            required: true,
            validate: (val, values) => validateFormDate(val, values, "exhibitionDateStart"),
          }}
          render={({ field, fieldState }) => (
            <DatePicker
              width={300}
              label="Дата начала выставки"
              separator={DATE_SEPARATOR}
              error={fieldState.error?.message}
              value={field.value}
              onChangeValue={(val) => {
                field.onChange(val);
                if (getValues("exhibitionDateEnd")) trigger("exhibitionDateEnd");
              }}
            />
          )}
        />

        <Controller
          name="exhibitionDateEnd"
          control={control}
          rules={{
            required: "Выберите дату окончания выставки",
            validate: (val, values) => validateFormDate(val, values, "exhibitionDateEnd"),
          }}
          render={({ field, fieldState }) => (
            <DatePicker
              width={300}
              label="Дата окончания выставки"
              separator={DATE_SEPARATOR}
              error={fieldState.error?.message}
              value={field.value}
              onChangeValue={(val) => {
                field.onChange(val);
                if (getValues("exhibitionDateEnd")) trigger("exhibitionDateEnd");
              }}
            />
          )}
        />
      </div>

      <Controller
        name="returnDate"
        control={control}
        rules={{
          required: "Выберите дату вылета",
          validate: (val, values) => validateFormDate(val, values, "returnDate"),
        }}
        render={({ field, fieldState }) => (
          <DatePicker
            width={610}
            label="Билет обратно"
            separator={DATE_SEPARATOR}
            error={fieldState.error?.message}
            value={field.value}
            hasClear
            onChangeValue={(val) => {
              field.onChange(val);
              if (getValues("returnDate")) trigger("returnDate");
            }}
          />
        )}
      />

      <div>
        <button type="submit" className={s.submitButton}>
          Забронировать
        </button>
      </div>
    </form>
  );
};
