import { ValidationResults } from "../types/platfromsTypes";

// helper function not a part from the reducer procees

// we used string instade of String becuse it is an object item

// in this fucntion we validate the inputs to get the upexepted inputs for all validates

// the edit parameter just to disable the validation on product existing in local storage when we are in edit mode
const validateInput = (
  name: string,
  value: string,
  mode: boolean,
  isIntegrated: boolean,
): ValidationResults => {
  const itemExists = localStorage.getItem(value);
  let hasError = false,
    error = "";

    // console.log('parseInt(value.trim())', parseInt(value.trim()))
    // console.log('isIntegrated', isIntegrated)
  switch (name) {
    case "productName":
      if (value.trim() === "") {
        hasError = true;
        error = "Name cannot be empty";
      } else if (!/^[a-zA-Z ]+$/.test(value)) {
        hasError = true;
        error = "Invalid product name. Avoid Special characters";
      } else if (itemExists && mode == false) {
        hasError = true;
        error = "Product is already in the store";
      } else {
        hasError = false;
        error = "";
      }
      break;
    case "productPrice":
      if (value.trim() === "") {
        hasError = true;
        error = "Price cannot be empty";
      } else if (!/^\d+$/.test(value)) {
        hasError = true;
        error = "Invalid price. Use digits only";
      } else if (parseInt(value.trim()) < 1500 && isIntegrated) {
        hasError = true
        error = "Price should be higher than 1500 when product type is integrated";
      } else {
        hasError = false;
        error = "";
      }
      break;
    case "productType":
      if (value.trim() === "") {
        hasError = true;
        error = "Product type must be selected";
      } else {
        hasError = false;
        error = "";
      }
      break;
    default:
      break;
  }
  return { hasError, error };
};
export default validateInput;
