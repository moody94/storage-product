import React, { useState, useContext, createContext } from "react";
import { DownloadIcon, NotAllowedIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import {
  Input,
  Stack,
  Box,
  Button,
  Text,
  Select,
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/react";
import validateInput from "../utils/validateInput";
import { FormState, FormField } from "../types/platfromsTypes";
export const addproduct = "/addproduct";

import {
  initialState,
  ProductsFormContext,
  ProductsFormContextType,
} from "../utils/ProductsFormContextPage";

const AddProduct = () => {
  const navigate = useNavigate();
  const { state, updateStateWithValidation, setState } =
    useContext<ProductsFormContextType>(ProductsFormContext);

  const [showError, setShowError] = useState(false);

  // the function that add an item if there are all the inputs is valid
  const setProductInfo = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault(); //prevents the form from submitting

    let isFormValid = true;
    // loop throw the for loop after i fill it with new values
    // this loop to get the error setuation and the error name from the validate input page
    for (const name in state) {
      const item = state[name as keyof FormState];
      const { value } = item as FormField;
      // to get status of error is there is a one or not
      const { hasError } = validateInput(
        name,
        value,
        false,
        state.productType.value === "Integrated"
      );
      if (hasError) {
        isFormValid = false;
      }
    }

    if (!isFormValid) {
      setShowError(true);
    } else {
      // the initialState values after the validations
      setState(initialState);

      // the storage is object the key is productname and the value is object from type and price
      localStorage.setItem(
        state.productName.value,
        JSON.stringify({
          productPrice: state.productPrice.value,
          productType: state.productType.value,
        })
      );
      navigate("/");
    }

    setTimeout(() => {
      setShowError(false);
    }, 5000);
  };

  // the Onchages funtions
  const ProductNameHandlar = (e: React.ChangeEvent<HTMLInputElement>) =>
    updateStateWithValidation(
      "productName",
      e.target.value,
      false,
      state.productType.value === "Integrated"
    );

  const ProductPriceHandlar = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateStateWithValidation(
      "productPrice",
      e.target.value,
      false,
      state.productType.value === "Integrated"
    );
  };

  const ProductTypeHandlar = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateStateWithValidation(
      "productType",
      e.target.value,
      false,
      e.target.value === "Integrated"
    );
    // if the type is integraged
    if (e.target.value === "Integrated") {
      updateStateWithValidation(
        "productPrice",
        state.productPrice.value,
        false,
        true
      );
    } else {
      updateStateWithValidation(
        "productPrice",
        state.productPrice.value,
        false,
        false
      );
    }
  };

  return (
    <>
      <Box m={20}>
        <Text fontSize="3xl">Create a new product</Text>
        <FormControl isInvalid={showError && !state.isFormValid}>
          <FormErrorMessage>
            Please fill all the fields correctly
          </FormErrorMessage>
        </FormControl>
        <Stack boxShadow="Base">
          <FormControl isInvalid={state.productName.hasError}>
            <FormLabel>Product</FormLabel>
            <Input
              variant="filled"
              placeholder="Product"
              onChange={ProductNameHandlar}
            />
            <FormErrorMessage>{state.productName.error}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={state.productPrice.hasError}>
            <FormLabel>Price</FormLabel>
            <Input
              variant="filled"
              placeholder="Price"
              onChange={ProductPriceHandlar}
            />
            <FormErrorMessage>{state.productPrice.error}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={state.productType.hasError}>
            <FormLabel>Product Type</FormLabel>
            <Select
              onChange={ProductTypeHandlar}
              // value={selectedValue}
              placeholder="Select your product Type"
            >
              <option value="Integrated">Integrated</option>
              <option value="Peripheral">Peripheral</option>
            </Select>
            <FormErrorMessage>{state.productType.error}</FormErrorMessage>
          </FormControl>
        </Stack>
        <br></br>
        <Button colorScheme="green" onClick={setProductInfo}>
          Save <DownloadIcon />
        </Button>
        <Button
          onClick={() => {
            navigate("/");
            setState(initialState)
          }}
        >
          Cancle <NotAllowedIcon />
        </Button>
      </Box>
    </>
  );
};

export default AddProduct;
