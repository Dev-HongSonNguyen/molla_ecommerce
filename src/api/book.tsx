import { Ibook } from "../interface/Ibook";
import instance from "./instance";
const getAllBook = () => {
  return instance.get("/products");
};
const getOneBook = (id: any) => {
  return instance.get("/products/" + id);
};
const deleteBook = (id: string) => {
  return instance.delete("/products/" + id);
};
const updateBook = (product: Ibook) => {
  return instance.put(`/products/${product._id}`, product);
};
const addBook = (product: Ibook) => {
  return instance.post("/products", product);
};
const getBookByCategory = (categoryId: string) => {
  return instance.get(`/productByCategory?categoryId=${categoryId}`);
};
export {
  getAllBook,
  getOneBook,
  deleteBook,
  updateBook,
  addBook,
  getBookByCategory,
};
