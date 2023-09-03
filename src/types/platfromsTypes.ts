export const UPDATE_FORM = "UPDATE_FORM";

export interface ValidationResults {
  hasError: boolean;
  error: string;
}

export interface LocalStorageItems {
  productName: string;
  productPrice: string;
  productType: string;
}
//  represents the structure of every  individual form field's state in the initialState
export type FormField = {
  value: string;
  hasError: boolean;
  error: string;
};

// represent typs of each field in initialState
export type FormState = {
  productName: FormField;
  productPrice: FormField;
  productType: FormField;
  isFormValid: boolean;
};

export type UpdateStateWithValidationFunction = (
  name: keyof FormState,
  value: string,
  mode: boolean,
  isIntegrated: boolean
) => void;
