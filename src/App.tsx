import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { message, Modal, notification } from "antd";
import LayoutClient from "./components/Layout/LayoutClient";
import LayoutAdmin from "./components/Layout/LayoutAdmin";
import DashboardPage from "./pages/admin/DashboardPage";
import HomePage from "./pages/client/HomePage";
import BookUpdatePage from "./pages/admin/BookModules/BookUpdatePage";
import BookAddPage from "./pages/admin/BookModules/BookAddPage";
import BookManagerPage from "./pages/admin/BookModules/BookManagerPage";
import CategoyManagerPage from "./pages/admin/CategoryModules/CategoyManagerPage";
import CategoryAddPage from "./pages/admin/CategoryModules/CategoryAddPage";
import CategoryUpdatePage from "./pages/admin/CategoryModules/CategoryUpdatePage";
import { addBook, deleteBook, getAllBook, updateBook } from "./api/book";
import { getAllCategory } from "./api/category";
import { Ibook } from "./interface/Ibook";
function App() {
  const navigate = useNavigate();
  const [book, setBook] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showNotification = () => {
    notification.success({
      message: "Thêm sản phẩm thành công",
      duration: 2,
    });
  };
  useEffect(() => {
    getAllBook().then(({ data }) => {
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
      showNotification();
    } catch (error) {
      console.log(error);
    }
  };
  const updateNewBook = (product: Ibook) => {
    try {
      updateBook(product);
      navigate("/admin/book");
      showNotification();
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
