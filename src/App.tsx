import { useState } from "react";
import Router from "./router/Router";
import { ChakraProvider } from "@chakra-ui/react";
import { FormState } from "./types/platfromsTypes";
import ProductsFormContext, { initialState } from "./utils/productsFormContext";
import validateInput from "./utils/validateInput";

const App = () => {
  const [state, setState] = useState<FormState>(initialState);

  const updateStateWithValidation = (
    name: any,
    value: any,
    mode: any,
    isIntegrated: any,
  ) => {
    const { error, hasError } = validateInput(name, value, mode, isIntegrated);

    setState((prevState: any) => ({
      ...prevState,
      [name]: {
        ...prevState[name],
        value,
        touched: true,
        hasError,
        error,
      },
    }));
  };
  return (
    <ChakraProvider>
      <ProductsFormContext.Provider
        value={{ state, updateStateWithValidation, setState }}
      >
        <Router />
      </ProductsFormContext.Provider>
    </ChakraProvider>
  );
};

export default App;
