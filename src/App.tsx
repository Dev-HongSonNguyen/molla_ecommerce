import React, { useEffect, useState, Suspense } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { message, Modal, notification } from "antd";
import LayoutClient from "./components/Layout/LayoutClient";
import LayoutAdmin from "./components/Layout/LayoutAdmin";
import { addBook, deleteBook, getAllBook, updateBook } from "./api/book";
import {
  addCategory,
  deleteCategory,
  getAllCategory,
  updateCategory,
} from "./api/category";
import { Ibook } from "./interface/Ibook";
import { Icategory } from "./interface/Icategory";
import LoadingPage from "./components/Common/LoadingPage";
import { getAllCart } from "./api/cart";
const HomePage = React.lazy(() => import("./pages/client/HomePage"));
const DashboardPage = React.lazy(() => import("./pages/admin/DashboardPage"));
const BookAddPage = React.lazy(
  () => import("./pages/admin/BookModules/BookAddPage")
);
const BookManagerPage = React.lazy(
  () => import("./pages/admin/BookModules/BookManagerPage")
);
const BookUpdatePage = React.lazy(
  () => import("./pages/admin/BookModules/BookUpdatePage")
);
const CategoryManagerPage = React.lazy(
  () => import("./pages/admin/CategoryModules/CategoryManagerPage")
);
const CategoryUpdatePage = React.lazy(
  () => import("./pages/admin/CategoryModules/CategoryUpdatePage")
);
const CategoryAddPage = React.lazy(
  () => import("./pages/admin/CategoryModules/CategoryAddPage")
);
const CartPage = React.lazy(() => import("./pages/client/CartPage"));
function App() {
  const navigate = useNavigate();
  const [book, setBook] = useState([]);
  const [category, setCategory] = useState([]);
  const [cart, setCart] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showNotificationAdd = () => {
    notification.success({
      message: "Thêm dữ liệu thành công",
      duration: 2,
    });
  };
  const showNotificationUpdate = () => {
    notification.success({
      message: "Update dữ liệu thành công",
      duration: 2,
    });
  };
  useEffect(() => {
    getAllBook().then(({ data }) => {
      const bookList = data.product;
      setBook(bookList.docs);
    });
  }, []);
  useEffect(() => {
    getAllCategory().then(({ data }) => {
      setCategory(data.category);
    });
  }, []);
  useEffect(() => {
    getAllCart().then(({ data }) => {
      const cartList = data.carts;
      setCart(cartList);
    });
  }, []);

  const removeBook = (id: string) => {
    try {
      deleteBook(id).then(() => {
        const newBook = book.filter((item: any) => item._id !== id);
        setBook(newBook);
      });
    } catch (error) {
      console.log(error);
    }
  };
  const addNewBook = (product: Ibook) => {
    try {
      addBook(product);
      navigate("/admin/book");
      showNotificationAdd();
    } catch (error) {
      console.log(error);
    }
  };
  const updateNewBook = (product: Ibook) => {
    try {
      updateBook(product);
      navigate("/admin/book");
      showNotificationUpdate();
    } catch (error) {
      console.log(error);
    }
  };
  // category
  const removeCate = (id: string) => {
    try {
      deleteCategory(id).then(() => {
        const newCate = category.filter((item: any) => item._id !== id);
        setBook(newCate);
      });
    } catch (error) {
      console.log(error);
    }
  };
  const addNewCate = (cate: Icategory) => {
    try {
      addCategory(cate);
      navigate("/admin/category");
      showNotificationAdd();
    } catch (error) {
      console.log(error);
    }
  };
  const updateCate = (cate: Icategory) => {
    try {
      updateCategory(cate);
      navigate("/admin/category");
      showNotificationUpdate();
    } catch (error) {
      console.log(error);
    }
  };
  // cart

  return (
    <div className="App">
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          <Route path="/" element={<LayoutClient cateData={category} />}>
            <Route
              index
              element={<HomePage bookData={book} cateData={category} />}
            />
            <Route
              path="cart"
              element={<CartPage cartData={cart} bookData={book} />}
            />
          </Route>
          <Route path="admin" element={<LayoutAdmin />}>
            <Route index element={<DashboardPage />} />
            <Route path="book">
              <Route
                index
                element={
                  <BookManagerPage
                    bookData={book}
                    cateData={category}
                    setBook={setBook}
                    removeBook={removeBook}
                  />
                }
              />
              <Route
                path="add"
                element={
                  <BookAddPage addNewBook={addNewBook} cateData={category} />
                }
              />
              <Route
                path="update/:id"
                element={
                  <BookUpdatePage
                    bookData={book}
                    cateData={category}
                    updateBook={updateNewBook}
                  />
                }
              />
            </Route>
            <Route path="category">
              <Route
                index
                element={
                  <CategoryManagerPage
                    cateData={category}
                    setCate={setCategory}
                    removeCategory={removeCate}
                  />
                }
              />
              <Route
                path="add"
                element={<CategoryAddPage addNewCate={addNewCate} />}
              />
              <Route
                path="update/:id"
                element={
                  <CategoryUpdatePage
                    cateData={category}
                    updateCategory={updateCate}
                  />
                }
              />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}
export default App;
