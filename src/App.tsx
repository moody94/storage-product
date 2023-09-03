import { ChakraProvider } from "@chakra-ui/react";

import ProductsFormContextPage from "../src/utils/ProductsFormContextPage";

const App = () => {
  return (
    <ChakraProvider>
      <ProductsFormContextPage />
    </ChakraProvider>
  );
};

export default App;
