import React, { useState, createContext } from "react";
import {
  FormState,
  UpdateStateWithValidationFunction,
} from "../types/platfromsTypes";
import validateInput from "./validateInput";
import Router from "../router/Router";

export interface ProductsFormContextType {
  state: FormState;
  updateStateWithValidation: UpdateStateWithValidationFunction;
  setState: React.Dispatch<React.SetStateAction<FormState>>;
}

export const initialState: FormState = {
  productName: { value: "", hasError: false, error: "" },
  productPrice: { value: "", hasError: false, error: "" },
  productType: { value: "", hasError: false, error: "" },
  isFormValid: false,
};

export const ProductsFormContext = createContext<ProductsFormContextType>({
  state: initialState,
  updateStateWithValidation: () => {},
  setState: () => {},
});

const ProductsFormContextPage: React.FC = () => {
  const [state, setState] = useState<FormState>(initialState);
  // this update one item evry time
  const updateStateWithValidation: UpdateStateWithValidationFunction = (
    name,
    value,
    mode,
    isIntegrated
  ) => {
    const { error, hasError } = validateInput(name, value, mode, isIntegrated);

    setState((prevState: FormState) => ({
      ...prevState,
      [name]: {
        name,
        value,
        hasError,
        error,
      },
    }));
    console.log(error);
  };

  return (
    <ProductsFormContext.Provider
      value={{ state, updateStateWithValidation, setState }}
    >
      <Router />
    </ProductsFormContext.Provider>
  );
};

export default ProductsFormContextPage;
