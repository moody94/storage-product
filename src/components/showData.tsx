import { useNavigate } from "react-router-dom";
import {
  Button,
  Box,
  Spacer,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Center,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

const ShowData = () => {
  const navigate = useNavigate();
  // get all items
  const items = { ...localStorage };
  // let items = {"muhamed": "{}", "muhamed kheer": '{"productPrice":"11","productType":"Integrated"}'}
  let products = [];

  // get the object from localhost and covert it to a list of objects
  for (const [key, value] of Object.entries(items)) {
    try {
      const trimmedValue = value.trim(); // Trim whitespace
      const parsedValue = JSON.parse(trimmedValue);

      const productObject = {
        productName: key,
        productValue: parsedValue,
      };
      // array of products objects[{}]
      products.push(productObject);
    } catch (error) {
      console.error(`Error parsing JSON for key ${key}:`);
    }
  }
  return (
    <Box padding={30}>
      <Box
        p={3}
        bgGradient="#333"
        w="100%"
        h="80vh"
        boxShadow="dark-lg"
        borderRadius={10}
      >
        <>
          <TableContainer>
            <Table variant="striped">
              <Thead>
                <Tr>
                  <Th>Product Name</Th>
                  <Th>price</Th>
                  <Th>type</Th>
                </Tr>
              </Thead>
              {products.length === 0 && (
                <Center fontSize="4xl" p={100} ml={350}>
                  There are no products to show
                </Center>
              )}
              <Tbody>
                {products.map((product: any) => (
                  <Tr
                    onClick={() => {
                      navigate(`/editproduct/${product["productName"]}`);
                    }}
                  >
                    <Td>
                      <Th>{product["productName"]}</Th>
                    </Td>
                    <Td>
                      <Th>{product["productValue"]["productPrice"]}</Th>
                    </Td>
                    <Td>
                      <Th>{product["productValue"]["productType"]}</Th>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </>
      </Box>
      <Spacer />
      <Button
        colorScheme="blue"
        onClick={() => {
          navigate("/addproduct");
        }}
        borderRadius="50%"
        h={100}
        w={100}
        m={10}
        left="90%"
      >
        <AddIcon w={10} h={10} color="white" />
      </Button>
    </Box>
  );
};

export default ShowData;
