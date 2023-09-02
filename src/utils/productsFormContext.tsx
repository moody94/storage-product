import { createContext, useContext, useState } from "react";
import { FormState } from "../types/platfromsTypes";

export const initialState = {
  productName: { value: "", touched: false, hasError: false, error: "" },
  productPrice: { value: "", touched: false, hasError: false, error: "" },
  productType: { value: "", touched: false, hasError: false, error: "" },
  isFormValid: false,
};

const ProductsFormContext = createContext<FormState>(initialState);

export default ProductsFormContext;
