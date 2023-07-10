import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { message } from "antd";
import LayoutClient from "./components/Layout/LayoutClient";
import LayoutAdmin from "./components/Layout/LayoutAdmin";
import DashboardPage from "./pages/admin/DashboardPage";
import ProductManagerPage from "./pages/admin/ProductModules/ProductManagerPage";
import HomePage from "./pages/client/HomePage";
import ProductAddPage from "./pages/admin/ProductModules/ProductAddPage";
import ProductUpdatePage from "./pages/admin/ProductModules/ProductUpdatePage";
import CategoyManagerPage from "./pages/admin/CategoryModules/CategoyManagerPage";
import CategoryAddPage from "./pages/admin/CategoryModules/CategoryAddPage";
import CategoryUpdatePage from "./pages/admin/CategoryModules/CategoryUpdatePage";
import { addProduct, getAllProduct } from "./api/product";
import { getAllCategory } from "./api/category";
import { Iproduct } from "./interface/Iproduct";

function App() {
  const navigate = useNavigate();
  const [book, setBook] = useState([]);
  useEffect(() => {
    getAllProduct().then(({ data }) => {
      const bookList = data.product;
      setBook(bookList.docs);
    });
  }, []);
  const [category, setCategory] = useState([]);
  useEffect(() => {
    getAllCategory().then(({ data }) => {
      setCategory(data.category);
    });
  }, []);
  const addNewProduct = (product: Iproduct) => {
    try {
      addProduct(product);
      navigate("/admin/product");
      message.success("Thao tác thành công");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LayoutClient cateData={category} />}>
          <Route
            index
            element={<HomePage bookData={book} cateData={category} />}
          />
        </Route>
        <Route path="admin" element={<LayoutAdmin />}>
          <Route index element={<DashboardPage />} />
          <Route path="product">
            <Route
              index
              element={
                <ProductManagerPage
                  bookData={book}
                  cateData={category}
                  setBook={setBook}
                />
              }
            />
            <Route
              path="add"
              element={
                <ProductAddPage
                  addNewProduct={addNewProduct}
                  cateData={category}
                />
              }
            />
            <Route path="update/:id" element={<ProductUpdatePage />} />
          </Route>
          <Route path="category">
            <Route index element={<CategoyManagerPage />} />
            <Route path="add" element={<CategoryAddPage />} />
            <Route path="update/:id" element={<CategoryUpdatePage />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}
export default App;
