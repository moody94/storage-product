import { BrowserRouter, Routes, Route } from "react-router-dom";
import ShowData from "../components/showData";
import AddProduct, { addproduct } from "../components/AddProduct";
import EditProduct, { Editproduct } from "../components/EditProduct";

const DEFAULT_URL = "/";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={DEFAULT_URL} element={<ShowData />} />
        <Route path={addproduct} element={<AddProduct />} />
        <Route path={Editproduct} element={<EditProduct />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
