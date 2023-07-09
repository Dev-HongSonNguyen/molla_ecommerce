import { Icategory } from "../interface/Icategory";
import instance from "./instance";
const getAllCategory = () => {
  return instance.get("/categories");
};
const getOneCategory = (id: string) => {
  return instance.get("/categories/" + id);
};
const deleteCategory = (id: string) => {
  return instance.delete("/categories/" + id);
};
const updateCategory = (category: Icategory) => {
  return instance.put(`/categories/${category._id}`, category);
};
const addCategory = (category: Icategory) => {
  return instance.post("/categories", category);
};
export {
  getAllCategory,
  getOneCategory,
  deleteCategory,
  updateCategory,
  addCategory,
};
