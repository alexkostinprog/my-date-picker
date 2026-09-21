import { useId } from "react";

export const useInputId = (): string => {
  return `input-${useId().replace(/:/g, "")}`;
};
