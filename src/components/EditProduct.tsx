import React, { useState, useEffect, useContext } from "react";
import { ArrowBackIcon, DeleteIcon, RepeatIcon } from "@chakra-ui/icons";
import { useNavigate, useParams } from "react-router-dom";
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
export const Editproduct = "/editproduct/:productName";
import {
  FormState,
  LocalStorageItems,
  FormField,
} from "../types/platfromsTypes";
import {
  initialState,
  ProductsFormContext,
  ProductsFormContextType,
} from "../utils/ProductsFormContextPage";


const EditProduct = () => {
  const navigate = useNavigate();

  //   useparams is an react router hook get all the parameters values
  //   this state came from reducer
  const { productName } = useParams<{ productName: any }>();

  const { state, updateStateWithValidation, setState } =
    useContext<ProductsFormContextType>(ProductsFormContext);

  const [showError, setShowError] = useState(false);
  const storageData = localStorage.getItem(productName);
  //   const [editProduct, setEditProduct] = useState<LocalStorageItems>(
  //     JSON.parse(localStorage.getItem(productName))
  //   );
  const editProduct: LocalStorageItems = (() => {
    try {
      return typeof storageData === "string" ? JSON.parse(storageData) : null;
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return null;
    }
  })();

  //   we used useEffect to fill the state with  product data from local storag if user does not fill in the forms
  useEffect(() => {
    if (state.productName.value == "") {
      updateStateWithValidation(
        "productName",
        productName,
        true,
        editProduct?.productPrice === "Integrated"
      );
    }
    if (state.productPrice.value == "") {
      updateStateWithValidation(
        "productPrice",
        editProduct?.productPrice,
        true,
        editProduct?.productPrice === "Integrated"
      );
    }
    if (state.productType.value == "") {
      updateStateWithValidation(
        "productType",
        editProduct?.productType,
        true,
        editProduct?.productPrice === "Integrated"
      );
    }
  }, [editProduct]);

  const setProductName = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault(); //prevents the form from submitting
    let isFormValid = true;
    // loop throw the for loop after i fill it with new values
    // this loop to get the error setuation and the error name from the validate input page
    for (const name in state) {
      const item = state[name as keyof FormState];
      const { value } = item as FormField;
      // ?????????
      const { hasError, error } = validateInput(
        name,
        value,
        true,
        state.productType.value === "Integrated"
      );

      console.log("state", state);
      if (hasError) {
        isFormValid = false;
      }
    }
    if (!isFormValid) {
      setShowError(true);
    } else {
      setState(initialState);
      localStorage.setItem(
        productName,
        JSON.stringify({
          productPrice: state.productPrice.value,
          productType: state.productType.value,
        })
      );
      navigate("/");
    }

    // Hide the error message after 5 seconds
    setTimeout(() => {
      setShowError(false);
    }, 5000);
  };

  const ProductPriceHandlar = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateStateWithValidation(
      "productPrice",
      e.target.value,
      true,
      state.productType.value === "Integrated"
    );
  };

  const ProductTypeHandlar = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateStateWithValidation(
      "productType",
      e.target.value,
      true,
      e.target.value === "Integrated"
    );

    if (e.target.value === "Integrated") {
      updateStateWithValidation(
        "productPrice",
        state.productPrice.value,
        true,
        true
      );
    } else {
      updateStateWithValidation(
        "productPrice",
        state.productPrice.value,
        true,
        false
      );
    }
  };

  return (
    <>
      <Button
        onClick={() => {
          navigate("/");
        }}
      >
        <ArrowBackIcon />
      </Button>
      <Box m={20}>
        <Text fontSize="3xl">Update Or Delete The Products Values</Text>
        <FormControl isInvalid={showError && !state.isFormValid}>
          <FormErrorMessage>
            Please fill all the fields correctly
          </FormErrorMessage>
        </FormControl>
        <Stack boxShadow="Base">
          <FormLabel>Product</FormLabel>
          <Input
            variant="filled"
            placeholder="Product"
            disabled
            defaultValue={productName}
          />
          <FormControl isInvalid={state.productPrice.hasError}>
            <FormLabel>Price</FormLabel>
            <Input
              variant="filled"
              placeholder="Price"
              onChange={ProductPriceHandlar}
              defaultValue={editProduct?.productPrice}
            />
            <FormErrorMessage>{state.productPrice.error}</FormErrorMessage>
          </FormControl>
          {/* when user add new chars to the price or type that will update the state */}
          <FormControl isInvalid={state.productType.hasError}>
            <FormLabel>Type</FormLabel>
            <Select
              onChange={ProductTypeHandlar}
              placeholder="Select your product Type"
              defaultValue={editProduct?.productType}
            >
              <option value="Integrated">Integrated</option>
              <option value="Peripheral">Peripheral</option>
            </Select>
            <FormErrorMessage>{state.productType.error}</FormErrorMessage>
          </FormControl>
        </Stack>
        <br></br>
        <Button colorScheme="green" onClick={setProductName}>
          Uppdate <RepeatIcon />
        </Button>
        <Button
          colorScheme="red"
          onClick={() => {
            localStorage.removeItem(productName);
            navigate("/");
          }}
        >
          Delete <DeleteIcon />
        </Button>
      </Box>
    </>
  );
};

export default EditProduct;
